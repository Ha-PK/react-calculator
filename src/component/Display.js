export default function Display({ value, operator }) {
  return (
    <>
      <div className="app-header">Simple calculator by HaPK using ReactJS</div>
      <div className="app-operator">{operator}</div>
      <div className="app-display">{value}</div>
    </>
  );
}
