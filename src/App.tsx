import { ContactProvider, useContacts } from './context/ContactContext';
import { Header } from './components/Layout/Header';
import { HomePage } from './components/Pages/HomePage';
import { NumerologyPage } from './components/Pages/NumerologyPage';
import { SynastryPage } from './components/Pages/SynastryPage';

function AppContent() {
  const { currentPage } = useContacts();
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <Header />
      {currentPage === 'rehber' && <HomePage />}
      {currentPage === 'numeroloji' && <NumerologyPage />}
      {currentPage === 'sinastri' && <SynastryPage />}
    </div>
  );
}

export default function App() {
  return (
    <ContactProvider>
      <AppContent />
    </ContactProvider>
  );
}
