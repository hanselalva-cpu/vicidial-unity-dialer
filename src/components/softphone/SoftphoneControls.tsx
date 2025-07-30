import { Button } from "@/components/ui/button";
import { Phone, PhoneCall, PhoneOff, Pause, ArrowRightLeft, Mic, MicOff, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SoftphoneControlsProps {
  onCall: () => void;
  onHangup: () => void;
  onHold: () => void;
  onTransfer: () => void;
  onMute: () => void;
  onSpeaker: () => void;
  callStatus: "idle" | "dialing" | "ringing" | "connected" | "disconnected";
  isOnHold?: boolean;
  isMuted: boolean;
  isSpeakerOn: boolean;
  disabled?: boolean;
}

export const SoftphoneControls = ({
  onCall,
  onHangup,
  onHold,
  onTransfer,
  onMute,
  onSpeaker,
  callStatus,
  isOnHold = false,
  isMuted,
  isSpeakerOn,
  disabled = false
}: SoftphoneControlsProps) => {
  const isCallActive = ["dialing", "ringing", "connected"].includes(callStatus);

  return (
    <div className="space-y-4">
      {/* Primary controls */}
      <div className="flex justify-center gap-4">
        {!isCallActive ? (
          <Button
            onClick={onCall}
            disabled={disabled}
            size="lg"
            className={cn(
              "h-14 w-14 rounded-full bg-gradient-primary",
              "hover:shadow-softphone transition-all duration-300",
              "hover:scale-110 active:scale-95"
            )}
          >
            <Phone className="h-6 w-6" />
          </Button>
        ) : (
          <Button
            onClick={onHangup}
            size="lg"
            variant="destructive"
            className={cn(
              "h-14 w-14 rounded-full",
              "hover:scale-110 active:scale-95 transition-all duration-300"
            )}
          >
            <PhoneOff className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Secondary controls - only show when call is active */}
      {isCallActive && (
        <div className="flex justify-center gap-3">
          <Button
            onClick={onHold}
            variant="outline"
            size="sm"
            className={cn(
              "h-12 w-12 rounded-full",
              isOnHold && "bg-warning text-warning-foreground",
              "transition-all duration-200 hover:scale-105"
            )}
          >
            <Pause className="h-4 w-4" />
          </Button>

          <Button
            onClick={onTransfer}
            variant="outline"
            size="sm"
            className="h-12 w-12 rounded-full transition-all duration-200 hover:scale-105"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </Button>

          <Button
            onClick={onMute}
            variant="outline"
            size="sm"
            className={cn(
              "h-12 w-12 rounded-full",
              isMuted && "bg-destructive text-destructive-foreground",
              "transition-all duration-200 hover:scale-105"
            )}
          >
            {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>

          <Button
            onClick={onSpeaker}
            variant="outline"
            size="sm"
            className={cn(
              "h-12 w-12 rounded-full",
              isSpeakerOn && "bg-primary text-primary-foreground",
              "transition-all duration-200 hover:scale-105"
            )}
          >
            <Volume2 className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Status text */}
      <div className="text-center">
        <span className="text-sm text-muted-foreground">
          {callStatus === "idle" && "Listo para marcar"}
          {callStatus === "dialing" && "Marcando número..."}
          {callStatus === "ringing" && "Timbre..."}
          {callStatus === "connected" && !isOnHold && "Llamada en curso"}
          {callStatus === "connected" && isOnHold && "Llamada en espera"}
        </span>
      </div>
    </div>
  );
};