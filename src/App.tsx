import oriole_logo from './assets/oriole_logo_v7.png';
import Login from './components/User/Login';
import HomeNavBar from './components/HomePage/HomeNavBar.tsx';

function App() {
  return (
    <>
      <div className="min-h-screen bg-black relative pt-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(254,89,20,0.35),transparent_60%)]" />

        {/* Header */}
        <div className="flex items-center justify-between px-5">
          <img src={oriole_logo} className="h-16 pl-3" />

          <HomeNavBar />

          <Login />
        </div>
      </div>
    </>
  );
}

export default App;
