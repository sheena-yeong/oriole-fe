import { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

interface WalletPaymentFormProps {
  amount: number;
}

function WalletPaymentForm({ amount }: WalletPaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/wallet/success`
        },
      });

      if (submitError) {
        setError(submitError.message || 'Payment failed');
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement
        options={{
          layout: 'tabs',
        }}
      />

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg">
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-[#fe5914] hover:bg-[#ff6b2a] disabled:bg-neutral-600 disabled:cursor-not-allowed shadow-lg text-white font-semibold px-4 py-3 rounded-3xl transition-colors"
        >
          {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
}

export default WalletPaymentForm;
