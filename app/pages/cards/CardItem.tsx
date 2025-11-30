import { Edit, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import type { Card as CardType } from "~/lib/types";
import { useCardStatus } from "~/hooks/query-hooks";
import { useDeleteCard } from "~/hooks/mutation-hooks";
import CardDialog from "./CardDialog";

interface CardItemProps {
  card: CardType;
}

export function CardItem({ card }: CardItemProps) {
  const { data: status } = useCardStatus(card.card_id);
  const deleteCard = useDeleteCard();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this card?")) {
      deleteCard.mutate({
        cardId: card.card_id,
        setId: card.set_id,
      });
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "New":
        return "text-blue-700 bg-blue-100 border-blue-200";
      case "Learning":
        return "text-yellow-700 bg-yellow-100 border-yellow-200";
      case "Mastered":
        return "text-green-700 bg-green-100 border-green-200";
      default:
        return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

  return (
    <Card className="p-4 relative overflow-visible">
      {status && (
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/2 z-10">
          <span
            className={`text-xs px-2.5 py-0.5 border shadow-sm rounded-full font-semibold ${getStatusColor(status)}`}
          >
            {status}
          </span>
        </div>
      )}

      <div className="flex gap-4">
        <div className="flex-1 space-y-3 min-w-0 pt-6">
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-1">
              Front
            </div>
            <p className="text-sm break-all line-clamp-2">{card.front_text}</p>
          </div>

          <div>
            <div className="text-xs font-medium text-muted-foreground mb-1">
              Back
            </div>
            <p className="text-sm break-all line-clamp-2">{card.back_text}</p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 shrink-0">
          <CardDialog
            mode="update"
            card={card}
            trigger={
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Edit className="w-4 h-4" />
              </Button>
            }
          />

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={handleDelete}
            disabled={deleteCard.isPending}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
