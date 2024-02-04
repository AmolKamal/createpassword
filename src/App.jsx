import { useCallback, useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charsAllowed, setCharsAllowed] = useState(true);
  const [specialChar, setSpecialChar] = useState(false);
  const [password, setPassword] = useState("password");

  const passwordRef = useRef(null);

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  const generatePassword = useCallback(() => {
    let str = "";
    const charArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numArray = "0123456789";
    const specials = "!@#$%^&*()-_+={}[]|:;<>/?.,";

    if (charsAllowed) str += charArray;
    if (numberAllowed) str += numArray;
    if (specialChar) str += specials;
    if (!str) str += charArray;

    let tempPass = "";

    for (let i = 0; i < length; i++) {
      tempPass += str[Math.floor(Math.random() * str.length)];
    }

    setPassword(tempPass);
  }, [length, charsAllowed, numberAllowed, specialChar]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charsAllowed, specialChar]);

  return (
    <>
      <div className="bg-gray-800 flex flex-col justify-center items-center h-screen">
        <h1 className="text-3xl text-white text-center fixed top-0 bg-gray-900 p-7 w-screen ">
          create password
        </h1>
        <div className="container w-1/3 bg-gray-700 rounded-xl">
          <div className="m-3 flex shadow justify-center rounded-lg overflow-hidden">
            <input
              className="px-4 py-2 w-full  text-xl"
              type="text"
              value={password}
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              className="px-4 py-2  bg-green-800 text-white"
              onClick={copyPassword}
            >
              Copy
            </button>
          </div>

          <div className="flex flex-col items-center justify-center text-sm gap-x-2 py-3 px-5">
            <div className="flex flex-col w-1/2 gap-x-1">
              <input
                type="range"
                min={6}
                max={30}
                value={length}
                name="length"
                id="length"
                className="cursor-pointer accent-green-400 "
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label
                htmlFor="length"
                className=" text-lg text-green-400  m-auto"
              >
                {length} Characters
              </label>
            </div>

            <div className="flex w-1/2 gap-x-1 py-3 px-5">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
                className="accent-green-500"
                name="number"
                id="number"
              />
              <label htmlFor="number" className="text-md text-white ">
                Numbers
              </label>
            </div>

            <div className="flex w-1/2 gap-x-1 py-3 px-5">
              <input
                type="checkbox"
                defaultChecked={charsAllowed}
                onChange={() => {
                  setCharsAllowed((prev) => !prev);
                }}
                name="chars"
                id="chars"
                className="accent-green-500"
              />
              <label htmlFor="chars" className="text-md text-white ">
                Characters
              </label>
            </div>

            <div className="flex w-1/2 gap-x-2 py-3 px-5 ">
              <input
                type="checkbox"
                defaultChecked={specialChar}
                onChange={() => {
                  setSpecialChar((prev) => !prev);
                }}
                name="specs"
                id="specs"
                className="accent-green-500"
              />
              <label htmlFor="specs" className="text-md text-white ">
                Special Characters
              </label>
            </div>

            <button
              className="rounded-lg px-5 py-3 m-3 text-white bg-blue-500"
              onClick={generatePassword}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
