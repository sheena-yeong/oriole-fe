import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { IoMdSettings } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function SettingsDropDown() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="p-2 transition text-neutral-300 hover:text-[#fe5914]">
          <IoMdSettings size={26} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="bottom"
          align="end"
          className="
            z-99
            min-w-[180px]
            rounded-xl
            bg-neutral-900/90
            backdrop-blur-xl
            border border-neutral-800
            shadow-[0_8px_20px_rgba(0,0,0,0.35)]
            p-2
            text-neutral-200
          "
        >

          <DropdownMenu.Item
            className="
              px-3 py-2 
              rounded-lg 
              hover:bg-neutral-800/60 
              transition 
              cursor-pointer
            "
            onClick={() => navigate('/settings')}
          >
            Settings
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-2 h-px bg-neutral-700" />

          <DropdownMenu.Item
            className="
              px-3 py-2 
              rounded-lg 
              hover:bg-neutral-800/60 
              text-[#fe5914]
              font-medium 
              transition 
              cursor-pointer
            "
            onClick={handleSignOut}
          >
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
