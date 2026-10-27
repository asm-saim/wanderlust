import { Skeleton } from "@/components/ui/skeleton";

export default function DestinationDetailSkeleton() {
  return (
    <>
      <Skeleton className="mt-6 aspect-[5/2] w-full rounded-xl" />
      <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-72" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="space-y-3 rounded-xl border border-border bg-white p-5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
    </>
  );
}
