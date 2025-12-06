import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import ProtectedRoute from '../Routes/ProtectedRoute.tsx';
import PublicPage from './pages/PublicPage.tsx';
import WatchList from './pages/WatchList.tsx';
import Settings from './pages/Settings.tsx';
import Cryptocurrencies from './pages/Cryptocurrencies.tsx';
import oriole_logo from './assets/oriole_logo_v7.png';
import NavBar from './components/NavBars/NavBar.tsx';
import SettingsDropDown from './components/NavBars/SettingsDropDown.tsx';
import { useState, useEffect } from 'react';
import { getCoins } from './services/crypto';
import type { Coin } from '../types/coins';
import { useAuth } from '../hooks/useAuth.ts';
import { getWatchListCoins } from './services/crypto';

function App() {
  const location = useLocation();
  const publicPage = location.pathname == '/';
  const { isAuthenticated, tokens } = useAuth();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [watchListCoins, setWatchListCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const fetchCoins = async () => {
      if (!tokens.access) return;

      try {
        const result = await getCoins(tokens.access);
        setCoins(result.data);
        console.log('Fetched coins', result.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchWatchListCoins = async () => {
      if (!tokens.access) return;
      try {
        const result = await getWatchListCoins(tokens.access);
        setWatchListCoins(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCoins();
    fetchWatchListCoins();
  }, [isAuthenticated, tokens.access]);

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
              <NavBar />
            </div>

            <div className="absolute right-2">
              <SettingsDropDown />
            </div>
          </header>
        </>
      )}

      {/* Public Page */}
      {publicPage && <PublicPage />}

      {/* Routes */}
      <main className="relative z-20 h-full w-full">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route
              path="/cryptocurrencies"
              element={<Cryptocurrencies coins={coins} />}
            />
            <Route path="/watchlist" element={<WatchList coins={coins} watchListCoins={watchListCoins}/>} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
