'use client';

import { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import PlantInfo from './components/PlantInfo';
import AnimatedBackground from './components/AnimatedBackground';
import { identifyPlant } from './utils/gemini';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [plantInfo, setPlantInfo] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>('');

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    setPlantInfo(null);
    setError(null);
    setProgress('');

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        try {
          const result = await identifyPlant(
            base64String,
            (message) => setProgress(message)
          );
          setPlantInfo(result);
          setError(null);
        } catch (error: any) {
          console.error('Error in plant identification:', error);
          setError(error.message || 'Failed to identify plant. Please try again.');
          setPlantInfo(null);
        } finally {
          setIsLoading(false);
          setProgress('');
        }
      };
      reader.readAsDataURL(file);
    } catch (error: any) {
      console.error('Error reading file:', error);
      setError('Failed to read image file. Please try again.');
      setIsLoading(false);
      setProgress('');
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white to-green-50">
      <AnimatedBackground />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4 font-display animate-fade-in">
            Plant Scanner
          </h1>
          <p className="text-lg md:text-xl text-green-700 font-serif animate-fade-in-delayed max-w-2xl mx-auto">
            Snap a photo of any plant and I'll identify it instantly!
          </p>
        </div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8 transform transition-all duration-300 hover:scale-[1.02]">
            <ImageUpload onUpload={handleImageUpload} isLoading={isLoading} />
            
            {/* Progress Message */}
            {progress && (
              <div className="mt-4 text-center animate-pulse">
                <p className="text-green-600 font-medium font-serif">{progress}</p>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-slide-in mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-serif">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Plant Information */}
        {plantInfo && (
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <PlantInfo plantInfo={plantInfo} />
          </div>
        )}
      </div>
    </main>
  );
}
