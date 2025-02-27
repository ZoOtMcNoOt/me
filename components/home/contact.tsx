"use client"

import { useState } from "react"
import { Mail, Github, Linkedin, Phone, Copy, Check, ArrowUpRight, Download } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const contactInfo = {
  name: "Grant McNatt",
  title: "Software Engineer",
  email: "gmcnatt1@tamu.edu",
  phone: "+1 (469) 324-9857",
  links: [
    {
      name: "Email",
      value: "gmcnatt1@tamu.edu",
      href: "mailto:gmcnatt1@tamu.edu",
      icon: Mail,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      name: "LinkedIn",
      value: "linkedin.com/in/grant-mcnatt",
      href: "https://linkedin.com/in/grant-mcnatt",
      icon: Linkedin,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      name: "GitHub",
      value: "github.com/ZoOtMcNoOt",
      href: "https://github.com/ZoOtMcNoOt",
      icon: Github,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      name: "Phone",
      value: "+1 (469) 324-9857",
      href: "tel:+14693249857",
      icon: Phone,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ],
}

export function Contact() {
  const [flipped, setFlipped] = useState(false)
  const [copied, setCopied] = useState(null)

  const handleCopy = (text, name) => {
    navigator.clipboard.writeText(text)
    setCopied(name)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-background/80 min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
        <p className="text-muted-foreground mb-10">
          Take my virtual business card and reach out whenever you're ready to collaborate.
        </p>

        {/* Card Container - Simple but effective 3D flip */}
        <div
          className="relative w-full mx-auto max-w-md aspect-[1.78/1] cursor-pointer perspective"
          onClick={() => setFlipped(!flipped)}
        >
          <div
            className={`relative w-full h-full transition-transform duration-700 preserve-3d ${flipped ? "rotate-y-180" : ""}`}
          >
            {/* Front of Card */}
            <div className="absolute inset-0 bg-card shadow-lg p-6 backface-hidden border border-border">
              <div className="h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-bold text-card-foreground">{contactInfo.name}</h3>
                    <p className="text-muted-foreground">{contactInfo.title}</p>
                  </div>

                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">GM</span>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 mt-auto">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{contactInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{contactInfo.email}</span>
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 text-xs text-muted-foreground italic">Tap to flip</div>
              </div>
            </div>

            {/* Back of Card */}
            <div className="absolute inset-0 bg-card shadow-lg p-4 backface-hidden rotate-y-180 border border-border">
              <div className="h-full flex flex-col">
                {/* Header - reduce margin and padding */}
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <span className="text-sm font-bold bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent">
                      GM
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-card-foreground">Connect With Me</h3>
                    <p className="text-xs text-muted-foreground">Choose your preferred method</p>
                  </div>
                </div>

                {/* Contact Links - reduce spacing */}
                <div className="flex-1 flex flex-col justify-center -mt-2 space-y-2.5">
                  {contactInfo.links.map((link) => (
                    <div key={link.name} className="group relative">
                      <div
                        className={cn(
                          "flex items-center justify-between py-1.5 px-2 border-b border-border/30 transition-all duration-200",
                          "hover:bg-primary/5",
                        )}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className={cn("p-1.5 rounded-full", link.bgColor)}>
                            <link.icon className={cn("h-3.5 w-3.5", link.color)} />
                          </div>
                          <span className="text-sm text-card-foreground font-medium truncate">{link.value}</span>
                        </div>

                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            className="p-1 rounded-full hover:bg-primary/10 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCopy(link.value, link.name)
                            }}
                          >
                            {copied === link.name ? (
                              <Check className="h-3.5 w-3.5 text-green-500" />
                            ) : (
                              <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                            )}
                            <span className="sr-only">Copy {link.name}</span>
                          </button>

                          <Link
                            href={link.href}
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 rounded-full hover:bg-primary/10 transition-colors"
                          >
                            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="sr-only">Open {link.name}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
              </div>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mt-8 mb-4">
          Click the card to flip it and access all my contact details
        </p>

        <Button
          className="w-full max-w-md mx-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-sm text-sm h-9"
          onClick={(e) => {
            e.stopPropagation()
            alert("vCard download would happen here")
          }}
        >
          <Download className="mr-2 h-3.5 w-3.5" />
          Save Contact
        </Button>
      </div>

      {/* Simple required CSS for 3D effect that will definitely work */}
      <style jsx global>{`
        .perspective {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  )
}

