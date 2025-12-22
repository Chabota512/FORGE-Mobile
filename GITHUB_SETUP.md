# GitHub Actions Setup Guide

This guide shows how to build your Forge Android app automatically on GitHub without using your local computer.

## 1. Create a GitHub Repository

If you haven't already:

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Forge with mobile app"

# Create repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/forge
git branch -M main
git push -u origin main
```

## 2. Enable GitHub Actions

1. Go to your repository on GitHub
2. Click **Settings** → **Actions** → **General**
3. Under "Actions permissions", select **"Allow all actions and reusable workflows"**
4. Click **Save**

## 3. Automatic Builds

The workflow in `.github/workflows/build-android.yml` automatically builds your app whenever you:

- **Push to main branch** (for web/server/mobile changes)
- **Manually trigger** (via Actions tab)

### What Gets Built

**Debug APK** (always)
- Use for testing on emulator/device
- Faster to build
- Not signed for production

**Release APK** (always attempted)
- Use for distribution
- Unsigned (you'll sign before distributing)

### Download Build Artifacts

1. Go to your repository
2. Click **Actions** tab
3. Click the latest workflow run
4. Scroll to **Artifacts** section
5. Download `forge-debug-apk` or `forge-release-apk`

## 4. Create Releases

To create a GitHub Release with downloadable APKs:

```bash
# Create a version tag
git tag v1.0.0

# Push the tag
git push origin v1.0.0
```

This automatically:
1. Builds the app
2. Creates a GitHub Release
3. Attaches the APKs for download

## 5. Enable GitHub Pages (Optional)

To host the app landing page:

1. Go to **Settings** → **Pages**
2. Under "Source", select **Deploy from a branch**
3. Select **main** branch
4. Select **/mobile/docs** folder
5. Click **Save**

Your landing page will be available at: `https://YOUR_USERNAME.github.io/forge/`

## 6. Manual Workflow Trigger

To manually build without pushing:

1. Go to **Actions** tab
2. Click **Build Android App**
3. Click **Run workflow** → **Run workflow**

## Workflow Details

### When It Builds

The `build-android.yml` workflow runs when:
- You push changes to `main` branch
- Any of these paths change:
  - `client/` (frontend)
  - `server/` (backend)
  - `shared/` (shared code)
  - `mobile/` (mobile config)
  - `package.json` (dependencies)

### What It Does

1. **Checkout** your code
2. **Setup** Node.js 20 and Java 17
3. **Build** the web app (`npm run build`)
4. **Copy** web assets to mobile/www
5. **Install** mobile dependencies
6. **Sync** with Capacitor
7. **Build** Android APKs (debug + release)
8. **Upload** artifacts (available for 30 days)
9. **Create Release** (if tagged)

### View Build Logs

1. Go to **Actions** tab
2. Click the workflow run
3. Click **build** job
4. Expand each step to see logs

## Signing Your App (For App Stores)

### Generate Signing Key

Once your app builds successfully, you can sign it for distribution:

```bash
# Generate a keystore (one time only)
keytool -genkey -v -keystore release.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias release -noprompt \
  -dname "CN=Your Name,O=Your Company,L=City,S=State,C=US" \
  -storepass your_password \
  -keypass your_password
```

### Store the Key Securely

1. Keep `release.keystore` safe
2. Never commit it to git
3. For CI/CD, encode it as Base64:
   ```bash
   base64 release.keystore > release.keystore.base64
   ```

4. Add to GitHub Secrets:
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `SIGNING_KEYSTORE`
   - Value: (paste the base64 content)
   - Name: `SIGNING_KEY_ALIAS`
   - Value: `release`
   - Name: `SIGNING_KEY_PASSWORD`
   - Value: (your keystore password)

## Distributing Your App

### Google Play Store

1. Create Android Developer account
2. Create app in Google Play Console
3. Download Release APK from GitHub Actions
4. Sign it (see "Signing Your App" above)
5. Upload APK to Play Store

### Direct Distribution (APK)

1. Download APK from GitHub Actions
2. Share directly with users
3. Users install from Settings → Security → Unknown Sources

### F-Droid (Open Source)

1. Push your code to public GitHub
2. Submit to F-Droid
3. Automatic builds on their servers

## Troubleshooting

### Build Failed

1. Go to **Actions** tab
2. Click failed workflow
3. Expand steps to find error
4. Common issues:
   - Node/Java not cached properly
   - Gradle build issues
   - Web app build failed

### Artifacts Not Available

- Builds expire after 30 days
- Always download and save important versions
- Create GitHub Releases for long-term storage

### Workflow Not Triggering

- Check "Actions permissions" are enabled
- Push should trigger automatically
- Try manual trigger via Actions tab

## Next Steps

1. ✅ Commit and push code to GitHub
2. ✅ Enable GitHub Actions in Settings
3. ✅ Wait for first build (check Actions tab)
4. ✅ Download and test the Debug APK
5. ✅ Create a `v1.0.0` tag and push
6. ✅ Download from GitHub Release
7. ✅ Sign and distribute!

You now have a fully automated build pipeline! 🚀
