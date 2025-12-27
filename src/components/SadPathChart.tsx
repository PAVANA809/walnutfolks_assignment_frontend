import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export interface ChartData {
  name: string;
  value: number;
}

interface SadPathChartProps {
  data: ChartData[];
  onDataClick?: (entry: ChartData) => void;
}

const COLORS = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE', '#EDE9FE'];

export function SadPathChart({ data, onDataClick }: SadPathChartProps) {
  return (
    <div className="bg-surface/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 h-full">
      <h3 className="text-lg font-semibold text-gray-200 mb-4">Sad Path Analysis</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              onClick={(data) => onDataClick && onDataClick(data)}
              cursor="pointer"
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#15152E', borderColor: '#333', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-gray-400 mt-4 text-center">Click on a segment to edit its value</p>
    </div>
  );
}
