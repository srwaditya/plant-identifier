'use client';

interface PlantInfo {
  name?: string;
  description?: string;
  careInstructions?: string;
}

interface PlantInfoProps {
  plantInfo: PlantInfo | null;
}

export default function PlantInfo({ plantInfo }: PlantInfoProps) {
  if (!plantInfo) return null;

  // Split care instructions into bullet points if they contain periods
  const carePoints = plantInfo.careInstructions
    ? plantInfo.careInstructions.split('.')
        .map(point => point.trim())
        .filter(point => point.length > 0)
    : [];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-bl-full opacity-50" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-100 rounded-tr-full opacity-50" />
        
        {/* Content */}
        <div className="relative p-8 md:p-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-green-800 mb-8 animate-fade-in text-center">
            {plantInfo.name}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Description Section */}
            {plantInfo.description && (
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="font-display text-2xl font-semibold text-green-700 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About this Plant
                </h3>
                <div className="bg-white/50 rounded-xl p-6 shadow-sm">
                  <p className="font-serif text-gray-700 leading-relaxed">
                    {plantInfo.description}
                  </p>
                </div>
              </div>
            )}

            {/* Care Instructions Section */}
            {carePoints.length > 0 && (
              <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <h3 className="font-display text-2xl font-semibold text-green-700 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Care Guide
                </h3>
                <div className="bg-white/50 rounded-xl p-6 shadow-sm">
                  <table className="w-full">
                    <tbody className="divide-y divide-green-100">
                      {carePoints.map((point, index) => (
                        <tr key={index} className="hover:bg-green-50/50 transition-colors">
                          <td className="py-3 pl-4 pr-3 text-sm font-medium text-green-900">
                            {index + 1}
                          </td>
                          <td className="py-3 pl-0 pr-4">
                            <p className="font-serif text-gray-700 leading-relaxed">
                              {point}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Additional Information Tags */}
          <div className="mt-8 flex flex-wrap gap-2 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
              🌿 Plant Care
            </span>
            <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
              🌱 Growing Tips
            </span>
            <span className="px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-medium">
              💧 Watering Guide
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
