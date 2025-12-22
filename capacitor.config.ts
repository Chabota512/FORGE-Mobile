import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.forge.app',
  appName: 'Forge',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
    StatusBar: {
      style: 'dark'
    }
  }
};

export default config;
