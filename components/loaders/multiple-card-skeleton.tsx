import { Skeleton } from "@/components/ui/skeleton";

export function MultipleCardSkeleton() {
  return (
    <div className="max-w-[1440px] h-full m-auto ">
      <div className="flex flex-wrap gap-6 justify-center">
        <div className="flex flex-col h-fit">
          <Skeleton className="h-[175px] w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[300px] mt-2" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
        <div className="flex flex-col h-fit">
          <Skeleton className="h-[175px] w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[300px] mt-2" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
        <div className="flex flex-col h-fit">
          <Skeleton className="h-[175px] w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[300px] mt-2" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
        <div className="flex flex-col h-fit">
          <Skeleton className="h-[175px] w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[300px] mt-2" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
        <div className="flex flex-col h-fit">
          <Skeleton className="h-[175px] w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[300px] mt-2" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
        <div className="flex flex-col h-fit">
          <Skeleton className="h-[175px] w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[300px] mt-2" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
        <div className="flex flex-col h-fit">
          <Skeleton className="h-[175px] w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[300px] mt-2" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
        <div className="flex flex-col h-fit">
          <Skeleton className="h-[175px] w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[300px] mt-2" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
