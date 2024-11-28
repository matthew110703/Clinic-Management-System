import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { Search } from "@mui/icons-material";
import PatientCard from "../cards/PatientCard";

const SearchBar = ({ onChange, classes }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([
    {
      fullName: "John Doe",
      age: 25,
      gender: "male",
      lastVisted: "12th Oct 2021",
    },
    {
      fullName: "John Doe",
      age: 25,
      gender: "male",
      lastVisted: "12th Oct 2021",
    },
    {
      fullName: "John Doe",
      age: 25,
      gender: "male",
      lastVisted: "12th Oct 2021",
    },
    {
      fullName: "John Doe",
      age: 25,
      gender: "male",
      lastVisted: "12th Oct 2021",
    },
    {
      fullName: "John Doe",
      age: 25,
      gender: "male",
      lastVisted: "12th Oct 2021",
    },
  ]);

  const resultsElement = useRef(null);

  // useEffect(() => {
  //   // onChange(search);
  // }, [search, onChange]);

  return (
    <div
      className={`relative z-10 h-12 p-1.5 text-lg flex gap-x-1.5 items-center border-2 border-primary rounded-full ${classes}`}
    >
      <span className="text-3xl">
        <Search fontSize="inherit" />
      </span>
      <input
        id="search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Patients..."
        className="w-56 focus:w-80 transition-all ease-out h-full outline-none bg-transparent"
        autoComplete="off"
        onFocus={() => (resultsElement.current.hidden = false)}
        onBlur={() =>
          setTimeout(() => (resultsElement.current.hidden = true), 200)
        }
      />
      {/* Search Results */}
      <div
        className="absolute top-14 left-0 -mt-2 w-full h-96 bg-white  rounded-b-2xl shadow-md p-2 overflow-y-auto space-y-2"
        ref={resultsElement}
        hidden
      >
        {results.map((result, idx) => {
          return (
            <PatientCard
              key={idx}
              variant="default"
              patient={result}
              classes={"first:mt-0 last:mb-0 mx-auto"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onChange: PropTypes.func,
  classes: PropTypes.string,
};
