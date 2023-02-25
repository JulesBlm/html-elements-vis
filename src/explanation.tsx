export function Explanation() {
  return (
    <div>
      <h2>Empty elements</h2>
      <p>
        These elements can never contain any children, therefore they are
        self-closing tags
      </p>
      <h2>Compound elements</h2>
      <p>
        (I think this is a term from React-land) are elements that are always
        used together. Like a select and option, option can only go in select.
        Compound parent elements don't do too much on their own. An empty{" "}
        <code>&lt;table&gt;</code> is meaningless, as is an empty{" "}
        <code>&lt;select&gt;</code>, to make it useable we need to add
        &lt;tr&gt;, &lt;th&gt;, &lt;td&gt;, &lt;tbody&gt;
      </p>
    </div>
  );
}
