import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey || apiKey === 'your_openai_api_key_here') {
  throw new Error('OpenAI API key not configured. Please add your API key to the .env file.');
}

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true
});

export async function generatePhotorealisticWardrobeImage(prompt: string): Promise<string> {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `${prompt}\n\nStyle: Photorealistic, high-quality interior design render, professional lighting, modern aesthetic`,
      n: 1,
      size: "1024x1024",
      quality: "hd",
      response_format: "url"
    });

    return response.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate wardrobe image');
  }
}