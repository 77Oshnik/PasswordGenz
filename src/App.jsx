import { useState, useCallback, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [AllowedNumber, setAllowedNumber] = useState(false);
  const [AllowedCharacter, setAllowedCharacter] = useState(false);
  const [Password, setPassword] = useState("");

const passwordref=useRef(null)

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuwxyz";

    if (AllowedNumber) str += "1234567890";
    if (AllowedCharacter) str += "!@#$%^&*`~()[]{}";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, AllowedNumber, AllowedCharacter]);

const copypassword=useCallback(()=>{
  passwordref.current?.select();
  passwordref.current?.setSelectionRange(0,50)
  window.navigator.clipboard.writeText(Password)
},[Password])

  useEffect(()=>{passwordgenerator()}, [length, AllowedNumber, AllowedCharacter])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
       <h1 className="text-white text-center my-3 ">Password Generator </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          
          <input
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordref}
          />
          <button className="bg-blue-500 text-white px-0.5 py-2 shrink-0" onClick={copypassword}>Copy</button>
        </div>
        <div className="'flex text-sm gap-x-2">
          <div className='flex items-center gap-x-1'> 
          <input type="range"
          min={8} 
          max={50}
          value={length}
          className="cursor-pointer"
          onChange={(e)=>{setlength(e.target.value)}}
          />
          <label htmlFor="">Length:{length}</label>
          </div>
          <div className="'flex items-center gap-x-1'">
          <input
          type="checkbox"
          defaultChecked={AllowedNumber}
          id="numberInput"
          onChange={() => {
              setAllowedNumber((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={AllowedCharacter}
              id="characterInput"
              onChange={() => {
                  setAllowedCharacter((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
        </div>
      </div>
    </>
  );
}

export default App;
