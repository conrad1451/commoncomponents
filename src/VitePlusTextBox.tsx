import React, { useState, useEffect, useRef, useCallback } from "react";
import viteLogo from "/vite.svg"; // Assuming this is in the root

interface Suggestion {
  label: string;
  value: string;
}

const VitePlusTextBox = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Example suggestions
  const allSuggestions: Suggestion[] = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Orange", value: "orange" },
    { label: "Grapes", value: "grapes" },
    { label: "Watermelon", value: "watermelon" },
    { label: "Pineapple", value: "pineapple" },
    { label: "Strawberry", value: "strawberry" },
    { label: "Kiwi", value: "kiwi" },
    { label: "Mango", value: "mango" },
    { label: "Blueberry", value: "blueberry" },
  ];

  const handleClick = () => {
    alert(text);
  };

  // Filter and show suggestions
  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setText(value);
      if (value) {
        const filteredSuggestions = allSuggestions.filter((suggestion) =>
          suggestion.label.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        setShowSuggestions(filteredSuggestions.length > 0);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    },
    [allSuggestions]
  );

  const handleSuggestionClick = (suggestionValue: string) => {
    setText(suggestionValue);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite</h1>
      <div className="card">
        <button onClick={() => setCount((prevCount) => prevCount + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite logo to learn more</p>

      <div style={{ position: "relative", width: "300px" }}>
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text..."
          style={{ width: "100%", padding: "8px", border: "1px solid #ccc" }}
        />
        <button onClick={handleClick} style={{ marginTop: "8px" }}>
          Show Alert
        </button>
        {showSuggestions && (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "white",
              border: "1px solid #ccc",
              listStyleType: "none",
              padding: 0,
              margin: 0,
              zIndex: 1,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.value}
                onClick={() => handleSuggestionClick(suggestion.value)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  ":hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                {suggestion.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default VitePlusTextBox;
