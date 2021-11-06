import React from "react";
import CalculatorButton from "./CalculatorButton";
import CalculatorScreen from "./CalculatorScreen";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "0",
      tmp: "0",
      operator: null,
      error: "",
      isCompleted: false,
    };
  }

  handleNumberClick(number) {
    if (this.state.error) this.clearAll();

    let value = this.state.value;

    if (this.state.isCompleted && number === ".") {
      value = "0.";
    } else if (
      (value === "0" && number !== ".") ||
      (this.state.isCompleted && number !== ".")
    ) {
      value = number;
    } else if (value.length >= 20) {
      return;
    } else {
      value = formatNumber(value + number);
    }

    this.setState({
      isCompleted: false,
      value: value,
    });
  }

  handleOperator(operator) {
    if (this.state.error) return;

    if (this.state.operator && !this.state.isCompleted) {
      this.handleEqual();

      return this.setState({
        operator: operator,
      });
    }

    this.setState({
      tmp: this.state.value,
      operator: operator,
      isCompleted: true,
    });
  }

  handleNegative() {
    let value = this.state.value;

    if (value === 0) return;

    value = -convertToNumber(value);

    this.setState({
      value: formatNumber(value),
    });
  }

  handleEqual() {
    let result = 0;
    let error = "";

    if (this.state.error) return this.clearAll();
    if (!this.state.operator) {
      result = formatNumber(convertToNumber(this.state.value || 0));
      return this.setState({
        value: result,
        tmp: result,
        operator: null,
        isCompleted: true,
        error: error,
      });
    }

    const operator = this.state.operator;
    const tmp = convertToNumber(this.state.tmp);
    const value = convertToNumber(this.state.value);

    switch (operator) {
      case "/":
        if (value === 0) error = "Cannot devide by zero";
        else result = tmp / value;
        break;
      case "x":
        result = tmp * value;
        break;
      case "-":
        result = tmp - value;
        break;
      case "+":
        result = tmp + value;
        break;
      default:
        result = 0;
        break;
    }

    result = formatNumber(result);

    this.setState({
      value: result,
      tmp: result,
      operator: null,
      isCompleted: true,
      error: error,
    });
  }

  handleBackClick() {
    if (this.state.error) return this.clearAll();

    let value = formatNumber(this.state.value.toString().slice(0, -1));

    this.setState({
      value: value,
    });
  }

  clearEntry() {
    if (this.state.error) return this.clearAll();

    this.setState({
      value: "0",
    });
  }

  clearAll() {
    this.setState({
      value: "0",
      tmp: 0,
      operator: null,
      error: "",
      isCompleted: false,
    });
  }

  render() {
    const value = this.state.error ? this.state.error : this.state.value;

    return (
      <div className="calculator">
        <div className="calculator-header">
          Simple calculator by HaPK using ReactJS
        </div>
        <div className="calculator-operator">{this.state.operator}</div>
        <CalculatorScreen value={value} />
        <div className="calculator-board">
          <CalculatorButton text="CE" onClick={() => this.clearEntry()} />
          <CalculatorButton text="C" onClick={() => this.clearAll()} />
          <CalculatorButton
            text="Back"
            onClick={() => this.handleBackClick()}
          />
          <CalculatorButton
            className={this.state.error ? "is-disabled" : ""}
            onClick={() => this.handleOperator("/")}
            text="/"
          />
          <CalculatorButton
            className="is-number"
            text="7"
            onClick={() => this.handleNumberClick("7")}
          />
          <CalculatorButton
            className="is-number"
            text="8"
            onClick={() => this.handleNumberClick("8")}
          />
          <CalculatorButton
            className="is-number"
            text="9"
            onClick={() => this.handleNumberClick("9")}
          />
          <CalculatorButton
            className={this.state.error ? "is-disabled" : ""}
            onClick={() => this.handleOperator("x")}
            text="x"
          />
          <CalculatorButton
            className="is-number"
            text="4"
            onClick={() => this.handleNumberClick("4")}
          />
          <CalculatorButton
            className="is-number"
            text="5"
            onClick={() => this.handleNumberClick("5")}
          />
          <CalculatorButton
            className="is-number"
            text="6"
            onClick={() => this.handleNumberClick("6")}
          />
          <CalculatorButton
            className={this.state.error ? "is-disabled" : ""}
            onClick={() => this.handleOperator("-")}
            text="-"
          />
          <CalculatorButton
            className="is-number"
            text="1"
            onClick={() => this.handleNumberClick("1")}
          />
          <CalculatorButton
            className="is-number"
            text="2"
            onClick={() => this.handleNumberClick("2")}
          />
          <CalculatorButton
            className="is-number"
            text="3"
            onClick={() => this.handleNumberClick("3")}
          />
          <CalculatorButton
            className={this.state.error ? "is-disabled" : ""}
            onClick={() => this.handleOperator("+")}
            text="+"
          />
          <CalculatorButton
            className="is-number"
            onClick={() => this.handleNegative()}
            text="+/-"
          />
          <CalculatorButton
            className="is-number"
            text="0"
            onClick={() => this.handleNumberClick("0")}
          />
          <CalculatorButton
            className="is-number"
            onClick={() => this.handleNumberClick(".")}
            text="."
          />
          <CalculatorButton
            className="is-equal"
            onClick={() => this.handleEqual()}
            text="="
          />
        </div>
      </div>
    );
  }
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
