// HistoryPage.tsx
import { useEffect, useState } from 'react';
import { medicationAPI } from '@/services/api';
import { format } from 'date-fns';
import type { MedicationLog } from '@/types/api';

export default function HistoryPage() {
  const [logs, setLogs] = useState<MedicationLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await medicationAPI.getHistory(30);
      setLogs(response.data);
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">היסטוריה</h1>
      
      <div className="space-y-4">
        {logs.map((log) => (
          <div key={log.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md flex justify-between items-center">
            <div>
              <p className="font-semibold">{format(new Date(log.takenAt), 'dd/MM/yyyy HH:mm')}</p>
              <p className="text-sm text-gray-600">ביטחון: {Math.round(log.confidence)}%</p>
            </div>
            <div className={`px-4 py-2 rounded-lg ${
              log.status === 'verified' ? 'bg-success/20 text-success' : 'bg-gray-200 text-gray-600'
            }`}>
              {log.status === 'verified' ? '✓ אומת' : 'ממתין'}
            </div>
          </div>
        ))}
        {logs.length === 0 && <p className="text-center text-gray-500">אין היסטוריה עדיין</p>}
      </div>
    </div>
  );
}
