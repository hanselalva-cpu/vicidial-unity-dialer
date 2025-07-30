import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Phone, Server, User, Lock, Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface VicidialLoginProps {
  onLogin: (credentials: LoginCredentials) => void;
  isConnecting: boolean;
  connectionStatus: "disconnected" | "connecting" | "connected" | "error";
  errorMessage?: string;
}

export interface LoginCredentials {
  server: string;
  username: string;
  password: string;
  extension: string;
}

export const VicidialLogin = ({ 
  onLogin, 
  isConnecting, 
  connectionStatus, 
  errorMessage 
}: VicidialLoginProps) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    server: "",
    username: "",
    password: "",
    extension: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(credentials);
  };

  const getStatusBadge = () => {
    switch (connectionStatus) {
      case "connected":
        return (
          <Badge className="bg-success text-success-foreground">
            <Wifi className="h-3 w-3 mr-1" />
            Conectado
          </Badge>
        );
      case "connecting":
        return (
          <Badge variant="secondary">
            <div className="animate-spin h-3 w-3 mr-1 border border-muted-foreground border-t-foreground rounded-full" />
            Conectando...
          </Badge>
        );
      case "error":
        return (
          <Badge variant="destructive">
            <WifiOff className="h-3 w-3 mr-1" />
            Error
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <WifiOff className="h-3 w-3 mr-1" />
            Desconectado
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md shadow-softphone">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
            <Phone className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl">Vicidial Softphone</CardTitle>
            <CardDescription>
              Conecte con su servidor Vicidial para comenzar
            </CardDescription>
          </div>
          <div className="flex justify-center">
            {getStatusBadge()}
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="server" className="flex items-center gap-2">
                <Server className="h-4 w-4" />
                Servidor Vicidial
              </Label>
              <Input
                id="server"
                type="url"
                placeholder="https://your-vicidial-server.com"
                value={credentials.server}
                onChange={(e) => setCredentials(prev => ({ ...prev, server: e.target.value }))}
                required
                disabled={isConnecting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Usuario
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Nombre de usuario"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                required
                disabled={isConnecting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Contraseña"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                required
                disabled={isConnecting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="extension" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Extensión
              </Label>
              <Input
                id="extension"
                type="text"
                placeholder="1001"
                value={credentials.extension}
                onChange={(e) => setCredentials(prev => ({ ...prev, extension: e.target.value }))}
                required
                disabled={isConnecting}
              />
            </div>

            {errorMessage && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">{errorMessage}</p>
              </div>
            )}

            <Button
              type="submit"
              className={cn(
                "w-full bg-gradient-primary hover:shadow-softphone",
                "transition-all duration-300"
              )}
              disabled={isConnecting || !credentials.server || !credentials.username || !credentials.password || !credentials.extension}
            >
              {isConnecting ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border border-white border-t-transparent rounded-full" />
                  Conectando...
                </>
              ) : (
                <>
                  <Wifi className="h-4 w-4 mr-2" />
                  Conectar
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};