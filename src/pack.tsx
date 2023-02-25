/* eslint-disable no-unused-vars */
import * as React from "react";

import { GroupLabel, ParentLabel } from "./labels";
import { GroupCircle, ElementCircle, BackgroundElementCircle } from "./circles";
import { InfoPortal, ElementInfo } from "./info";

import { makeRoot } from "./html-pack";

import type { D3ElementNode, HtmlElementNode } from "./data-types";
import type { HierarchyCircularNode } from "d3-hierarchy";
import { ZoomContext } from "./zoom-container";

const rootTags = ["<html>", "<head>", "<body>"] as const;

// const tableNode = elements.find((d) => d.data.tag === "<table>");

const elementStroke = { stroke: "hsl(0deg, 0%, 4%)" };

export function Pack() {
  const { setView, width, height } = React.useContext(ZoomContext);

  const {
    elementsWithChildren,
    groups,
    htmlNode,
    headNode,
    bodyNode,
    elementsWithoutBodyAndHead,
  } = React.useMemo(() => {
    const root = makeRoot(width, height);
    const descendants = root.descendants();
    const elements = descendants.filter((d) => !d.data.type?.includes("group"));
    const elementsWithChildren = elements.filter((d) => d.children);
    const groups = descendants
      .filter((d) => d.data.type?.includes("group"))
      .reverse();

    const [htmlNode, headNode, bodyNode] = rootTags.map((tag) =>
      elements.find((d) => d.data.tag === tag)
    );
    const elementsWithoutBodyAndHead = elements.filter(
      (d) => !rootTags.includes(d.data.tag)
    );

    return {
      elementsWithChildren,
      groups,
      htmlNode,
      headNode,
      bodyNode,
      elementsWithoutBodyAndHead,
    };
  }, [width, height]);

  console.group("<Pack/>");

  const [clickedNode, setClickedNode] = React.useState<D3ElementNode>(htmlNode);

  const handleClick = React.useCallback(
    (_e, newClickedNode) => {
      const isSameNode =
        clickedNode.data.name === newClickedNode.data.name &&
        clickedNode.parent;

      const newNode = isSameNode ? clickedNode.parent : newClickedNode;

      setClickedNode(newNode);
      setView([newNode.x, newNode.y, newNode.r * 5]); // TODO factor should depend on viewwidth or something
    },
    [setView, setClickedNode]
  );

  const ancestorNames = clickedNode.ancestors().map((d) => d.data.name);

  const descendantNames = clickedNode
    .descendants()
    .map((d) => d.data.name || d.data.tag);

  const currentDepth = clickedNode.depth;

  const showGroupLabel = (d) => {
    const closeEnough = d.depth - currentDepth <= 1;
    const inDescendants = descendantNames.includes(d.data.name || d.data.tag);

    return (
      closeEnough && inDescendants && d.data.name !== clickedNode.data.name
    );
  };

  const showElementText = (d: HierarchyCircularNode<HtmlElementNode>) =>
    descendantNames.includes(d.data.name) && d.depth - currentDepth <= 2;

  return (
    <>
      <title>A circle pack of all the modern HTML elements</title>
      {/* <filter id={"shadow"} colorInterpolationFilters="sRGB">
        <feDropShadow floodOpacity={0.3} dx={0} dy={1} stdDeviation={3} />
      </filter> */}

      <BackgroundElementCircle
        d={htmlNode}
        handleClick={handleClick}
        isSelected={clickedNode.data.tag === "<html>"}
        circleProps={elementStroke}
      />

      <BackgroundElementCircle
        d={headNode}
        handleClick={handleClick}
        isSelected={clickedNode.data.tag === "<head>"}
        circleProps={elementStroke}
      />

      <BackgroundElementCircle
        d={bodyNode}
        handleClick={handleClick}
        isSelected={clickedNode.data.tag === "<body>"}
        circleProps={elementStroke}
      />

      {/* what was this for again */}
      {clickedNode?.data.type === "group" ? (
        <BackgroundElementCircle
          d={clickedNode}
          isSelected={true}
          handleClick={handleClick}
        />
      ) : null}

      {clickedNode?.parent && clickedNode?.parent.data.tag !== "<html>" ? (
        <BackgroundElementCircle
          d={clickedNode?.parent}
          isSelected={true}
          handleClick={handleClick}
        />
      ) : null}

      <g id="element-circles">
        {elementsWithoutBodyAndHead.map((d, i) => (
          <ElementCircle
            key={i}
            d={d}
            isSelected={ancestorNames.includes(d.data.name)}
            showText={showElementText(d)}
            handleClick={handleClick}
          />
        ))}
      </g>

      <g id="parent-element-labels">
        {elementsWithChildren.map((d, i) => (
          <ParentLabel
            key={d.data.tag}
            showText={showElementText(d)}
            d={d}
            i={i}
          />
        ))}
      </g>

      <g id="group-circle">
        {groups.map((d) => (
          <GroupCircle
            key={d.data.name}
            d={d}
            handleClick={handleClick}
            isSelected={ancestorNames.includes(d.data.name)}
          />
        ))}
      </g>

      <g id="group-labels">
        {groups.map((d) =>
          showGroupLabel(d) ? <GroupLabel key={d.data.name} d={d} /> : null
        )}
      </g>

      <InfoPortal>
        <ElementInfo {...clickedNode.data} />
      </InfoPortal>
    </>
  );
}
