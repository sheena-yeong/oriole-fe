import { useState } from 'react';
import Dialog from './LoginDialog';

function Login() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <>
      <button
        className="
        px-4 py-1.5 
        border border-yellow-500/40 
        rounded-lg 
        text-sm text-yellow-100
        hover:bg-yellow-500/10
        transition
      "
        onClick={() => setOpenDialog(true)}
      >
        Log In
      </button>
      <button
        className="
        px-4 py-1.5 
        border border-yellow-500/40 
        rounded-lg 
        text-sm text-yellow-100
        hover:bg-yellow-500/10
        transition
      "
      >
        Create an Account
      </button>
      <Dialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
}

export default Login;
