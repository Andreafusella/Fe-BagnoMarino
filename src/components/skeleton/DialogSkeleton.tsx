import { Skeleton } from "@/components/ui/skeleton";

const DialogSkeleton = () => {
  return (
    <div className="space-y-4 p-6 animate-pulse">
      <Skeleton className="h-6 w-40 bg-gray-200" />

      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-10 w-full bg-gray-200" />
        </div>

        <div className="flex items-center space-x-4">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-24 bg-gray-200" />
            <Skeleton className="h-10 w-full bg-gray-200" />
          </div>
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-20 bg-gray-200" />
            <Skeleton className="h-10 w-full bg-gray-200" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-24 bg-gray-200" />
          <Skeleton className="h-10 w-full bg-gray-200" />
          <div className="flex flex-wrap gap-2 mt-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-16 rounded-full bg-gray-200" />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-6 w-12 rounded-full bg-gray-200" />
              <Skeleton className="h-4 w-32 bg-gray-200" />
            </div>
          ))}
        </div>

        <div className="flex justify-center my-4">
          <Skeleton className="h-10 w-[70%] bg-gray-200 rounded-2xl" />
        </div>

        <div className="flex justify-end space-x-4">
          <Skeleton className="h-10 w-[100px] rounded-md bg-gray-200" />
          <Skeleton className="h-10 w-[100px] rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default DialogSkeleton;