// Helper function to ensure paths are correctly formatted
export function formatPath(path: string): string {
  // Remove leading slash if present
  path = path.startsWith("/") ? path.slice(1) : path
  // Ensure consistent forward slashes
  path = path.replace(/\\/g, "/")
  return path
}

// Helper to get relative path between two files
export function getRelativePath(from: string, to: string): string {
  const fromParts = formatPath(from).split("/")
  const toParts = formatPath(to).split("/")

  // Remove filename from fromParts
  fromParts.pop()

  // Find common prefix
  let i = 0
  while (i < fromParts.length && i < toParts.length && fromParts[i] === toParts[i]) {
    i++
  }

  // Build relative path
  const relPath = Array(fromParts.length - i)
    .fill("..")
    .concat(toParts.slice(i))
    .join("/")

  return relPath.startsWith(".") ? relPath : `./${relPath}`
}

// Helper to ensure consistent import paths
export function formatImportPath(path: string): string {
  if (path.startsWith("@/")) return path
  return path.startsWith(".") ? path : `./${path}`
}

