import { elements } from "./html-pack";

const tableNode = elements.map((d) => d.data.tag === "<table>");

export function CustomTableCircle() {
  return (
    <g>
      {/* top */}
      <text>Caption</text>
      <text>Colgroup</text>
      <text>Thead</text>
      <text>tbody</text>

      <text>tfoot</text>
    </g>
  );
}
