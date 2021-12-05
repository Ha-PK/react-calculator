import { useState } from "react";
import CalculatorButton from "./CalculatorButton";
import CalculatorScreen from "./CalculatorScreen";

function Calculator() {
  const [value, setValue] = useState("0");
  const [tmp, setTmp] = useState("0");
  const [operator, setOperator] = useState(null);
  const [error, setError] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  function handleNumberClick(number) {
    if (error) clearAll();

    let newValue = value;

    if (isCompleted && number === ".") {
      newValue = "0.";
    } else if (
      (value === "0" && number !== ".") ||
      (isCompleted && number !== ".")
    ) {
      newValue = number;
    } else if (value.length >= 20) {
      return;
    } else {
      newValue = formatNumber(value + number);
    }

    setValue(newValue);
    setIsCompleted(false);
  }

  function handleOperator(inputOperator) {
    if (error) return;

    if (operator && !isCompleted) {
      handleEqual();
      setOperator(inputOperator);
      return;
    }

    setTmp(value);
    setOperator(inputOperator);
    setIsCompleted(true);
  }

  function handleNegative() {
    if (value === 0) return;

    let newValue = -convertToNumber(value);

    setValue(formatNumber(newValue));
  }

  function handleEqual() {
    let result = 0;
    let newError = "";

    if (error) return clearAll();

    if (!operator) {
      result = formatNumber(convertToNumber(value || 0));

      setValue(result);
      setTmp(result);
      setOperator(null);
      setIsCompleted(true);
      setError(newError);

      return;
    }

    const newTmp = convertToNumber(tmp);
    const newValue = convertToNumber(value);

    switch (operator) {
      case "/":
        if (newValue === 0) newError = "Cannot devide by zero";
        else result = newTmp / newValue;
        break;
      case "x":
        result = newTmp * newValue;
        break;
      case "-":
        result = newTmp - newValue;
        break;
      case "+":
        result = newTmp + newValue;
        break;
      default:
        result = 0;
        break;
    }

    result = formatNumber(result);

    setValue(result);
    setTmp(result);
    setOperator(null);
    setIsCompleted(true);
    setError(newError);
  }

  function handleBackClick() {
    if (error) return clearAll();

    let newValue = formatNumber(value.toString().slice(0, -1));
    setValue(newValue);
  }

  function clearEntry() {
    if (error) return clearAll();
    setValue("0");
  }

  function clearAll() {
    setValue("0");
    setTmp("0");
    setOperator(null);
    setIsCompleted(false);
    setError("");
  }

  const realValue = error || value;

  return (
    <div className="calculator">
      <div className="calculator-header">
        Simple calculator by HaPK using ReactJS
      </div>
      <div className="calculator-operator">{operator}</div>
      <CalculatorScreen value={realValue} />
      <div className="calculator-board">
        <CalculatorButton text="CE" onClick={clearEntry} />
        <CalculatorButton text="C" onClick={clearAll} />
        <CalculatorButton text="Back" onClick={handleBackClick} />
        <CalculatorButton
          className={error ? "is-disabled" : ""}
          onClick={() => handleOperator("/")}
          text="/"
        />
        <CalculatorButton
          className="is-number"
          text="7"
          onClick={() => handleNumberClick("7")}
        />
        <CalculatorButton
          className="is-number"
          text="8"
          onClick={() => handleNumberClick("8")}
        />
        <CalculatorButton
          className="is-number"
          text="9"
          onClick={() => handleNumberClick("9")}
        />
        <CalculatorButton
          className={error ? "is-disabled" : ""}
          onClick={() => handleOperator("x")}
          text="x"
        />
        <CalculatorButton
          className="is-number"
          text="4"
          onClick={() => handleNumberClick("4")}
        />
        <CalculatorButton
          className="is-number"
          text="5"
          onClick={() => handleNumberClick("5")}
        />
        <CalculatorButton
          className="is-number"
          text="6"
          onClick={() => handleNumberClick("6")}
        />
        <CalculatorButton
          className={error ? "is-disabled" : ""}
          onClick={() => handleOperator("-")}
          text="-"
        />
        <CalculatorButton
          className="is-number"
          text="1"
          onClick={() => handleNumberClick("1")}
        />
        <CalculatorButton
          className="is-number"
          text="2"
          onClick={() => handleNumberClick("2")}
        />
        <CalculatorButton
          className="is-number"
          text="3"
          onClick={() => handleNumberClick("3")}
        />
        <CalculatorButton
          className={error ? "is-disabled" : ""}
          onClick={() => handleOperator("+")}
          text="+"
        />
        <CalculatorButton
          className="is-number"
          onClick={() => handleNegative()}
          text="+/-"
        />
        <CalculatorButton
          className="is-number"
          text="0"
          onClick={() => handleNumberClick("0")}
        />
        <CalculatorButton
          className="is-number"
          onClick={() => handleNumberClick(".")}
          text="."
        />
        <CalculatorButton
          className="is-equal"
          onClick={() => handleEqual()}
          text="="
        />
      </div>
    </div>
  );
}

function formatNumber(input) {
  let value = input
    .toString()
    .replaceAll(",", "")
    .match(/^-?\d+(\.\d*)?/g);

  if (!value) {
    return "0";
  }

  value = value[0];

  let [intergerPortion, remainder] = value.split(".");

  let result = parseInt(intergerPortion).toLocaleString("en");

  if (remainder !== undefined) {
    result += "." + remainder;
  }

  return result;
}

function convertToNumber(input) {
  return parseFloat(input.toString().replaceAll(",", "") || 0);
}

export default Calculator;
