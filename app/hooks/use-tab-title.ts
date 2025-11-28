import { useEffect, useRef } from "react";

interface UseTabTitleParams {
  title?: string;
  isLoading?: boolean;
  isError?: boolean;
  errorTitle?: string;
}

const DEFAULT_TITLE = "FlashDeck | Master your knowledge";
const LOADING_TITLE = "Loading... | FlashDeck";

export function useTabTitle({
  title,
  isLoading,
  isError,
  errorTitle,
}: UseTabTitleParams) {
  const originalTitle = useRef(document.title);

  useEffect(() => {
    if (isLoading) {
      document.title = LOADING_TITLE;
    } 
    else if (isError) {
      document.title = errorTitle || DEFAULT_TITLE;
    } 
    else if (title) {
      document.title = `${title} | FlashDeck`;
    } 
    else {
      document.title = DEFAULT_TITLE;
    }

    return () => {
      document.title = originalTitle.current;
    };
  }, [title, isLoading, isError, errorTitle]);
}