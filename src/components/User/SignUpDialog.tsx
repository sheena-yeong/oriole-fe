import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface DialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

function SignUpDialog({ openDialog, setOpenDialog }: DialogProps) {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    const result = await signUp({ firstName, lastName, email, password });
    if (result.success) {
      navigate('/');
      setOpenDialog(false);
    } else {
      setError(result.error || 'Sign up failed');
    }
  };

  const handleOpenChange = (open: boolean) => {
    setOpenDialog(open);
    if (!open) {
      setError('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <DialogPrimitive.Root open={openDialog} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60" />

        <DialogPrimitive.Content
          className="
            fixed left-1/2 top-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2
            rounded-xl bg-white p-6 shadow-lg
          "
        >
          <DialogPrimitive.Close asChild>
            <button
              className="
                absolute top-3 right-3 text-neutral-500 hover:text-black
                rounded-full p-1
              "
              aria-label="Close"
            >
              ✕
            </button>
          </DialogPrimitive.Close>

          <DialogPrimitive.Title className="text-2xl font-bold text-black mb-2">
            Create an Account
          </DialogPrimitive.Title>

          <p className="text-sm text-neutral-600 mb-5">
            Sign up to get started.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(firstName, lastName, email, password);
            }}
            className="space-y-3"
          >
            <div className="flex flex-col gap-1 text-black">
              <label className="text-sm font-medium">First Name</label>
              <input
                type="text"
                placeholder="John"
                required
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 text-black">
              <label className="text-sm font-medium">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                required
                onChange={(e) => setLastName(e.target.value)}
                className="rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 text-black">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 text-black">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter a password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none"
              />
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="submit"
                className="rounded-md bg-[#fe5914] px-4 py-2 text-sm font-medium text-white 
                           hover:bg-[#ff7a3c] transition-colors duration-200 ease-in-out"
              >
                Sign Up
              </button>
            </div>
          </form>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default SignUpDialog;
