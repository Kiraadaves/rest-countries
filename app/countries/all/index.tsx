"use client";
import { RootState } from "@/app/Redux/slice/interface";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { IoIosSearch } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

const All = () => {
  const rowsPerPage = 12;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("Filter by region");
  const [searchCountry, setSearchCountry] = useState("");
  const theme = useSelector((state: RootState) => state.changeTheme.theme);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const mappedCountries = countries?.map((country: any) => ({
    countryName: country.name.official,
    commonName: country.name.common,
    population: country.population,
    region: country.region,
    capital: country.capital,
    flag: country.flags.png,
  }));

  const r = mappedCountries.map((reg) => reg.commonName);
  console.log(r);
  //console.log(mappedCountries);

  const filterByRegion = (status: string) => {
    if (status === "Filter by region") {
      return mappedCountries;
    } else {
      return mappedCountries.filter((r) => r.region.toLowerCase() === status);
    }
  };

  const filteredCountries = searchCountry
    ? filterByRegion(selectedRegion).filter((c) =>
        c.countryName.toLowerCase().includes(searchCountry)
      )
    : filterByRegion(selectedRegion);

  const handleRegion = (value: string) => {
    setSelectedRegion(value);
    console.log(value);
  };

  const handleViewCountryDetails = (capital: any) => {
    console.log(capital);
  };

  return (
    <div
      className={`${
        theme === "light" ? "lightmodebg" : "darkmodebg"
      } py-9 px-12 flex flex-col gap-9`}
    >
      <div className={`relative  w-full flex justify-between `}>
        <div
          className={`${
            theme === "light"
              ? "border-slate-200  border-2 border-solid lightmodeelements"
              : "border-none darkmodeelements"
          } flex items-center rounded-[6px] px-3  shadow-md w-1/3`}
        >
          {theme === "light" ? (
            <IoIosSearch className="h-5 w-5 " />
          ) : (
            <IoIosSearch className="h-5 w-5 darkmodetext" />
          )}
          <Input
            className={`${
              theme === "light"
                ? "placeholder:text-[#111517]"
                : "placeholder:text-[#ffffff]"
            } border-none`}
            placeholder="Search for a country"
            value={searchCountry}
            onChange={(e) => setSearchCountry(e.target.value.toLowerCase())}
          />
        </div>
        <Select onValueChange={handleRegion}>
          <SelectTrigger
            className={`${
              theme === "light"
                ? "lightmodeelements lightmodetext border-slate-200  border-2 border-solid"
                : "border-none darkmodeelements darkmodetext"
            } rounded-[6px] shadow-md w-[180px] h-[48px] px-4`}
          >
            <SelectValue placeholder="Filter by region" />
          </SelectTrigger>

          <SelectContent
            className={`${
              theme === "light"
                ? "lightmodeelements lightmodetext border-slate-200  border-2 border-solid"
                : "border-none darkmodeelements darkmodetext"
            } rounded-[6px] shadow-md py-3`}
          >
            <SelectItem value="africa" className="">
              Africa
            </SelectItem>
            <SelectItem value="americas">America</SelectItem>
            <SelectItem value="asia">Asia</SelectItem>
            <SelectItem value="europe">Europe</SelectItem>
            <SelectItem value="oceania">Oceania</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        {loading ? (
          <div>Loading Countries...</div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {filteredCountries
              .slice(startIndex, endIndex)
              .map((country: any, index) => (
                <div
                  onClick={() =>
                    handleViewCountryDetails(country.capital[0].toLowerCase())
                  }
                  key={index}
                  className={`${
                    theme === "light"
                      ? "border-slate-200  border-2 border-solid"
                      : "border-none"
                  }flex flex-col shadow-md rounded-[6px]`}
                >
                  <div className="h-[200px] w-full rounded-[6px]">
                    <img
                      src={country.flag}
                      className="w-full h-full rounded-t-[6px]"
                    />
                  </div>
                  <div
                    className={`${
                      theme === "light"
                        ? "lightmodetext lightmodeelements"
                        : "darkmodetext darkmodeelements"
                    } px-5 pt-5 pb-8 flex flex-col gap-1 rounded-b-[6px]`}
                  >
                    <p className="text-xl font-extrabold pb-3">
                      {country.countryName}
                    </p>
                    <p>
                      <span className="font-semibold">Population:</span>{" "}
                      {country.population.toLocaleString()}
                    </p>
                    <p>
                      <span className="font-semibold">Region:</span>{" "}
                      {country.region}
                    </p>
                    <p>
                      <span className="font-semibold">Capital:</span>{" "}
                      {country.capital}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      {loading ? (
        <div></div>
      ) : (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button>
                <PaginationPrevious
                  className={`${
                    endIndex === 12
                      ? "pointer-events-none opacity-50"
                      : undefined
                  } ${theme === "light" ? "lightmodetext" : "darkmodetext"}`}
                  onClick={() => {
                    setStartIndex(startIndex - rowsPerPage);
                    setEndIndex(endIndex - rowsPerPage);
                  }}
                />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button>
                <PaginationNext
                  className={`${
                    endIndex === 250
                      ? "pointer-events-none opacity-50"
                      : undefined
                  } ${theme === "light" ? "lightmodetext" : "darkmodetext"}`}
                  onClick={() => {
                    setStartIndex(startIndex + rowsPerPage); //12
                    setEndIndex(endIndex + rowsPerPage); //12 + 12 = 32
                  }}
                />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default All;
