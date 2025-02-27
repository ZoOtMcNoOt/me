"use client"

import { useState, useCallback, useMemo } from "react"
import type { GraphNode } from "../types"
import { graphData } from "@/data/graph-data"

export function useGraphState() {
  const [visibleNodes, setVisibleNodes] = useState<Set<string>>(new Set())

  // Memoize filtered data
  const filteredData = useMemo(() => {
    const nodes = graphData.nodes.filter((node) => node.level <= 2 || visibleNodes.has(node.id))
    const nodeIds = new Set(nodes.map((node) => node.id))

    const links = graphData.links.filter((link) => {
      const sourceId = typeof link.source === "string" ? link.source : link.source.id
      const targetId = typeof link.target === "string" ? link.target : link.target.id
      return nodeIds.has(sourceId) && nodeIds.has(targetId)
    })

    return { nodes, links }
  }, [visibleNodes])

  const handleNodeClick = useCallback(
    (node: GraphNode) => {
      if (node.level <= 2) {
        const newVisibleNodes = new Set(visibleNodes)
        const connectedLinks = graphData.links.filter((link) => {
          const sourceId = typeof link.source === "string" ? link.source : link.source.id
          const targetId = typeof link.target === "string" ? link.target : link.target.id
          return sourceId === node.id || targetId === node.id
        })

        connectedLinks.forEach((link) => {
          const targetId = typeof link.target === "string" ? link.target : link.target.id
          const targetNode = graphData.nodes.find((n) => n.id === targetId)
          if (targetNode && targetNode.level === 3) {
            if (newVisibleNodes.has(targetId)) {
              newVisibleNodes.delete(targetId)
            } else {
              newVisibleNodes.add(targetId)
            }
          }
        })

        setVisibleNodes(newVisibleNodes)
      }
    },
    [visibleNodes],
  )

  const showAllLevel3Nodes = useCallback(() => {
    const level3Nodes = new Set(graphData.nodes.filter((node) => node.level === 3).map((node) => node.id))
    setVisibleNodes(level3Nodes)
  }, [])

  const resetVisibleNodes = useCallback(() => {
    setVisibleNodes(new Set())
  }, [])

  return {
    filteredData,
    visibleNodes,
    handleNodeClick,
    showAllLevel3Nodes,
    resetVisibleNodes,
  }
}

