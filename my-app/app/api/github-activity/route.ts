import { getGithubContributions } from "@/lib/github"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Verify GitHub token exists
    if (!process.env.GITHUB_ACCESS_TOKEN) {
      console.error("GitHub token is missing")
      return NextResponse.json({ error: "GitHub token is not configured" }, { status: 401 })
    }

    const data = await getGithubContributions()

    // Validate the response data
    if (!data?.days?.length) {
      console.error("Invalid or empty GitHub activity data")
      return NextResponse.json({ error: "Unable to retrieve GitHub activity data" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in GitHub activity route:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch GitHub activity"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

