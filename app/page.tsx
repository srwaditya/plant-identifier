'use client';

import { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import PlantInfo from './components/PlantInfo';
import AnimatedBackground from './components/AnimatedBackground';
import { identifyPlant } from './utils/google';

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
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-green-800 animate-fade-in">
            Plant Identifier
          </h1>
          <p className="text-lg text-center mb-12 text-green-700 animate-fade-in-delayed">
            Upload a photo of any plant and I'll tell you all about it!
          </p>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8 transform transition-all duration-300 hover:scale-[1.02]">
            <ImageUpload onUpload={handleImageUpload} isLoading={isLoading} />
            
            {/* Progress Message */}
            {progress && (
              <div className="mt-4 text-center animate-pulse">
                <p className="text-green-600 font-medium">{progress}</p>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded animate-slide-in">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {plantInfo && (
            <div className="animate-fade-in-up">
              <PlantInfo plantInfo={plantInfo} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
