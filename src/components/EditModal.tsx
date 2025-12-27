import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  segmentName: string;
  currentValue: number;
  onSave: (email: string, newValue: number) => void;
  existingEmail: string | null;
}

export function EditModal({ isOpen, onClose, segmentName, currentValue, onSave, existingEmail }: EditModalProps) {
  const [email, setEmail] = useState(existingEmail || '');
  const [value, setValue] = useState(currentValue.toString());

  useEffect(() => {
    setValue(currentValue.toString());
  }, [currentValue]);

  useEffect(() => {
    if (existingEmail) setEmail(existingEmail);
  }, [existingEmail]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(email, Number(value));
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-surface border border-white/10 rounded-xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Edit Value</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Segment</label>
            <input 
              type="text" 
              value={segmentName} 
              disabled 
              className="w-full px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-gray-400"
            />
          </div>

          {!existingEmail && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-white/10 bg-black/20 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-600"
                placeholder="Enter your email to save changes"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Value</label>
            <input 
              type="number" 
              required 
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-3 py-2 border border-white/10 bg-black/20 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:bg-white/5 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
