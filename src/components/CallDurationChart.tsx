import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: '0s', value: 10 },
  { name: '10s', value: 20 },
  { name: '20s', value: 40 },
  { name: '30s', value: 80 },
  { name: '40s', value: 150 },
  { name: '50s', value: 200 },
  { name: '60s', value: 180 },
  { name: '70s', value: 120 },
  { name: '80s', value: 60 },
  { name: '90s', value: 30 },
  { name: '100s', value: 10 },
];

export function CallDurationChart() {
  return (
    <div className="bg-surface/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 h-full">
      <h3 className="text-lg font-semibold text-gray-200 mb-4">Call Duration Analysis</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              contentStyle={{ backgroundColor: '#15152E', borderColor: '#333', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#8B5CF6" 
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
