import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { subject: 'Happy', A: 120, fullMark: 150 },
  { subject: 'Neutral', A: 98, fullMark: 150 },
  { subject: 'Angry', A: 86, fullMark: 150 },
  { subject: 'Confused', A: 99, fullMark: 150 },
  { subject: 'Fearful', A: 85, fullMark: 150 },
  { subject: 'Sad', A: 65, fullMark: 150 },
];

export function SentimentChart() {
  return (
    <div className="bg-surface/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 h-full">
      <h3 className="text-lg font-semibold text-gray-200 mb-4">Sentiment Analysis</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
            <Radar
              name="Sentiment"
              dataKey="A"
              stroke="#22D3EE"
              strokeWidth={2}
              fill="#22D3EE"
              fillOpacity={0.3}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#15152E', borderColor: '#333', color: '#fff' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
