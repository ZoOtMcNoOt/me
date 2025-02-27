"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import gsap from "gsap"

// Custom shader for gorgeous color treatment
const fragmentShader = `
uniform float time;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
varying vec2 vUv;
varying float vElevation;

void main() {
  float mixStrength = (sin(vUv.x * 10.0 + time) + sin(vUv.y * 10.0 + time)) * 0.5;
  vec3 colorMix1 = mix(color1, color2, clamp(mixStrength, 0.0, 1.0));
  vec3 colorMix2 = mix(colorMix1, color3, clamp(vElevation, 0.0, 1.0));
  
  gl_FragColor = vec4(colorMix2, 1.0);
}
`

const vertexShader = `
uniform float time;
uniform float mouseX;
uniform float mouseY;
uniform float scrollY;

varying vec2 vUv;
varying float vElevation;

float rand(vec2 n) { 
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

void main() {
  vUv = uv;
  
  // Create subtle movement based on position
  float elevation = sin(position.x * 0.05 + time * 0.1) * 
                   sin(position.y * 0.05 + time * 0.1) * 
                   sin(position.z * 0.05 + time * 0.1);
                   
  // Mouse influence
  float distanceToMouse = length(vec2(position.x - mouseX, position.y - mouseY));
  float mouseInfluence = max(0.0, 1.0 - distanceToMouse / 10.0);
  
  // Scroll influence
  float scrollInfluence = sin(position.y * 0.01 + scrollY * 0.002) * 0.2;
  
  // Combined movement
  vec3 newPosition = position;
  newPosition.z += elevation * 2.0 + mouseInfluence * 5.0 + scrollInfluence;
  
  vElevation = elevation * 0.5 + 0.5;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`

// Export as a named export so dynamic import can access it
export function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const composerRef = useRef<EffectComposer | null>(null)
  const animationFrameId = useRef<number | null>(null)
  const startTime = useRef<number>(Date.now())
  
  // Smooth scroll with spring physics for natural feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  
  // Transform scroll to color values
  const primaryHue = useTransform(smoothProgress, [0, 1], [210, 260])
  const primarySaturation = useTransform(smoothProgress, [0, 1], [70, 80])
  const primaryLightness = useTransform(smoothProgress, [0, 1], [50, 60])
  
  // Initialize WebGL scene
  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return
    
    // Create scene
    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    // Create camera with perspective
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 20
    cameraRef.current = camera
    
    // Create renderer with anti-aliasing
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      precision: 'highp'
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer
    
    // Create custom shader material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color("#3b82f6") }, // Blue
        color2: { value: new THREE.Color("#8b5cf6") }, // Purple
        color3: { value: new THREE.Color("#ec4899") }, // Pink
        mouseX: { value: 0 },
        mouseY: { value: 0 },
        scrollY: { value: 0 }
      },
      wireframe: false,
      transparent: true,
    })
    materialRef.current = material
    
    // Create particle mesh - using a plane with subdivisions
    const geometry = new THREE.PlaneGeometry(40, 40, 100, 100)
    const particles = new THREE.Points(geometry, material)
    scene.add(particles)
    
    // Add ambient light for general illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    
    // Add directional light for depth
    const directionalLight = new THREE.DirectionalLight(0x9f7aea, 0.8)
    directionalLight.position.set(0, 1, 1)
    scene.add(directionalLight)
    
    // Setup post-processing for glow effect
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)
    
    // Add bloom for particle glow
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.4,  // strength
      0.4,  // radius
      0.9   // threshold
    )
    composer.addPass(bloomPass)
    
    composerRef.current = composer
    
    // Handle window resize
    const handleResize = () => {
      if (!renderer || !camera || !composer) return
      
      const width = window.innerWidth
      const height = window.innerHeight
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      
      composer.setSize(width, height)
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  // Animation and render loop
  useEffect(() => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !composerRef.current || !materialRef.current) return
    
    const animate = () => {
      const elapsedTime = (Date.now() - startTime.current) / 1000
      
      if (materialRef.current) {
        // Update shader uniforms
        materialRef.current.uniforms.time.value = elapsedTime * 0.5
        materialRef.current.uniforms.mouseX.value = (mousePosition.x / window.innerWidth) * 20 - 10
        materialRef.current.uniforms.mouseY.value = -(mousePosition.y / window.innerHeight) * 20 + 10
        materialRef.current.uniforms.scrollY.value = window.scrollY
        
        // Subtle camera movement
        if (cameraRef.current) {
          cameraRef.current.position.x = Math.sin(elapsedTime * 0.2) * 0.5
          cameraRef.current.position.y = Math.cos(elapsedTime * 0.3) * 0.5
          cameraRef.current.lookAt(0, 0, 0)
        }
      }
      
      // Render with post-processing
      if (composerRef.current) {
        composerRef.current.render()
      }
      
      animationFrameId.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [mousePosition])
  
  // Handle mouse movement and touch events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(mousePosition, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power2.out"
      })
    }
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        gsap.to(mousePosition, {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          duration: 0.6,
          ease: "power2.out"
        })
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])
  
  // Update shader colors based on scroll
  useEffect(() => {
    const unsubscribePrimaryHue = primaryHue.on('change', (value) => {
      if (!materialRef.current) return
      
      const hue = value / 360
      const s = primarySaturation.get() / 100
      const l = primaryLightness.get() / 100
      
      const color1 = new THREE.Color().setHSL(hue, s, l)
      const color2 = new THREE.Color().setHSL((hue + 0.1) % 1, s, l)
      const color3 = new THREE.Color().setHSL((hue + 0.2) % 1, s * 0.9, l * 1.1)
      
      materialRef.current.uniforms.color1.value = color1
      materialRef.current.uniforms.color2.value = color2
      materialRef.current.uniforms.color3.value = color3
    })
    
    return () => {
      unsubscribePrimaryHue()
    }
  }, [primaryHue, primarySaturation, primaryLightness])
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" ref={containerRef}>
      {/* Additional overlay elements for depth and visual interest */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background/50 pointer-events-none" />
      
      {/* Noise texture overlay for added texture */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Edge vignette for focus */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_65%,rgba(0,0,0,0.10)_100%)]" />
      
      {/* Top and bottom gradients */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  )
}