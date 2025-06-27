interface LogoSmallProps {
  size?: number;
  className?: string;
}

export default function LogoSmall({ size = 24, className }: LogoSmallProps) {
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <span 
        className="font-bold text-white"
        style={{ fontSize: size * 0.4 }}
      >
        B<span className="text-green-500">L</span>
      </span>
    </div>
  );
}
