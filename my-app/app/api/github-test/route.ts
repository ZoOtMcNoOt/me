import { NextResponse } from "next/server"

export async function GET() {
  const token = process.env.GITHUB_ACCESS_TOKEN

  if (!token) {
    return NextResponse.json({ error: "GitHub token not found" }, { status: 401 })
  }

  try {
    // Simple test query to verify token works
    const query = `
      query {
        viewer {
          login
          name
        }
      }
    `

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error("GitHub API request failed")
    }

    const data = await response.json()
    return NextResponse.json({ success: true, data: data.data.viewer })
  } catch (error) {
    console.error("Error testing GitHub connection:", error)
    return NextResponse.json({ error: "Failed to connect to GitHub" }, { status: 500 })
  }
}

