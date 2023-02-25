const maxProse = {
  maxWidth: "600px",
};

export function IntroText() {
  return (
    <article
      style={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        backgroundColor: "white",
        width: "65ch",
        padding: "1em",
        borderRadius: "1em",
      }}
    >
      <header>
        {/* Should be screen filling like https://nan.fyi/how-arrays-work */}
        <h1>The Elements of HTML</h1>
        <p>Organised and Visualized</p>
        <p>Element attributes too</p>
        <p>Attributes values as well</p>
        <address>
          By <a href="https://jules.engineer">Jules Blom</a>{" "}
          <a href="https://www.twitter.com/Mega_Jules">Twitter (Icon)</a>
        </address>
        Published: <time dateTime="31-12-2021">31-12-2021</time>
        Last edited: <time dateTime="31-12-2021"> 31-12-2021</time>
      </header>
      <h2>What is HTML?</h2>
      <p>
        [MDN] <abbr title="HyperText Markup Language">HTML</abbr> is a fairly
        simple markup(?)[hover text: it was designed with that goal in mind, in
        practice ...] language.
        {/* markup language: a system for annotating a document in a way that is visually distinguishable from the content */}
        It's composed of elements, these element are written with tags written
        using angle brackets. Different elements have different purposes [and
        meaning]. Some elements can can be applied to pieces of text to give
        them different meaning in a page, some. Other elements can be used to
        embed interactive input, images or video [other types of content] and
        some elements have no meaning at all. There are a lot of HTML elements,
        over 110! In reality, most of these are rarely used [hover text: The ol'
        pareto principle 20%/80%]. Most folks writing HTML just don't know about
        them. A shame, as it's certainly worth knowing about various elements
        and attributes, and I'd like to show you in clear overview.
      </p>
      {/* Aside? */}
      <h3>What are HTML elements?</h3>
      <h3>What are HTML Attributes?</h3>
      <p>
        Elements can be configured by adding <dfn>attributes</dfn> to them. Many
        elements have their own specific attributes, and sometimes these
        attributes have their own specific allowed values. For certain elements,
        their behavior is heavily dependent/varies wildly on what attributes are
        set, looking at you, link!
        {/* Various attributes can be assigned to elements to configure the elements
        or adjust their behavior. */}
      </p>
      <h2>Is HTML hard?</h2>
      <p style={maxProse}>
        Well, maybe, HTML may look simple and it's really easy to get started
        with. There's a lot more to it than you'd think/suspect at first
        sight/glance though! What makes HTML easy [to get started with] is that
        it is very forgiving, you can write bad HTML and it will appear on
        screen ‘fine’ but it will be incorrect for other reasons.
        {/* 110 elements with specific attributes, these attributes have specific allowed values / syntax.  */}
      </p>
      {/* Not these categories are nothing official, they are mine.
      Block vs element is not a good way to divide HTML elements but to me still
      useful division In the spec has its division (flow content etc) I found it
      not very helpful. See MDN That diagram doesnt What can go into what is
      often complicated nuanced See the app by Just use codesurfer for the
      scroll along */}
      <p>{/* Some elements are a lot more versatile than others */}</p>
      <h2>Why This Visualization?</h2>
      {/* <p> To get familiar with the all of the elements and attributes, I made this visualization. </p> */}
      <ol>
        <li>To learn more about HTML myself</li>
        <li>To teach others more on good HTML</li>
        <li>To collect and organize good content on HTML</li>
        <li>To learn how to visualize data</li>
      </ol>
      <p>
        But still, I'm sure that are a lot of nuances that are not displayed
        here, for example,{" "}
        <a href="https://meiert.com/en/blog/html-body-ok/">
          <code>link elements with certain link types attributes</code>
        </a>{" "}
        can go in the body and sometimes, meta element can as well. These are
        very rare use cases though so I'm leaving them out.
      </p>
      <p style={maxProse}>
        HTML is inherently a <em>hierarchical</em> markup language, so I thought "why not
        visualize it as such?".
        {/* In the spirit of show, don’t tell, */}
        {/* Show them roughly as I categorize them in my mind */}
        {/* Show how elements relate, instead of listing them alphabetically */}
      </p>
      {/* <p>
        When writing HTML, use as specific of an element as makes sense for your
        content.
      </p> */}
      <h2>Why does HTML need to be meaningful/'semantic'?</h2>
      <p>
        What are the benefits? Well you might be reading this on modern PC with
        a large display but thats not how what everyone uses.
         * reader display in Safari uses certain html elements to identify content 
         * So does apple watch
      </p>
      <h3>Types of elements</h3>
      <p>
        An empty element is an element that cannot have any child nodes (i.e.,
        nested elements or text nodes).
      </p>
      <p>Replaced elements are elements that " "</p>
      <h3>Attribute types</h3>
      <dl>
        <dt>Boolean</dt>
        <dd>Only need to be there to [do something]</dd>
        <dt>Enumarated</dt>
        <dd>
          These have a number of allowed values, each with their own
          meaning/functionality
        </dd>
        <dt>id</dt>
        <dd>These reference another HTML element by that elements id</dd>
        <dt>Semi-enumarated</dt>
        <dd>
          These have a few values with special meaning but generally reference a
          name (fe a browsing context)
        </dd>
        <dt>URL</dt>
        <dd>Speaks for it self, no? These attributes should be set to a URL</dd>
      </dl>
      <p>aria roles!</p>
      <p>DOM HTML interfaces</p>
    </article>
  );
}
