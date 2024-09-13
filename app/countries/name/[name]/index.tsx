"use client";
import { RootState } from "@/app/Redux/slice/interface";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import Header from "@/components/header";
import useGetSingleCountry from "@/hooks/useGetSingleCountry";
import { useParams } from "next/navigation";
import useGetCountries from "@/hooks/useGetCountries";

const CountryInfo = () => {
  const params = useParams();
  const name = Array.isArray(params.name) ? params.name[0] : params.name;
  const theme = useSelector((state: RootState) => state.changeTheme.theme);
  const capital = useSelector((state: RootState) => state.changeTheme.capital);
  const { country, isLoading, isPending } = useGetSingleCountry(name);
  const { countries } = useGetCountries();

  const mappedCountry =
    country &&
    country.map((c: any) => ({
      flag: c.flags.png,
      alt: c.flags.alt,
      capital: c.capital[0],
      borders: c.borders,
      nativeName: c.name.nativeName,
      name: c.name.common,
      region: c.region,
      subRegion: c.subregion,
      population: c.population,
      tld: c.tld,
      currencies: c.currencies,
      languages: c.languages,
      cca3: c.cca3,
    }));

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "lightmodebg" : "darkmodebg"
      }`}
    >
      <Header />
      <div
        className={` lg:py-20  py-10 lg:px-12 md:px-9 px-6 flex flex-col gap-10 `}
      >
        <div className="">
          <Link
            href="/countries/all"
            className={`${
              theme === "light"
                ? "border-slate-200  border-2 border-solid bg-[#ffffff]"
                : "border-none darkmodeelements"
            } flex items-center justify-center gap-3 p-4 rounded-[6px] w-40 shadow-xl`}
          >
            <FaArrowLeftLong
              className={` ${theme === "light" ? "" : "darkmodetext"}  h-5 w-5`}
            />
            <p
              className={`${
                theme === "dark" ? "darkmodetext" : "lightmodetext"
              } `}
            >
              Back
            </p>
          </Link>
        </div>

        {mappedCountry && (
          <div className="flex flex-col xl:flex-row xl:gap-24 py-12  min-h-screen">
            <div className="xl:w-1/2 w-full">
              <img
                src={mappedCountry[0]?.flag}
                className="w-full h-[500px]"
                alt={mappedCountry[0]?.flag}
              />
            </div>
            <div
              className={`${
                theme === "light" ? "lightmodetext " : "darkmodetext "
              } xl:w-1/2 w-full py-16 flex flex-col gap-12`}
            >
              <p className="text-4xl font-extrabold xl:text-left ">
                {mappedCountry[0]?.name}
              </p>
              <div
                className={`flex flex-col xl:flex-row xl:justify-between xl:items-start  text-left`}
              >
                <div className="flex flex-col gap-4">
                  <p className="xl:text-base text-lg font-semibold">
                    Native Names:{" "}
                    {mappedCountry[0]?.nativeName &&
                      Object.entries(mappedCountry[0].nativeName).map(
                        (
                          [languageCode, native]: [string, any],
                          index: number,
                          arr
                        ) => (
                          <span key={languageCode}>
                            {native.common}
                            {index < arr.length - 1 && ", "}{" "}
                          </span>
                        )
                      )}
                  </p>
                  <p className="xl:text-base text-lg">
                    <span className="font-semibold">Population: </span>{" "}
                    {mappedCountry[0]?.population.toLocaleString()}
                  </p>
                  <p className="xl:text-base text-lg">
                    <span className="font-semibold">Region: </span>{" "}
                    {mappedCountry[0]?.region}
                  </p>
                  <p className="xl:text-base text-lg">
                    <span className="font-semibold">Sub Region: </span>{" "}
                    {mappedCountry[0]?.subRegion || "-"}
                  </p>
                  <p className="xl:text-base text-lg">
                    <span className="font-semibold">Capital: </span>{" "}
                    {mappedCountry[0]?.capital}
                  </p>
                </div>
                <div className="flex flex-col gap-5 mt-5 xl:mt-0">
                  <p className="xl:text-base text-lg">
                    <span className="font-semibold">Top Level Domain:</span>{" "}
                    {mappedCountry[0]?.tld[0]}
                  </p>
                  <p className="xl:text-base text-lg font-semibold">
                    Currencies:{" "}
                    {mappedCountry[0]?.currencies &&
                      Object.entries(mappedCountry[0].currencies).map(
                        ([code, currency]: [any, any], index: number, arr) => (
                          <span key={code} className="">
                            {currency.name}
                            {index < arr.length - 1 && ", "}
                          </span>
                        )
                      )}
                  </p>
                  <p className="xl:text-base text-lg font-semibold">
                    Languages:{" "}
                    {mappedCountry[0]?.languages &&
                      Object.values(mappedCountry[0].languages).map(
                        (language: any, index: number, arr) => (
                          <span key={index}>
                            {language}
                            {index < arr.length - 1 && ", "}
                          </span>
                        )
                      )}
                  </p>
                </div>
              </div>
              <div className="flex flex-col xl:flex-row pt-8 ">
                <p className="xl:text-base text-lg font-semibold mb-4 xl:mb-0">
                  Border Countries:{" "}
                  {mappedCountry[0]?.borders &&
                  mappedCountry[0].borders.length > 0 ? (
                    mappedCountry[0].borders.map(
                      (borderCode: string, index: number) => {
                        const borderCountry = countries.find(
                          (country: any) => country.cca3 === borderCode
                        );
                        return (
                          <span
                            key={borderCode}
                            className={` ${
                              theme === "light"
                                ? "border-slate-200  border-2 border-solid bg-[#ffffff]"
                                : "border-none darkmodeelements"
                            } ml-5 xl:text-[16px] md:text-[14px] text-[10.5px] xl:px-2 py-3 px-1 rounded-[6px] xl:w-40 w-26 md:w-40 text-center shadow-md`}
                          >
                            {borderCountry?.name.common || borderCode}{" "}
                          </span>
                        );
                      }
                    )
                  ) : (
                    <span>No border countries</span>
                  )}
                </p>{" "}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryInfo;
