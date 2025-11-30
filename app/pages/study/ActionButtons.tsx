import { Button } from "~/components/ui/button";
import { Check, X } from "lucide-react";

interface ActionButtonsProps {
  onKnow: () => void;
  onDontKnow: () => void;
  disabled: boolean;
}

export function ActionButtons({
  onKnow,
  onDontKnow,
  disabled,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-4 w-full max-w-md">
      <Button
        size="lg"
        variant="outline"
        className="flex-1 h-14 gap-2 rounded-lg"
        onClick={(e) => {
          e.stopPropagation();
          onDontKnow();
        }}
        disabled={disabled}
      >
        <X className="w-5 h-5" />
        Don't Know
      </Button>
      <Button
        size="lg"
        className="flex-1 h-14 gap-2 rounded-lg"
        onClick={(e) => {
          e.stopPropagation();
          onKnow();
        }}
        disabled={disabled}
      >
        <Check className="w-5 h-5" />
        Know
      </Button>
    </div>
  );
}
