"use client";
import { RootState } from "@/app/Redux/slice/interface";
import { setTheme } from "@/app/Redux/slice/themeswitcherslice";
import React from "react";
import { IoMoonSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Nunito_Sans } from "next/font/google";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});
const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.changeTheme.theme);

  const handleThemeChange = () => {
    console.log("initial: ", theme);
    theme === "light"
      ? dispatch(setTheme("dark"))
      : dispatch(setTheme("light"));
  };

  return (
    <div
      className={`${
        theme === "light"
          ? "bg-transparent border-b-[1px] border-slate-300"
          : "border-none darkmodeelements"
      } ${nunito.className} flex flex-col md:flex-row items-center justify-between py-5 pl-12 pr-9 `}
    >
      <header
        className={`${theme === "dark" ? "darkmodetext" : "lightmodetext"} font-bold text-2xl`}
      >
        Where in the world?
      </header>
      <Button
        variant="ghost"
        onClick={handleThemeChange}
        className="flex gap-3 justify-end"
      >
        {theme === "light" ? (
          <IoMoonSharp className="h-5 w-5" />
        ) : (
          <IoMoonSharp className="darkmodetext h-5 w-5" />
        )}

        <p
          className={`${theme === "dark" ? "darkmodetext" : "lightmodetext"} ${nunito.className} font-bold text-lg`}
        >
          {theme === "light" ? "Light mode" : "Dark mode"}
        </p>
      </Button>
    </div>
  );
};

export default Header;
