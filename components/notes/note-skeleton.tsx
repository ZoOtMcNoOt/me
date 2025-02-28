import { Skeleton } from "@/components/ui/skeleton"

export function NoteSkeleton() {
  return (
    <div className="space-y-2 p-6 rounded-lg border border-border/50 bg-card/30 h-full">
      <Skeleton className="h-7 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex flex-wrap items-center gap-4 mt-6">
        <Skeleton className="h-4 w-24" /> 
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function NoteSkeletonGrid() {
  return (
    <div className="grid gap-[var(--component-gap-md)] grid-cols-1">
      {[1, 2, 3, 4].map((i) => (
        <NoteSkeleton key={i} />
      ))}
    </div>
  )
}