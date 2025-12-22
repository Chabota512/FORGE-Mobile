import { offlineStorage } from './offlineStorage';

export const cacheManager = {
  async getCachedOrFetch<T>(
    key: string,
    fetchFn: () => Promise<T>,
    options: { cacheKey: keyof typeof offlineStorage; offline?: boolean } 
  ): Promise<T> {
    const { cacheKey, offline = false } = options;

    // If offline, try cache first
    if (offline || !navigator.onLine) {
      const cached = offlineStorage.loadData(cacheKey as any);
      if (cached) return cached as T;
    }

    // Try to fetch fresh data
    try {
      const fresh = await fetchFn();
      offlineStorage.saveData(cacheKey as any, fresh);
      return fresh;
    } catch (err) {
      // Fall back to cache if offline or fetch fails
      const cached = offlineStorage.loadData(cacheKey as any);
      if (cached) return cached as T;
      throw err;
    }
  },

  clearCache(key: keyof typeof offlineStorage): void {
    try {
      localStorage.removeItem(`forge_offline_${key}`);
    } catch (err) {
      console.error(`Failed to clear cache for ${key}:`, err);
    }
  },

  getAllCachedData() {
    return {
      user: offlineStorage.loadData('user'),
      courses: offlineStorage.loadData('courses'),
      missions: offlineStorage.loadData('missions'),
      dailySchedules: offlineStorage.loadData('dailySchedules'),
      academicCommitments: offlineStorage.loadData('academicCommitments'),
      books: offlineStorage.loadData('books'),
      conceptTracking: offlineStorage.loadData('conceptTracking'),
      settings: offlineStorage.loadData('settings'),
      notifications: offlineStorage.loadData('notifications'),
    };
  }
};
