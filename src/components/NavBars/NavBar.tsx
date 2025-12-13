import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Link, useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <NavigationMenu.Root className="relative z-10">
      <NavigationMenu.List className="flex items-center justify-center gap-8 px-16 py-4 bg-white/10 backdrop-blur-md rounded-sm shadow-2xl">

        {/* Cryptocurrencies */}
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Link
              to="/cryptocurrencies"
              className={`text-lg font-semibold transition-colors duration-200 cursor-pointer ${
                pathname === '/cryptocurrencies'
                  ? 'text-orange-400'
                  : 'text-white hover:text-white/80'
              }`}
            >
              Cryptocurrencies
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        {/* watchlist */}
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Link
              to="/watchlist"
              className={`text-lg font-semibold transition-colors duration-200 cursor-pointer ${
                pathname === '/watchlist'
                  ? 'text-orange-400'
                  : 'text-white hover:text-white/80'
              }`}
            >
              Watch List
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        {/* watchlist */}
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Link
              to="/nest"
              className={`text-lg font-semibold transition-colors duration-200 cursor-pointer ${
                pathname === '/nest'
                  ? 'text-orange-400'
                  : 'text-white hover:text-white/80'
              }`}
            >
              Nest
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default NavBar;