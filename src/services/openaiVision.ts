import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export interface VisionAnalysisResult {
  description: string;
  style: string[];
  colors: string[];
  roomType: string;
  furniture: string[];
}

export async function analyzeImage(imageUrl: string): Promise<VisionAnalysisResult> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this furniture/interior image and provide: \n1. Brief description\n2. Style keywords\n3. Main colors\n4. Room type\n5. Furniture pieces visible\n\nFormat as JSON with keys: description, style (array), colors (array), roomType, furniture (array)"
            },
            {
              type: "image_url",
              image_url: imageUrl,
            }
          ],
        },
      ],
      max_tokens: 500,
      temperature: 0.5,
    });

    const result = response.choices[0]?.message?.content;
    if (!result) {
      throw new Error('No analysis result received');
    }

    return JSON.parse(result) as VisionAnalysisResult;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze image');
  }
}

export async function getStylingRecommendations(
  imageUrl: string,
  prompt: string
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Based on this interior image, ${prompt}`
            },
            {
              type: "image_url",
              image_url: imageUrl,
            }
          ],
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const result = response.choices[0]?.message?.content;
    if (!result) {
      throw new Error('No recommendations received');
    }

    return result;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw new Error('Failed to get styling recommendations');
  }
}

export async function generateVisionImage(prompt: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt,
      size: "1024x1024",
      response_format: "url"
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI Vision error: ${error}`);
  }

  const data = await response.json();
  return data.data[0].url;
}