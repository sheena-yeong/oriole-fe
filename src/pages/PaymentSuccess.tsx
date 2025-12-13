import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tickGif from '../assets/tickGif.gif'

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/nest');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <img
            src={tickGif}
            alt="Payment successful"
            className="w-10 h-10"
          />
          <h1 className="text-3xl font-semibold">
            Payment Successful
          </h1>
        </div>

        <p className="text-neutral-400">
          Your transaction was completed successfully.
        </p>

        <p className="text-sm text-neutral-500">
          Redirecting to your nest
        </p>
      </div>
    </div>
  );
}

export default PaymentSuccess;