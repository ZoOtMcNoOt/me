import { getGithubContributions } from "@/lib/github"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Verify GitHub token exists
    if (!process.env.GITHUB_ACCESS_TOKEN) {
      console.error("GitHub token is missing")
      return NextResponse.json(
        {
          error: "GitHub token is not configured",
          details: "Please add GITHUB_ACCESS_TOKEN to your environment variables",
        },
        { status: 401 },
      )
    }

    const data = await getGithubContributions()

    // Validate the response data
    if (!data?.days?.length) {
      console.error("Invalid or empty GitHub activity data")
      return NextResponse.json(
        {
          error: "Unable to retrieve GitHub activity data",
          details: "The GitHub API returned empty or invalid data",
        },
        { status: 500 },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    // Log the full error for debugging
    console.error("Error in GitHub activity route:", error)

    // Determine appropriate status code based on error
    let status = 500
    let message = "Failed to fetch GitHub activity"
    const details = error instanceof Error ? error.message : "Unknown error occurred"

    if (details.includes("timeout")) {
      status = 504 // Gateway Timeout
      message = "GitHub API request timed out"
    } else if (details.includes("Network error")) {
      status = 503 // Service Unavailable
      message = "Unable to reach GitHub API"
    } else if (details.includes("not configured")) {
      status = 401 // Unauthorized
      message = "GitHub integration is not properly configured"
    }

    return NextResponse.json(
      {
        error: message,
        details: details,
      },
      { status },
    )
  }
}

