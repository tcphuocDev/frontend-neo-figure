export default function SkeletonLoader() {
  return (
    <div className="bg-dark-card rounded-lg overflow-hidden border border-[#2a2a2a] animate-pulse">
      {/* Image Skeleton - 70% height like real product card */}
      <div className="aspect-[3/4] bg-gradient-to-r from-dark-card via-dark-hover to-dark-card" />

      {/* Content Skeleton - Compact */}
      <div className="p-3 space-y-2">
        {/* Title */}
        <div className="space-y-1.5">
          <div className="h-3 bg-dark-hover rounded" />
          <div className="h-3 bg-dark-hover rounded w-4/5" />
        </div>

        {/* Rating & Sold */}
        <div className="flex gap-3">
          <div className="h-2.5 bg-dark-hover rounded w-16" />
          <div className="h-2.5 bg-dark-hover rounded w-12" />
        </div>

        {/* Price - Bold emphasis */}
        <div className="flex items-center gap-2 pt-1">
          <div className="h-5 bg-dark-hover rounded w-24" />
          <div className="h-3 bg-dark-hover rounded w-16" />
        </div>
      </div>
    </div>
  );
}
