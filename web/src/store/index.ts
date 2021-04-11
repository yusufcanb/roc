import {createContext, useContext} from "react";
import {RootStore} from "./RootStore";

export const StoreContext = createContext<RootStore>(new RootStore());

export function useStore(): RootStore {
    return useContext(StoreContext);
}