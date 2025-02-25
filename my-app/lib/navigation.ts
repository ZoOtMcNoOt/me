export const scrollToSection = (sectionId: string) => {
  try {
    // Remove the leading '#' or '/#' if present
    const cleanId = sectionId.replace(/^\/?#/, "")
    const element = document.getElementById(cleanId)

    if (element) {
      const headerOffset = 80 // Height of the floating nav
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      })

      // Update URL without triggering a scroll
      window.history.pushState({}, "", `#${cleanId}`)

      return true
    }
    return false
  } catch (error) {
    console.error("Error scrolling to section:", error)
    return false
  }
}

export const isHashLink = (href: string): boolean => {
  return href.startsWith("#") || href.startsWith("/#")
}

export const formatHashLink = (href: string): string => {
  if (href.startsWith("/#")) return href
  if (href.startsWith("#")) return `/${href}`
  return href
}

