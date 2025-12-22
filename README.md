# Forge Mobile App

This folder contains the Capacitor configuration for wrapping the Forge web app into native mobile applications for iOS and Android.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the web app:
```bash
npm run build:web
```

3. Copy web assets:
```bash
npm run copy:web
```

4. Install Capacitor platforms:
```bash
npx cap add android
npx cap add ios
```

## Development

### Android Development
```bash
npm run android
```
This opens Android Studio with the project ready to run on emulator or device.

### iOS Development
```bash
npm run ios
```
This opens Xcode with the project ready to run on simulator or device.

## Building for Release

### Android APK/AAB
```bash
npm run build:android
```
Output files will be in `android/app/build/outputs/`

### iOS App
```bash
npm run build:ios
```

## Deployment

The GitHub Actions workflow automatically builds both Android and iOS apps when you push changes.

Apps are published to GitHub Releases and downloadable via GitHub Pages.
