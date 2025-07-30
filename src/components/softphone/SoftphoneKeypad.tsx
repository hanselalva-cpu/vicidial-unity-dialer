import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SoftphoneKeypadProps {
  onKeyPress: (key: string) => void;
  disabled?: boolean;
}

const keypadLayout = [
  [
    { key: "1", label: "1", sublabel: "" },
    { key: "2", label: "2", sublabel: "ABC" },
    { key: "3", label: "3", sublabel: "DEF" },
  ],
  [
    { key: "4", label: "4", sublabel: "GHI" },
    { key: "5", label: "5", sublabel: "JKL" },
    { key: "6", label: "6", sublabel: "MNO" },
  ],
  [
    { key: "7", label: "7", sublabel: "PQRS" },
    { key: "8", label: "8", sublabel: "TUV" },
    { key: "9", label: "9", sublabel: "WXYZ" },
  ],
  [
    { key: "*", label: "*", sublabel: "" },
    { key: "0", label: "0", sublabel: "+" },
    { key: "#", label: "#", sublabel: "" },
  ],
];

export const SoftphoneKeypad = ({ onKeyPress, disabled = false }: SoftphoneKeypadProps) => {
  return (
    <div className="bg-phone-keypad rounded-lg p-4 shadow-button">
      <div className="grid grid-cols-3 gap-3">
        {keypadLayout.flat().map(({ key, label, sublabel }) => (
          <Button
            key={key}
            variant="outline"
            size="lg"
            onClick={() => onKeyPress(key)}
            disabled={disabled}
            className={cn(
              "h-16 w-full bg-phone-button hover:bg-phone-button-hover",
              "border-border/50 shadow-button transition-all duration-200",
              "hover:scale-105 active:scale-95",
              "flex flex-col items-center justify-center gap-0.5",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <span className="text-xl font-bold text-foreground">{label}</span>
            {sublabel && (
              <span className="text-xs text-muted-foreground font-normal">
                {sublabel}
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};