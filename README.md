<<<<<<< HEAD
# next-level-game-pro
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
<<<<<<< HEAD
>>>>>>> 8b6e6b9 (Initial commit from Create Next App)
=======



# 🎮 NEXPLAY — Online Gaming Platform

NEXPLAY is a responsive browser gaming platform where users can explore games, browse categories, search for their favorite games, and access game details. The platform uses Firebase Authentication and the GameArter Catalog API to provide a dynamic gaming experience.

## ✨ Features

- 🎮 **Dynamic Game Catalog** — Fetch games from the GameArter API.
- ⭐ **Featured Games** — Display six featured games on the homepage.
- 🔍 **Search Games** — Find games by name using the search feature.
- 🗂️ **Game Categories** — Browse games by genre, including Action, Adventure, Racing, Puzzle, Sports, and more.
- 📄 **Pagination** — Browse the game catalog page by page.
- 🔐 **Firebase Authentication** — Check the user's login status.
- 🚪 **Login-Based Navigation** — Show Login or Play Now actions depending on authentication status.
- 🕹️ **Game Details** — View individual game information and access supported browser games.
- 🌙 **Dark Mode** — Supports light and dark themes.
- 📱 **Responsive Design** — Optimized for mobile, tablet, and desktop screens.
- ⚡ **Loading and Error States** — Display loading placeholders and error messages while fetching games.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework and routing |
| React | User interface |
| JavaScript | Application logic |
| Tailwind CSS | Responsive styling |
| Firebase Authentication | User authentication |
| GameArter Catalog API | Game catalog and game information |
| Git & GitHub | Version control |

## 📂 Project Structure

```text
nexplay/
├── public/
├── src/
│   ├── app/
│   │   ├── game/
│   │   │   ├── [id]/
│   │   │   │   └── page.jsx
│   │   │   └── page.jsx
│   │   ├── login/
│   │   └── page.jsx
│   ├── components/
│   │   └── Featured.jsx
│   └── lib/
│       └── firebase.js
├── .env.local
├── .gitignore
├── package.json
└── README.md
```

*Note: The structure above represents the main files and may differ slightly depending on your project.*

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd nexplay
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your repository URL.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).

Enable the authentication providers you intend to use, and configure your authorized domains.

Add your Firebase configuration to `.env.local` using the environment variable names expected by your `src/lib/firebase.js` file.

For example:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Make sure these names match the variables used in your Firebase configuration file.

**Security:** Never commit private credentials or service account keys to GitHub. Keep `.env.local` out of version control.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm run start
```

## 🌐 API Integration

NEXPLAY uses the GameArter Catalog API to retrieve game information.

**Base URL:**

```text
https://www.gamearter.com/api/v1/catalog/games
```

| Endpoint | Purpose |
|---|---|
| `/api/v1/catalog/games?limit=12&offset=0` | Retrieve a page of games |
| `/api/v1/catalog/games/{slug}` | Retrieve details for a specific game |

The application uses API responses to display game titles, thumbnails, descriptions, categories, and other available information.

API availability, response fields, and third-party game embedding may depend on the API provider and individual games.

## 🔐 Authentication

Firebase Authentication is used to determine whether a user is signed in.

- Signed-out users see login actions.
- Signed-in users can access the game's details through the application interface.
- Login redirects can preserve the intended destination when supported by the login page.

**Important:** Hiding links or changing buttons is not sufficient to secure a route. The game details page must independently verify authentication if login is required to access it.

## 🎨 Design

NEXPLAY focuses on a clean, modern gaming interface with:

- Violet accent colors.
- Responsive game cards.
- Game thumbnails and category labels.
- Consistent spacing and rounded components.
- Light and dark theme styling.
- Mobile-friendly navigation and layouts.

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application |
| `npm run start` | Start the production server |
| `npm run lint` | Run lint checks if configured in `package.json` |

## 🚀 Deployment

You can deploy NEXPLAY using [Vercel](https://vercel.com/).

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add the required Firebase environment variables.
4. Deploy the project.
5. Add the deployed domain to Firebase Authentication's authorized domains.

Before deploying, verify the production build and test login, game navigation, API loading, and mobile responsiveness.

## 🔮 Future Improvements

- Personalized game recommendations.
- Favorites and saved games.
- Recently played games.
- Sorting by popularity or rating when reliable API data is available.
- Improved game discovery and filtering.
- User profiles and gaming history.
- Protected game routes.
- Better accessibility and performance optimization.

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a pull request.

## 📄 License

Choose and add an appropriate open-source license before distributing this project. Check the GameArter API and individual game licensing terms before redistributing third-party content.

---

**Built with ❤️ using Next.js, React, Firebase, and Tailwind CSS.**
>>>>>>> de7745f (Initial commit: NEXPLAY gaming platform)
