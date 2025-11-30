import { Card } from "~/components/ui/card";
import type { Card as CardType } from "~/lib/types";

interface FlipCardProps {
  card: CardType;
  isFlipped: boolean;
  onFlip: () => void;
}

export function FlipCard({ card, isFlipped, onFlip }: FlipCardProps) {
  return (
    <div
      className="relative w-full max-w-4xl aspect-4/3 cursor-pointer perspective-1000"
      onClick={onFlip}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute inset-0 backface-hidden">
          <Card className="w-full h-full flex items-center justify-center p-8 md:p-12">
            <p className="text-2xl md:text-4xl font-medium text-center wrap-break-words">
              {card.front_text}
            </p>
          </Card>
        </div>

        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <Card className="w-full h-full flex items-center justify-center p-8 md:p-12 bg-muted">
            <p className="text-2xl md:text-4xl font-medium text-center wrap-break-words">
              {card.back_text}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
