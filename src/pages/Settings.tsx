import { useState } from 'react';
import { changePassword } from '../services/auth';
import { useAuth } from '../hooks/useAuth';
import * as Dialog from '@radix-ui/react-dialog';
import * as Toast from '@radix-ui/react-toast';

function Settings() {
  const { tokens } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6 || confirmPassword.length < 6) {
      setToastMessage("Password must be at least 6 characters.");
      setOpenAlert(true);
      return;
    }

    try {
      const res = await changePassword(
        oldPassword,
        newPassword,
        confirmPassword,
        tokens.access
      );

      if (!res.success) {
        throw new Error(res.message);
      }
      setToastMessage(res.message);
      setOpenDialog(false);
      setOpenAlert(true);

      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.log(err);
      setToastMessage(err.message);
      setOpenAlert(true);
      console.log('Failed to change password', err);
    }
  };

  return (
    <Toast.Provider>
      <h3 className="p-3 text-3xl font-semibold mt-4 ml-2">Settings</h3>
      <h3 className="p-3 text-2xl font-semibold mt-4 ml-2">Change Password</h3>
      <p className="p-3 text-white ml-2">Change your account password</p>

      <div className="p-3 ml-2">
        <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
          <Dialog.Trigger asChild>
            <button className="px-8 py-2 rounded-md text-sm font-semibold text-white bg-[#fe5914] hover:bg-[#ff6b2a]">
              Change
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/20" />

            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
              <Dialog.Title className="text-lg font-semibold mb-2 text-black">
                Change Password
              </Dialog.Title>

              <Dialog.Description className="text-gray-600 mb-4">
                Enter your current and new password.
              </Dialog.Description>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="oldPassword"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Old Password
                  </label>
                  <input
                    type="password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-bold text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Dialog.Close asChild>
                    <button className="px-4 py-2 rounded-md text-sm font-semibold bg-black hover:bg-neutral-600">
                      Cancel
                    </button>
                  </Dialog.Close>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md text-sm text-white font-semibold bg-[#fe5914] hover:bg-[#ff6b2a]"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Toast */}
      {openAlert && (
        <Toast.Root
          duration={7000}
          className="bg-neutral-600 p-4 rounded-md shadow-lg"
          onOpenChange={(open) => {
            if (!open) setOpenAlert(false);
          }}
        >
          <Toast.Description className="text-white font-semibold">
            {toastMessage}
          </Toast.Description>
          <Toast.Close asChild>
            <button
              aria-label="Close"
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              ✕
            </button>
          </Toast.Close>
        </Toast.Root>
      )}

      <Toast.Viewport className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-96 max-w-[90vw]" />
    </Toast.Provider>
  );
}

export default Settings;
