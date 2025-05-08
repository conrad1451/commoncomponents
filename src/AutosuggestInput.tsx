import React, { useState, useEffect, useRef, useCallback } from "react";

interface Suggestion {
  label: string;
  value: string;
}

interface AutosuggestInputProps {
  onTextChange: (text: string) => void;
  onSuggestionClick?: (suggestionValue: string) => void;
  suggestions: Suggestion[];
}

const AutosuggestInput: React.FC<AutosuggestInputProps> = ({
  onTextChange,
  onSuggestionClick,
  suggestions: initialSuggestions,
}) => {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // use initialSuggestions prop.
  useEffect(() => {
    setSuggestions(initialSuggestions);
  }, [initialSuggestions]);

  // Filter and show suggestions
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setText(value);
      onTextChange(value); // Notify parent component
      if (value) {
        const filteredSuggestions = initialSuggestions.filter((suggestion) =>
          suggestion.label.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        setShowSuggestions(filteredSuggestions.length > 0);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    },
    [initialSuggestions, onTextChange]
  );

  const handleSuggestionSelect = (suggestionValue: string) => {
    setText(suggestionValue);
    setShowSuggestions(false);
    onSuggestionClick?.(suggestionValue); // Optional callback
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
    <div style={{ position: "relative", width: "300px" }}>
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={handleInputChange}
        placeholder="Enter text..."
        style={{ width: "100%", padding: "8px", border: "1px solid #ccc" }}
      />
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
              onClick={() => handleSuggestionSelect(suggestion.value)}
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
  );
};

export default AutosuggestInput;
