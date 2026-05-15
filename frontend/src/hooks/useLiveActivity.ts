import { useState, useEffect } from "react";
import { format } from "date-fns";

type Activity = {
  id: string;
  type: "success" | "warning" | "info";
  time: string;
  title: string;
  description: string;
  status: string;
};

const INITIAL_ACTIVITIES: Activity[] = [
  { id: "1", type: "success", time: format(new Date(), "HH:mm:ss"), title: "NXL-089234 delivered", description: "— Chennai Warehouse B", status: "delivered" },
  { id: "2", type: "warning", time: format(new Date(Date.now() - 45000), "HH:mm:ss"), title: "ETA change: NXL-089187", description: "— +23 min delay (traffic)", status: "delayed" },
  { id: "3", type: "info", time: format(new Date(Date.now() - 120000), "HH:mm:ss"), title: "AI rerouted: Truck TN-02", description: "via NH-48 — saves 31 min", status: "optimized" },
  { id: "4", type: "warning", time: format(new Date(Date.now() - 300000), "HH:mm:ss"), title: "Fuel alert: MH-01-CD-7823", description: "— 15% tank remaining", status: "critical" },
];

export function useLiveActivity() {
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);

  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate real-time updates occasionally
      if (Math.random() > 0.7) {
        const newAct: Activity = {
          id: Math.random().toString(),
          type: "success",
          time: format(new Date(), "HH:mm:ss"),
          title: `NXL-${Math.floor(Math.random() * 100000).toString().padStart(6, '0')} update`,
          description: "Checkpoint cleared",
          status: "active"
        };
        setActivities(prev => [newAct, ...prev].slice(0, 20));
      }
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return activities;
}
