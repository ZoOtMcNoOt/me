const query = `
  query {
    viewer {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`

export async function getGithubContributions() {
  const token = process.env.GITHUB_ACCESS_TOKEN

  if (!token) {
    throw new Error("GitHub token is not configured")
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      cache: "no-cache", // Disable caching to get fresh data
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`GitHub API request failed: ${response.status} ${errorText}`)
    }

    const data = await response.json()

    if (data.errors) {
      throw new Error(data.errors[0].message || "GitHub API returned an error")
    }

    if (!data.data?.viewer?.contributionsCollection?.contributionCalendar) {
      throw new Error("Invalid response format from GitHub API")
    }

    // Format the data for our activity grid
    const contributions = data.data.viewer.contributionsCollection.contributionCalendar
    const days = contributions.weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
      })),
    )

    return {
      days,
      totalContributions: contributions.totalContributions,
    }
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error)
    throw error instanceof Error ? error : new Error("Failed to fetch GitHub contributions")
  }
}

