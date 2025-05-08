import React, { useState } from "react";
import viteLogo from "/vite.svg";
import AutosuggestInput from "./AutosuggestInput"; // Import the AutosuggestInput component

interface Suggestion {
  label: string;
  value: string;
}

const VitePlusTextBox = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // Example suggestions - these could come from a prop or an API.
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

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const handleSuggestionClick = (selectedValue: string) => {
    setText(selectedValue);
    console.log("Selected value: ", selectedValue);
  };
  const handleUpdateTextFieldClick = () => {
    // You can set a default value or use state to manage what value to set
    setText("Updated Text"); // Simple example: set a fixed string
  };

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

      <div>
        <AutosuggestInput
          onTextChange={handleTextChange}
          onSuggestionClick={handleSuggestionClick}
          suggestions={allSuggestions}
        />
        <button
          onClick={handleUpdateTextFieldClick}
          style={{ marginTop: "8px" }}
        >
          Update text field
        </button>
        <button onClick={handleClick} style={{ marginTop: "8px" }}>
          Show Alert
        </button>
      </div>
    </>
  );
};

export default VitePlusTextBox;
