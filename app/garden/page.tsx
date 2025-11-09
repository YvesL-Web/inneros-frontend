import GardenPreviewChart from '@/app/components/GardenPreviewChart';
import GardenList from '@/app/components/GardenList';

export default function GardenPage() {
  return (
    <main style={{ padding: 24, display: 'grid', gap: 16 }}>
      <h2>Mon Jardin</h2>
      <GardenPreviewChart />
      <GardenList />
    </main>
  );
}
