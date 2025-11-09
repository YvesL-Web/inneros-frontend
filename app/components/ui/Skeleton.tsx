export function Skeleton({
  width = '100%',
  height = 16,
  radius = 8,
}: {
  width?: number | string;
  height?: number;
  radius?: number;
}) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        background:
          'linear-gradient(90deg, rgba(0,0,0,0.07) 25%, rgba(0,0,0,0.12) 37%, rgba(0,0,0,0.07) 63%)',
        backgroundSize: '400% 100%',
        animation: 'skeleton 1.4s ease infinite',
      }}
    />
  );
}

export function SkeletonRows({ rows = 3 }: { rows?: number }) {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} height={14} />
      ))}
    </div>
  );
}

// global keyframes (once)
if (typeof document !== 'undefined' && !document.getElementById('skeleton-style')) {
  const style = document.createElement('style');
  style.id = 'skeleton-style';
  style.innerHTML = `@keyframes skeleton {0%{background-position:100% 50%}100%{background-position:0 50%}}`;
  document.head.appendChild(style);
}
