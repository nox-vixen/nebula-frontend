import { atom } from "recoil";
import { NebulaSearchResult } from "../models/NebulaSearchResult";

export const modalState = atom<boolean>({
  key: "modalState",
  default: false,
});

export const movieState = atom<NebulaSearchResult | null>({
  key: "movieState",
  default: null,
});
