import { Skeleton } from "@/components/ui/skeleton";

const AllItemAndCategorySkeleton = () => {
  return (
    <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-8 animate-pulse">
      
      {[...Array(3)].map((_, catIndex) => (
        <div key={catIndex} className="space-y-4">
          {/* Categoria */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-40 bg-gray-200" />
            <Skeleton className="h-4 w-10 bg-gray-200" />
          </div>

          
          <div className="space-y-4 pl-4">
            {[...Array(2)].map((_, itemIndex) => (
              <div key={itemIndex} className="flex flex-col gap-2">
                <Skeleton className="h-4 w-32 bg-gray-200" />
                <Skeleton className="h-4 w-64 bg-gray-200" />
                <Skeleton className="h-4 w-20 bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-end pt-4">
        <Skeleton className="h-10 w-[120px] rounded-md bg-gray-200" />
      </div>
    </div>
  );
};

export default AllItemAndCategorySkeleton;