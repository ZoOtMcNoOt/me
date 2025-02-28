"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Tag, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import dynamic from 'next/dynamic'

// Dynamically import ReactMarkdown and syntax highlighter
const ReactMarkdown = dynamic(() => import('react-markdown'), {
  loading: () => <NoteContentSkeleton />,
  ssr: false
})

// Dynamically import syntax highlighter
const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then(mod => {
    return ({ children, language }) => {
      const { Prism } = mod;
      const { vscDarkPlus } = require('react-syntax-highlighter/dist/cjs/styles/prism');
      return (
        <Prism language={language} style={vscDarkPlus}>
          {children}
        </Prism>
      );
    };
  }),
  { ssr: false }
)

// Rehype plugins for security and HTML processing
const rehypePlugins = dynamic(() => 
  Promise.all([
    import('rehype-raw').then(mod => mod.default),
    import('rehype-sanitize').then(mod => mod.default)
  ]),
  { ssr: false }
)

function NoteContentSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-4 bg-muted rounded w-full"></div>
      <div className="h-4 bg-muted rounded w-5/6"></div>
      <div className="h-4 bg-muted rounded w-4/6"></div>
      <div className="h-20 bg-muted rounded w-full"></div>
      <div className="h-4 bg-muted rounded w-full"></div>
      <div className="h-4 bg-muted rounded w-3/4"></div>
    </div>
  )
}

export default function NotePage() {
  const { slug } = useParams()
  const [note, setNote] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [plugins, setPlugins] = useState([])
  
  // Load rehype plugins
  useEffect(() => {
    async function loadPlugins() {
      const [rehypeRaw, rehypeSanitize] = await Promise.all([
        import('rehype-raw').then(mod => mod.default),
        import('rehype-sanitize').then(mod => mod.default)
      ]);
      setPlugins([rehypeRaw, rehypeSanitize]);
    }
    loadPlugins();
  }, []);
  
  // Load note data
  useEffect(() => {
    async function loadNote() {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/notes/${slug}`)
        
        if (!response.ok) {
          throw new Error('Failed to load note')
        }
        
        const data = await response.json()
        console.log('Note loaded:', data)
        setNote(data)
      } catch (err) {
        console.error('Error loading note:', err)
        setError(err.message || 'Failed to load the note')
      } finally {
        setIsLoading(false)
      }
    }
    
    if (slug) {
      loadNote()
    }
  }, [slug])

  // Format date helper
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric"
      })
    } catch (e) {
      return dateString
    }
  }

  if (isLoading) {
    return (
      <PageLayout>
        <div className="w-full max-w-[min(900px,calc(100vw-var(--container-padding)*2))] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Link href="/notes">
              <Button variant="ghost" className="pl-0 flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to all notes
              </Button>
            </Link>
          </div>
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="flex gap-2 items-center">
              <div className="h-4 bg-muted rounded w-40"></div>
              <div className="h-4 bg-muted rounded w-20"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-6 bg-primary/20 rounded-full w-24 px-3"></div>
              <div className="h-6 bg-primary/20 rounded-full w-32 px-3"></div>
            </div>
            <NoteContentSkeleton />
          </div>
        </div>
      </PageLayout>
    )
  }

  if (error || !note) {
    return (
      <PageLayout>
        <div className="w-full max-w-[min(900px,calc(100vw-var(--container-padding)*2))] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Link href="/notes">
              <Button variant="ghost" className="pl-0 flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to all notes
              </Button>
            </Link>
          </div>
          <div className="text-center py-12">
            <p className="text-lg text-red-500">{error || 'Note not found'}</p>
          </div>
        </div>
      </PageLayout>
    )
  }

  // Stop rendering early if plugins aren't loaded yet
  if (plugins.length === 0) {
    return (
      <PageLayout>
        <div className="w-full max-w-[min(900px,calc(100vw-var(--container-padding)*2))] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Link href="/notes">
              <Button variant="ghost" className="pl-0 flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to all notes
              </Button>
            </Link>
          </div>
          <NoteContentSkeleton />
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="w-full max-w-[min(900px,calc(100vw-var(--container-padding)*2))] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/notes">
            <Button variant="ghost" className="pl-0 flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to all notes
            </Button>
          </Link>
        </div>
        
        <article className="prose dark:prose-invert prose-headings:font-bold prose-a:text-primary max-w-none">
          <header className="mb-8 not-prose">
            <h1 className="text-3xl font-bold mb-4">{note.metadata.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={note.metadata.date}>
                  {formatDate(note.metadata.date)}
                </time>
              </div>
              <div>•</div>
              <div>{note.metadata.readTime}</div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {note.metadata.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="flex items-center gap-1 bg-primary/10 text-primary"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          </header>
          
          <div className="mt-8">
            <ReactMarkdown
              rehypePlugins={plugins}
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter language={match[1]}>
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },
                pre({node, children, ...props}) {
                  return <pre className="rounded-md overflow-hidden" {...props}>{children}</pre>
                },
                // Enhance other elements as needed
                table({node, children, ...props}) {
                  return <div className="overflow-x-auto"><table {...props}>{children}</table></div>
                },
                img({node, ...props}) {
                  return <img className="rounded-md" {...props} />
                }
              }}
            >
              {note.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </PageLayout>
  )
}