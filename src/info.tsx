import * as React from "react";
import * as ReactDOM from "react-dom";
import { ReactNode } from "react";
import type { HtmlElement } from "./data-types";
import { infoElId } from "./constants";

const infoEl = document.querySelector(`#${infoElId}`)!;

export function InfoPortal({ children }: { children: ReactNode }) {
  return ReactDOM.createPortal(children, infoEl);
}

export function ElementInfo({
  tag,
  name,
  description,
  links = [],
  attributes = [],
  type,
  tip,
}: HtmlElement) {
  return (
    <>
      <h2>
        {tag ? (
          <>
            <code>{tag}</code>: {name}
            {type?.includes("unique") ? "(unique)" : null}
            {type?.includes("empty") ? "(empty)" : null}
          </>
        ) : (
          `Group: ${name}`
        )}
      </h2>
      <p>{description}</p>

      {tip ? (
        <aside>
          <h3>Tip</h3>
          <p>{tip}</p>
        </aside>
      ) : null}

      {attributes.length ? (
        <section>
          <h3>Attributes</h3>
          <ul>
            {attributes.map((a) => (
              <li key={a.name}>
                <code>{a.name}</code>
              </li>
            ))}
          </ul>
          {/* <dl>
            {attributes.map((a) => (
              <Fragment key={a.name}>
                <dt>{a.name}</dt>
                <dd>{a.description}</dd>

              </Fragment>
            ))}
          </dl> */}
        </section>
      ) : null}

      {links.length ? (
        <footer>
          <h3>Links</h3>
          <ul>
            {links.map((l) => (
              <li key={l.title}>
                <a href={l.url} rel="noopener no">
                  {l.title}
                </a>
              </li>
            ))}
          </ul>
        </footer>
      ) : null}
    </>
  );
}
