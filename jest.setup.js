/* eslint-disable @typescript-eslint/no-empty-function */
// Popper.js fix
if (global.document) {
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: "BODY",
      ownerDocument: document,
    },
    createContextualFragment: (html) => {
      const div = document.createElement("div");
      div.innerHTML = html;
      // Element and DocumentFragment are technically incompatible
      return div.children[0]; // so hokey it's not even funny
    },
  });
}
