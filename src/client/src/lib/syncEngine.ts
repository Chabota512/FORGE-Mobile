import { offlineStorage } from './offlineStorage';
import { getApiUrl } from './queryClient';

export interface SyncChangeItem {
  type: 'mission_status' | 'settings' | 'schedule_edit' | 'mission_complete';
  data: any;
  timestamp: number;
}

export const syncEngine = {
  initSync() {
    // Listen for online event
    window.addEventListener('forge-online', () => {
      this.triggerSync();
    });

    // Auto-sync every 5 minutes if online
    setInterval(() => {
      if (navigator.onLine) {
        this.triggerSync();
      }
    }, 5 * 60 * 1000);
  },

  async triggerSync() {
    const status = offlineStorage.getSyncStatus();
    
    if (status.isSyncing) return; // Already syncing

    offlineStorage.saveSyncStatus({ isSyncing: true });

    try {
      const pendingChanges = Object.entries(status.pendingChanges);
      
      for (const [key, data] of pendingChanges) {
        try {
          await this.syncChange(key, data);
          // Remove from pending after successful sync
          delete status.pendingChanges[key];
        } catch (err) {
          console.error(`Failed to sync ${key}:`, err);
          offlineStorage.saveSyncStatus({
            lastError: `Failed to sync ${key}`
          });
        }
      }

      offlineStorage.saveSyncStatus({
        isSyncing: false,
        lastSynced: new Date().toISOString(),
        lastError: null,
        pendingChanges: status.pendingChanges
      });

      // Dispatch sync complete event
      window.dispatchEvent(new Event('forge-sync-complete'));
    } catch (err) {
      offlineStorage.saveSyncStatus({
        isSyncing: false,
        lastError: String(err)
      });
    }
  },

  async syncChange(key: string, data: any): Promise<void> {
    const res = await fetch(getApiUrl('/api/sync'), {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, data })
    });

    if (!res.ok) {
      throw new Error(`Sync request failed: ${res.statusText}`);
    }
  },

  addPendingChange(type: SyncChangeItem['type'], data: any) {
    const change: SyncChangeItem = {
      type,
      data,
      timestamp: Date.now()
    };
    offlineStorage.addPendingChange(type, change);
  },

  getSyncStatus() {
    return offlineStorage.getSyncStatus();
  }
};
