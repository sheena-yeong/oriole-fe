import WalletDialog from './WalletDialog';
import { useState } from 'react';

function Wallet() {
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);

  return (
    <>
      <div className="p-5 overflow-x-hidden sm:overflow-x-auto w-full"></div>

      <div className="bg-neutral-800 dark:bg-neutral-900 rounded-xl shadow-lg p-6 flex flex-col gap-4 w-70 m-6">
        <h3 className="font-poppins not-[]:font-thin text-xl text-white">
          Your balance (USD)
        </h3>
        <h3 className="font-poppins font-semibold text-3xl text-white">
          $1,000,000
        </h3>
        <button
          className="shadow-lg bg-[#fe5914] hover:bg-[#ff6b2a] text-white font-semibold px-4 py-2 rounded-3xl"
          onClick={() => setIsWalletDialogOpen(true)}
        >
          +
        </button>
      </div>

      <WalletDialog
        onClose={() => {
          setIsWalletDialogOpen(false);
        }}
        open={isWalletDialogOpen}
      />
    </>
  );
}

export default Wallet;
