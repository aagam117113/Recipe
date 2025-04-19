# Recipe Explorer

A responsive recipe discovery and management application built with React, TypeScript, and Tailwind CSS.

## Features

- Search for recipes with validation and debounce
- View trending and popular recipes on the homepage
- Filter recipes by dietary preferences (vegetarian, vegan, etc.)
- Save favorite recipes with localStorage persistence
- Detailed recipe pages with ingredients and instructions
- Responsive design for all devices

## Technologies Used

- React
- TypeScript
- React Router v6
- React Context API
- Tailwind CSS
- Edamam Recipe API

## Getting Started

### Prerequisites

- Node.js and npm installed
- Edamam API credentials

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your Edamam API credentials:
   ```
   VITE_EDAMAM_APP_ID=your_app_id
   VITE_EDAMAM_APP_KEY=your_app_key
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── contexts/           # Context API for state management
├── pages/              # Route components
├── types/              # TypeScript type definitions
├── utils/              # Helper functions and API utilities
├── App.tsx             # Main app component with routing
└── main.tsx            # Entry point
```

## API Integration

This project uses the Edamam Recipe API for retrieving recipe data. You'll need to [register for API credentials](https://developer.edamam.com/edamam-recipe-api) to use the application.

## Deployment

Build the project for production:

```
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to a static site host like Netlify or Vercel.