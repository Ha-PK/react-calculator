import { useState } from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import AppContext from "../context/AppContext";
import formatNumber from "../logic/formatNumber";
import toNumber from "../logic/toNumber";
import isNumberic from "../logic/isNumberic";
import "./App.css";

export default function App() {
  const [result, setResult] = useState(null);
  const [next, setNext] = useState(null);
  const [operator, setOperator] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  function clearAll() {
    setResult(null);
    setNext(null);
    setOperator(null);
    setErrorMsg(null);
  }

  function handleEqual() {
    if (errorMsg) {
      return clearAll();
    }

    let newResult = 0;
    let resultInNumber = toNumber(result);
    let nextInNumber = toNumber(next);

    if (operator === "/" && nextInNumber === 0) {
      setOperator(null);
      setErrorMsg("Cannot devide by zero!");
      return;
    }

    if (operator === "+") {
      newResult = resultInNumber + nextInNumber;
    } else if (operator === "-") {
      newResult = resultInNumber - nextInNumber;
    } else if (operator === "x") {
      newResult = resultInNumber * nextInNumber;
    } else if (operator === "/") {
      newResult = resultInNumber / nextInNumber;
    } else {
      newResult = toNumber(next);
    }

    setResult(formatNumber(newResult));
    setNext(null);
    setOperator(null);
    setErrorMsg(null);
  }

  function handleClick(name) {
    name = name.toLowerCase();

    // Click (CE) clear everything
    if (name === "ce") {
      return clearAll();
    }

    // Click (C) clear entry
    if (name === "c") {
      if (errorMsg) {
        return clearAll();
      }

      // if (result && next === null) {
      //   setResult(null);
      // }

      setNext(null);
      setOperator(null);
      setErrorMsg(null);
    }

    // Click Back
    if (name === "back") {
      if (errorMsg) return clearAll();

      if (result && next === null) {
        setNext(formatNumber(String(result).slice(0, -1)));
        setResult(null);
        return;
      }

      if (next !== null) {
        setNext(formatNumber(String(next).slice(0, -1)));
      }
    }

    // Click Equal
    if (name === "=") {
      return handleEqual();
    }

    // Click Numberic
    if (isNumberic(name)) {
      return setNext(formatNumber(next + name));
    }

    // Click Operator
    if (name === "+" || name === "-" || name === "x" || name === "/") {
      if (!operator) {
        if (next) {
          setResult(formatNumber(toNumber(next)));
        }

        setNext(null);
        setOperator(name);
        return;
      }

      if (next === null) {
        return setOperator(name);
      }

      handleEqual();
    }

    // Click +/-
    if (name === "+/-") {
      if (result && next === null) {
        setNext(formatNumber("-" + result));
        setResult(null);
        return;
      }

      return setNext(formatNumber("-" + next));
    }

    // Click dot (.)
    if (name === ".") {
      if (result && next === null) {
        setNext(formatNumber(result + "."));
        setResult(null);
        return;
      }

      return setNext(formatNumber(next + "."));
    }
  }

  return (
    <AppContext.Provider value={{ handleClick }}>
      <div className="app">
        <Display
          value={errorMsg || next || result || "0"}
          operator={operator}
        />
        <ButtonPanel />
      </div>
    </AppContext.Provider>
  );
}
