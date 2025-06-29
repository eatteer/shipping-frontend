import { ScreenLoader } from "@/components/shared/screen-loader";
import {
  LoaderContext,
  type LoaderContextType,
} from "@/contexts/loader/loader-context";
import { useState, type PropsWithChildren } from "react";

export const LoaderProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(false);

  const show = () => {
    setLoading(true);
  };

  const hide = () => {
    setLoading(false);
  };

  const context: LoaderContextType = { show, hide };

  return (
    <LoaderContext.Provider value={context}>
      {children}
      {loading && <ScreenLoader />}
    </LoaderContext.Provider>
  );
};
