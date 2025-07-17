## FINDRR

FINDRR is a modern job listing and application platform built with React and Vite. It allows users to browse, post, and manage job listings, as well as save jobs and track applications. The project features a clean UI, protected routes, and a modular component structure.

## Features
- Browse job listings and detailed job pages
- Post new jobs (for employers)
- Save jobs for later
- Track your job applications
- Onboarding flow for new users
- Protected routes for authenticated access
- Theming support (dark mode by default)

## Tech Stack
- **Frontend:** React, Vite, React Router
- **Styling:** CSS Modules
- **State Management:** React Context/State
- **API:** Local mock data and API utility modules

## Project Structure
```
components.json
public/           # Static assets (logos, images)
src/
  api/            # API utility modules
  assets/         # Static assets for React
  components/     # Reusable UI components
  data/           # Local JSON data (companies, FAQs)
  hooks/          # Custom React hooks
  layouts/        # Layout components
  lib/            # Utility functions
  pages/          # Main app pages (job listing, onboarding, etc.)
  utils/          # Supabase and other utilities
  App.jsx         # Main app entry
  main.jsx        # App bootstrap
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/FINDRR.git
   cd FINDRR
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Running the App
Start the development server:
```sh
npm run dev
# or
yarn dev
```
The app will be available at `http://localhost:5173` by default.

### Building for Production
```sh
npm run build
# or
yarn build
```

### Linting
```sh
npm run lint
# or
yarn lint
```

## Customization
- Update company logos and images in `public/companies/`.
- Modify job data and FAQs in `src/data/`.
- Adjust theming in `src/components/theme-provider.jsx`.

## License
This project is licensed under the MIT License.
