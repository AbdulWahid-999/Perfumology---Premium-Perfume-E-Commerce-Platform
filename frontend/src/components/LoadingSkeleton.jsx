const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
      <div className="relative bg-gray-200 h-72"></div>
      <div className="p-5">
        <div className="mb-3">
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="flex justify-between items-center mb-4">
          <div className="h-8 bg-gray-200 rounded w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 h-10 bg-gray-200 rounded-xl"></div>
          <div className="flex-1 h-10 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export { ProductCardSkeleton, ProductGridSkeleton };
