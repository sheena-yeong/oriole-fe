import SignIn from '../components/User/SignIn';
import SignUp from '../components/User/SignUp';
import prism_bg from '../assets/prism_bg.jpg';
import oriole_logo from '../assets/oriole_logo_v7.png';

function PublicPage() {
  return (
    <>
          <header className="flex items-center justify-between px-2 py-4 relative z-20">
            <img src={oriole_logo} className="h-16" alt="logo" />
            <div className="flex gap-2 pr-5">
              <SignIn />
              <SignUp />
            </div>
          </header>

          <img
            src={prism_bg}
            className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none z-0"
            alt="background prism"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(254,89,20,0.35),transparent_60%)] pointer-events-none z-10" />

          <main className="relative z-20 flex flex-col justify-end items-start h-screen px-10 pb-50">
            <h3 className="text-5xl font-poppins text-white">
              Invest. Trade. Grow.
            </h3>
          </main>
        </>
  )
}

export default PublicPage