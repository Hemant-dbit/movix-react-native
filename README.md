# Movix

A modern, cross-platform movie discovery application built with React Native and Expo. Movix provides users with a comprehensive platform to discover trending movies, search for specific titles, save favorites, and explore detailed movie information through an intuitive mobile interface.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Additional Resources](#additional-resources)
- [Contributing](#contributing)

## Features

- **Home Screen**: Browse and discover movies with an elegant, user-friendly interface
- **Advanced Search**: Quickly find movies using powerful search functionality
- **Saved Movies**: Bookmark favorite movies for convenient future access
- **User Profiles**: Manage personal preferences and account settings
- **Movie Details**: Access comprehensive information including synopsis, cast, ratings, and more
- **Cross-Platform Support**: Seamless experience across iOS, Android, and web platforms
- **Modern UI**: Responsive design with smooth animations and transitions

## Technology Stack

### Core Technologies

- **Framework**: [Expo](https://expo.dev) (~54.0.30) with React Native (0.81.5)
- **Language**: TypeScript (~5.9.2)
- **State Management**: React 19.1.0 with modern hooks

### Navigation & Routing

- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (~6.0.21)
- File-based routing system for intuitive navigation structure

### Styling & UI

- **Styling Framework**: [NativeWind](https://www.nativewind.dev/) (^4.2.1)
- Tailwind CSS integration for React Native
- React Native core components with custom styling
- **Animations**: React Native Reanimated (~3.17.4)

### Assets & Icons

- Expo Vector Icons
- Custom icon sets and image assets

## Project Structure

```
movix/
├── app/                    # File-based routing (Expo Router)
│   ├── (tabs)/            # Tab-based navigation
│   │   ├── index.tsx      # Home screen
│   │   ├── search.tsx     # Search screen
│   │   ├── saved.tsx      # Saved movies screen
│   │   └── profile.tsx    # Profile screen
│   ├── movies/            # Movie details screens
│   │   └── [id].tsx       # Dynamic movie detail page
│   ├── _layout.tsx        # Root layout
│   └── globals.css        # Global styles
├── assets/                # Static assets
│   ├── fonts/            # Custom fonts
│   ├── icons/            # Icon images
│   └── images/           # App images and graphics
├── components/           # Reusable components
│   ├── MovieCard.tsx     # Movie card component
│   ├── SearchBar.tsx     # Search component
│   └── TrendingCard.tsx  # Trending movie card
├── constants/            # App constants
│   ├── icons.ts          # Icon exports
│   └── images.ts         # Image exports
├── interfaces/           # TypeScript interfaces
│   └── interfaces.d.ts   # Type definitions
├── services/             # API and backend services
│   ├── api.ts           # API service
│   ├── appwrite.ts      # Appwrite backend
│   └── useFetch.ts      # Custom fetch hook
└── types/                # TypeScript type definitions
    └── images.d.ts       # Image type definitions
```

## Getting Started

### System Requirements

- **Node.js**: Version 16.x or higher
- **Package Manager**: npm or yarn
- **Expo CLI**: Latest version
- **Development Environment**:
  - iOS Simulator (macOS only)
  - Android Emulator or physical device

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/movix.git
   cd movix
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

### Running the Application

After starting the development server, you have several options:

#### Using Expo CLI Commands

```bash
npm start           # Start Expo development server
npm run android     # Launch on Android emulator/device
npm run ios         # Launch on iOS simulator/device (macOS only)
npm run web         # Launch in web browser
```

#### Interactive Mode

From the terminal:

- Press `a` to open on Android emulator
- Press `i` to open on iOS simulator (macOS only)
- Press `w` to open in web browser

#### Physical Device

Scan the QR code displayed in the terminal using the [Expo Go](https://expo.dev/go) app on your mobile device.

## Development

### Styling with NativeWind

This project uses **NativeWind**, which brings Tailwind CSS utility classes to React Native. All styling is done using Tailwind utility classes:

```tsx
<View className="flex-1 bg-primary px-5">
  <Text className="text-lg font-bold text-white">Hello Movix!</Text>
</View>
```

To customize the theme, modify the configuration in `tailwind.config.js`.

### Application Architecture

#### Tab Navigation

The application uses a tab-based navigation system with four main sections:

- **Home**: Discover and browse trending movies
- **Search**: Find specific movies using search functionality
- **Saved**: Access bookmarked movies
- **Profile**: Manage account settings and preferences

#### Dynamic Routing

Movie details are rendered using dynamic routing patterns. Navigate to `/movies/[id]` to view detailed information for any specific movie.


## Additional Resources

- [Expo Documentation](https://docs.expo.dev/) - Comprehensive guide to Expo development
- [Expo Router Guide](https://docs.expo.dev/router/introduction/) - File-based routing documentation
- [NativeWind Documentation](https://www.nativewind.dev/) - Tailwind CSS for React Native
- [React Native Documentation](https://reactnative.dev/) - Official React Native documentation
- [TypeScript Documentation](https://www.typescriptlang.org/) - TypeScript language reference

## Contributing

Contributions are welcome and appreciated. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests where applicable.


**Developed with React Native and Expo**
