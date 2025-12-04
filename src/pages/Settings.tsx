import { useState } from 'react';
import Dialog from '../components/User/SignUpDialog';


function Settings() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <>
      <button
        className="
        px-4 py-2 
        border border-yellow-500/40 
        rounded-sm 
        text-sm
        hover:bg-yellow-500/10
        transition
        bg-[#5c5c5c]
        font-semibold
        text-white
      "
        onClick={() => setOpenDialog(true)}
      >
        Sign Up
      </button>
      <Dialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
}

export default Settings;
