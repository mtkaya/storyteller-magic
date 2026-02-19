import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.storytellermagic.app',
  appName: 'Storyteller Magic',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 300,
      backgroundColor: '#1a1440',
      showSpinner: false
    },
    StatusBar: {
      style: 'light'
    }
  }
};

export default config;
