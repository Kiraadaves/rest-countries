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
          ? "bg-[#ffffff] border-b-[1px] border-slate-300"
          : "border-none darkmodeelements"
      } ${
        nunito.className
      } flex items-center justify-between py-5 lg:pl-12 pl-6 lg:pr-9 `}
    >
      <header
        className={`${
          theme === "dark" ? "darkmodetext" : "lightmodetext"
        } font-bold lg:text-2xl text-[16px]`}
      >
        Where in the world?
      </header>
      <Button
        variant="ghost"
        onClick={handleThemeChange}
        className="flex lg:gap-3 gap-2 justify-end"
      >
        {theme === "light" ? (
          <IoMoonSharp className="lg:h-5 lg:w-5" />
        ) : (
          <IoMoonSharp className="darkmodetext lg:h-5 lg:w-5" />
        )}

        <p
          className={`${theme === "dark" ? "darkmodetext" : "lightmodetext"} ${
            nunito.className
          } font-bold lg:text-lg text-[14px]`}
        >
          {theme === "light" ? "Light mode" : "Dark mode"}
        </p>
      </Button>
    </div>
  );
};

export default Header;
