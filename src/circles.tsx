import * as React from "react";
import * as ReactDOM from "react-dom";
import type { D3ElementNode } from "./data-types";
import { colors } from "./constants";
import { ElementAttributes, GlobalAttributes } from "./attributes";
import { useAttributesGroup } from "./attributes-group";
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";

function AttributesPortal({ children }: { children: React.ReactNode }) {
  const [attributesGroup] = useAttributesGroup();
  return attributesGroup
    ? ReactDOM.createPortal(children, attributesGroup)
    : null;
}

interface GroupCircleProps {
  d: D3ElementNode;
  isSelected: boolean;
  handleClick: (
    e: React.MouseEvent<SVGCircleElement, MouseEvent>,
    d: D3ElementNode
  ) => void;
}

export function GroupCircle({ d, handleClick, isSelected }: GroupCircleProps) {
  const {
    x,
    y,
    r,
    data: { name, description },
  } = d;
  const { hoverProps, isHovered } = useHover({})

  const { isFocusVisible, focusProps } = useFocusRing();

  const ref = React.useRef<SVGCircleElement>(null);
  const { buttonProps, isPressed, } = useButton(
    {
      onPress: (e) => handleClick(e, d),

      elementType: "circle",
    },
    ref
  );
  return (
    <g transform={`translate(${x},${y})`} className="circle group">
      <title>Group: {name}</title>
      <desc>{description}</desc>
      <circle
        cursor="pointer"
        r={r}
        strokeWidth={isSelected ? 1.75 : 0.5}
        strokeOpacity={0.5}
        stroke={isFocusVisible || isSelected ? colors.black : colors.darkBlue}
        fill={getElementFill({ isPressed, isSelected, isHovered })}
        fillOpacity={0.5}
        {...buttonProps}
        {...focusProps}
        {...hoverProps}
      />
    </g>
  );
}

interface getElementFillProps {
  isSelected: boolean;
  isHovered: boolean;
  isEmpty?: boolean;
  hasChildren?: boolean;
  isPressed?: boolean;
}

function getElementFill({
  isSelected,
  isHovered,
  isEmpty,
  hasChildren,
  isPressed,
}: getElementFillProps) {
  if (isPressed) return colors.lighterBlue;
  if (isSelected) return "none";
  if (isHovered) return colors.lightBlue;
  if (hasChildren) return "transparent";
  if (isEmpty) return "transparent";

  return colors.black;
}

interface ElementCircleProps {
  d: D3ElementNode;
  isSelected: boolean;
  showText: boolean;
  handleClick: (
    e: React.MouseEvent<SVGCircleElement, MouseEvent>,
    d: D3ElementNode
  ) => void;
}

export function ElementCircle({
  d,
  handleClick,
  isSelected,
  showText,
}: ElementCircleProps) {
  const {
    data: { tag, name, type, attributes },
    r,
    x,
    y,
    children,
  } = d;

  const { isFocusVisible, focusProps } = useFocusRing();
  const ref = React.useRef<SVGCircleElement>(null);
  const { buttonProps, isPressed } = useButton(
    {
      onPress: (e) => handleClick(e, d),
      elementType: "circle",
    },
    ref
  );

  const { hoverProps, isHovered } = useHover({})

  const hasChildren = Boolean(children);
  const isEmpty = type?.includes("empty");
  const isUnique = type?.includes("unique");
  const isExperimental = type?.includes("experimental");
  const showTextInElement = hasChildren ? false : showText ? true : false;

  const circumference = 2 * Math.PI * r;
  const stroke = hasChildren ? colors.grey : colors.purple;
  const fill = getElementFill({
    isPressed,
    isSelected,
    isEmpty,
    isHovered,
    hasChildren,
  });
  const strokeWidth = isHovered ? 1.3 : 0.9;
  const strokeDasharray = isExperimental ? 3 : "none";
  const title = tag ?? name;

  return (
    <g
      transform={`translate(${x},${y})`}
      pointerEvents="all"
      className="circle element"
    >
      <title>
        {tag ? `Element: ${tag}` : ""} {name}
      </title>
      <circle
        ref={ref}
        cursor="pointer"
        r={r}
        strokeWidth={strokeWidth}
        stroke={isFocusVisible ? colors.black : stroke}
        strokeDasharray={strokeDasharray}
        fill={fill}
        {...buttonProps}
        {...hoverProps}
      />
      {isUnique ? (
        <circle
          pointerEvents="none"
          r={r}
          fill="none"
          stroke="#E8E1D9"
          strokeWidth={1}
          strokeDasharray={`${(1 / 20) * circumference} ${
            (1 / 18) * circumference
          }`}
        />
      ) : null}
      {showTextInElement ? (
        <text
          fill={
            isHovered ? colors.black : isEmpty ? colors.blue : colors.offWhite
          }
          stroke={isHovered ? colors.offWhite : colors.black}
          strokeOpacity={0.75}
          strokeWidth={0.3}
          fontSize={6}
          paintOrder="stroke"
          textAnchor="middle"
          dominantBaseline="middle"
          pointerEvents="none"
        >
          {title.split(" ").map((e: string, i: number, D: unknown[]) => (
            <tspan
              key={e}
              x={0}
              y={`${i - D.length / 2 + 0.5}em`} // from https://observablehq.com/@d3/pack
            >
              {e}
            </tspan>
          ))}
        </text>
      ) : null}
      <AttributesPortal>
        <g transform={`translate(${x},${y})`}>
          {isSelected ? <GlobalAttributes r={r} /> : null}
          {isSelected && attributes ? (
            <ElementAttributes attributes={attributes} r={r} />
          ) : null}
        </g>
      </AttributesPortal>
    </g>
  );
}

interface BackgroundElementCircleProps {
  d: D3ElementNode;
  handleClick: (
    e: React.MouseEvent<SVGCircleElement, MouseEvent>,
    d: D3ElementNode
  ) => void;
  isSelected: boolean;
  circleProps?: React.SVGProps<SVGCircleElement>;
}

/* Similar, but special circle element for
 * <html>
 * <head>
 * <body>
 * Currently selected group element
 */
export function BackgroundElementCircle({
  d,
  handleClick,
  isSelected,
  circleProps,
}: BackgroundElementCircleProps) {
  const {
    data: { tag, name },
    r,
    x,
    y,
  } = d;
  const { hoverProps, isHovered } = useHover({})
  const ref = React.useRef<SVGCircleElement>(null);
  const { buttonProps } = useButton(
    {
      onPress: (e) => handleClick(e, d),
      elementType: "circle",
    },
    ref
  );
  const strokeWidth = isSelected ? 4.5 : isHovered ? 2 : 1;

  return (
    <g
      transform={`translate(${x},${y})`}
      pointerEvents="all"
      className="circle background-element"
      id={tag}
    >
      <title>
        {tag} {name}
      </title>
      <circle
        cursor="pointer"
        ref={ref}
        r={r}
        strokeWidth={strokeWidth}
        fill={isHovered ? "silver" : "transparent"}
        {...circleProps}
        {...buttonProps}
        {...hoverProps}
      />
    </g>
  );
}
