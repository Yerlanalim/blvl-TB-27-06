import React from 'react';

export const metadata = {
  title: 'Раздел в разработке | BizLevel',
};

export default function LandingPlaceholder() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Раздел в разработке</h2>
        <p className="text-gray-400">Скоро появятся бизнес-истории и кейсы</p>
      </div>
    </div>
  );
}
