import * as React from 'react';
import type { MutableRefObject } from 'react';

export function usePrevious<TypeOfValue>(
  value: TypeOfValue,
): MutableRefObject<TypeOfValue | undefined>['current'] {
  const ref = React.useRef<TypeOfValue>();
  React.useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}