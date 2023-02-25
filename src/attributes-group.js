import * as React from "react";

const AttributesGroupContext = React.createContext([]);

export function AttributesGroupProvider(props) {
  const attributesGroupState = React.useState(null);

  return (
    <AttributesGroupContext.Provider value={attributesGroupState} {...props} />
  );
}

export function useAttributesGroup() {
  const context = React.useContext(AttributesGroupContext);

  if (context === undefined) {
    throw new Error(
      "'useAttributesGroup' must be used within a AttributesGroupProvider"
    );
  }
  return context;
}

export function AttributesGroup() {
  const [, setAttributeGroup] = useAttributesGroup();

  return <g id="attributes-container" ref={setAttributeGroup}></g>;
}
