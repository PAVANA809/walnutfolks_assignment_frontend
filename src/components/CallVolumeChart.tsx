import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export interface CallVolumeData {
  name: string;
  calls: number;
}

interface CallVolumeChartProps {
  data: CallVolumeData[];
  onDataClick?: (entry: CallVolumeData) => void;
}

export function CallVolumeChart({ data, onDataClick }: CallVolumeChartProps) {
  return (
    <div className="bg-surface/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 h-full">
      <h3 className="text-lg font-semibold text-gray-200 mb-4">Call Volume (24h)</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ backgroundColor: '#15152E', borderColor: '#333', color: '#fff' }}
            />
            <Bar 
              dataKey="calls" 
              fill="#22D3EE" 
              radius={[4, 4, 0, 0]} 
              onClick={(data) => onDataClick && onDataClick(data)}
              cursor="pointer"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill="#22D3EE" className="hover:opacity-80 transition-opacity" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-gray-400 mt-4 text-center">Click on a bar to edit its value</p>
    </div>
  );
}
