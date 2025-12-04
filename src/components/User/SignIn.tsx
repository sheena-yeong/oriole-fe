import { useState } from 'react';
import SignInDialog from './SignInDialog';

function SignIn() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <>
      <button
        className="
        px-4 py-2 
        border border-yellow-500/40 
        rounded-sm 
        text-sm text-yellow-100
        hover:bg-yellow-500/10
        transition
        bg-black
        font-semibold
      "
        onClick={() => setOpenDialog(true)}
      >
        Sign In
      </button>
      <SignInDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
}

export default SignIn;
