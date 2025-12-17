import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import type { Coin } from '../../types/coins.ts';
import { useAuth } from '../../hooks/useAuth';
import { getCoinDescription } from '../../services/crypto';

interface CoinDescriptionDialogProps {
  selectedCoin: Coin | null;
  onClose: () => void;
}

type CoinMeta = {
  description: string;
  homepage: string;
  genesisDate: string;
  sentiment: number;
};

function CoinDescriptionDialog({
  selectedCoin,
  onClose,
}: CoinDescriptionDialogProps) {
  const open = !!selectedCoin;

  const [data, setData] = useState<CoinMeta | null>(null);

  const { tokens } = useAuth();

  useEffect(() => {
    async function load() {
      try {
        if (!selectedCoin) return;
        const res = await getCoinDescription(tokens.access, selectedCoin.id);
        if (res.success) setData(res.data);
        else setData(null);
      } catch (err) {
        console.error(err);
        setData(null);
      }
    }

    load();
  }, [selectedCoin]);

  if (!selectedCoin) return null;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 z-50" />

        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-neutral-200 p-6 shadow-lg dark:bg-neutral-900 z-50 max-h-[80vh] flex flex-col">
          <DialogPrimitive.Close asChild>
            <button
              className="absolute top-3 right-3 text-neutral-500 hover:text-black dark:hover:text-white rounded-full p-1"
              aria-label="Close"
            >
              ✕
            </button>
          </DialogPrimitive.Close>

          {/* Header */}
          <DialogPrimitive.Title className="flex gap-3 text-2xl font-bold text-black dark:text-white mb-4">
            <img
              src={selectedCoin.image}
              alt={selectedCoin.name}
              className="w-8 h-8 rounded-full"
            />
            {selectedCoin.name}
          </DialogPrimitive.Title>

          {/* Meta grid */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-neutral-900/90 rounded-lg p-3 text-center">
              <p className="text-sm text-neutral-400">Genesis</p>
              <p className="text-white font-semibold">
                {data?.genesisDate
                  ? new Date(data?.genesisDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : '—'}
              </p>
            </div>

            <div className="bg-neutral-900/90 rounded-lg p-3 text-center">
              <p className="text-sm text-neutral-400">Sentiment</p>
              <p className="text-white font-semibold">
                {data?.sentiment !== undefined ? `${data.sentiment}% 👍` : '—'}
              </p>
            </div>

            <div className="bg-neutral-900/90 rounded-lg p-3 text-center">
              <p className="text-sm text-neutral-400">Homepage</p>
              {data?.homepage ? (
                <a
                  href={data.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#fe5914] text-sm font-semibold hover:underline"
                >
                  Visit
                </a>
              ) : (
                <p className="text-white">—</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="flex-1 overflow-y-auto rounded-lg bg-neutral-100 dark:bg-neutral-800 p-4 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed max-h-[50vh]">
            {data?.description
              ? data.description.split(/\r?\n/).map((paragraph, idx) => (
                  <p key={idx} className="mb-2">
                    {paragraph}
                  </p>
                ))
              : 'No description available.'}
          </div>

          <button className="mt-6 shadow-lg bg-[#fe5914] hover:bg-[#ff6b2a] text-white font-semibold px-4 py-2 rounded-3xl">
            Add {selectedCoin.name} to Watch List
          </button>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default CoinDescriptionDialog;
