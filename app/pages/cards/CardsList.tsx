import { FilePlusCorner } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { Card as CardType } from "~/lib/types";
import CardDialog from "./CardDialog";
import { CardItem } from "./CardItem";

interface CardsListProps {
  cards: CardType[];
  setId: number;
}

export function CardsList({ cards, setId }: CardsListProps) {
  return (
    <div className="space-y-4 px-0 sm:px-10 md:px-20 lg:px-60 xl:px-80 mb-40">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Cards</h2>
        <CardDialog
          mode="create"
          setId={setId}
          trigger={
            <Button className="flex items-center gap-2">
              <FilePlusCorner className="w-4 h-4" />
              Add card
            </Button>
          }
        />
      </div>

      {cards.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No cards in this set yet.</p>
          <p className="text-sm mt-2">Create your first card to get started!</p>
        </div>
      ) : (
        <div className="space-y-5">
          {cards.map((card) => (
            <CardItem key={card.card_id} card={card} />
          ))}
        </div>
      )}
    </div>
  );
}