import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Link, useLocation } from 'react-router-dom';

const UserNavBar: React.FC = () => {
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

        {/* Markets */}
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Link
              to="/markets"
              className={`text-lg font-semibold transition-colors duration-200 cursor-pointer ${
                pathname === '/markets'
                  ? 'text-orange-400'
                  : 'text-white hover:text-white/80'
              }`}
            >
              Markets
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        {/* Portfolio */}
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Link
              to="/treasuries"
              className={`text-lg font-semibold transition-colors duration-200 cursor-pointer ${
                pathname === '/portfolio'
                  ? 'text-orange-400'
                  : 'text-white hover:text-white/80'
              }`}
            >
              Portfolio
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default UserNavBar;