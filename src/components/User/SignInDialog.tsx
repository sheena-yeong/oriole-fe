import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

interface DialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

function SignInDialog({ openDialog, setOpenDialog }: DialogProps) {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (email: string, password: string): Promise<void> => {
    console.log(email, password)
    const result = await signIn(email, password);
    console.log(result)
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error!);
    }
  };

  return (
    <DialogPrimitive.Root open={openDialog} onOpenChange={setOpenDialog}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60" />

        <DialogPrimitive.Content
          className="
            fixed left-1/2 top-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2
            rounded-xl bg-white p-6 shadow-lg dark:bg-neutral-900
          "
        >
          <DialogPrimitive.Close asChild>
            <button
              className="
        absolute top-3 right-3 text-neutral-500 hover:text-black dark:hover:text-white
        rounded-full p-1
      "
              aria-label="Close"
            >
              ✕
            </button>
          </DialogPrimitive.Close>

          <DialogPrimitive.Title className="text-2xl font-bold text-black mb-2">
            Welcome Back.
          </DialogPrimitive.Title>

          <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-5">
            Log in to continue to your account and access all features.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(email, password);
              setOpenDialog(false);
            }}
            className="space-y-3"
          >
            <div className="flex flex-col gap-1 text-black">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>

            <div className="flex flex-col gap-1 text-black">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <DialogPrimitive.Close asChild></DialogPrimitive.Close>

              <button
                type="submit"
                className="rounded-md bg-[#fe5914] px-4 py-2 text-sm font-medium text-white 
           hover:bg-[#ff7a3c] transition-colors duration-200 ease-in-out"
              >
                Log In
              </button>
            </div>
          </form>
          {error && <p>{error}</p>}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default SignInDialog;
