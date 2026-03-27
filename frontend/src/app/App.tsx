import { MockUserProvider } from '@/contexts/MockUserContext';
import { Header } from './components/Header';
import { CentralFeed } from './components/CentralFeed';

export default function App() {
  return (
    <MockUserProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <CentralFeed />
      </div>
    </MockUserProvider>
  );
}
