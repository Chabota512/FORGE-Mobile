import { App as CapacitorApp } from '@capacitor/app'

// Initialize Capacitor app
CapacitorApp.addListener('backButton', ({ canGoBack }) => {
  if (!canGoBack) {
    CapacitorApp.exitApp()
  }
})

console.log('FORGE Mobile App Initialized')
