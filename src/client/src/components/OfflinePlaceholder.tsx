import { AlertCircle, Wifi } from 'lucide-react';

interface OfflinePlaceholderProps {
  feature: string;
}

export default function OfflinePlaceholder({ feature }: OfflinePlaceholderProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center border border-border rounded-none p-8 bg-slate-900/30">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-500/10 rounded-none border border-red-500/30">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>
        
        <h2 className="text-xl font-bold font-display mb-3 text-foreground">
          OFFLINE_MODE
        </h2>
        
        <p className="text-sm font-mono text-muted-foreground mb-6">
          {feature} requires an internet connection. Please reconnect to use this feature.
        </p>
        
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-yellow-600/70 bg-yellow-500/5 border border-yellow-500/20 p-3 rounded-none">
          <Wifi className="w-3 h-3" />
          <span>STATUS: NO_CONNECTION</span>
        </div>
      </div>
    </div>
  );
}
