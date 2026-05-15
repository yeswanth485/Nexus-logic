import { useAppContext } from '../context/AppContext';
import { useMemo } from 'react';

export function useLiveActivity() {
  const { state } = useAppContext();
  
  const activities = useMemo(() => {
    return state.activityLog
      .slice(0, 10)
      .map(entry => ({
        id: entry.id,
        time: new Date(entry.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        type: entry.severity, // Ensure type matches "success" | "warning" | "info" expected by UI
        status: entry.severity,
        title: entry.action,
        description: entry.detail,
      }));
  }, [state.activityLog]);
  
  return activities;
}
