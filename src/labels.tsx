import { arc } from "d3-shape";
import type { D3ElementNode } from "./data-types";

const circle = arc<number>()
  .innerRadius(0)
  .outerRadius((d: number) => d)
  .startAngle(-Math.PI)
  .endAngle(Math.PI);

interface ParentLabelProps {
  showText: boolean;
  d: D3ElementNode;
  i: number;
}

export function ParentLabel({ d, showText, i }: ParentLabelProps) {
  const {
    x,
    y,
    r,
    data: { tag },
  } = d;

  // textPath idea from https://observablehq.com/@mbostock/wheres-that-2-trillion-going
  const circlePathId = `text-${d.data}-${i}`;
  const fontSize = Math.max(50 - d.depth * 14, 8); // TODO better scale?
  const strokeWidth = 0.08 * fontSize;

  return (
    <g key={tag} transform={`translate(${x},${y})`} className="textPaths">
      <path d={circle(r)} id={circlePathId} stroke={"none"} fill={"none"} />
      {showText ? (
        <text
          fill="#090910"
          pointerEvents="none"
          dominantBaseline={tag === "<html>" ? "top" : "middle"}
          textAnchor="middle"
          paintOrder="stroke"
          stroke="ghostwhite"
          fontSize={fontSize}
          strokeWidth={strokeWidth}
        >
          <textPath startOffset={"50%"} href={`#${circlePathId}`}>
            {tag}
          </textPath>
        </text>
      ) : null}
    </g>
  );
}

interface GroupLabelProps {
  d: D3ElementNode;
}

export function GroupLabel({ d }: GroupLabelProps) {
  const {
    x,
    y,
    r,
    data: { name },
  } = d;

  const fontSize = r / 4.5;
  const strokeWidth = 0.05 * fontSize;

  return (
    <text
      pointerEvents="none"
      transform={`translate(${x},${y - r / 2})`}
      stroke="#090910"
      dominantBaseline="middle"
      textAnchor="middle"
      paintOrder="stroke"
      fill="lightgray"
      fontSize={fontSize}
      strokeWidth={strokeWidth}
    >
      {name?.split(" ").map((e: string, i: number, D: unknown[]) => (
        <tspan
          key={e}
          x={0}
          y={`${i - D.length / 2 + 2.75}em`} // from https://observablehq.com/@d3/pack
        >
          {e}
        </tspan>
      ))}
    </text>
  );
}
