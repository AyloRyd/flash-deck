import { useParams } from "react-router";
import { useSet } from "~/hooks/query-hooks";
import SetPage from "~/pages/sets/SetPage";
import { useTabTitle } from "~/hooks/use-tab-title";

export default function SetId() {
  const { setId } = useParams();
  
  const { 
    data: set, 
    isLoading, 
    isError 
  } = useSet(Number(setId));

  useTabTitle({
    title: set?.set_name,
    isLoading,
    isError,
    errorTitle: "Set not found | FlashDeck" 
  });

  return <SetPage />;
}