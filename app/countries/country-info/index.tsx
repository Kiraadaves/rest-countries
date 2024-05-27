"use client";
import { RootState } from "@/app/Redux/slice/interface";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";

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
  console.log(formattedLanguageString);
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

  console.log("filteredCountry: ", filteredCountry);
  return (
    <div
      className={`${
        theme === "light" ? "lightmodebg" : "darkmodebg"
      } py-20 px-12 flex flex-col gap-20 h-screen`}
    >
      <div className="md:block flex justify-center">
        <Link
          href="/countries/all"
          className={`${
            theme === "light"
              ? "border-slate-200  border-2 border-solid bg-transparent"
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
        <div className="flex flex-col md:flex-row md:gap-24 ">
          <div className="md:w-1/2 w-full">
            <img
              src={filteredCountry.flag}
              className="w-full md:h-full h-[350px]"
            />
          </div>
          <div
            className={`${
              theme === "light" ? "lightmodetext " : "darkmodetext "
            } md:w-1/2 w-full py-16 flex flex-col gap-12`}
          >
            <p className="text-4xl font-extrabold md:text-left text-center">
              {filteredCountry && filteredCountry.commonName}
            </p>
            <div
              className={`flex flex-col md:flex-row md:justify-between md:items-start text-center md:text-left`}
            >
              <div className="flex flex-col gap-5">
                <p className="text-xl">
                  <span className="font-semibold">Native Name:</span>{" "}
                  {nativeName}
                </p>
                <p className="text-xl">
                  <span className="font-semibold">Population: </span>{" "}
                  {filteredCountry.population.toLocaleString()}
                </p>
                <p className="text-xl">
                  <span className="font-semibold">Region: </span>{" "}
                  {filteredCountry.region}
                </p>
                <p className="text-xl">
                  <span className="font-semibold">Sub Region: </span>{" "}
                  {filteredCountry.subregion}
                </p>
                <p className="text-xl">
                  <span className="font-semibold">Capital: </span>{" "}
                  {filteredCountry.capital[0]}
                </p>
              </div>
              <div className="flex flex-col gap-5 mt-5 md:mt-0">
                <p className="text-xl">
                  <span className="font-semibold">Top Level Domain:</span>{" "}
                  {filteredCountry.tld}
                </p>
                <p className="text-xl">
                  <span className="font-semibold">Currencies:</span> {currency}
                </p>
                <p className="text-xl">
                  <span className="font-semibold">Languages:</span>{" "}
                  {formattedLanguageString}
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row pt-8 items-center">
              <p className="text-xl font-semibold mb-4 md:mb-0">Border Countries:</p>{" "}
              <div className="flex flex-col md:flex-row gap-4 md:ml-4">
                {filteredCountry.borders.length > 0 ? (
                  filteredCountry.borders.map((code: any) => {
                    const borderCountry = countries.find(
                      (c: any) => c.cca3 === code
                    );
                    return borderCountry ? (
                      <span
                        key={code}
                        className={`${
                          theme === "light"
                            ? "border-slate-200  border-2 border-solid bg-transparent"
                            : "border-none darkmodeelements"
                        }  p-3 rounded-[6px] w-40 text-center shadow-md`}
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
  );
};

export default CountryInfo;
