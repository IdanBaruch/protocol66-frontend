import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { medicationAPI } from '@/services/api';
import { Pill, Camera, TrendingUp } from 'lucide-react';
import type { Medication } from '@/types/api';

export default function HomePage() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    loadDailyPlan();
  }, []);

  const loadDailyPlan = async () => {
    try {
      const response = await medicationAPI.getDailyPlan();
      setMedications(response.data);
      // Calculate streak from first medication
      if (response.data.length > 0) {
        setStreak(12); // Mock for now - should come from API
      }
    } catch (error) {
      console.error('Failed to load medications:', error);
    } finally {
      setLoading(false);
    }
  };

  const takenCount = medications.filter((m) => m.takenToday).length;
  const totalCount = medications.length;
  const progress = totalCount > 0 ? (takenCount / totalCount) * 100 : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {/* Streak Card */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 text-white text-center shadow-lg">
        <div className="flex items-center justify-center mb-4">
          <TrendingUp className="w-8 h-8 ml-2" />
          <h2 className="text-3xl font-bold">{streak} ימים ברצף 🔥</h2>
        </div>
        <p className="text-primary-100">כל הכבוד! המשך כך!</p>
      </div>

      {/* Daily Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4">היעד היומי שלך</h3>
        
        {/* Progress Bar */}
        <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
          <div
            className="absolute top-0 right-0 h-full bg-gradient-to-l from-success to-primary-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-center text-gray-600 dark:text-gray-300">
          {takenCount} מתוך {totalCount} תרופות נלקחו היום
        </p>
      </div>

      {/* Medications List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">התרופות שלך</h3>
        
        {medications.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
            <Pill className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-300">אין תרופות להיום</p>
          </div>
        ) : (
          medications.map((med) => (
            <div
              key={med.id}
              className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md flex items-center justify-between ${
                med.takenToday ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    med.takenToday
                      ? 'bg-success/20 text-success'
                      : 'bg-primary-100 text-primary-600'
                  }`}
                >
                  <Pill className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold">{med.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {med.dosage} • {med.scheduledTimes.join(', ')}
                  </p>
                </div>
              </div>

              {!med.takenToday && (
                <Link
                  to={`/camera?medicationId=${med.id}`}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  צלם
                </Link>
              )}

              {med.takenToday && (
                <span className="text-success font-semibold">✓ נלקח</span>
              )}
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/mood"
          className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="text-4xl mb-2">😊</div>
          <p className="font-semibold">דיווח מצב רוח</p>
        </Link>
        
        <Link
          to="/history"
          className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="text-4xl mb-2">📊</div>
          <p className="font-semibold">היסטוריה</p>
        </Link>
      </div>
    </div>
  );
}
