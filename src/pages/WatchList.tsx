import empty_nest from '../assets/empty_nest.png';
import AddCoinDialog from '../components/WatchList/AddCoinDialog.tsx';
import { useState } from 'react';

import type { Coin, watchListCoin } from '../../types/coins.ts';

interface WatchListProps {
  coins: Coin[];
  watchListCoins: watchListCoin[];
}

function WatchList({ coins, watchListCoins }: WatchListProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  console.log('Fetched watchlist coins', watchListCoins);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <img src={empty_nest} className="h-25 mt-50" />
        <p>No coins to show.</p>
        <p className="font-poppins text-md font-semibold text-center">
          Keep track of coins you’re interested in.
        </p>
        <button
          className="bg-[#fe5914] hover:bg-[#ff6b2a] text-white font-semibold px-4 py-2 rounded-md transition-colors w-30"
          onClick={() => setOpenDialog(true)}
        >
          Add Coin
        </button>
      </div>

      <AddCoinDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        coins={coins}
      />
    </>
  );
}

export default WatchList;
