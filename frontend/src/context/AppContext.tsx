import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ShipmentStatus = 'active' | 'delayed' | 'delivered' | 'pending';
export type Severity = 'info' | 'warning' | 'success' | 'error';
export type VehicleStatus = 'active' | 'maintenance' | 'idle';
export type UserRole = 'Admin' | 'Editor' | 'Viewer';
export type ReportStatus = 'generating' | 'ready' | 'failed';
export type Theme = 'dark' | 'light';

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  eta: string;
  driver: string;
  vehicle: string;
  progress: number;
  cargo: string;
  weight: string;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  type: string;
  driver: string;
  status: VehicleStatus;
  fuelEff: number;
  speed: number;
  location: string;
  fuelLevel: number;
  mileage: number;
  lastService: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  tab: string;
  action: string;
  detail: string;
  severity: Severity;
}

export interface Notification {
  id: string;
  type: Severity;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface RiskAlert {
  id: string;
  type: 'Supplier' | 'Weather' | 'Operational' | 'Geopolitical';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  timestamp: string;
  acknowledged: boolean;
  mitigated: boolean;
}

export interface Report {
  id: string;
  name: string;
  type: 'Fleet' | 'Inventory' | 'Risk' | 'Sustainability' | 'Custom';
  status: ReportStatus;
  createdAt: string;
  data: Record<string, unknown>;
}

export interface Integration {
  id: string;
  name: string;
  logo: string;
  connected: boolean;
  lastSync: string | null;
  config: Record<string, string>;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  phone: string;
  company: string;
}

export interface AppSettings {
  emailNotifs: boolean;
  pushNotifs: boolean;
  smsNotifs: boolean;
  theme: Theme;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  createdAt: string;
}

// ─── State ────────────────────────────────────────────────────────────────────

interface AppState {
  shipments: Shipment[];
  vehicles: Vehicle[];
  activityLog: LogEntry[];
  notifications: Notification[];
  riskAlerts: RiskAlert[];
  reports: Report[];
  integrations: Integration[];
  profile: UserProfile;
  settings: AppSettings;
  users: AppUser[];
}

// ─── Initial Data ─────────────────────────────────────────────────────────────

const INITIAL_SHIPMENTS: Shipment[] = [
  { id: 'NL-2401', origin: 'Mumbai', destination: 'Delhi', status: 'active', eta: '2025-02-15', driver: 'Rajan Kumar', vehicle: 'TN-01-AB-1234', progress: 65, cargo: 'Electronics', weight: '2.4T', createdAt: '2025-02-10' },
  { id: 'NL-2402', origin: 'Chennai', destination: 'Bangalore', status: 'delayed', eta: '2025-02-13', driver: 'Suresh Patel', vehicle: 'MH-02-CD-5678', progress: 30, cargo: 'Automotive Parts', weight: '5.1T', createdAt: '2025-02-09' },
  { id: 'NL-2403', origin: 'Delhi', destination: 'Kolkata', status: 'active', eta: '2025-02-16', driver: 'Amit Singh', vehicle: 'DL-03-EF-9012', progress: 82, cargo: 'Pharmaceuticals', weight: '1.8T', createdAt: '2025-02-11' },
  { id: 'NL-2404', origin: 'Hyderabad', destination: 'Mumbai', status: 'pending', eta: '2025-02-18', driver: 'Vikram Rao', vehicle: 'AP-04-GH-3456', progress: 0, cargo: 'Textiles', weight: '3.2T', createdAt: '2025-02-12' },
  { id: 'NL-2405', origin: 'Pune', destination: 'Ahmedabad', status: 'delivered', eta: '2025-02-12', driver: 'Priya Nair', vehicle: 'MH-05-IJ-7890', progress: 100, cargo: 'FMCG', weight: '4.5T', createdAt: '2025-02-08' },
  { id: 'NL-2406', origin: 'Jaipur', destination: 'Surat', status: 'active', eta: '2025-02-17', driver: 'Karan Mehta', vehicle: 'RJ-06-KL-1234', progress: 45, cargo: 'Machine Parts', weight: '6.0T', createdAt: '2025-02-11' },
  { id: 'NL-2407', origin: 'Lucknow', destination: 'Bhopal', status: 'delayed', eta: '2025-02-14', driver: 'Deepak Yadav', vehicle: 'UP-07-MN-5678', progress: 20, cargo: 'Cold Storage', weight: '2.9T', createdAt: '2025-02-10' },
  { id: 'NL-2408', origin: 'Nagpur', destination: 'Indore', status: 'pending', eta: '2025-02-19', driver: 'Ramesh Joshi', vehicle: 'MH-08-OP-9012', progress: 0, cargo: 'Raw Materials', weight: '7.3T', createdAt: '2025-02-12' },
];

const INITIAL_VEHICLES: Vehicle[] = [
  { id: 'VH-001', type: 'Heavy Truck', driver: 'Rajan Kumar', status: 'active', fuelEff: 8.2, speed: 72, location: 'NH-44 near Nagpur', fuelLevel: 68, mileage: 142500, lastService: '2025-01-15' },
  { id: 'VH-002', type: 'Medium Truck', driver: 'Suresh Patel', status: 'maintenance', fuelEff: 6.8, speed: 0, location: 'Chennai Depot', fuelLevel: 45, mileage: 98320, lastService: '2025-02-01' },
  { id: 'VH-003', type: 'Light Van', driver: 'Amit Singh', status: 'active', fuelEff: 12.5, speed: 88, location: 'Agra Bypass', fuelLevel: 82, mileage: 67890, lastService: '2025-01-28' },
  { id: 'VH-004', type: 'Heavy Truck', driver: 'Vikram Rao', status: 'idle', fuelEff: 7.9, speed: 0, location: 'Hyderabad Warehouse', fuelLevel: 91, mileage: 203410, lastService: '2024-12-20' },
  { id: 'VH-005', type: 'Medium Truck', driver: 'Priya Nair', status: 'active', fuelEff: 9.1, speed: 65, location: 'Mumbai-Pune Expressway', fuelLevel: 55, mileage: 115670, lastService: '2025-01-10' },
  { id: 'VH-006', type: 'Light Van', driver: 'Karan Mehta', status: 'active', fuelEff: 11.3, speed: 78, location: 'Rajasthan Highway', fuelLevel: 73, mileage: 45230, lastService: '2025-02-05' },
];

const INITIAL_RISK_ALERTS: RiskAlert[] = [
  { id: 'RA-001', type: 'Supplier', severity: 'critical', title: 'Supplier Disruption — Supplier #247', description: 'Primary auto-parts supplier reports 40% capacity reduction due to factory fire', timestamp: new Date().toISOString(), acknowledged: false, mitigated: false },
  { id: 'RA-002', type: 'Weather', severity: 'high', title: 'Cyclone Warning — Bay of Bengal', description: 'Cyclone Michaung approaching Chennai coast, may affect 12 active shipments', timestamp: new Date().toISOString(), acknowledged: false, mitigated: false },
  { id: 'RA-003', type: 'Geopolitical', severity: 'medium', title: 'Border Delays — Indo-Nepal Border', description: 'Increased customs inspection times causing 4-6 hour delays', timestamp: new Date().toISOString(), acknowledged: true, mitigated: false },
  { id: 'RA-004', type: 'Operational', severity: 'low', title: 'Driver Hours Compliance', description: '3 drivers approaching maximum permissible hours limit', timestamp: new Date().toISOString(), acknowledged: false, mitigated: false },
];

const INITIAL_INTEGRATIONS: Integration[] = [
  { id: 'int-1', name: 'SAP ERP', logo: 'SA', connected: true, lastSync: '2025-02-12 14:30', config: {} },
  { id: 'int-2', name: 'Oracle TMS', logo: 'OR', connected: false, lastSync: null, config: {} },
  { id: 'int-3', name: 'Google Maps Platform', logo: 'GM', connected: true, lastSync: '2025-02-12 16:45', config: {} },
  { id: 'int-4', name: 'WhatsApp Business API', logo: 'WA', connected: false, lastSync: null, config: {} },
  { id: 'int-5', name: 'NHAI FASTag', logo: 'NH', connected: true, lastSync: '2025-02-12 12:00', config: {} },
  { id: 'int-6', name: 'Samsara ELD', logo: 'SM', connected: false, lastSync: null, config: {} },
];

const INITIAL_REPORTS: Report[] = [
  { id: 'RPT-001', name: 'Q2 Fleet Performance', type: 'Fleet', status: 'ready', createdAt: '2025-02-01', data: { records: 342, dateRange: { from: '2025-01-01', to: '2025-03-31' } } },
  { id: 'RPT-002', name: 'Supplier SLA Adherence', type: 'Risk', status: 'ready', createdAt: '2025-02-05', data: { records: 178, dateRange: { from: '2025-01-01', to: '2025-02-05' } } },
];

const INITIAL_USERS: AppUser[] = [
  { id: 'USR-001', name: 'Arjun Sharma', email: 'arjun@nexuslogix.com', role: 'Admin', status: 'active', createdAt: '2024-01-15' },
  { id: 'USR-002', name: 'Priya Kapoor', email: 'priya@nexuslogix.com', role: 'Editor', status: 'active', createdAt: '2024-03-20' },
  { id: 'USR-003', name: 'Dev Anand', email: 'dev@nexuslogix.com', role: 'Viewer', status: 'active', createdAt: '2024-06-10' },
  { id: 'USR-004', name: 'Meena Raj', email: 'meena@nexuslogix.com', role: 'Editor', status: 'inactive', createdAt: '2024-09-05' },
];

const INITIAL_STATE: AppState = {
  shipments: INITIAL_SHIPMENTS,
  vehicles: INITIAL_VEHICLES,
  activityLog: [],
  notifications: [],
  riskAlerts: INITIAL_RISK_ALERTS,
  reports: INITIAL_REPORTS,
  integrations: INITIAL_INTEGRATIONS,
  profile: {
    name: 'Arjun Sharma',
    email: 'arjun.sharma@nexuslogix.com',
    role: 'Fleet Operations Manager',
    phone: '+91 98765 43210',
    company: 'Nexus Logix Pvt. Ltd.',
  },
  settings: {
    emailNotifs: true,
    pushNotifs: true,
    smsNotifs: false,
    theme: 'dark',
  },
  users: INITIAL_USERS,
};

// ─── Action Types ─────────────────────────────────────────────────────────────

type Action =
  | { type: 'ADD_SHIPMENT'; payload: Shipment }
  | { type: 'UPDATE_SHIPMENT'; payload: Shipment }
  | { type: 'ADD_VEHICLE'; payload: Vehicle }
  | { type: 'UPDATE_VEHICLE'; payload: Vehicle }
  | { type: 'ADD_LOG'; payload: LogEntry }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'MARK_ALL_READ' }
  | { type: 'ACKNOWLEDGE_RISK'; payload: string }
  | { type: 'MITIGATE_RISK'; payload: string }
  | { type: 'ADD_RISK_ALERT'; payload: RiskAlert }
  | { type: 'ADD_REPORT'; payload: Report }
  | { type: 'UPDATE_REPORT'; payload: Report }
  | { type: 'DELETE_REPORT'; payload: string }
  | { type: 'TOGGLE_INTEGRATION'; payload: { id: string; connected: boolean; lastSync: string | null } }
  | { type: 'UPDATE_PROFILE'; payload: UserProfile }
  | { type: 'UPDATE_SETTINGS'; payload: AppSettings }
  | { type: 'ADD_USER'; payload: AppUser }
  | { type: 'UPDATE_USER'; payload: AppUser }
  | { type: 'DELETE_USER'; payload: string };

// ─── Reducer ──────────────────────────────────────────────────────────────────

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_SHIPMENT':
      return { ...state, shipments: [...state.shipments, action.payload] };

    case 'UPDATE_SHIPMENT':
      return {
        ...state,
        shipments: state.shipments.map(s => s.id === action.payload.id ? action.payload : s),
      };

    case 'ADD_VEHICLE':
      return { ...state, vehicles: [...state.vehicles, action.payload] };

    case 'UPDATE_VEHICLE':
      return {
        ...state,
        vehicles: state.vehicles.map(v => v.id === action.payload.id ? action.payload : v),
      };

    case 'ADD_LOG':
      return {
        ...state,
        activityLog: [action.payload, ...state.activityLog].slice(0, 100),
      };

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications].slice(0, 50),
      };

    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => n.id === action.payload ? { ...n, read: true } : n),
      };

    case 'MARK_ALL_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => ({ ...n, read: true })),
      };

    case 'ACKNOWLEDGE_RISK':
      return {
        ...state,
        riskAlerts: state.riskAlerts.map(r => r.id === action.payload ? { ...r, acknowledged: true } : r),
      };

    case 'MITIGATE_RISK':
      return {
        ...state,
        riskAlerts: state.riskAlerts.map(r => r.id === action.payload ? { ...r, mitigated: true, acknowledged: true } : r),
      };

    case 'ADD_RISK_ALERT':
      return { ...state, riskAlerts: [...state.riskAlerts, action.payload] };

    case 'ADD_REPORT':
      return { ...state, reports: [...state.reports, action.payload] };

    case 'UPDATE_REPORT':
      return {
        ...state,
        reports: state.reports.map(r => r.id === action.payload.id ? action.payload : r),
      };

    case 'DELETE_REPORT':
      return { ...state, reports: state.reports.filter(r => r.id !== action.payload) };

    case 'TOGGLE_INTEGRATION':
      return {
        ...state,
        integrations: state.integrations.map(i =>
          i.id === action.payload.id
            ? { ...i, connected: action.payload.connected, lastSync: action.payload.lastSync }
            : i
        ),
      };

    case 'UPDATE_PROFILE':
      return { ...state, profile: action.payload };

    case 'UPDATE_SETTINGS':
      return { ...state, settings: action.payload };

    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };

    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(u => u.id === action.payload.id ? action.payload : u),
      };

    case 'DELETE_USER':
      return { ...state, users: state.users.filter(u => u.id !== action.payload) };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  logAction: (tab: string, action: string, detail: string, severity?: Severity) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

  const logAction = (tab: string, action: string, detail: string, severity: Severity = 'info') => {
    const id = 'log-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
    const timestamp = new Date().toISOString();

    dispatch({
      type: 'ADD_LOG',
      payload: { id, timestamp, tab, action, detail, severity },
    });

    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: 'notif-' + id,
        type: severity,
        title: action,
        message: detail,
        read: false,
        createdAt: timestamp,
      },
    });
  };

  return (
    <AppContext.Provider value={{ state, dispatch, logAction }}>
      {children}
    </AppContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return ctx;
}
