import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useEffect } from 'react';
import { FaCheckCircle } from "react-icons/fa";

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  coinName: string;
  amount: number;
}

function SuccessDialog({ open, onClose, coinName, amount }: SuccessDialogProps) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 z-50" />

        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-neutral-200 dark:bg-neutral-900 p-8 shadow-lg z-50">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-4">
              <FaCheckCircle className="w-10 h-10 text-white" strokeWidth={3} />
            </div>

            <DialogPrimitive.Title className="text-2xl font-bold text-black dark:text-white mb-2">
              Purchase Successful!
            </DialogPrimitive.Title>

            <DialogPrimitive.Description className="text-neutral-600 dark:text-neutral-400 mb-4">
              You've successfully purchased {amount} {coinName}.
            </DialogPrimitive.Description>

          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default SuccessDialog;