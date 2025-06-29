import dynamic from 'next/dynamic';

const ProgressChart = dynamic(() => import('./progression-chart'), {
  loading: () => <div className="h-64 bg-black-75 rounded-lg animate-pulse flex items-center justify-center"><div className="text-gray-400">Загружаем график...</div></div>,
  ssr: false,
});

export default function ProgressionBentoBox() {
  return (
    <>
      {/* Top Card */}
      <div className="overflow-hidden absolute z-10 top-40 md:top-32 flex flex-col gap-4 w-full rounded-lg transition-all duration-300">
        <ProgressChart isStatic />
      </div>
    </>
  );
}
