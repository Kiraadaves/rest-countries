"use client";

import { RootState } from "@/app/Redux/slice/interface";
import { useSelector } from "react-redux";

export const useFetchedTheme = () => {
  const theme = useSelector((state: RootState) => state.changeTheme.theme);
  return theme;
};
