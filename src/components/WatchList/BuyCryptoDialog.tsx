import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { Coin } from '../../../types/coins';

interface BuyCryptoDialogProps {
  selectedCoin: Coin | null;
  open: boolean;
  onClose: () => void;
}

function BuyCryptoDialog({
  selectedCoin,
  open,
  onClose,
}: BuyCryptoDialogProps) {
  // const open = !!selectedCoin;


  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 z-50" />

        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg dark:bg-neutral-900 z-50 max-h-[80vh] flex flex-col">
          <DialogPrimitive.Close asChild>
            <button
              className="absolute top-3 right-3 text-neutral-500 hover:text-black dark:hover:text-white rounded-full p-1"
              aria-label="Close"
            >
              ✕
            </button>
          </DialogPrimitive.Close>

          <DialogPrimitive.Title className="text-2xl font-bold text-black dark:text-white mb-4">
            {selectedCoin?.name}
          </DialogPrimitive.Title>

          <button className="mt-6 bg-[#fe5914] hover:bg-[#ff6b2a] text-white font-semibold px-4 py-2 rounded">
            Confirm
          </button>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default BuyCryptoDialog;
