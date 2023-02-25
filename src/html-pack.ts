import { pack, hierarchy } from "d3-hierarchy";
// import { scaleOrdinal } from "d3-scale";
// import { descending } from "d3-array";

import type { HtmlElementNode } from "./data-types";

// import { width, height } from "./dimensions";

import HTMLElementsData from "./html-elements.json";

const htmlHierarchy = hierarchy(HTMLElementsData); // compute a hierarchical layout
// .sort(descending)
// console.log("count", htmlHierarchy.count());

// TODO manually pick nice colors
// const d3SchemeCategory10 = [
//   "#1f77b4",
//   "#ff7f0e",
//   "#2ca02c",
//   "#d62728",
//   "#9467bd",
//   "#8c564b",
//   "#e377c2",
//   "#7f7f7f",
//   "#bcbd22",
//   "#17becf",
// ];

export const makeRoot = (width: number, height: number) => {
  const root = pack<HtmlElementNode>().size([width, height]).padding(6)(
    htmlHierarchy.count()
  );

  const xPivot = width / 2;
  const yPivot = height / 2;

  const angle = Math.PI / 2; // a quarter turn
  root.each((d) => {
    // Rotate pack by a quarter clockwise, so <head> circle is on top

    // Remove translation
    const x = d.x - xPivot;
    const y = d.y - yPivot;

    const s = Math.sin(angle);
    const c = Math.cos(angle);

    const xRotated = x * c - y * s;
    const yRotated = x * s + y * c;

    // Add translation again to rotated point
    const xRotatedTranslated = xRotated + xPivot;
    const yRotatedTranslated = yRotated + yPivot;

    d.x = xRotatedTranslated;
    d.y = yRotatedTranslated;

    // Replace links with right nodes
    // for this to work, node must be defined in JSON before link is defined!
    if (d.data.link) {
      const foundNode = root.find((e) => e.data.tag === d.data.link);
      if (foundNode && foundNode.data) {
        d.data = foundNode.data;
      } else {
        console.warn("Couldn't replace link!");
      }
    }

    const isCompoundChild = Boolean(d.parent?.children?.length === 1);
    if (isCompoundChild) {
      // console.log("isCompoundChild", d.data.name, d);
      d.r = d.r - 2;
      // d.data.type += " compoundChild";
    }

    const isCompoundParent = Boolean(d.children?.length === 1);
    if (isCompoundParent) {
      // console.log("isCompoundParent", d.data.name, d);
      d.r = d.r + 1;
      // d.data.type += " compoundParent";
    }
  });

  return root
};

// const groupTypes = ["meta", "text", "script", "form", "embed", "meta", ""]; // "block", "inline?", ""
// sectioning: <article>, <aside>, <nav>, and <section>.
// "embed" svg, canvas, iframe, portal
// "meta": <base>, <command>, <link>, <meta>, <noscript>, <style> and <title>.
// "media", audio, video, img, picture, track, source

// Colors/markers for

// Inline
// Block
// Unique
// Self closing / empty
// Experimental
// Meta (noscript, script, )

// const colorScale = scaleOrdinal(d3SchemeCategory10).domain(groupTypes);
//
