import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Smartphone, Zap, Tv, Droplet, Flame, ShieldPlus } from "lucide-react";

const tabs = [
  { id: "mobile", label: "Mobile", icon: Smartphone },
  { id: "electricity", label: "Electricity", icon: Zap },
  { id: "dth", label: "DTH", icon: Tv },
  { id: "water", label: "Water", icon: Droplet },
  { id: "gas", label: "Gas", icon: Flame },
  { id: "insurance", label: "Insurance", icon: ShieldPlus },
];

export default function BillsRecharge() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardHeader className="bg-primary/5 pb-4 border-b border-primary/10">
        <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
          Bills & Recharge
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[70px] p-3 text-xs font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-5 h-5 mb-1" />
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="p-5 space-y-4 bg-white">
          <div className="space-y-3">
            <Input 
              placeholder={
                activeTab === "mobile" ? "Enter Mobile Number" :
                activeTab === "electricity" ? "Enter Consumer Number" :
                activeTab === "dth" ? "Enter Subscriber ID" :
                "Enter details"
              } 
              className="bg-gray-50 border-gray-200 h-11"
            />
            {activeTab === "mobile" && (
              <Input placeholder="Amount" type="number" className="bg-gray-50 border-gray-200 h-11" />
            )}
          </div>
          <Button className="w-full h-11 font-bold text-md bg-orange-500 hover:bg-orange-600 text-white border-none">
            Proceed to Pay
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
