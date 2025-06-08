# Drew - Professional Business Website

A modern, single-page business website built with Next.js, featuring a dark theme with purple highlights, smooth animations, and a conversion-focused design.

## Features

- 🎨 Modern dark theme with purple accents
- ✨ Smooth scroll animations and transitions
- 📱 Fully responsive design
- 🚀 Built with Next.js and TypeScript
- 🎭 Framer Motion animations
- 🎯 Conversion-focused layout
- 📝 Contact form integration
- 🔍 SEO optimized

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- React Intersection Observer

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
drew/
├── src/
│   ├── app/
│   │   ├── layout.tsx    # Root layout component
│   │   ├── page.tsx      # Main page component
│   │   └── globals.css   # Global styles
│   └── components/       # React components
├── public/              # Static assets
├── tailwind.config.ts   # Tailwind CSS configuration
└── package.json        # Project dependencies
```

## Customization

1. Colors: Edit the `tailwind.config.ts` file to modify the color scheme
2. Content: Update the content in `src/app/page.tsx`
3. Animations: Modify Framer Motion animations in component files
4. Styles: Adjust global styles in `src/app/globals.css`

## Contact Form Setup

The contact form is ready to be integrated with your preferred email service or API. To set it up:

1. Choose an email service (e.g., SendGrid, AWS SES)
2. Create an API route in `src/app/api/contact/route.ts`
3. Add your email service integration
4. Update the form submission handler in the ContactSection component

## License

MIT
