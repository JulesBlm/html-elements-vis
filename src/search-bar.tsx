import { root } from "./html-pack";
import type { D3ElementNode } from "./data-types";

const options = [...new Set(root.descendants().map((d) => d.data.name))];

const DataList = () => (
  <datalist id="elements">
    {options.map((d) => (
      <option key={d}>{d}</option>
    ))}
  </datalist>
);

interface SearchBarProps {
  setClickedNode: React.Dispatch<React.SetStateAction<D3ElementNode>>;
}

export const SearchBar = ({ setClickedNode }: SearchBarProps) => (
  <nav>
    <input
      list="elements"
      type="search"
      inputMode="search"
      onChange={(e) =>
        setClickedNode(root.find((d) => d.data.name === e.target.value))
      }
    />
    <DataList />
  </nav>
);
