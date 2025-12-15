import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchWalletBalance } from '../services/wallet';
import { useAuth } from '../hooks/useAuth';

function WalletSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { tokens } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const clientSecret = searchParams.get('payment_intent_client_secret');

      if (!clientSecret) {
        setStatus('error');
        return;
      }

      if (!tokens.access) {
        console.error('No access token available');
        setStatus('error');
        return;
      }

      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const data = await fetchWalletBalance(tokens.access);
        console.log('Wallet API response:', data);
        
        if (data.balance !== undefined && data.balance !== null) {
          setBalance(Number(data.balance));
        }
        setStatus('success');

      } catch (err) {
        console.error('Error fetching balance:', err);
        setStatus('success');
      }
    };

    verifyPayment();
  }, [searchParams, tokens.access]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fe5914] mx-auto"></div>
          <p className="mt-4 text-white">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
        <div className="bg-neutral-800 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-neutral-400 mb-6">
            Please check your wallet to verify the transaction.
          </p>
          <button
            onClick={() => navigate('/nest')}
            className="w-full bg-[#fe5914] hover:bg-[#ff6b2a] text-white font-semibold px-4 py-3 rounded-3xl transition-colors"
          >
            Go to Nest
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-neutral-800 rounded-2xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">
          Payment Successful!
        </h2>
        
        <p className="text-neutral-400 mb-6">
          Your wallet has been topped up successfully.
        </p>

        {balance !== null && balance !== undefined && (
          <div className="bg-neutral-700 rounded-lg p-4 mb-6">
            <p className="text-neutral-400 text-sm mb-1">New Balance</p>
            <p className="text-3xl font-bold text-white">
              ${balance.toFixed(2)}
            </p>
          </div>
        )}

        <button
          onClick={() => navigate('/nest')}
          className="w-full bg-[#fe5914] hover:bg-[#ff6b2a] text-white font-semibold px-4 py-3 rounded-3xl transition-colors"
        >
          Return to Nest
        </button>
      </div>
    </div>
  );
}

export default WalletSuccessPage;