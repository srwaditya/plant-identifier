import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = "AIzaSyCa9niqHzPT1_c1aUGjjRGqPCFMl-1h5tQ";
const genAI = new GoogleGenerativeAI(API_KEY);

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function retryWithExponentialBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000,
  onRetry?: (attempt: number, delay: number) => void
): Promise<T> {
  let retries = 0;

  while (true) {
    try {
      return await operation();
    } catch (error: any) {
      if (retries >= maxRetries) {
        throw error;
      }
      
      retries++;
      const delay = initialDelay * Math.pow(2, retries - 1);
      
      if (onRetry) {
        onRetry(retries, delay);
      }

      await sleep(delay);
    }
  }
}

export async function identifyPlant(
  imageBase64: string,
  onProgress?: (message: string) => void
) {
  try {
    // Validate base64 image
    if (!imageBase64.includes('base64')) {
      throw new Error('Invalid image format. Please upload a valid image.');
    }

    const notify = (message: string) => {
      console.log(message);
      if (onProgress) onProgress(message);
    };

    notify('Initializing plant identification...');

    try {
      notify('Preparing image analysis...');
      
      // Using gemini-1.5-flash model as recommended
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `
        Analyze this plant image and provide the following details in a clean format:

        1. Common Name
        2. Scientific Name
        3. Brief Description
        4. Care Instructions
        
        Please provide clear, structured information without any asterisks or special formatting characters.
        Keep the response concise and well-organized.
      `;

      notify('Analyzing image...');

      const imageData = imageBase64.split(',')[1];
      
      const result = await retryWithExponentialBackoff(
        async () => {
          try {
            const response = await model.generateContent({
              contents: [
                {
                  parts: [
                    { text: prompt },
                    {
                      inlineData: {
                        mimeType: "image/jpeg",
                        data: imageData
                      }
                    }
                  ]
                }
              ]
            });

            if (!response.response) {
              throw new Error('Empty response from API');
            }

            const text = response.response.text();
            if (!text) {
              throw new Error('Empty text response from API');
            }

            return text;
          } catch (error: any) {
            console.error('API Error:', error);
            if (error.message?.includes('API key not valid')) {
              throw new Error('Invalid API key. Please check your configuration.');
            }
            if (error.message?.includes('model not found')) {
              throw new Error('The specified model is not available. Please try again later.');
            }
            if (error.message?.includes('Rate limit')) {
              throw new Error('API rate limit exceeded. Please try again in a few moments.');
            }
            throw error;
          }
        },
        3,
        1000,
        (attempt, delay) => {
          notify(`Retrying analysis in ${delay/1000} seconds... (Attempt ${attempt}/3)`);
        }
      );

      notify('Processing response...');

      // Parse the response
      const sections = result.split('\n\n').filter(section => section.trim());
      
      let parsedResponse = {
        name: 'Unknown Plant',
        description: 'No description available',
        careInstructions: 'No care instructions available'
      };

      // Try to extract information from the sections
      for (const section of sections) {
        const lowerSection = section.toLowerCase();
        if (lowerSection.includes('name') || lowerSection.includes('scientific')) {
          parsedResponse.name = section;
        } else if (lowerSection.includes('description')) {
          parsedResponse.description = section;
        } else if (lowerSection.includes('care')) {
          parsedResponse.careInstructions = section;
        }
      }

      // If no structured information found, use the first section as name
      // and split remaining content between description and care
      if (parsedResponse.name === 'Unknown Plant' && sections.length > 0) {
        parsedResponse.name = sections[0];
        if (sections.length > 1) {
          parsedResponse.description = sections[1];
        }
        if (sections.length > 2) {
          parsedResponse.careInstructions = sections.slice(2).join('\n\n');
        }
      }

      return parsedResponse;

    } catch (error: any) {
      console.error('Error during plant analysis:', error);
      throw new Error(
        error.message || 'Error analyzing image. Please try again.'
      );
    }

  } catch (error: any) {
    console.error('Error in plant identification:', error);
    throw new Error(
      error.message || 
      'Unable to identify plant. Please try again in a few moments.'
    );
  }
}
