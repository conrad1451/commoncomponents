// CHQ: scaffolding created with Gemini AI assistance

import React, { useState, useEffect, useCallback, useRef } from "react";

// import React, { useEffect, useCallback } from "react";
// import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import { motion, AnimatePresence } from "framer-motion";
// import InputAdornment from "@mui/material/InputAdornment";
// import SvgIcon from "@mui/material/SvgIcon";

interface Suggestion {
  id: number;
  title: string;
}

// interface AutoCompleteSearchProps {
//   data: string[];
//   onSelect: Function;
// }
interface AutoCompleteSearchProps {
  data: string[];
  onSelect?: (item: string) => void;
}

/*
const MagnifyingGlassIcon = (props: {
  xPos: number;
  yPos: number;
  size: number;
}) => {
  return (
    <SvgIcon style={{ color: "gray" }} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        // strokeWidth={props.size * 1}
        strokeWidth={props.size * 0.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: "gray" }}
        className="w-5 h-5 mr-2"
      >
        <circle
          cx={props.xPos + 11}
          cy={props.yPos + 11}
          r={props.size * 2}
        ></circle>
        <line
          x1={props.xPos + 21}
          y1={props.yPos + 21}
          x2={props.xPos + 12.65 + props.size * 1}
          y2={props.yPos + 12.65 + props.size * 1}
        ></line>
      </svg>
    </SvgIcon>
  );
};

const CancelIcon = (props: { xPos: number; yPos: number; size: number }) => {
  const xPos = props.xPos;
  const yPos = props.yPos;
  const mySize = props.size;

  return (
    <SvgIcon style={{ color: "gray" }} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={"0 " + "0 " + mySize * 4 + " " + mySize * 4}
        fill="none"
        stroke="currentColor"
        // strokeWidth="2"
        strokeWidth={props.size / 3}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: "gray" }}
        className="w-5 h-5"
      >
        <line
          x1={mySize * 3 + xPos}
          y1={mySize * 1 + yPos}
          x2={mySize * 1 + xPos}
          y2={mySize * 3 + yPos}
        ></line>
        <line
          x1={mySize * 1 + xPos}
          y1={mySize * 1 + yPos}
          x2={mySize * 3 + xPos}
          y2={mySize * 3 + yPos}
        ></line>
      </svg>
    </SvgIcon>
  );
};
*/
const ArrowUpIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      style={{ color: "gray" }}
    >
      <polyline points="20 15 12 7 4 15"></polyline>
    </svg>
  );
};

const ArrowDownIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      style={{ color: "gray" }}
    >
      <polyline points="4 9 12 17 20 9"></polyline>
    </svg>
  );
};

const AutoCompleteSearch: React.FC<AutoCompleteSearchProps> = ({
  data,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false); // New state for controlling suggestion visibility
  const inputRef = useRef<HTMLInputElement>(null);

  // Simulate fetching suggestions from an API
  const fetchSuggestions = useCallback(
    (query: string, availableData: string[]) => {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        // In a real application, you would fetch data from an API
        const mockSuggestions: Suggestion[] = availableData
          .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
          .map((item, index) => ({
            id: index + 1,
            title: item,
          }));

        setSuggestions(mockSuggestions);
        setIsLoading(false);
        setShowSuggestions(mockSuggestions.length > 0); // Show suggestions only if there are any
      }, 300);
    },
    []
  );

  // Fetch suggestions when the search term changes
  useEffect(() => {
    if (searchTerm) {
      fetchSuggestions(searchTerm, data);
    } else {
      setSuggestions([]); // Clear suggestions when search term is empty
      setShowSuggestions(false);
    }
  }, [searchTerm, fetchSuggestions, data]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setSearchTerm(suggestion.title);
    setSuggestions([]); // Clear suggestions after selection
    setShowSuggestions(false);
  };

  const toggleSuggestions = () => {
    setShowSuggestions((prev) => !prev);
  };

  const handleAddToList = () => {
    if (searchTerm && onSelect) {
      onSelect(searchTerm);
      setSearchTerm(""); // Clear the search term after adding
      setShowSuggestions(false); //hide suggestions
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative flex items-center w-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => {
            // setIsFocused(true);
            if (searchTerm) {
              setShowSuggestions(suggestions.length > 0);
            }
          }}
          // onBlur={() => setIsFocused(false)}
          className="w-full pr-10 border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" // Added some basic styling
        />
        <Button
          variant="text"
          size="small"
          onClick={toggleSuggestions}
          className="absolute right-2"
          style={{ padding: 0 }}
          aria-label="Toggle suggestions"
        >
          {showSuggestions ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={handleAddToList}
          className="min-w-0"
          style={{ padding: 0, marginRight: "8px" }}
          aria-label="Add to list"
        >
          Add to list
          {/* <CancelIcon xPos={0} yPos={0} size={3} /> */}
        </Button>
      </div>

      {showSuggestions && (
        <ul>
          {isLoading ? (
            <li className="px-4 py-2 text-gray-500">Loading...</li>
          ) : suggestions.length === 0 ? (
            <li className="px-4 py-2 text-gray-500">No suggestions found</li>
          ) : (
            suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {suggestion.title}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

const AutoCompleteTest = () => {
  const sampleData = ["cheese", "pickle", "juice", "fish", "chips"];
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleItemSelect = (item: string) => {
    setSelectedItems((prevItems) => {
      if (!prevItems.includes(item)) {
        return [...prevItems, item];
      }
      return prevItems;
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <AutoCompleteSearch data={sampleData} onSelect={handleItemSelect} />
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Selected Items:</h2>
        {selectedItems.length > 0 ? (
          <ul>
            {selectedItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No items selected.</p>
        )}
      </div>
    </div>
  );
};

export default AutoCompleteTest;
