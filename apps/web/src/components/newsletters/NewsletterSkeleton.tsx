import { Skeleton } from "@/components/ui/skeleton";

export function NewsletterSkeleton() {
  return (
    <div className="p-4 sm:p-6 bg-[#121214] border border-[#1a1a1d] rounded-lg max-w-4xl mx-auto">
      <Skeleton className="h-7 w-3/4 mb-3 bg-zinc-800" />
      <div className="flex items-center gap-4 mb-3">
        <Skeleton className="h-4 w-32 bg-zinc-800" />
        <Skeleton className="h-4 w-24 bg-zinc-800" />
      </div>
      <Skeleton className="h-4 w-full mb-2 bg-zinc-800" />
      <Skeleton className="h-4 w-5/6 bg-zinc-800" />
    </div>
  );
}
