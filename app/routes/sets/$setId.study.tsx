import { useParams, useSearchParams } from "react-router"; 
import { useSet } from "~/hooks/query-hooks";
import { useTabTitle } from "~/hooks/use-tab-title";
import { Study } from "~/pages/study";

export default function SetIdStudy() {
  const { setId } = useParams();
  const [searchParams] = useSearchParams(); 
  
  const mode = searchParams.get("mode") || "default";

  const { 
    data: set, 
    isLoading, 
    isError 
  } = useSet(Number(setId));

  useTabTitle({
    title: `Study «${set?.set_name}»`,
    isLoading,
    isError,
    errorTitle: "Set not found | FlashDeck" 
  });

  return <Study mode={mode} />;
}