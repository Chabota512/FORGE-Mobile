// Offline storage utility for caching app data
const STORAGE_PREFIX = 'forge_offline_';

export interface OfflineStorageData {
  user?: any;
  courses?: any[];
  missions?: any[];
  dailySchedules?: any[];
  academicCommitments?: any[];
  books?: any[];
  conceptTracking?: any[];
  settings?: any[];
  notifications?: any[];
  proofsMetadata?: any[];
}

interface SyncStatus {
  lastSynced: string | null;
  isSyncing: boolean;
  lastError: string | null;
  pendingChanges: Record<string, any>;
}

export const offlineStorage = {
  // Save data to localStorage
  saveData(key: keyof OfflineStorageData, data: any): void {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(data));
    } catch (err) {
      console.error(`Failed to save offline data for ${key}:`, err);
    }
  },

  // Load data from localStorage
  loadData(key: keyof OfflineStorageData): any {
    try {
      const data = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error(`Failed to load offline data for ${key}:`, err);
      return null;
    }
  },

  // Save sync status
  saveSyncStatus(status: Partial<SyncStatus>): void {
    try {
      const current = this.getSyncStatus();
      const updated = { ...current, ...status };
      localStorage.setItem(`${STORAGE_PREFIX}sync_status`, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save sync status:', err);
    }
  },

  // Get sync status
  getSyncStatus(): SyncStatus {
    try {
      const data = localStorage.getItem(`${STORAGE_PREFIX}sync_status`);
      return data ? JSON.parse(data) : {
        lastSynced: null,
        isSyncing: false,
        lastError: null,
        pendingChanges: {}
      };
    } catch (err) {
      return {
        lastSynced: null,
        isSyncing: false,
        lastError: null,
        pendingChanges: {}
      };
    }
  },

  // Add pending change to sync queue
  addPendingChange(key: string, data: any): void {
    try {
      const status = this.getSyncStatus();
      status.pendingChanges[key] = data;
      this.saveSyncStatus(status);
    } catch (err) {
      console.error('Failed to add pending change:', err);
    }
  },

  // Clear all offline data
  clearAll(): void {
    try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith(STORAGE_PREFIX));
      keys.forEach(key => localStorage.removeItem(key));
    } catch (err) {
      console.error('Failed to clear offline data:', err);
    }
  }
};
