"use client"

import { PageLayout } from "@/components/page-layout"
import { motion } from "framer-motion"
import { ListMusic, Pause, Play, Radio, Repeat, Shuffle, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { useState } from "react"

import { AnimatedCard } from "@/components/animated-card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const playlists = [
  {
    name: "Coding Focus",
    description: "Instrumental tracks for deep work sessions",
    coverImage: "/placeholder.svg?height=400&width=400",
    tracks: [
      {
        title: "Neural Networks",
        artist: "Code Symphony",
        duration: "4:23",
        coverArt: "/placeholder.svg?height=60&width=60",
      },
      {
        title: "Algorithm Flow",
        artist: "Binary Beats",
        duration: "3:45",
        coverArt: "/placeholder.svg?height=60&width=60",
      },
      {
        title: "Deep Learning",
        artist: "Data Rhythms",
        duration: "5:12",
        coverArt: "/placeholder.svg?height=60&width=60",
      },
      {
        title: "Quantum Computing",
        artist: "Digital Dreams",
        duration: "4:56",
        coverArt: "/placeholder.svg?height=60&width=60",
      },
    ],
  },
  {
    name: "Study Ambient",
    description: "Calm ambient music for studying",
    coverImage: "/placeholder.svg?height=400&width=400",
    tracks: [
      {
        title: "Neuroscience",
        artist: "Brain Waves",
        duration: "6:18",
        coverArt: "/placeholder.svg?height=60&width=60",
      },
      {
        title: "Medical Research",
        artist: "Lab Notes",
        duration: "4:56",
        coverArt: "/placeholder.svg?height=60&width=60",
      },
      {
        title: "Biomedical Engineering",
        artist: "Health Tech",
        duration: "5:34",
        coverArt: "/placeholder.svg?height=60&width=60",
      },
    ],
  },
  {
    name: "Workout Mix",
    description: "High-energy tracks for exercise",
    coverImage: "/placeholder.svg?height=400&width=400",
    tracks: [
      {
        title: "Power Up",
        artist: "Energy Boost",
        duration: "3:45",
        coverArt: "/placeholder.svg?height=60&width=60",
      },
      {
        title: "Maximum Effort",
        artist: "Peak Performance",
        duration: "4:12",
        coverArt: "/placeholder.svg?height=60&width=60",
      },
      {
        title: "Endurance",
        artist: "Stamina Squad",
        duration: "5:00",
        coverArt: "/placeholder.svg?height=60&width=60",
      },
    ],
  },
]

const recentlyPlayed = [
  {
    title: "Algorithm Flow",
    artist: "Binary Beats",
    timestamp: "2 hours ago",
    coverArt: "/placeholder.svg?height=60&width=60",
  },
  {
    title: "Neuroscience",
    artist: "Brain Waves",
    timestamp: "Yesterday",
    coverArt: "/placeholder.svg?height=60&width=60",
  },
  {
    title: "Power Up",
    artist: "Energy Boost",
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

  return (
    <PageLayout>
      <div className="w-full max-w-[min(1400px,calc(100vw-var(--container-padding)*2))] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr] w-full">
          <div className="space-y-8">
            {/* Main Player */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <AnimatedCard className="p-6">
                <div className="mb-6 space-y-4">
                  <div className="relative aspect-square max-w-sm mx-auto overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <img
                      src={selectedPlaylist.coverImage || "/placeholder.svg"}
                      alt="Album Cover"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
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
                      onClick={() => setSelectedPlaylist(playlist)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <img
                        src={playlist.coverImage || "/placeholder.svg"}
                        alt={playlist.name}
                        className="h-full w-full object-cover"
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
            {/* Current Playlist */}
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
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className={`flex items-center gap-4 rounded-lg p-2 hover:bg-muted/50 ${
                            currentTrack.title === track.title ? "bg-muted" : ""
                          }`}
                          onClick={() => setCurrentTrack(track)}
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
                          transition={{ duration: 0.3, delay: index * 0.1 }}
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
                    <div className="mt-1 text-2xl font-bold">Ambient</div>
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

