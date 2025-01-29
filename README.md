This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Plant Scanner 🌿

A modern web application that uses AI to identify plants and provide detailed care instructions.

## Author
Created by Aditya  
Tutorial by Techaly

## Features

- 📸 Instant plant identification from photos
- 🎯 Detailed plant information including scientific names
- 🌱 Comprehensive care instructions
- 💫 Beautiful, responsive UI with animations
- 🔒 Privacy-focused implementation

## Screenshots

### Home Screen
![Home Screen](docs/home-screen.png)
*Upload interface with animated background*

### Plant Information
![Plant Information](docs/plant-info.png)
*Detailed plant information display with care instructions*

## Privacy Concerns

1. **Data Protection**
   - All image processing is done securely through encrypted connections
   - No user images are stored permanently
   - API keys are handled securely

2. **User Privacy**
   - No personal information is collected
   - No tracking or analytics implemented
   - No cookies used for tracking

3. **API Usage**
   - Uses Google's Gemini API with proper authentication
   - All API calls are made server-side for security
   - Rate limiting implemented to prevent abuse

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Google Gemini API

## Usage Steps

1. Open the application in your browser
2. Click the upload button or drag & drop a plant image
3. Wait for the AI to analyze the image
4. View detailed plant information and care instructions

## Privacy Policy

This application is committed to protecting user privacy:

- We do not store or share your images
- No personal data is collected
- All processing is done in real-time
- Images are discarded after analysis
- No third-party tracking

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Google Gemini API for plant identification
- Next.js team for the amazing framework
- Tailwind CSS for the styling system

---

Made with 💚 by Aditya | Tutorial by Techaly
