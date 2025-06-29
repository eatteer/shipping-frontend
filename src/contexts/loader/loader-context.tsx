import { createContext } from "react";

export type LoaderContextType = {
  show: () => void;
  hide: () => void;
};

export const LoaderContext = createContext({} as LoaderContextType);
