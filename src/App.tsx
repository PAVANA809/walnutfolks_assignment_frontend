import { useState } from 'react';
import { CallDurationChart } from './components/CallDurationChart';
import { SadPathChart, ChartData } from './components/SadPathChart';
import { CallVolumeChart, CallVolumeData } from './components/CallVolumeChart';
import { SentimentChart } from './components/SentimentChart';
import { EditModal } from './components/EditModal';
import { supabase } from './lib/supabase';
import { Activity, BrainCircuit, LayoutDashboard } from 'lucide-react';

const INITIAL_SAD_PATH_DATA = [
  { name: 'Customer Hostility', value: 30 },
  { name: 'Unsupported Language', value: 25 },
  { name: 'Assistant did not speak Spanish', value: 20 },
  { name: 'Assistant did not speak French', value: 15 },
  { name: 'Verbal Aggression', value: 10 },
];

const INITIAL_CALL_VOLUME_DATA = [
  { name: '00:00', calls: 400 },
  { name: '04:00', calls: 300 },
  { name: '08:00', calls: 2000 },
  { name: '12:00', calls: 2780 },
  { name: '16:00', calls: 1890 },
  { name: '20:00', calls: 2390 },
  { name: '23:59', calls: 3490 },
];

type EditableData = ChartData | (CallVolumeData & { value: number });

function App() {
  const [sadPathData, setSadPathData] = useState<ChartData[]>(INITIAL_SAD_PATH_DATA);
  const [callVolumeData, setCallVolumeData] = useState<CallVolumeData[]>(INITIAL_CALL_VOLUME_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<EditableData | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(localStorage.getItem('user_email'));
  const [activeChart, setActiveChart] = useState<'sadPath' | 'callVolume' | null>(null);

  const handleSadPathClick = (data: ChartData) => {
    setSelectedSegment(data);
    setActiveChart('sadPath');
    setIsModalOpen(true);
  };

  const handleCallVolumeClick = (data: CallVolumeData) => {
    setSelectedSegment({ ...data, value: data.calls });
    setActiveChart('callVolume');
    setIsModalOpen(true);
  };

  const handleSave = async (email: string, newValue: number) => {
    if (!selectedSegment || !activeChart) return;

    if (userEmail) {
       const confirmMessage = `You have previously set a value. Do you want to overwrite it with ${newValue}?`;
       if (!window.confirm(confirmMessage)) {
         return;
       }
    }

    if (!userEmail) {
      localStorage.setItem('user_email', email);
      setUserEmail(email);
    }

    if (activeChart === 'sadPath') {
      const newData = sadPathData.map(item => 
        item.name === selectedSegment.name ? { ...item, value: newValue } : item
      );
      setSadPathData(newData);
    } else if (activeChart === 'callVolume') {
      const newData = callVolumeData.map(item => 
        item.name === selectedSegment.name ? { ...item, calls: newValue } : item
      );
      setCallVolumeData(newData);
    }

    console.log('Saving to Supabase:', { email, segment: selectedSegment.name, value: newValue, chart: activeChart });
    try {
      const { error } = await supabase
        .from('chart_overrides')
        .upsert({ 
          email, 
          segment_name: selectedSegment.name, 
          value: newValue,
          chart_type: activeChart,
          updated_at: new Date().toISOString()
        }, { onConflict: 'email,segment_name' });
      
      if (error) {
        console.warn('Supabase save failed (expected if no table/credentials):', error.message);
      }
    } catch (e) {
      console.warn('Supabase connection error:', e);
    }

    setIsModalOpen(false);
    setActiveChart(null);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-white selection:bg-primary/30">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-surface/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="text-primary" size={28} />
            <span className="text-xl font-bold tracking-tight">Call Analytics</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Hero Section */}
        <header className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Voice Agent Analytics <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Real-time insights into your voice agent performance.
          </p>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Top Row */}
          <div className="lg:col-span-8">
            <CallDurationChart />
          </div>
          <div className="lg:col-span-4">
            <div className="bg-gradient-to-br from-primary/20 to-surface border border-primary/20 p-6 rounded-xl h-full flex flex-col justify-center">
              <Activity className="text-primary mb-4" size={32} />
              <h3 className="text-2xl font-bold mb-2">System Status</h3>
              <p className="text-gray-400">All systems operational. Real-time monitoring active.</p>
            </div>
          </div>

          {/* Middle Row */}
          <div className="lg:col-span-5">
            <SadPathChart data={sadPathData} onDataClick={handleSadPathClick} />
          </div>
          <div className="lg:col-span-7">
            <CallVolumeChart data={callVolumeData} onDataClick={handleCallVolumeClick} />
          </div>

          {/* Bottom Row */}
          <div className="lg:col-span-4">
             <SentimentChart />
          </div>
          <div className="lg:col-span-8">
            <div className="bg-surface/50 backdrop-blur-sm p-8 rounded-xl border border-white/10 h-full flex flex-col justify-center items-start">
              <div className="flex items-center gap-3 mb-4">
                <LayoutDashboard className="text-secondary" size={24} />
                <h3 className="text-xl font-bold">Interactive Analytics</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-2xl">
                Click on any segment in the "Sad Path Analysis" or "Call Volume" chart to edit its value. 
                Your changes will be saved and associated with your email.
              </p>
              <div className="flex gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Live Data
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Encrypted
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedSegment && (
        <EditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          segmentName={selectedSegment.name}
          currentValue={selectedSegment.value}
          onSave={handleSave}
          existingEmail={userEmail}
        />
      )}
    </div>
  );
}

export default App;
