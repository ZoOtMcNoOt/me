"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ListMusic, Pause, Play, Radio, Repeat, Shuffle, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"

import { PageLayout } from "@/components/page-layout"
import { AnimatedCard } from "@/components/ui/animated-card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Example: In the future, replace this local data with API-fetched data.
const playlists = [
  {
    name: "70s Rock Classics",
    description: "Iconic tracks from the golden age of rock",
    coverImage: "/placeholder.svg?height=400&width=400",
    tracks: [
      {
        title: "Reelin' in the Years",
        artist: "Steely Dan",
        duration: "4:37",
        coverArt: "/placeholder.svg?height=60&width=60",
      },
      {
        title: "More Than a Feeling",
        artist: "Boston",
        duration: "3:28",
        coverArt: "/placeholder.svg?height=60&width=60",
      },
      {
        title: "Baba O'Riley",
        artist: "The Who",
        duration: "4:59",
        coverArt: "/placeholder.svg?height=60&width=60",
      },
      {
        title: "Hotel California",
        artist: "Eagles",
        duration: "6:30",
        coverArt: "/placeholder.svg?height=60&width=60",
      },
    ],
  },
  {
    name: "Funky Techno Beats",
    description: "Energetic, forward-thinking electronica",
    coverImage: "/placeholder.svg?height=400&width=400",
    tracks: [
      {
        title: "Go",
        artist: "The Chemical Brothers",
        duration: "4:21",
        coverArt: "/placeholder.svg?height=60&width=60",
      },
      {
        title: "Galvanize",
        artist: "The Chemical Brothers",
        duration: "4:28",
        coverArt: "/placeholder.svg?height=60&width=60",
      },
      {
        title: "Hey Boy Hey Girl",
        artist: "The Chemical Brothers",
        duration: "3:45",
        coverArt: "/placeholder.svg?height=60&width=60",
      },
      {
        title: "Rockafeller Skank",
        artist: "Fatboy Slim",
        duration: "4:01",
        coverArt: "/placeholder.svg?height=60&width=60",
      },
    ],
  },
  {
    name: "Chill Vibes",
    description: "Laid-back tracks for a relaxing atmosphere",
    coverImage: "/placeholder.svg?height=400&width=400",
    tracks: [
      {
        title: "A Moment's Peace",
        artist: "Downtempo Collective",
        duration: "5:18",
        coverArt: "/placeholder.svg?height=60&width=60",
      },
      {
        title: "Liquid Fields",
        artist: "Ambient Echoes",
        duration: "6:02",
        coverArt: "/placeholder.svg?height=60&width=60",
      },
      {
        title: "Evening Glow",
        artist: "Sunset Horizon",
        duration: "4:23",
        coverArt: "/placeholder.svg?height=60&width=60",
      },
    ],
  },
]

const recentlyPlayed = [
  {
    title: "Hotel California",
    artist: "Eagles",
    timestamp: "1 hour ago",
    coverArt: "/placeholder.svg?height=60&width=60",
  },
  {
    title: "Galvanize",
    artist: "The Chemical Brothers",
    timestamp: "Yesterday",
    coverArt: "/placeholder.svg?height=60&width=60",
  },
  {
    title: "More Than a Feeling",
    artist: "Boston",
    timestamp: "2 days ago",
    coverArt: "/placeholder.svg?height=60&width=60",
  },
]

export default function MusicPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentProgress, setCurrentProgress] = useState(45)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState<"none" | "all" | "one">("none")
  const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0])
  const [currentTrack, setCurrentTrack] = useState(selectedPlaylist.tracks[0])

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    setIsMuted(value[0] === 0)
  }

  const toggleRepeat = () => {
    const modes: ("none" | "all" | "one")[] = ["none", "all", "one"]
    const currentIndex = modes.indexOf(repeatMode)
    setRepeatMode(modes[(currentIndex + 1) % modes.length])
  }

  // Example future streaming logic:
  // const fetchTracksFromAPI = async () => {
  //   const data = await fetch("/api/tracks").then((res) => res.json())
  //   // set your state with the fetched data
  // }

  return (
    <PageLayout>
      <div className="w-full max-w-[min(1400px,calc(100vw-var(--container-padding)*2))] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr] w-full">
          <div className="space-y-8">
            {/* Main Player */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTrack.title} // Re-animate when the track changes
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedCard className="p-6">
                  <div className="mb-6 space-y-4">
                    <div className="relative aspect-square max-w-sm mx-auto overflow-hidden rounded-lg">
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <motion.img
                        key={currentTrack.title + "-cover"}
                        src={selectedPlaylist.coverImage || "/placeholder.svg"}
                        alt="Album Cover"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                      />
                    </div>
                    <div className="space-y-2 text-center">
                      <h3 className="text-2xl font-bold">{currentTrack.title}</h3>
                      <p className="text-sm text-muted-foreground">{currentTrack.artist}</p>
                    </div>
                    <div className="space-y-2">
                      <Progress value={currentProgress} className="h-1" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>2:01</span>
                        <span>{currentTrack.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={isShuffled ? "text-primary" : ""}
                        onClick={() => setIsShuffled(!isShuffled)}
                      >
                        <Shuffle className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <SkipBack className="h-6 w-6" />
                      </Button>
                      <Button size="icon" className="h-12 w-12" onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </Button>
                      <Button variant="ghost" size="icon">
                        <SkipForward className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={repeatMode !== "none" ? "text-primary" : ""}
                        onClick={toggleRepeat}
                      >
                        <Repeat className="h-5 w-5" />
                        {repeatMode === "one" && <span className="absolute text-[10px]">1</span>}
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)}>
                        {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </Button>
                      <Slider
                        value={[isMuted ? 0 : volume]}
                        max={100}
                        step={1}
                        className="w-28"
                        onValueChange={handleVolumeChange}
                      />
                    </div>
                  </div>
                </AnimatedCard>
              </motion.div>
            </AnimatePresence>

            {/* Playlists */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <AnimatedCard className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ListMusic className="h-5 w-5" />
                    <h2 className="text-xl font-semibold">Your Playlists</h2>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {playlists.map((playlist) => (
                    <motion.button
                      key={playlist.name}
                      className="group relative aspect-square overflow-hidden rounded-lg"
                      whileHover={{ scale: 1.03 }}
                      onClick={() => {
                        setSelectedPlaylist(playlist)
                        setCurrentTrack(playlist.tracks[0])
                      }}
                    >
                      <img
                        src={playlist.coverImage || "/placeholder.svg"}
                        alt={playlist.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="font-semibold">{playlist.name}</h3>
                        <p className="text-sm text-muted-foreground">{playlist.tracks.length} tracks</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </AnimatedCard>
            </motion.div>
          </div>

          <div className="space-y-8">
            {/* Current Playlist / Queue */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Tabs defaultValue="queue" className="h-full">
                <TabsList className="w-full">
                  <TabsTrigger value="queue" className="flex-1">
                    Queue
                  </TabsTrigger>
                  <TabsTrigger value="recent" className="flex-1">
                    Recent
                  </TabsTrigger>
                  <TabsTrigger value="radio" className="flex-1">
                    Radio
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="queue" className="mt-4">
                  <AnimatedCard className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold">{selectedPlaylist.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedPlaylist.description}</p>
                    </div>
                    <div className="space-y-2">
                      {selectedPlaylist.tracks.map((track, index) => (
                        <motion.div
                          key={track.title}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.07 }}
                          className={`flex cursor-pointer items-center gap-4 rounded-lg p-2 transition-colors hover:bg-muted/50 ${
                            currentTrack.title === track.title ? "bg-muted" : ""
                          }`}
                          onClick={() => setCurrentTrack(track)}
                          whileHover={{ scale: 1.01 }}
                        >
                          <img
                            src={track.coverArt || "/placeholder.svg"}
                            alt={track.title}
                            className="h-10 w-10 rounded-md object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="truncate font-medium">{track.title}</div>
                            <div className="text-sm text-muted-foreground">{track.artist}</div>
                          </div>
                          <div className="text-sm text-muted-foreground">{track.duration}</div>
                        </motion.div>
                      ))}
                    </div>
                  </AnimatedCard>
                </TabsContent>

                <TabsContent value="recent" className="mt-4">
                  <AnimatedCard className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold">Recently Played</h3>
                      <p className="text-sm text-muted-foreground">Your listening history</p>
                    </div>
                    <div className="space-y-2">
                      {recentlyPlayed.map((track, index) => (
                        <motion.div
                          key={track.title}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.07 }}
                          className="flex items-center gap-4 rounded-lg p-2 hover:bg-muted/50"
                        >
                          <img
                            src={track.coverArt || "/placeholder.svg"}
                            alt={track.title}
                            className="h-10 w-10 rounded-md object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="truncate font-medium">{track.title}</div>
                            <div className="text-sm text-muted-foreground">{track.artist}</div>
                          </div>
                          <div className="text-sm text-muted-foreground">{track.timestamp}</div>
                        </motion.div>
                      ))}
                    </div>
                  </AnimatedCard>
                </TabsContent>

                <TabsContent value="radio" className="mt-4">
                  <AnimatedCard className="p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <Radio className="h-5 w-5" />
                      <h3 className="text-lg font-semibold">Radio Station</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on your current track, we&apos;ll play similar music you might enjoy.
                    </p>
                    <Button className="mt-4" variant="outline">
                      Start Radio
                    </Button>
                  </AnimatedCard>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Music Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <AnimatedCard className="p-6">
                <h3 className="mb-4 text-lg font-semibold">Listening Stats</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">Hours Listened</div>
                    <div className="mt-1 text-2xl font-bold">24.5</div>
                    <div className="text-xs text-muted-foreground">This week</div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">Top Genre</div>
                    <div className="mt-1 text-2xl font-bold">Rock</div>
                    <div className="text-xs text-muted-foreground">Last 30 days</div>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

