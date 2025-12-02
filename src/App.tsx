import oriole_logo from './assets/oriole-logo-transparent.png';
import Login from './components/User/Login';

function App() {
  return (
    <>
      <header className="w-full flex justify-center py-6">
        <div
          className="
    flex items-center gap-2 px-8 py-3 
    rounded-xl border border-[#ffaa85] 
    bg-black/20
    text-yellow-200
  "
        >
          <div className="flex items-center w-150">
            <img src={oriole_logo} className="h-6" />
            <span className="font-semibold tracking-wide text-xl">Oriole</span>
          </div>

          {/* <nav className="flex items-center gap-6 text-sm text-yellow-100/80">
            {/* <a href="#" className="hover:text-yellow-300">
              Contact
            </a> */}
          {/* </nav> */}

          <Login />
        </div>
      </header>
    </>
  );
}

export default App;
