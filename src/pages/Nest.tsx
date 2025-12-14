import { useEffect, useState } from 'react';
import Wallet from '../components/Nest/Wallet';
import { fetchUserPortfolio } from '../services/portfolio';
import { useAuth } from '../hooks/useAuth';
import type { PortfolioItem } from '../types/portfolioData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

function Nest() {

  const data = [
    { time: '2025-12-01', price: 11000 },
    { time: '2025-12-02', price: 11250 },
    { time: '2025-12-03', price: 11500 },
    { time: '2025-12-04', price: 11300 },
    { time: '2025-12-05', price: 11800 },
    { time: '2025-12-06', price: 12000 },
    { time: '2025-12-07', price: 12500 },
  ];

  const { tokens } = useAuth();
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const getPortfolioData = async () => {
      if (!tokens.access) return;
      try {
        const result = await fetchUserPortfolio(tokens.access);

        if ('error' in result) {
        console.error('Error fetching portfolio:', result.error);
        return;
      }
        console.log('portfolio data', result.data.portfolio);
        setPortfolioData(result.data.portfolio);
      } catch (err) {
        console.log(err);
      }
    };

    getPortfolioData();
  }, [tokens.access]);

  return (
    <>
      <Wallet />

      <h3 className="font-poppins pl-6 pt-5 font-semibold text-2xl text-white">
        Portfolio
      </h3>
      <div className="h-64 mt-6 p-4 m-6 bg-neutral-800 dark:bg-neutral-900 rounded-xl shadow-lg">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
          >
            <CartesianGrid stroke="#444" strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#222',
                border: 'none',
                borderRadius: '6px',
              }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#fe5914' }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#fe5914"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-x-auto m-6">
        <table className="min-w-[400px] w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white">
              <th className="pb-2">Coin</th>
              <th className="pb-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {portfolioData.map((item) => (
              <tr key={item.coinSymbol} className="border-b border-gray-800">
                <td className="py-3">
                  <div className="flex flex-col">
                    {/* <span className="font-medium">{item.name}</span> */}
                    <span className="text-gray-400 text-sm">{item.coinSymbol}</span>
                  </div>
                </td>
                <td className="py-3 text-right">
                  <div className="flex flex-col items-end">
                    <span className="font-medium">{item.quantity}</span>
                    <span className="text-gray-400 text-sm">
                      ${parseFloat(item.buyPrice).toFixed(2)}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Nest;
