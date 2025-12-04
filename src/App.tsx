import { Routes, Route, useLocation } from 'react-router-dom';
import PublicPage from './pages/PublicPage.tsx';
import Cryptocurrencies from './pages/Cryptocurrencies.tsx';
import oriole_logo from './assets/oriole_logo_v7.png';
import UserNavBar from './components/NavBars/UserNavBar.tsx';
import Settings from './pages/Settings.tsx';

function App() {
  const location = useLocation();
  const publicPage = location.pathname !== '/cryptocurrencies';

  return (
    <div className="relative w-full h-full bg-black">
      {/* Signed In */}
      {!publicPage && (
        <>
          <header className="relative flex items-center px-2 py-4 z-20">
            <div className="absolute left-2">
              <img src={oriole_logo} className="h-16" alt="logo" />
            </div>

            <div className="mx-auto">
              <UserNavBar />
            </div>

            <div className="absolute right-2">
              <Settings />
            </div>
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
