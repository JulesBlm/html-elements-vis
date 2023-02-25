import type { HierarchyCircularNode } from "d3-hierarchy";

/**
 * [cx, cy, width]
 **/ 
export type ZoomView = [number, number, number];

type ElementType =
  | "notrecommended"
  | "group"
  | "unique"
  | "compound"
  | "empty"
  | "experimental"
  | "compoundchild" // stil used?
  | "replacedelement";

export interface HtmlElement {
  readonly name: string;
  readonly tag: string;
  readonly description: string;
  readonly tip?: string;
  readonly attributes?: Array<Attribute>;
  readonly children?: Array<HtmlElement>;
  readonly type?: ElementType | Array<ElementType>;
  readonly links?: Array<Link>;
}

export type HtmlLink = {
  link: string;
};

export interface Group extends Omit<HTMLElement, "attributes"> {
  type: "group";
}

export type HtmlElementNode = Omit<HtmlElement, "children">;

export type D3ElementNode = HierarchyCircularNode<HtmlElementNode>;

type AttributeType =
  | "id"
  | "enumarated"
  | "boolean"
  | "integer"
  | "float"
  | "url"
  | "global"
  | "mandatory";

type CombinedAttributeType = `${"enumarated" | "boolean"} ${AttributeType}`;
export interface Attribute {
  readonly name: string;
  readonly description: string;
  readonly type: AttributeType | CombinedAttributeType;
  readonly values?: Array<AttributeValue>;
}

interface AttributeValue {
  readonly name: string;
  readonly description?: string;
}

interface Link {
  url: string;
  title: string;
}
