'use client';

interface PlantInfo {
  name: string;
  description: string;
  careInstructions: string;
}

interface Props {
  plantInfo: PlantInfo;
}

export default function PlantInfo({ plantInfo }: Props) {
  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
      <div className="overflow-hidden">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-display font-bold text-green-800 mb-3">
            Plant Information
          </h2>
          <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>

        {/* Information Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-green-200">
            <tbody className="divide-y divide-green-100">
              {/* Common Name Row */}
              <tr className="transition-colors hover:bg-green-50/50">
                <td className="py-4 px-4 sm:px-6 w-1/4">
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                    <span className="font-display font-semibold text-green-700">Common Name</span>
                  </div>
                </td>
                <td className="py-4 px-4 sm:px-6">
                  <div className="font-serif text-gray-800">
                    {plantInfo.name.split('\n').map((line, i) => (
                      <p key={i} className="leading-relaxed">
                        {line.replace(/\*\*/g, '').replace(/Common Name:/i, '').replace(/Scientific Name:/i, '').trim()}
                      </p>
                    ))}
                  </div>
                </td>
              </tr>

              {/* Description Row */}
              <tr className="transition-colors hover:bg-green-50/50">
                <td className="py-4 px-4 sm:px-6 w-1/4">
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-display font-semibold text-green-700">Description</span>
                  </div>
                </td>
                <td className="py-4 px-4 sm:px-6">
                  <p className="font-serif text-gray-800 leading-relaxed">
                    {plantInfo.description.replace(/\*\*/g, '').replace(/Brief Description:/i, '').trim()}
                  </p>
                </td>
              </tr>

              {/* Care Instructions Row */}
              <tr className="transition-colors hover:bg-green-50/50">
                <td className="py-4 px-4 sm:px-6 w-1/4">
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="font-display font-semibold text-green-700">Care Guide</span>
                  </div>
                </td>
                <td className="py-4 px-4 sm:px-6">
                  <p className="font-serif text-gray-800 leading-relaxed">
                    {plantInfo.careInstructions.replace(/\*\*/g, '').replace(/Care Instructions:/i, '').trim()}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tips Card */}
        <div className="mt-8 p-5 bg-green-50/70 rounded-xl border border-green-100">
          <div className="flex items-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-display font-semibold text-green-700">Photography Tips</span>
          </div>
          <ul className="list-none space-y-2 text-sm text-gray-700">
            <li className="flex items-center">
              <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Take photos in natural light for better identification
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Include both leaves and flowers if possible
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Keep the plant well-centered in the image
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Ensure the image is clear and in focus
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
