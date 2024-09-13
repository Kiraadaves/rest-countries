"use client";
import { RootState } from "@/app/Redux/slice/interface";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import Header from "@/components/header";

const CountryInfo = () => {
  const theme = useSelector((state: RootState) => state.changeTheme.theme);
  const capital = useSelector((state: RootState) => state.changeTheme.capital);
  const countries = useSelector(
    (state: RootState) => state.changeTheme.countries
  );

  const filteredCountry: any = countries
    ? countries.find((country: any) =>
        country.capital ? country.capital[0] === capital : undefined
      )
    : [];

  const languageArray = filteredCountry
    ? Object.values(filteredCountry.languages)
    : undefined;

  const formattedLanguageString = languageArray
    ? languageArray.sort().join(", ") + "."
    : undefined;
  //console.log(formattedLanguageString);
  //
  const nativeNameArray: any = filteredCountry
    ? Object.entries(filteredCountry.nativeName)
    : undefined;

  const mapnativeNameArray = nativeNameArray
    ? nativeNameArray.map((nativeNameArrays: any) => ({
        lang: nativeNameArrays[0],
        native: nativeNameArrays[1].common,
      }))
    : undefined;

  const currencies: any = filteredCountry
    ? Object.entries(filteredCountry.currencies)
    : undefined;

  const mapCurrencies = currencies
    ? currencies.map((currency: any) => ({
        name: currency[1].name,
        symbol: currency[1].symbol,
      }))
    : undefined;

  const nativeName = mapnativeNameArray
    ? mapnativeNameArray[0].native
    : undefined;

  const currency = mapCurrencies ? mapCurrencies[0].name : undefined;

  //console.log("filteredCountry: ", filteredCountry);
  return (
    <div className={`min-h-screen ${
      theme === "light" ? "lightmodebg" : "darkmodebg"
    }`}>
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
            } flex items-center justify-center gap-3 p-4 rounded-[6px] w-40 shadow-lg`}
          >
            {theme === "light" ? (
              <FaArrowLeftLong className="h-5 w-5" />
            ) : (
              <FaArrowLeftLong className="darkmodetext h-5 w-5" />
            )}

            <p
              className={`${
                theme === "dark" ? "darkmodetext" : "lightmodetext"
              } `}
            >
              Back
            </p>
          </Link>
        </div>

        {filteredCountry && (
          <div className="flex flex-col xl:flex-row xl:gap-24 py-12  min-h-screen">
            <div className="xl:w-1/2 w-full">
              <img
                src={filteredCountry.flag}
                className="w-full h-[500px]"
                alt="country-image"
              />
            </div>
            <div
              className={`${
                theme === "light" ? "lightmodetext " : "darkmodetext "
              } xl:w-1/2 w-full py-16 flex flex-col gap-12`}
            >
              <p className="text-4xl font-extrabold xl:text-left ">
                {filteredCountry && filteredCountry.commonName}
              </p>
              <div
                className={`flex flex-col xl:flex-row xl:justify-between xl:items-start  text-left`}
              >
                <div className="flex flex-col gap-4">
                  <p className="xl:text-base text-lg">
                    <span className="font-semibold">Native Name:</span>{" "}
                    {nativeName}
                  </p>
                  <p className="xl:text-base text-lg">
                    <span className="font-semibold">Population: </span>{" "}
                    {filteredCountry.population.toLocaleString()}
                  </p>
                  <p className="xl:text-base text-lg">
                    <span className="font-semibold">Region: </span>{" "}
                    {filteredCountry.region}
                  </p>
                  <p className="xl:text-base text-lg">
                    <span className="font-semibold">Sub Region: </span>{" "}
                    {filteredCountry.subregion}
                  </p>
                  <p className="xl:text-base text-lg">
                    <span className="font-semibold">Capital: </span>{" "}
                    {filteredCountry.capital[0]}
                  </p>
                </div>
                <div className="flex flex-col gap-5 mt-5 xl:mt-0">
                  <p className="xl:text-base text-lg">
                    <span className="font-semibold">Top Level Domain:</span>{" "}
                    {filteredCountry.tld}
                  </p>
                  <p className="xl:text-base text-lg">
                    <span className="font-semibold">Currencies:</span>{" "}
                    {currency}
                  </p>
                  <p className="xl:text-base text-lg">
                    <span className="font-semibold">Languages:</span>{" "}
                    {formattedLanguageString}
                  </p>
                </div>
              </div>
              <div className="flex flex-col xl:flex-row pt-8 ">
                <p className="xl:text-base text-lg font-semibold mb-4 xl:mb-0">
                  Border Countries:
                </p>{" "}
                <div className=" grid grid-cols-3 xl:gap-3 gap-1 xl:ml-4">
                  {filteredCountry.borders &&
                  Array.isArray(filteredCountry.borders) ? (
                    filteredCountry.borders.map((code: any) => {
                      const borderCountry = countries.find(
                        (c: any) => c.cca3 === code
                      );
                      return borderCountry ? (
                        <span
                          key={code}
                          className={`${
                            theme === "light"
                              ? "border-slate-200  border-2 border-solid bg-[#ffffff]"
                              : "border-none darkmodeelements"
                          } xl:text-[16px] md:text-[14px] text-[10.5px] xl:px-2 py-3 px-1 rounded-[6px] xl:w-40 w-26 md:w-40 text-center shadow-md`}
                        >
                          {(borderCountry as any).commonName}
                        </span>
                      ) : null;
                    })
                  ) : (
                    <span>No border countries</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryInfo;
