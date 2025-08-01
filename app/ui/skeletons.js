export default function TableSkeleton() {
  return (
    <div className="py-2 rounded-xl flex justify-start items-center gap-1">
      <button
        type="button"
        className="btn-xs rounded-full border-transparent text-xs font-bold  flex justify-between items-center gap-2 btn-disabled"
      >
        <span className="loading loading-dots md:loading-md text-cyan-700"></span>
      </button>
    </div>
  );
}