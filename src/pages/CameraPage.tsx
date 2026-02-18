import { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Webcam from 'react-webcam';
import { medicationAPI } from '@/services/api';
import { Camera, Check } from 'lucide-react';

export default function CameraPage() {
  const webcamRef = useRef<Webcam>(null);
  const [searchParams] = useSearchParams();
  const medicationId = searchParams.get('medicationId') || '';
  const [capturing, setCapturing] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const capturePhoto = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    setCapturing(true);

    try {
      // Convert base64 to File
      const res = await fetch(imageSrc);
      const blob = await res.blob();
      const file = new File([blob], 'medication.jpg', { type: 'image/jpeg' });

      await medicationAPI.verifyIntake(medicationId, file);
      
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      alert('שגיאה באימות התמונה');
      setCapturing(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-success p-4">
        <div className="text-center text-white animate-fadeIn">
          <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center animate-checkmark">
            <Check className="w-16 h-16 text-success" />
          </div>
          <h2 className="text-3xl font-bold mb-2">מעולה!</h2>
          <p>התרופה נרשמה בהצלחה 🎉</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex-1 relative">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-full object-cover"
          videoConstraints={{ facingMode: 'environment' }}
        />
        
        {/* Overlay Guide */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 border-4 border-white/50 rounded-full flex items-center justify-center">
            <p className="text-white text-center px-4">
              מקם את הכדור בעיגול
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-900">
        <button
          onClick={capturePhoto}
          disabled={capturing}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Camera className="w-6 h-6" />
          {capturing ? 'מאמת...' : 'צלם תרופה'}
        </button>
      </div>
    </div>
  );
}
