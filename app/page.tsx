import ActivityFeed from './components/ActivityFeed';
import AddActivity from './components/AddActivity';
import HeaderProgress from './components/HeaderProgress';
import Quests from './components/Quests';
import WeeklySummary from './components/WeeklySummary';

export default function Home() {
  return (
    <main style={{ padding: 24, display: 'grid', gap: 16 }}>
      <p style={{ fontSize: 14 }}>
        <a href="/notifications">Voir les notifications</a>
      </p>
      <HeaderProgress />
      <WeeklySummary />
      <Quests />
      <AddActivity />
      <ActivityFeed />
    </main>
  );
}
