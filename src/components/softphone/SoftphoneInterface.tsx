import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SoftphoneDisplay } from "./SoftphoneDisplay";
import { SoftphoneKeypad } from "./SoftphoneKeypad";
import { SoftphoneControls } from "./SoftphoneControls";
import { CallHistory } from "./CallHistory";
import { Settings, LogOut, Delete, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface SoftphoneInterfaceProps {
  username: string;
  extension: string;
  onLogout: () => void;
}

// Mock call history data
const mockCallHistory = [
  {
    id: "1",
    number: "+34612345678",
    name: "Cliente ABC",
    type: "incoming" as const,
    duration: 180,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: "completed" as const
  },
  {
    id: "2",
    number: "+34698765432",
    name: "Proveedor XYZ",
    type: "outgoing" as const,
    duration: 120,
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    status: "completed" as const
  },
  {
    id: "3",
    number: "+34611223344",
    type: "missed" as const,
    duration: 0,
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    status: "missed" as const
  }
];

export const SoftphoneInterface = ({ username, extension, onLogout }: SoftphoneInterfaceProps) => {
  const [displayNumber, setDisplayNumber] = useState("");
  const [callStatus, setCallStatus] = useState<"idle" | "dialing" | "ringing" | "connected" | "disconnected">("idle");
  const [isOnHold, setIsOnHold] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [currentCall, setCurrentCall] = useState<string>("");
  const [callDuration, setCallDuration] = useState(0);
  const { toast } = useToast();

  // Call timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callStatus === "connected") {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const handleKeyPress = (key: string) => {
    if (callStatus === "idle") {
      setDisplayNumber(prev => prev + key);
    } else {
      // Send DTMF tones during call
      toast({
        title: "DTMF",
        description: `Enviando tono: ${key}`,
        duration: 1000
      });
    }
  };

  const handleCall = async () => {
    if (!displayNumber.trim()) {
      toast({
        title: "Error",
        description: "Ingrese un número para marcar",
        variant: "destructive"
      });
      return;
    }

    setCurrentCall(displayNumber);
    setCallStatus("dialing");
    
    toast({
      title: "Marcando",
      description: `Llamando a ${displayNumber}...`
    });

    // Simulate call progression
    setTimeout(() => {
      setCallStatus("ringing");
    }, 1500);

    setTimeout(() => {
      setCallStatus("connected");
      toast({
        title: "Llamada conectada",
        description: `Conectado con ${displayNumber}`
      });
    }, 4000);
  };

  const handleHangup = () => {
    setCallStatus("idle");
    setCurrentCall("");
    setDisplayNumber("");
    setIsMuted(false);
    setIsSpeakerOn(false);
    
    toast({
      title: "Llamada terminada",
      description: `Duración: ${Math.floor(callDuration / 60)}:${String(callDuration % 60).padStart(2, '0')}`
    });
  };

  const handleHold = () => {
    if (callStatus === "connected" && !isOnHold) {
      setIsOnHold(true);
      toast({
        title: "Llamada en espera",
        description: "La llamada ha sido puesta en espera"
      });
    } else if (callStatus === "connected" && isOnHold) {
      setIsOnHold(false);
      toast({
        title: "Llamada reanudada",
        description: "La llamada ha sido reanudada"
      });
    }
  };

  const handleTransfer = () => {
    toast({
      title: "Transferencia",
      description: "Función de transferencia iniciada",
    });
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Micrófono activado" : "Micrófono silenciado",
      description: isMuted ? "Audio restaurado" : "Su micrófono está silenciado",
      duration: 1500
    });
  };

  const handleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
    toast({
      title: isSpeakerOn ? "Altavoz desactivado" : "Altavoz activado",
      description: isSpeakerOn ? "Audio por auriculares" : "Audio por altavoz",
      duration: 1500
    });
  };

  const handleBackspace = () => {
    setDisplayNumber(prev => prev.slice(0, -1));
  };

  const handleCallBack = (number: string) => {
    setDisplayNumber(number);
    toast({
      title: "Número seleccionado",
      description: `${number} listo para marcar`
    });
  };

  const formatCallDuration = () => {
    const minutes = Math.floor(callDuration / 60);
    const seconds = callDuration % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Vicidial Softphone</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  {username}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Ext: {extension}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Phone Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Display */}
            <SoftphoneDisplay
              displayText={currentCall || displayNumber}
              secondaryText={callStatus === "connected" ? formatCallDuration() : undefined}
              status={callStatus}
            />

            {/* Number Input Row */}
            <div className="flex gap-2">
              <Input
                value={displayNumber}
                onChange={(e) => setDisplayNumber(e.target.value)}
                placeholder="Ingrese número de teléfono"
                className="text-lg"
                disabled={callStatus !== "idle"}
              />
              <Button
                variant="outline"
                size="default"
                onClick={handleBackspace}
                disabled={!displayNumber || callStatus !== "idle"}
                className="px-3"
              >
                <Delete className="h-4 w-4" />
              </Button>
            </div>

            {/* Keypad */}
            <SoftphoneKeypad
              onKeyPress={handleKeyPress}
              disabled={false}
            />

            {/* Controls */}
            <SoftphoneControls
              onCall={handleCall}
              onHangup={handleHangup}
              onHold={handleHold}
              onTransfer={handleTransfer}
              onMute={handleMute}
              onSpeaker={handleSpeaker}
              callStatus={callStatus}
              isOnHold={isOnHold}
              isMuted={isMuted}
              isSpeakerOn={isSpeakerOn}
            />
          </div>

          {/* Call History Sidebar */}
          <div className="lg:col-span-1">
            <CallHistory
              calls={mockCallHistory}
              onCallBack={handleCallBack}
            />
          </div>
        </div>
      </div>
    </div>
  );
};