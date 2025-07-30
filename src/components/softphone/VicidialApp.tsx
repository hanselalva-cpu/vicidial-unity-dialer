import { useState } from "react";
import { VicidialLogin, LoginCredentials } from "./VicidialLogin";
import { SoftphoneInterface } from "./SoftphoneInterface";
import { useToast } from "@/hooks/use-toast";

export const VicidialApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"disconnected" | "connecting" | "connected" | "error">("disconnected");
  const [userCredentials, setUserCredentials] = useState<LoginCredentials | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { toast } = useToast();

  const handleLogin = async (credentials: LoginCredentials) => {
    setIsConnecting(true);
    setConnectionStatus("connecting");
    setErrorMessage("");

    try {
      // Simulate API call to Vicidial
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful connection
      setUserCredentials(credentials);
      setConnectionStatus("connected");
      setIsLoggedIn(true);
      
      toast({
        title: "Conexión exitosa",
        description: `Conectado a ${credentials.server}`,
      });
    } catch (error) {
      setConnectionStatus("error");
      setErrorMessage("Error de conexión. Verifique sus credenciales y la URL del servidor.");
      
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar al servidor Vicidial",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setConnectionStatus("disconnected");
    setUserCredentials(null);
    setErrorMessage("");
    
    toast({
      title: "Sesión cerrada",
      description: "Ha cerrado sesión correctamente"
    });
  };

  if (!isLoggedIn) {
    return (
      <VicidialLogin
        onLogin={handleLogin}
        isConnecting={isConnecting}
        connectionStatus={connectionStatus}
        errorMessage={errorMessage}
      />
    );
  }

  return (
    <SoftphoneInterface
      username={userCredentials?.username || "Usuario"}
      extension={userCredentials?.extension || "1001"}
      onLogout={handleLogout}
    />
  );
};