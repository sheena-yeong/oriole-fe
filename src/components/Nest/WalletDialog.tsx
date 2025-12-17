import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import WalletPaymentForm from './WalletPaymentForm';
import { createPaymentIntent } from '../../services/payment';
import { useAuth } from '../../hooks/useAuth';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

interface WalletDialogProps {
  open: boolean;
  onClose: () => void;
}

function WalletDialog({ open, onClose }: WalletDialogProps) {
  const { tokens } = useAuth();
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [step, setStep] = useState<'input' | 'payment'>('input');
  const PRESETS = [10, 25, 50, 100];

  const handleContinue = async () => {
    const numericAmount = parseFloat(amount);

    if (!numericAmount || numericAmount <= 0) {
      alert('Enter a valid top-up amount.');
      return;
    }

    setLoading(true);

    try {
      const res = await createPaymentIntent(tokens.access, numericAmount);

      if (res.success && res.data?.clientSecret) {
        setClientSecret(res.data.clientSecret);
        setStep('payment');
      } else {
        alert('Failed to initialize payment.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setStep('input');
    setAmount('');
    setClientSecret(null);
    onClose();
  };

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(o) => !o && resetAndClose()}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 z-50" />

        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-neutral-200 p-6 shadow-lg z-50">
          <DialogPrimitive.Close asChild>
            <button className="absolute top-3 right-3 text-neutral-500 hover:text-black">
              ✕
            </button>
          </DialogPrimitive.Close>

          <DialogPrimitive.Title className="text-xl font-bold text-center text-black mb-5">
            {step === 'input' ? 'Top Up Wallet' : 'Complete Payment'}
          </DialogPrimitive.Title>

          {step === 'input' && (
            <>
              <div className="bg-neutral-900 rounded-xl p-6 mb-6">
                <label className="block text-white mb-3 text-sm">
                  Amount (USD)
                </label>
                <div className="flex gap-2 mb-4">
                  {PRESETS.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAmount(value.toFixed(2))}
                      className="w-15 py-2 rounded-full bg-neutral-800 text-white hover:bg-neutral-700"
                    >
                      ${value}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-transparent border-b border-white text-white text-2xl outline-none"
                />
              </div>

              <button
                onClick={handleContinue}
                disabled={loading || !amount || parseFloat(amount) <= 0}
                className="w-full bg-[#fe5914] hover:bg-[#ff6b2a] disabled:bg-neutral-600 text-white font-semibold py-3 rounded-3xl"
              >
                {loading ? 'Processing…' : 'Continue'}
              </button>
            </>
          )}

          {step === 'payment' && clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'night',
                  variables: {
                    colorText: '#ffffff',
                    colorTextSecondary: '#ffffff',
                    colorIcon: '#ffffff',
                    colorPrimary: '#000000',
                    colorBackground: '#0b0b0b',
                  },
                  rules: {
                    '.Input': {
                      backgroundColor: '#0b0b0b',
                      color: '#ffffff',
                    },
                    '.Input::placeholder': {
                      color: '#ffffff',
                    },
                    '.Label': {
                      color: '#000000',
                      fontWeight: '500',
                    },
                  },
                },
              }}
            >
              <WalletPaymentForm
                amount={parseFloat(amount)}
              />
            </Elements>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default WalletDialog;
