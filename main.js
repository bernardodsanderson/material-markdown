var simplemde = new SimpleMDE({ 
  element: document.getElementById("my-content"),
  spellChecker: false,
  toolbar: ["bold", "italic", "strikethrough", "|", "quote", "unordered-list", "ordered-list", "|", "heading-1", "heading-2", "heading-3", "|", "code", "link", "image", "horizontal-rule", "|", "side-by-side"],
  initialValue: "Hello from Material Markdown!"
});

simplemde.toggleFullScreen;