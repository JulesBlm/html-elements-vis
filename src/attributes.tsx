import * as React from "react";
import { forceSimulation, forceCollide, forceRadial } from "d3-force";
import { colors } from "./constants";

import type { Attribute } from "./data-types";

import globalAttributes from "./global-attributes.json";
import { useAttributesGroup } from "./attributes-group";
import { useHover } from "@react-aria/interactions";

// const attributeColors = {
//   global:,
//   boolean:,
//   enum
// }

interface AttributeCircleProps extends Attribute {
  x: number;
  y: number;
  r: number;
}

const globalFactor = 0.1;
const elementFactor = 2 * globalFactor;

// todo color by type
// show description, links and values on select
function AttributeCircle({
  x = 0,
  y = 0,
  r,
  name,
  description,
  type,
}: AttributeCircleProps) {
  const { hoverProps, isHovered } = useHover({})
  const isGlobal = type?.includes("global");
  const factor = isGlobal ? globalFactor : elementFactor;
  const radius = r * factor;

  return (
    <g cursor="pointer" transform={`translate(${x},${y})`}>
      <title>
        {name}: {description}
      </title>
      <circle
        className="force-node"
        r={radius}
        fillOpacity={0.85}
        key={name}
        strokeWidth={isHovered ? 0.15 : 0.1}
        fill={isHovered ? "grey" : isGlobal ? colors.grey : colors.offWhite}
        stroke={isHovered ? colors.purple : colors.darkPurple}
        {...hoverProps}
        // style={{ backdropFilter: "blur(20px)" }}
      />
      <text
        fill={colors.black}
        stroke={colors.offWhite}
        paintOrder="stroke"
        strokeWidth={0.05}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={radius * 0.4}
        pointerEvents="none"
      >
        {name}
      </text>
    </g>
  );
}

interface AttributesProps {
  r: number;
  attributes: Attribute[];
}

// https://reactfordataviz.com/articles/force-directed-graphs-with-react-and-d3v7/
export function ElementAttributes({ r, attributes }: AttributesProps) {
  const [animatedNodes, setAnimatedNodes] = React.useState<any[]>([]);

  // re-create animation every time nodes change
  React.useEffect(() => {
    const simulation = forceSimulation();

    // update state on every frame
    simulation.on("tick", function ticked() {
      setAnimatedNodes([...simulation.nodes()]);
    });

    simulation
      .force("collide", forceCollide(2))
      .force("radial", forceRadial(r * 0.75, 0, 0));

    const simulationAttributes = attributes;

    // copy nodes into simulation
    simulation.nodes(simulationAttributes);

    // stop simulation on unmount
    return () => simulation.stop();
  }, [attributes]);

  return (
    <g className="attribute-circles">
      {animatedNodes.map((node, i) => (
        <AttributeCircle key={i} {...node} r={r} />
      ))}
      {/* TODO SHOW ATTRIBUTE TYPE COLOR LEGEND */}
    </g>
  );
}

// https://reactfordataviz.com/articles/force-directed-graphs-with-react-and-d3v7/
export function GlobalAttributes({ r }: { r: number }) {
  const [animatedNodes, setAnimatedNodes] = React.useState<any[]>([]);

  const { current: globalAttributesCopy } = React.useRef(
    globalAttributes.map((d) => ({ ...d }))
  );

  // re-create animation every time nodes change
  React.useEffect(() => {
    const simulation = forceSimulation();

    // update state on every frame
    simulation.on("tick", function ticked() {
      setAnimatedNodes([...simulation.nodes()]);
    });

    simulation
      .force("collide", forceCollide(1))
      .force("radial", forceRadial(r * 1.15, 0, 0));

    // copy nodes into simulation
    simulation.nodes(globalAttributesCopy);

    // stop simulation on unmount
    return () => simulation.stop();
  }, []);

  return (
    <g className="global-attribute-circles">
      {animatedNodes.map((node, i) => (
        <AttributeCircle key={i} {...node} r={r} />
      ))}
    </g>
  );
}
