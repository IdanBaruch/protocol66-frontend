// Mood Page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { moodAPI } from '@/services/api';
import { MoodLevel } from '@/types/api';

const moods = [
  { level: MoodLevel.VERY_LOW, emoji: '😢', label: 'מאוד רע' },
  { level: MoodLevel.LOW, emoji: '😔', label: 'לא טוב' },
  { level: MoodLevel.NEUTRAL, emoji: '😐', label: 'בסדר' },
  { level: MoodLevel.GOOD, emoji: '🙂', label: 'טוב' },
  { level: MoodLevel.VERY_GOOD, emoji: '😊', label: 'מעולה' },
];

export default function MoodPage() {
  const [selected, setSelected] = useState<MoodLevel>(MoodLevel.NEUTRAL);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await moodAPI.checkIn({ mood: selected });
      navigate('/');
    } catch (error) {
      alert('שגיאה בשמירת מצב רוח');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">איך אתה מרגיש היום?</h1>
      
      <div className="flex justify-around mb-12">
        {moods.map((mood) => (
          <button
            key={mood.level}
            onClick={() => setSelected(mood.level)}
            className={`flex flex-col items-center p-4 rounded-xl transition-all ${
              selected === mood.level
                ? 'scale-125 bg-primary-100 dark:bg-primary-900'
                : 'opacity-50 hover:opacity-100'
            }`}
          >
            <span className="text-5xl mb-2">{mood.emoji}</span>
            <span className="text-sm">{mood.label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl disabled:opacity-50"
      >
        {loading ? 'שומר...' : 'שמור'}
      </button>
    </div>
  );
}
