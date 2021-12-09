import { useContext } from "react";
import AppContext from "../context/AppContext";
import isNumberic from "../logic/isNumberic";

export default function Button({ name }) {
  const context = useContext(AppContext);
  let addClass = "";

  if (name === "=") {
    addClass = "is-equal";
  } else if (name === "." || name === "+/-" || isNumberic(name)) {
    addClass = "is-number";
  }

  return (
    <button
      className={`app-btn ${addClass}`}
      onClick={() => context.handleClick(name)}
    >
      {name}
    </button>
  );
}
