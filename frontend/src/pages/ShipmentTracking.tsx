import { useState } from "react";
import { Search, MapPin, Navigation, Package, User, Clock, MoreVertical, Filter, Download } from "lucide-react";
import { StatusBadge } from "../components/ui/StatusBadge";
import { LiveIndicator } from "../components/ui/LiveIndicator";

const MOCK_SHIPMENTS = [
  { id: "NXL-089234", origin: "Mumbai", destination: "Chennai", status: "active", eta: "14:45", driver: "Rajesh Kumar", vehicle: "TN-02-AB-4521", progress: 65 },
  { id: "NXL-089187", origin: "Delhi", destination: "Pune", status: "delayed", eta: "16:20", driver: "Amit Singh", vehicle: "MH-14-DC-8812", progress: 42 },
  { id: "NXL-089251", origin: "Bengaluru", destination: "Hyderabad", status: "active", eta: "11:15", driver: "Suresh M.", vehicle: "KA-01-EF-2341", progress: 15 },
  { id: "NXL-089199", origin: "Chennai", destination: "Kochi", status: "delivered", eta: "09:30", driver: "Priya D.", vehicle: "KL-07-GH-5566", progress: 100 },
  { id: "NXL-089240", origin: "Pune", destination: "Ahmedabad", status: "active", eta: "18:00", driver: "Vikram R.", vehicle: "GJ-01-KL-9988", progress: 80 },
];

export default function ShipmentTracking() {
  const [selectedShipment, setSelectedShipment] = useState(MOCK_SHIPMENTS[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)] animate-[fade-up_0.4s_ease-out]">
      {/* Left: Map Panel */}
      <div className="flex-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] overflow-hidden relative flex flex-col">
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
          <button className="text-xs font-medium bg-[var(--bg-elevated)] border border-[var(--border-strong)] px-3 py-1.5 rounded-[var(--radius-sm)] shadow-[var(--shadow-elevated)] hover:bg-[var(--bg-hover)] flex items-center gap-1"><Package className="w-3 h-3"/> Shipments</button>
          <button className="text-xs font-medium bg-[var(--bg-elevated)] border border-[var(--border-strong)] px-3 py-1.5 rounded-[var(--radius-sm)] shadow-[var(--shadow-elevated)] hover:bg-[var(--bg-hover)] text-[var(--status-warning)] flex items-center gap-1"><MapPin className="w-3 h-3"/> Risk Zones</button>
        </div>
        
        <div className="absolute inset-0 bg-[#0a0a0a] bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=20.5937,78.9629&zoom=5&size=800x600&maptype=roadmap&style=feature:all|element:labels|visibility:off&style=feature:water|element:geometry|color:0x04050A&style=feature:landscape|element:geometry|color:0x0B1120&key=YOUR_API_KEY_HERE')] bg-cover bg-center mix-blend-screen opacity-50" />

        {/* Selected Shipment Overlay */}
        {selectedShipment && (
          <div className="absolute bottom-4 left-4 right-4 lg:right-auto lg:w-80 bg-[var(--bg-elevated)]/90 backdrop-blur-md border border-[var(--border-strong)] rounded-[var(--radius-md)] p-4 shadow-[var(--shadow-elevated)]">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-mono text-[var(--accent-primary)] font-semibold">{selectedShipment.id}</h3>
              <StatusBadge status={selectedShipment.status as any} pulse={selectedShipment.status === 'active'} />
            </div>
            <div className="text-sm text-[var(--text-primary)] mb-4">{selectedShipment.origin} &rarr; {selectedShipment.destination}</div>
            
            <div className="space-y-2 text-xs text-[var(--text-secondary)]">
              <div className="flex justify-between"><span>ETA:</span> <span className="text-[var(--text-primary)]">{selectedShipment.eta}</span></div>
              <div className="flex justify-between"><span>Driver:</span> <span className="text-[var(--text-primary)]">{selectedShipment.driver}</span></div>
              <div className="flex justify-between"><span>Vehicle:</span> <span className="font-mono text-[var(--text-primary)]">{selectedShipment.vehicle}</span></div>
            </div>
          </div>
        )}
      </div>

      {/* Right: Shipment List */}
      <div className="w-full lg:w-[400px] xl:w-[480px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-[var(--border-subtle)] flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-display text-[var(--text-primary)]">Active Shipments</h2>
            <LiveIndicator />
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
              <input type="text" placeholder="Search tracking #..." className="w-full bg-[var(--bg-input)] border border-[var(--border-default)] rounded-[var(--radius-sm)] py-1.5 pl-8 pr-3 text-sm focus:border-[var(--accent-primary)] outline-none" />
            </div>
            <button className="bg-[var(--bg-input)] border border-[var(--border-default)] p-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--bg-hover)]"><Filter className="w-4 h-4 text-[var(--text-secondary)]"/></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
          {MOCK_SHIPMENTS.map((shipment) => (
            <div 
              key={shipment.id}
              onClick={() => setSelectedShipment(shipment)}
              className={`p-3 rounded-[var(--radius-md)] border cursor-pointer transition-all ${
                selectedShipment?.id === shipment.id 
                  ? 'bg-[var(--bg-active)] border-[var(--border-accent)]' 
                  : 'bg-[var(--bg-elevated)] border-[var(--border-default)] hover:border-[var(--border-strong)]'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-sm text-[var(--text-primary)]">{shipment.id}</span>
                <StatusBadge status={shipment.status as any} />
              </div>
              <div className="text-sm font-medium text-[var(--text-primary)] mb-3">
                {shipment.origin} &rarr; {shipment.destination}
              </div>
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {shipment.eta}</span>
                <span className="flex items-center gap-1"><User className="w-3 h-3"/> {shipment.driver}</span>
              </div>
              <div className="w-full bg-[var(--bg-input)] h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${shipment.status === 'delayed' ? 'bg-[var(--status-warning)]' : 'bg-[var(--accent-primary)]'}`} 
                  style={{ width: `${shipment.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
