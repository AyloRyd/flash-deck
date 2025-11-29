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
        setId: card.set_id 
      });
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "New":
        return "text-blue-600 bg-blue-50";
      case "Learning":
        return "text-yellow-600 bg-yellow-50";
      case "Mastered":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <Card className="p-4">
      <div className="flex gap-4">
        <div className="flex-1 space-y-3">
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-1">
              Front
            </div>
            <p className="text-sm">{card.front_text}</p>
          </div>
          
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-1">
              Back
            </div>
            <p className="text-sm">{card.back_text}</p>
          </div>

          {status && (
            <div className="flex items-center gap-2">
              <span 
                className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(status)}`}
              >
                {status}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-2">
          <CardDialog
            mode="update"
            card={card}
            trigger={
              <Button 
                variant="outline" 
                size="icon"
                className="h-8 w-8"
              >
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