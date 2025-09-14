# My Resume - React Portfolio

This is a React version of your portfolio website, converted from the original HTML/CSS/JavaScript structure.

## Project Structure

```
my-resume/
├── public/
│   ├── assets/          # All your images, PDFs, and other assets
│   └── index.html       # Main HTML template
├── src/
│   ├── components/      # React components
│   │   ├── Nav.js       # Navigation component
│   │   ├── Profile.js   # Hero/profile section
│   │   ├── About.js     # About section
│   │   ├── Experience.js # Skills section
│   │   ├── Projects.js  # Projects showcase
│   │   ├── Contact.js   # Contact information
│   │   └── Footer.js    # Footer component
│   ├── App.js           # Main App component
│   ├── App.css          # App-specific styles
│   ├── index.js         # React entry point
│   └── index.css        # Main styles (converted from style.css + mediaqueries.css)
├── package.json         # Dependencies and scripts
├── vercel.json          # Vercel deployment configuration
└── .gitignore           # Git ignore rules
```

## Key Changes Made

1. **React Components**: Split the HTML into reusable React components
2. **Event Handling**: Converted JavaScript functions to React event handlers
3. **State Management**: Used React hooks for menu toggle functionality
4. **Asset Management**: Moved all assets to `public/assets/` for proper React serving
5. **Styling**: Combined CSS files and updated asset paths
6. **Vercel Ready**: Added proper configuration for Vercel deployment

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (not recommended)

## Deployment

The app is configured to work with Vercel. Simply push your changes to your repository and Vercel will automatically build and deploy the React app.

## Features Preserved

- ✅ Responsive design with mobile hamburger menu
- ✅ Smooth scrolling navigation
- ✅ All original styling and animations
- ✅ Download resume functionality
- ✅ External links to GitHub and LinkedIn
- ✅ Project showcase with GitHub links
- ✅ Contact information
- ✅ All assets and images

## Next Steps

You can now:
1. Run `npm install` to install dependencies
2. Run `npm start` to test locally
3. Push to your repository for Vercel deployment
4. Add new features using React patterns
