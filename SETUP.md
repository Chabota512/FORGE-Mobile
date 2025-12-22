# Forge Mobile App Setup Guide

This guide walks you through building and deploying the Forge mobile app using Capacitor and GitHub Pages.

## Prerequisites

- Node.js 18+ and npm
- Android Studio (for Android builds)
- Xcode (for iOS builds - macOS only)
- Git

## Quick Start

### 1. Clone and Setup

```bash
# Clone the main Forge repository
git clone https://github.com/yourusername/forge
cd forge

# Install dependencies
npm install
```

### 2. Build the Web App

```bash
npm run build
```

This creates the production build in the `dist/` folder.

### 3. Setup Mobile Project

```bash
cd mobile
npm install
npx cap init
```

### 4. Copy Web Assets

```bash
cp -r ../dist/public www/
npx cap sync
```

### 5. Build for Android

```bash
npx cap add android
npx cap open android

# In Android Studio:
# Build → Build Bundle(s)/APK(s) → Build APK(s)
```

### 6. Build for iOS

```bash
npx cap add ios
npx cap open ios

# In Xcode:
# Product → Archive → Distribute App
```

## Automated Building with GitHub Actions

The workflow in `.github/workflows/build-apps.yml` automatically:
1. Builds the web app when you push to main
2. Copies assets to the mobile project
3. Builds Android APK
4. Creates GitHub Releases with downloadable APKs

### Enable GitHub Actions

1. Push this folder to GitHub:
```bash
git add mobile/
git commit -m "Add mobile app wrapper"
git push
```

2. Go to your GitHub repository
3. Click Settings → Pages
4. Set source to "Deploy from a branch"
5. Select `main` branch and `mobile/docs` folder
6. GitHub Pages will automatically serve the landing page

### Create Release Tags

To trigger app releases:

```bash
git tag v1.0.0
git push origin v1.0.0
```

GitHub Actions will automatically build the apps and create a release.

## Development Workflow

### Hot Reload During Development

```bash
# Terminal 1: Start web dev server
npm run dev:client

# Terminal 2: In mobile folder, sync changes
cd mobile
npx cap sync
npx cap open android/ios
```

### Test Changes

1. Make code changes in the main app
2. Run `npx cap sync` to copy changes
3. Reload the app in Android Studio/Xcode or on device

## Building APKs for Distribution

### Android Release APK

```bash
cd mobile/android
./gradlew assembleRelease
# Output: app/build/outputs/apk/release/app-release.apk
```

### Android App Bundle (For Google Play)

```bash
cd mobile/android
./gradlew bundleRelease
# Output: app/build/outputs/bundle/release/app-release.aab
```

## Signing Apps

### Android Signing

Generate a signing key:
```bash
keytool -genkey -v -keystore release.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias release
```

Configure in `mobile/android/app/build.gradle`:
```gradle
signingConfigs {
    release {
        storeFile file('release.keystore')
        storePassword 'your-password'
        keyAlias 'release'
        keyPassword 'your-password'
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
    }
}
```

## Distribution

### Google Play Store
1. Create Google Play Developer account
2. Create app listing
3. Upload APK or AAB from `app/build/outputs/`
4. Fill in store listing details and submit for review

### iOS App Store
1. Create Apple Developer account
2. Create app in App Store Connect
3. Archive in Xcode and upload
4. Fill in app details and submit for review

### GitHub Pages
Apps are automatically available for download from the GitHub Pages link.

## Troubleshooting

### Build Fails
- Ensure `npm run build` works first
- Check that `www/` directory exists with web assets
- Run `npx cap sync` after any changes

### Android Studio Issues
- Clear gradle cache: `./gradlew clean`
- Invalidate caches in Android Studio: File → Invalidate Caches

### iOS Build Issues
- Update Pods: `pod repo update`
- Clean build folder: `Cmd + Shift + K`

## Next Steps

1. Update `capacitor.config.ts` with your actual app details
2. Create app icons and splash screens
3. Set up code signing certificates
4. Configure app store listings
5. Submit to app stores
