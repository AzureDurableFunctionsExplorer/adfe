import { RootStore } from "../RootStore";
import { useContext } from "react";
import { StoreContext, ChildStore } from ".";

export const useRootStore = (): RootStore => {
  const rootStore: RootStore | null = useContext(StoreContext);
  if (rootStore instanceof RootStore) {
    return rootStore;
  } else {
    throw new Error("StoreContext wasn't properly initialized.")
  }
}

type ChildStoresInRoot = AllowedNames<RootStore, ChildStore>;

export const useStore = <K extends ChildStoresInRoot>(storeName: K): RootStore[K] => {
  const rootStore: RootStore = useRootStore();

  return rootStore[storeName];
}