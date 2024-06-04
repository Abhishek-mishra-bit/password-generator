import { useCallback, useState, useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [characterAllowed, setCharacterAllowed] = useState(true);

  const [password, setPassword] = useState("");
  const copiedPasswordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let result = "";
    const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz${
      numberAllowed ? "0123456789" : ""
    }${characterAllowed ? "!@#$%^&*()_+" : ""}`;
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    setPassword(result);
  }, [length, numberAllowed, characterAllowed]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    if (copiedPasswordRef.current) {
      copiedPasswordRef.current.style.display = "block";
      copiedPasswordRef.current.classList.add("fade-in");
      setTimeout(() => {
        copiedPasswordRef.current.classList.remove("fade-in");
        copiedPasswordRef.current.style.display = "none";
      }, 2000);
    }
  };

  return (
    <div className="app">
      <h3 className="heading">Password Generator</h3>
      <div>
        <input
          type="text"
          className="ipad-password"
          placeholder="Password"
          readOnly
          value={password}
          aria-label="Generated Password"
        />
        <button className="btn-copy" onClick={copyToClipboard}>
          Copy Password
        </button>
        <span
          ref={copiedPasswordRef}
          className="copied-message"
          style={{ display: "none" }}>
          Password copied!
        </span>
      </div>
      <div className="down">
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          aria-label="Password Length"
        />
        <label htmlFor="length" className="value-label">
          {length}
        </label>
        <input
          type="checkbox"
          checked={numberAllowed}
          onChange={(e) => setNumberAllowed(e.target.checked)}
          aria-label="Include Numbers"
        />
        <label htmlFor="number" className="number">
          Numbers
        </label>
        <input
          type="checkbox"
          checked={characterAllowed}
          onChange={(e) => setCharacterAllowed(e.target.checked)}
          aria-label="Include Special Characters"
        />
        <label htmlFor="character" className="character">
          Characters
        </label>
        <button className="btn-generate" onClick={generatePassword}>
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
