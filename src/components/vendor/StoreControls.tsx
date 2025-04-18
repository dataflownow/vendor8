
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { QrCode, Power, Coffee } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface StoreControlsProps {
  isSessionActive: boolean;
  onToggleSession: () => void;
}

const StoreControls = ({ isSessionActive, onToggleSession }: StoreControlsProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Coffee className="mr-2 text-vendor8-500" size={20} />
          <h2 className="text-lg font-semibold">The Wing Stand</h2>
        </div>
        <div className="flex items-center">
          <span className={`mr-2 text-sm ${isSessionActive ? 'text-green-500' : 'text-gray-500'}`}>
            {isSessionActive ? 'Open' : 'Closed'}
          </span>
          <Switch 
            checked={isSessionActive} 
            onCheckedChange={onToggleSession} 
            className={isSessionActive ? 'bg-green-500' : ''}
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center">
              <QrCode className="mr-2" size={16} />
              Store QR Code
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="p-2">
              <div className="mb-4">
                <h3 className="font-medium mb-1">Your Store QR Code</h3>
                <p className="text-sm text-gray-500">
                  Customers can scan this QR code to access your menu and place orders.
                </p>
              </div>
              <div className="bg-gray-100 p-4 flex items-center justify-center">
                <div className="w-40 h-40 bg-white p-2 flex items-center justify-center">
                  <QrCode size={120} className="text-vendor8-500" />
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <Button variant="outline" size="sm">
                  Download
                </Button>
                <Button size="sm" className="btn-vendor8">
                  Share Link
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button variant={isSessionActive ? "default" : "outline"} size="sm" onClick={onToggleSession} className={isSessionActive ? "bg-green-500 hover:bg-green-600" : ""}>
          <Power className="mr-2" size={16} />
          {isSessionActive ? 'End Session' : 'Start Session'}
        </Button>
      </div>
    </div>
  );
};

export default StoreControls;
