import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI("AIzaSyCa9niqHzPT1_c1aUGjjRGqPCFMl-1h5tQ");

// Initialize Google Cloud Vision API key
const VISION_API_KEY = "AIzaSyCa9niqHzPT1_c1aUGjjRGqPCFMl-1h5tQ";
const VISION_API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${VISION_API_KEY}`;

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

async function analyzeImageWithVision(imageBase64: string): Promise<string[]> {
  const base64Data = imageBase64.split(',')[1];
  
  const response = await fetch(VISION_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [{
        image: {
          content: base64Data
        },
        features: [
          {
            type: 'LABEL_DETECTION',
            maxResults: 10
          },
          {
            type: 'WEB_DETECTION',
            maxResults: 10
          }
        ]
      }]
    })
  });

  if (!response.ok) {
    throw new Error(`Vision API error: ${response.statusText}`);
  }

  const data = await response.json();
  
  // Extract labels and web entities
  const labels = data.responses[0].labelAnnotations?.map((label: any) => label.description) || [];
  const webEntities = data.responses[0].webDetection?.webEntities?.map((entity: any) => entity.description) || [];
  
  // Combine and remove duplicates
  return [...new Set([...labels, ...webEntities])];
}

export async function identifyPlant(
  imageBase64: string,
  onProgress?: (message: string) => void
) {
  try {
    // Validate base64 image
    if (!imageBase64.includes('base64')) {
      throw new Error('Invalid image format');
    }

    const notify = (message: string) => {
      console.log(message);
      if (onProgress) onProgress(message);
    };

    notify('Analyzing image with Google Vision API...');

    // First, analyze the image with Vision API
    const labels = await retryWithExponentialBackoff(
      () => analyzeImageWithVision(imageBase64),
      3,
      1000,
      (attempt, delay) => {
        notify(`Retrying image analysis in ${delay/1000} seconds... (Attempt ${attempt}/3)`);
      }
    );

    // If no plant-related labels found
    if (labels.length === 0) {
      throw new Error('No plant detected in the image. Please try with a clearer image of a plant.');
    }

    notify('Generating detailed plant information...');

    // Use Gemini to get detailed information about the plant
    const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });
    
    const plantLabels = labels.join(', ');
    const prompt = `
      Based on these detected labels: ${plantLabels}
      
      Please provide detailed plant information in the following format:
      1. Plant name (both common and scientific if possible)
      2. Brief description of the plant
      3. Care instructions
      
      If multiple plants are detected, focus on the most likely or prominent one.
    `;

    const result = await retryWithExponentialBackoff(
      async () => {
        const response = await model.generateContent(prompt);
        return response.response.text();
      },
      3,
      1000,
      (attempt, delay) => {
        notify(`Retrying information generation in ${delay/1000} seconds... (Attempt ${attempt}/3)`);
      }
    );

    // Parse the response
    const sections = result.split('\n\n').filter(section => section.trim());
    
    let parsedResponse = {
      name: 'Unknown Plant',
      description: 'No description available',
      careInstructions: 'No care instructions available'
    };

    // Try to extract information from the sections
    for (const section of sections) {
      if (section.toLowerCase().includes('name') || section.includes('scientific')) {
        parsedResponse.name = section.split('\n')[0];
      } else if (section.toLowerCase().includes('description')) {
        parsedResponse.description = section;
      } else if (section.toLowerCase().includes('care')) {
        parsedResponse.careInstructions = section;
      }
    }

    return parsedResponse;

  } catch (error: any) {
    console.error('Error in plant identification:', error);
    throw new Error(
      error.message || 
      'Unable to identify plant. Please try again in a few moments.'
    );
  }
}
