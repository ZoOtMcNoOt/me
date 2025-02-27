export async function getGithubContributions() {
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          viewer {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }`,
      }),
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000), // 10 second timeout
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`GitHub API error: ${response.status} ${errorText}`)
    }

    const data = await response.json()

    // Check for GraphQL errors
    if (data.errors) {
      throw new Error(`GitHub GraphQL error: ${JSON.stringify(data.errors)}`)
    }

    // Validate the response structure
    if (!data.data?.viewer?.contributionsCollection?.contributionCalendar) {
      throw new Error("Invalid response structure from GitHub API")
    }

    const calendar = data.data.viewer.contributionsCollection.contributionCalendar

    // Transform the data into the expected format
    const days = calendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
      })),
    )

    return {
      days,
      totalContributions: calendar.totalContributions,
    }
  } catch (error) {
    // Enhance error handling with specific error types
    if (error instanceof TypeError) {
      throw new Error("Network error while fetching GitHub data")
    }
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("GitHub API request timed out")
    }
    // Re-throw with context if it's already an Error
    if (error instanceof Error) {
      throw new Error(`GitHub API error: ${error.message}`)
    }
    // Handle unknown error types
    throw new Error("Unknown error while fetching GitHub data")
  }
}

