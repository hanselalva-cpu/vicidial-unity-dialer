import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CallRecord {
  id: string;
  number: string;
  name?: string;
  type: "incoming" | "outgoing" | "missed";
  duration: number; // in seconds
  timestamp: Date;
  status: "completed" | "missed" | "busy" | "no-answer";
}

interface CallHistoryProps {
  calls: CallRecord[];
  onCallBack: (number: string) => void;
  className?: string;
}

export const CallHistory = ({ calls, onCallBack, className }: CallHistoryProps) => {
  const formatDuration = (seconds: number): string => {
    if (seconds === 0) return "0s";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCallIcon = (type: string, status: string) => {
    if (type === "missed" || status === "missed") {
      return <PhoneMissed className="h-4 w-4 text-destructive" />;
    }
    if (type === "incoming") {
      return <PhoneIncoming className="h-4 w-4 text-success" />;
    }
    return <PhoneOutgoing className="h-4 w-4 text-primary" />;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      missed: "destructive",
      busy: "secondary",
      "no-answer": "outline",
    } as const;

    const labels = {
      completed: "Completada",
      missed: "Perdida",
      busy: "Ocupado",
      "no-answer": "Sin respuesta",
    };

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"} className="text-xs">
        {labels[status as keyof typeof labels] || status}
      </Badge>
    );
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Historial de Llamadas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 max-h-96 overflow-y-auto">
        {calls.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Phone className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No hay llamadas registradas</p>
          </div>
        ) : (
          calls.map((call) => (
            <div
              key={call.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg",
                "border border-border hover:bg-muted/50 transition-colors"
              )}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {getCallIcon(call.type, call.status)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm truncate">
                      {call.name || call.number}
                    </span>
                    {getStatusBadge(call.status)}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{formatTime(call.timestamp)}</span>
                    {call.duration > 0 && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDuration(call.duration)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCallBack(call.number)}
                className="ml-2 h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground"
              >
                <Phone className="h-3 w-3" />
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};