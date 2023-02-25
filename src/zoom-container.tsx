/* eslint-disable no-unused-vars */
import * as React from "react";
import { useSpring, animated } from "@react-spring/web";
import { usePrevious } from "./use-previous";
import { interpolateZoom } from "d3-interpolate";
import useMeasure from "react-use-measure";

import type { ZoomView } from "./data-types";

type ZoomContextValue = {
  setView: React.Dispatch<React.SetStateAction<ZoomView>>;
  width: number;
  height: number;
};

export const ZoomContext = React.createContext<ZoomContextValue>(null!);
ZoomContext.displayName = "ZoomContext";

type ZoomContainerProps = React.PropsWithChildren<{
  initViewport: [number, number];
}>;

export function ZoomContainer({ children, initViewport }: ZoomContainerProps) {
  const [ref, { width: mWidth, height: mHeight }] = useMeasure();

  const width = mWidth || initViewport[0];
  const height = mHeight || initViewport[1];

  const initView: ZoomView = [300, 300, 1500];
  const [view, setView] = React.useState<ZoomView>(initView);
  const prevView = usePrevious(view) ?? initView;

  // @ts-expect-error
  const zoomInterpolator = interpolateZoom.rho(1.6)(prevView ?? view, view);

  function getTransformString(t: number) {
    const interpolatedView = zoomInterpolator(t);

    const k = width / interpolatedView[2]; // scale
    const translate = [
      width / 2 - interpolatedView[0] * k,
      height / 2 - interpolatedView[1] * k,
    ];

    return `translate(${translate}) scale(${k})`;
  }

  // create a spring that maps from t = 0 (start animation) to t = 1 (end of animation)
  const { t } = useSpring({
    from: { t: 0 },
    to: { t: 1 },
    immediate: false,
    reset: true,
  });

  const zoomValue = React.useMemo(
    () => ({ setView, width: 600, height: 600 }),
    []
  );

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      fontFamily="sans-serif"
      vectorEffect="non-scaling-stroke"
      style={{ width: "100%", height: "100%" }}
      ref={ref}
    >
      <ZoomContext.Provider value={zoomValue}>
        <animated.g transform={t.to(getTransformString)}>{children}</animated.g>
      </ZoomContext.Provider>
    </svg>
  );
}
