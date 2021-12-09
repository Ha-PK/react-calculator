import Button from "./Button";

export default function ButtonPanel() {
  const buttonNames = [
    "CE",
    "C",
    "Back",
    "/",
    "7",
    "8",
    "9",
    "x",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "+/-",
    "0",
    ".",
    "=",
  ];

  return (
    <div className="app-panel">
      {buttonNames.map((name, index) => (
        <Button name={name} key={index} />
      ))}
    </div>
  );
}
