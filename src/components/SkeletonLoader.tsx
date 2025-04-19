import React from 'react';

interface SkeletonProps {
  type: 'card' | 'text' | 'circle' | 'rectangle';
  count?: number;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ type, count = 1, className = '' }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className={`animate-pulse bg-gray-200 rounded-xl overflow-hidden shadow ${className}`}>
            <div className="h-48 bg-gray-300"></div>
            <div className="p-4">
              <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded mb-4 w-5/6"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-300 rounded-full w-16"></div>
                <div className="h-6 bg-gray-300 rounded-full w-16"></div>
              </div>
            </div>
          </div>
        );
      case 'text':
        return <div className={`h-4 bg-gray-200 rounded animate-pulse ${className}`}></div>;
      case 'circle':
        return <div className={`rounded-full bg-gray-200 animate-pulse ${className}`}></div>;
      case 'rectangle':
        return <div className={`bg-gray-200 rounded animate-pulse ${className}`}></div>;
      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <React.Fragment key={index}>
          {renderSkeleton()}
        </React.Fragment>
      ))}
    </>
  );
};

export const RecipeCardSkeleton: React.FC<{ count?: number }> = ({ count = 1 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} type="card" />
      ))}
    </div>
  );
};

export const RecipeDetailSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse max-w-4xl mx-auto">
      <Skeleton type="rectangle" className="h-8 w-3/4 mb-4" />
      <div className="flex flex-col md:flex-row gap-8 mt-6">
        <Skeleton type="rectangle" className="h-80 w-full md:w-1/2 rounded-lg" />
        <div className="w-full md:w-1/2">
          <Skeleton type="text" className="h-6 w-full mb-3" />
          <Skeleton type="text" className="h-6 w-5/6 mb-3" />
          <Skeleton type="text" className="h-6 w-4/6 mb-6" />
          
          <div className="flex gap-2 mb-6">
            <Skeleton type="circle" className="h-8 w-8" />
            <Skeleton type="text" className="h-8 w-24" />
            <Skeleton type="circle" className="h-8 w-8 ml-4" />
            <Skeleton type="text" className="h-8 w-24" />
          </div>
          
          <Skeleton type="text" className="h-5 w-full mb-2" />
          <Skeleton type="text" className="h-5 w-full mb-2" />
          <Skeleton type="text" className="h-5 w-3/4 mb-2" />
        </div>
      </div>
      
      <div className="mt-8">
        <Skeleton type="rectangle" className="h-8 w-40 mb-4" />
        <Skeleton type="text" className="h-5 w-full mb-2" />
        <Skeleton type="text" className="h-5 w-full mb-2" />
        <Skeleton type="text" className="h-5 w-5/6 mb-2" />
        <Skeleton type="text" className="h-5 w-4/6 mb-6" />
      </div>
    </div>
  );
};

export default Skeleton;