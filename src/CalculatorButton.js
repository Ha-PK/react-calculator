function CalculatorButton(props) {
  const className = "calculator-btn " + (props.className || "");
  return (
    <div className={className} onClick={props.onClick}>
      {props.text}
    </div>
  );
}

export default CalculatorButton;
