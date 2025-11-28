import { useParams } from "react-router";
import { useFolder } from "~/hooks/query-hooks";
import FolderPage from "~/pages/folders/FolderPage";
import { useTabTitle } from "~/hooks/use-tab-title";

export default function FolderId() {
  const { folderId } = useParams();
  
  const { 
    data: folder, 
    isLoading, 
    isError 
  } = useFolder(Number(folderId));

  useTabTitle({
    title: folder?.folder_name,
    isLoading,
    isError,
    errorTitle: "Folder Not Found | FlashDeck" 
  });

  return <FolderPage />;
}