"use client"

import { useState, useCallback } from "react"
import type { GraphNode, GraphLink } from "../types"

export function useGraphHighlight(graphData: { nodes: GraphNode[]; links: GraphLink[] }) {
  const [highlightNodes, setHighlightNodes] = useState(new Set<string>())
  const [highlightLinks, setHighlightLinks] = useState(new Set<GraphLink>())

  const handleNodeHover = useCallback(
    (node: GraphNode | null) => {
      if (!graphData?.nodes || !graphData?.links) return

      if (node) {
        const neighbors = new Set<string>([node.id])
        const links = new Set<GraphLink>()

        // Find all directly connected nodes and links
        graphData.links.forEach((link) => {
          const sourceId = typeof link.source === "string" ? link.source : link.source.id
          const targetId = typeof link.target === "string" ? link.target : link.target.id

          if (sourceId === node.id) {
            neighbors.add(targetId)
            links.add(link)
          } else if (targetId === node.id) {
            neighbors.add(sourceId)
            links.add(link)
          }
        })

        setHighlightNodes(neighbors)
        setHighlightLinks(links)
      } else {
        setHighlightNodes(new Set())
        setHighlightLinks(new Set())
      }
    },
    [graphData],
  )

  return {
    highlightNodes,
    highlightLinks,
    handleNodeHover,
  }
}

