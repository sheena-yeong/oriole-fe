import * as NavigationMenu from '@radix-ui/react-navigation-menu';

const PublicNavBar: React.FC = () => {
  return (

      <NavigationMenu.Root className="relative z-10">
        <NavigationMenu.List className="flex items-center justify-center gap-8 px-16 py-4  bg-white/10 backdrop-blur-md rounded-sm shadow-2xl">
          <NavigationMenu.Item>
            <NavigationMenu.Link
              className="text-white text-lg font-semibold hover:text-white/80 transition-colors duration-200 cursor-pointer"
              href="#markets"
            >
              Markets
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Link
              className="text-white text-lg font-semibold hover:text-white/80 transition-colors duration-200 cursor-pointer"
              href="#treasuries"
            >
              Treasuries
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Link
              className="text-white text-lg font-semibold hover:text-white/80 transition-colors duration-200 cursor-pointer"
              href="#about"
            >
              About
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
  );
};

export default PublicNavBar;
