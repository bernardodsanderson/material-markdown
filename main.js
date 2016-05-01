var simplemde = new SimpleMDE({ 
  element: document.getElementById("my-content"),
  spellChecker: false,
  toolbar: ["bold", "italic", "strikethrough", "|", "quote", "unordered-list", "ordered-list", "clean-block", "table", "|", "heading-1", "heading-2", "heading-3", "|", "code", "link", "image", "horizontal-rule", "|", "side-by-side"],
  initialValue: "Hello from Material Markdown!",
  status: false
});

simplemde.toggleSideBySide();

simplemde.toggleSideBySide();

// Menu
$('<button id="demo-menu-lower-right" class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons" style="color: white;">more_vert</i></button>').appendTo('.editor-toolbar');

$('.mdl-menu li').on('click', function(){
  switch($(this)[0]) {
    case $('#open_file')[0]:
        console.log('works', $(this));
        var accepts = [{
          mimeTypes: ['markdown/*'],
          extensions: ['md', 'txt']
        }];
        var chosenFileEntry = null;
        chrome.fileSystem.chooseEntry({type: 'openFile', accepts: accepts}, function(readOnlyEntry) {
            if (!readOnlyEntry) {
              console.log('No file selected.');
              return;
            }
            readOnlyEntry.file(function(file) {
              var reader = new FileReader();
              reader.onloadend = function(e) {
                console.log(e.target.result, 'result');
                simplemde.value(String(e.target.result));
              };
              reader.readAsText(file);
            });
        	});
        break;
    case $('#save')[0]:
        console.log('works', $(this));
        chrome.fileSystem.getWritableEntry(chosenFileEntry, function(writableFileEntry) {
          writableFileEntry.createWriter(function(writer) {
            writer.onerror = errorHandler;
            writer.onwriteend = callback;
            chosenFileEntry.file(function(file) {
              writer.write(file);
            });
          }, errorHandler);
        });
        break;
    case $('#save_as')[0]:
        chrome.fileSystem.chooseEntry({type: 'saveFile'}, function(writableFileEntry) {
          writableFileEntry.createWriter(function(writer) {
            writer.onerror = errorHandler;
            writer.onwriteend = function(e) {
              console.log('write complete');
            };
            writer.write(new Blob(['1234567890'], {type: 'text/plain'}));
          }, errorHandler);
        });
        break;
    default:
        console.log('Nothing selected');
  }
});