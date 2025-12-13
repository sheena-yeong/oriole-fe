import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { Coin } from '../../types/coins';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import { createPaymentIntent } from '../../services/payment';
import { useAuth } from '../../hooks/useAuth';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

interface BuyCryptoDialogProps {
  selectedCoin: Coin | null;
  open: boolean;
  onClose: () => void;
  onBack: () => void;
}

function BuyCryptoDialog({
  selectedCoin,
  open,
  onClose,
  onBack,
}: BuyCryptoDialogProps) {
  const price = selectedCoin?.price ?? 0;
  const { tokens } = useAuth();
  const [coinAmount, setCoinAmount] = useState('');
  const [fiatAmount, setFiatAmount] = useState('');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'input' | 'payment'>('input');

  if (!selectedCoin) return;

  const handleCoinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCoinAmount(value);

    const numeric = parseFloat(value);
    if (!isNaN(numeric)) {
      setFiatAmount((numeric * price).toFixed(2));
    } else {
      setFiatAmount('');
    }
  };

  const handleFiatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFiatAmount(value);

    const numeric = parseFloat(value);
    if (!isNaN(numeric) && price !== 0) {
      setCoinAmount((numeric / price).toFixed(8));
    } else {
      setCoinAmount('');
    }
  };

  const handleContinue = async () => {
    const amount = parseFloat(fiatAmount);

    if (!amount || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    setLoading(true);

    try {
      const response = await createPaymentIntent(
        tokens.access,
        Number(fiatAmount),
        selectedCoin.symbol,
        coinAmount,
        selectedCoin.id
      );

      if (response.success && response.data?.clientSecret) {
        setClientSecret(response.data.clientSecret);
        setStep('payment');
      } else {
        alert('Failed to initialize payment');
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
      alert('Failed to initialize payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToInput = () => {
    setStep('input');
    setClientSecret(null);
  };

  const handleDialogClose = () => {
    setStep('input');
    setClientSecret(null);
    setCoinAmount('');
    setFiatAmount('');
    onClose();
  };

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(o) => !o && handleDialogClose()}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 z-50" />

        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-neutral-200 p-6 shadow-lg dark:bg-neutral-900 z-50 max-h-[80vh] flex flex-col overflow-y-auto">
          <DialogPrimitive.Close asChild>
            <button
              className="absolute top-3 right-3 text-neutral-500 hover:text-black dark:hover:text-white rounded-full p-1"
              aria-label="Close"
            >
              ✕
            </button>
          </DialogPrimitive.Close>

          <DialogPrimitive.Title className="text-2xl font-bold text-black dark:text-white mb-4 justify-center flex">
            <button
              className="absolute left-5"
              onClick={step === 'input' ? onBack : handleBackToInput}
            >
              <IoIosArrowRoundBack size={35} />
            </button>
            {step === 'input'
              ? `Buy ${selectedCoin?.name}`
              : 'Complete Payment'}
          </DialogPrimitive.Title>

          {step === 'input' && (
            <>
              <div className="bg-neutral-900/90 dark:bg-neutral-900 rounded-xl shadow-lg p-6 flex flex-col gap-4 max-w-2xl m-3">
                <h3 className="italic text-lg text-white dark:text-white">
                  I want
                </h3>

                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-2 w-36">
                    <img
                      src={selectedCoin?.image}
                      alt={selectedCoin?.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-white text-2xl">
                      {selectedCoin?.symbol}
                    </span>
                  </div>

                  <div className="flex flex-col items-end w-40">
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full bg-transparent text-right text-xl text-white outline-none"
                      value={coinAmount}
                      onChange={handleCoinChange}
                    />

                    <div className="w-full h-px bg-white my-1" />

                    <div className="flex items-center gap-1 w-full">
                      <input
                        type="number"
                        placeholder="0.00"
                        className="w-full bg-transparent text-right text-sm text-white outline-none"
                        value={fiatAmount}
                        onChange={handleFiatChange}
                      />
                      <span className="text-sm text-white">USD</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="mt-6 bg-[#fe5914] hover:bg-[#ff6b2a] disabled:bg-neutral-600 shadow-lg text-white font-semibold px-4 py-3 rounded-3xl"
                onClick={handleContinue}
                disabled={!fiatAmount || parseFloat(fiatAmount) <= 0 || loading}
              >
                {loading ? 'Loading...' : 'Continue to Payment'}
              </button>
            </>
          )}

          {step === 'payment' && clientSecret && (
            <div className="p-3">
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: 'night',
                    variables: {
                      colorBackground: '#0b0b0b',
                      colorPrimary: '#fe5914',

                      colorText: '#ffffff',
                      colorTextPlaceholder: '#ffffff',
                      colorTextSecondary: '#000000',
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
                <PaymentForm
                  amount={parseFloat(fiatAmount)}
                  coinSymbol={selectedCoin?.symbol}
                  coinAmount={coinAmount}
                  onSuccess={onClose}
                />
              </Elements>
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default BuyCryptoDialog;
