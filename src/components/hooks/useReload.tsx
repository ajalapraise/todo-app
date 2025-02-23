import { useQueryState } from "nuqs";
import { useEffect } from "react";

export const useReload = () => {
  const [isReload, setIsReload] = useQueryState("reload", {});

  useEffect(() => {
    if (isReload === "true") {
      setIsReload(null);
    }
  }, [isReload]);

  const triggerReload = () => {
    setIsReload("true");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return triggerReload;
};
