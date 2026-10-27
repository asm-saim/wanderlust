import { Skeleton } from "@/components/ui/skeleton";

export default function DestinationsSkeleton() {
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 md:mt-5 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-lg border border-border bg-white">
          <Skeleton className="aspect-[16/9] w-full rounded-none" />
          <div className="space-y-2 p-4">
            <Skeleton className="h-3.5 w-2/3" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3.5 w-1/2" />
            <Skeleton className="h-3.5 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}
