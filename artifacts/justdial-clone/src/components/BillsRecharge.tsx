import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Smartphone, Zap, Tv, Droplet, Flame, ShieldPlus } from "lucide-react";

const tabs = [
  { id: "mobile",      label: "Mobile",      icon: Smartphone },
  { id: "electricity", label: "Electricity", icon: Zap },
  { id: "dth",         label: "DTH",         icon: Tv },
  { id: "water",       label: "Water",       icon: Droplet },
  { id: "gas",         label: "Gas",         icon: Flame },
  { id: "insurance",   label: "Insurance",   icon: ShieldPlus },
];

const placeholders: Record<string, string[]> = {
  mobile:      ["Enter Mobile Number", "Enter Amount"],
  electricity: ["Enter Consumer Number", "Enter Bill Amount"],
  dth:         ["Enter Subscriber ID", "Enter Amount"],
  water:       ["Enter Account Number", "Enter Bill Amount"],
  gas:         ["Enter BP Number", "Enter Amount"],
  insurance:   ["Enter Policy Number", "Enter Premium Amount"],
};

export default function BillsRecharge() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="border border-gray-100 rounded-xl shadow-md overflow-hidden bg-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-primary/10 bg-primary/5">
        <h3 className="text-base font-bold text-primary">Bills &amp; Recharge</h3>
        <p className="text-gray-400 text-xs">Quick &amp; secure payments</p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-100" style={{ scrollbarWidth: "none" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center min-w-[62px] py-2.5 px-1 text-[10px] font-semibold border-b-2 transition-colors flex-1 ${
              activeTab === tab.id
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-50"
            }`}
            data-testid={`tab-${tab.id}`}
          >
            <tab.icon className="w-4 h-4 mb-1" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="p-4 space-y-3 bg-white">
        {(placeholders[activeTab] ?? []).map((ph, i) => (
          <Input
            key={i}
            placeholder={ph}
            type={i === 1 ? "number" : "text"}
            className="bg-gray-50 border-gray-200 h-10 text-sm"
            data-testid={`input-bill-${i}`}
          />
        ))}
        <Button className="w-full h-10 font-bold bg-orange-500 hover:bg-orange-600 text-white border-none">
          Proceed to Pay
        </Button>
      </div>
    </div>
  );
}
