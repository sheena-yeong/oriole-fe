import { Routes, Route, useLocation } from 'react-router-dom';
import PublicPage from './pages/PublicPage.tsx';
import Cryptocurrencies from './pages/Cryptocurrencies.tsx';
import oriole_logo from './assets/oriole_logo_v7.png';
import UserNavBar from './components/NavBars/UserNavBar.tsx';

function App() {
  const location = useLocation();
  const publicPage = location.pathname !== '/cryptocurrencies';

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Signed In */}
      {!publicPage && (
        <>
          <header className="flex items-center justify-between px-2 py-4 relative z-20">
            <img src={oriole_logo} className="h-16" alt="logo" />
            <UserNavBar />
          </header>
        </>
      )}

      {/* Public Page */}
      {publicPage && <PublicPage />}

      {/* Routes */}
      <main className="relative z-20 h-full w-full">
        <Routes>
          <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
