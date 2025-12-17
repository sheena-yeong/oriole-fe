import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getMarketChart } from '../../services/crypto';
import type { Coin } from '../../types/coins.ts';
import { useAuth } from '../../hooks/useAuth';
import BuyCryptoDialog from './BuyCryptoDialog.tsx';
import { fetchWalletBalance } from '../../services/wallet.ts';

interface CoinDetailsDialogProps {
  selectedCoin: Coin | null;
  onClose: () => void;
}

type ChartPoint = {
  time: string;
  price: number;
};

function CoinDetailsDialog({ selectedCoin, onClose }: CoinDetailsDialogProps) {
  const open = !!selectedCoin;

  const [data, setData] = useState<ChartPoint[]>([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(7);
  const [isBuyOpen, setIsBuyOpen] = useState(false);

  const { tokens } = useAuth();

  const fetchBalance = async () => {
    if (!tokens.access) return;
    try {
      const data = await fetchWalletBalance(tokens.access);
      setWalletBalance(Number(data.balance));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!selectedCoin) return;

    fetchBalance();

    async function load() {
      setLoading(true);
      try {
        if (!selectedCoin) return;
        const res = await getMarketChart(tokens.access, selectedCoin.id, days);

        const formatted: ChartPoint[] = res.data.prices.map(
          ([timestamp, price]: [number, number]) => ({
            time: new Date(timestamp).toLocaleDateString(),
            price,
          })
        );

        setData(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [selectedCoin, days]);

  if (!selectedCoin) return null;

  return (
    <>
      <DialogPrimitive.Root
        open={open && !isBuyOpen}
        onOpenChange={(o) => !o && onClose()}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 z-50" />

          <DialogPrimitive.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-neutral-200 p-6 shadow-lg z-50 max-h-[80vh] flex flex-col">
            <DialogPrimitive.Close asChild>
              <button
                className="absolute top-3 right-3 text-neutral-500 hover:text-black rounded-full p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </DialogPrimitive.Close>

            <DialogPrimitive.Title className="flex gap-3 text-2xl font-bold text-black mb-4">
              <img
                src={selectedCoin?.image}
                alt={selectedCoin?.name}
                className="w-8 h-8 rounded-full"
              />
              {selectedCoin.name} — $
              {selectedCoin.price.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </DialogPrimitive.Title>
            <div className="grid grid-cols-3 gap-4 mb-4 mt-2">
              <div className="bg-neutral-900/90 rounded-lg p-3 text-center">
                <p className="text-md text-white font-bold">Rank</p>
                <p className="text-sm font-semibold text-white">
                  #{selectedCoin.rank}
                </p>
              </div>

              <div className="bg-neutral-900/90 rounded-lg p-3 text-center">
                <p className="text-md text-white font-bold">Market Cap</p>
                <p className="text-sm font-semibold text-white">
                  $
                  {selectedCoin.marketCap.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-neutral-900/90 rounded-lg p-3 text-center">
                <p className="text-md text-white font-bold">24h Change</p>
                <p
                  className={`text-sm font-semibold ${
                    selectedCoin.change24h >= 0 && selectedCoin.change24h !== null
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {selectedCoin.change24h !== null && selectedCoin.change24h !== undefined ? <>{selectedCoin.change24h}</> : 'No Data' }
                </p>
              </div>
            </div>

            <div className="flex gap-2 mb-4 justify-end">
              <button
                onClick={() => setDays(1)}
                className={`px-3 py-1 text-xs font-medium rounded ${
                  days === 1
                    ? 'bg-[#fe5914] text-white'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                24h
              </button>

              <button
                onClick={() => setDays(7)}
                className={`px-3 py-1 text-xs font-medium rounded ${
                  days === 7
                    ? 'bg-[#fe5914] text-white'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                7d
              </button>

              <button
                onClick={() => setDays(30)}
                className={`px-3 py-1 text-xs font-medium rounded ${
                  days === 30
                    ? 'bg-[#fe5914] text-white'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                30d
              </button>

              <button
                onClick={() => setDays(365)}
                className={`px-3 py-1 text-xs font-medium rounded ${
                  days === 365
                    ? 'bg-[#fe5914] text-white'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                1y
              </button>
            </div>

            {loading && <p className="text-neutral-400">Loading chart…</p>}

            {!loading && data.length > 0 && (
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <XAxis dataKey="time" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#fe5914"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            <button
              className="mt-6 shadow-lg bg-[#fe5914] hover:bg-[#ff6b2a] text-white font-semibold px-4 py-2 rounded-3xl"
              onClick={() => {
                setIsBuyOpen(true);
              }}
            >
              Buy {selectedCoin.name}
            </button>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>

      <BuyCryptoDialog
        selectedCoin={selectedCoin}
        onClose={() => {
          setIsBuyOpen(false);
          onClose();
        }}
        open={isBuyOpen}
        onBack={() => setIsBuyOpen(false)}
        walletBalance={walletBalance}
      />
    </>
  );
}

export default CoinDetailsDialog;
