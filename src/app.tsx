/* eslint-disable no-unused-vars */
import * as React from "react";

import { Pack } from "./pack";
import { ZoomContainer } from "./zoom-container";

import { AttributesGroup, AttributesGroupProvider } from "./attributes-group";

export default function App() {

   const [initViewport, setInitViewport] = React.useState(() => [window.innerWidth, window.innerHeight] as const);

  return (
    <main>
      <AttributesGroupProvider>
        <ZoomContainer initViewport={initViewport}>
          <Pack />
          <AttributesGroup />
        </ZoomContainer>
      </AttributesGroupProvider>
    </main>
  );
}
