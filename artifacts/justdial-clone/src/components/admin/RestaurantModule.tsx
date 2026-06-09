import { useState } from "react";
import { Edit, RefreshCw, Save, Utensils } from "lucide-react";

export default function RestaurantModule() {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <Utensils className="text-primary w-6 h-6" /> Restaurant Editor
          </h1>
          <p className="text-xs text-gray-500 mt-1">Manage global menus, restaurant details, and cuisines.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-5 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow disabled:opacity-50 transition-all"
          >
            {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save Data
          </button>
        </div>
      </div>

      {/* Editor Form Placeholder */}
      <div className="bg-white border border-gray-100 p-12 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-2">
          <Utensils className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Restaurant Module UI Coming Soon</h2>
        <p className="text-sm text-gray-500 max-w-md">
          This section will be hooked up to the new API data containing thousands of global menus, categories, and district-wise restaurant data.
        </p>
      </div>
    </div>
  );
}
