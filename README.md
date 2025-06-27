# 100 Days of LeetCode Tracker

A beautiful, production-ready web application to track your #100DaysOfLeetCode journey with blog functionality and image uploads.

## Features

### 📊 Progress Tracking
- **Daily Posts**: Document your daily LeetCode progress
- **Statistics Dashboard**: Comprehensive analytics and progress visualization
- **Pattern Recognition**: Track and analyze problem-solving patterns
- **Streak Tracking**: Monitor your consistency and longest streaks

### 📝 Blog System
- **Rich Blog Editor**: Create detailed solution explanations and tutorials
- **Image Upload**: Add screenshots and diagrams to your posts and blogs
- **Preview Mode**: See how your blog will look before publishing
- **Tagging System**: Organize content with tags and categories

### 🔐 Access Control
- **Owner Mode**: Full edit/delete capabilities for the owner
- **Viewer Mode**: Read-only access for other visitors
- **Data Persistence**: All data stored locally in browser

### 🎨 Beautiful Design
- **Modern UI**: Clean, professional interface with smooth animations
- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Themes**: Automatic theme adaptation
- **Micro-interactions**: Engaging hover effects and transitions

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Storage**: LocalStorage (client-side)

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/leetcode-tracker.git
cd leetcode-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment Guide

### Option 1: Render (Recommended)

1. **Create a Render Account**: Go to [render.com](https://render.com) and sign up

2. **Connect Your Repository**: 
   - Push your code to GitHub
   - In Render dashboard, click "New" → "Static Site"
   - Connect your GitHub repository

3. **Configure Build Settings**:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Node Version**: 18

4. **Environment Variables** (if needed):
   - Add any environment variables in the Render dashboard

5. **Deploy**: Click "Create Static Site"

Your app will be live at `https://your-app-name.onrender.com`

### Option 2: Netlify

1. **Build the project**:
```bash
npm run build
```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder to deploy
   - Or connect your GitHub repository for automatic deployments

### Option 3: Vercel

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
vercel --prod
```

## Access Control Setup

### For Owner Access (You):
- Set `isOwner` to `true` in `src/App.tsx` (line 18)
- You'll have full edit/delete capabilities

### For Viewer Access (Others):
- The app automatically detects viewer mode
- Viewers can see all content but cannot modify anything
- Edit/delete buttons are hidden for viewers

### Making it Secure:
For production use, consider implementing:
- Authentication system (Firebase Auth, Auth0, etc.)
- Backend API for data persistence
- Role-based access control

## Data Storage

Currently, the app uses browser localStorage for data persistence. This means:
- ✅ No backend required
- ✅ Fast and responsive
- ✅ Works offline
- ⚠️ Data is device-specific
- ⚠️ Data can be lost if browser data is cleared

For production use with multiple users, consider integrating:
- Firebase Firestore
- Supabase
- MongoDB Atlas
- PostgreSQL with a backend API

## Customization

### Changing Owner Information:
Edit the profile information in:
- `src/App.tsx` (profile section)
- `src/components/StatsCard.tsx` (header)

### Styling:
- Colors and themes: `tailwind.config.js`
- Component styles: Individual component files
- Global styles: `src/index.css`

### Adding Features:
The codebase is modular and well-organized:
- `src/components/`: React components
- `src/types/`: TypeScript type definitions
- `src/utils/`: Utility functions
- `src/hooks/`: Custom React hooks

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you find this project helpful, please give it a ⭐ on GitHub!

For questions or support, please open an issue on GitHub.

---

**Happy Coding! 🚀**

Start your #100DaysOfLeetCode journey today and track your progress like a pro!