import { cn } from "@/lib/utils";

interface SoftphoneDisplayProps {
  displayText: string;
  secondaryText?: string;
  status: "idle" | "dialing" | "ringing" | "connected" | "disconnected";
  className?: string;
}

export const SoftphoneDisplay = ({ 
  displayText, 
  secondaryText, 
  status, 
  className 
}: SoftphoneDisplayProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "connected":
        return "text-success";
      case "dialing":
      case "ringing":
        return "text-warning";
      case "disconnected":
        return "text-destructive";
      default:
        return "text-phone-display-foreground";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "dialing":
        return "Marcando...";
      case "ringing":
        return "Sonando...";
      case "connected":
        return "Conectado";
      case "disconnected":
        return "Desconectado";
      default:
        return "";
    }
  };

  return (
    <div className={cn(
      "bg-gradient-phone rounded-lg p-6 shadow-display",
      "border border-phone-display/20",
      className
    )}>
      {/* Status indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-3 h-3 rounded-full",
            status === "connected" && "bg-success animate-pulse-ring",
            status === "dialing" && "bg-warning animate-bounce-subtle",
            status === "ringing" && "bg-warning animate-pulse-ring",
            status === "disconnected" && "bg-destructive",
            status === "idle" && "bg-muted"
          )} />
          <span className={cn("text-sm font-medium", getStatusColor())}>
            {getStatusText() || "Listo"}
          </span>
        </div>
        <div className="text-xs text-phone-display-foreground/60">
          Vicidial Phone
        </div>
      </div>

      {/* Main display */}
      <div className="text-center">
        <div className="text-2xl font-mono font-bold text-phone-display-foreground mb-2 min-h-[32px]">
          {displayText || "Ingrese número"}
        </div>
        {secondaryText && (
          <div className="text-sm text-phone-display-foreground/70">
            {secondaryText}
          </div>
        )}
      </div>

      {/* Visual elements */}
      <div className="flex justify-center mt-4 gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-1 h-6 bg-primary/30 rounded-full",
              status === "connected" && "animate-pulse",
              i < 3 && status === "connected" && "bg-primary"
            )}
          />
        ))}
      </div>
    </div>
  );
};