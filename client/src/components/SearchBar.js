import React, { useState, useRef } from "react";

const SearchBar = ({ searchFunction }) => {
  const [query, setQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const inputRef = useRef();

  const BarStyling = {
    width: "20rem",
    background: "#F2F1F9",
    border: "none",
    padding: "0.5rem",
    marginRight: "0.3rem",
  };

  // React.useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  const submitSearch = () => {
    if (query !== "") {
      setSearchHistory((prevHistory) => [...prevHistory, query].sort());
      searchFunction(query);
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyUp = (event) => {
    event.preventDefault();
    if (query) {
      setFilteredHistory(searchHistory.filter((item) => item.includes(query)));
      setShowHistory(true);
    } else {
      setShowHistory(false);
    }
    if (event.keyCode === 13) {
      submitSearch();
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    submitSearch();
  };

  return (
    <>
      <input
        style={BarStyling}
        ref={inputRef}
        value={query}
        placeholder={"Search"}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      {showHistory && filteredHistory ? (
        <ul style={{ listStyleType: "none", textAlign: "left" }}>
          {filteredHistory.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      ) : null}
      <button onClick={handleClick}>Submit</button>
    </>
  );
};

export default SearchBar;
