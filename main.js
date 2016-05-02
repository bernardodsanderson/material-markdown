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
    case $('#open_file')[0]: // OPEN FILE
        openFile();
        break;
    case $('#save')[0]: // SAVE FILE
        saveFile();
        break;
    case $('#save_as')[0]: // SAVE AS FILE
        saveAsFile();
        break;
    default:
        console.log('Nothing selected');
  }
});



// File functions
function openFile(){
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
  chosenFileEntry = chrome.fileSystem.retainEntry(readOnlyEntry);
}

function saveFile() {
  // chrome.fileSystem.getWritableEntry(chosenFileEntry, function(entry) {
  //   entry.createWriter(function(writer) {
  //       writer.write(new Blob([simplemde.value()], {type: 'text/plain'}));
  //   });
  // });
  chrome.fileSystem.getWritableEntry(chosenFileEntry, function(writableFileEntry) {
    writableFileEntry.createWriter(function(writer) {
      chosenFileEntry.file(function(file) {
        writer.write(file);
      });
    });
  });
}

function saveAsFile() {
  var config = {type: 'saveFile', suggestedName: 'my-file.md'};
  chrome.fileSystem.chooseEntry(config, function(writableFileEntry) {
    writableFileEntry.createWriter(function(writer) {
      writer.write(new Blob([simplemde.value()], {type: 'text/plain'}));  
    });
  });
}



// Commmands
chrome.commands.onCommand.addListener(function(command) {
  if (command == 'toggle-open-file') {
    openFile();
  } else if(command == 'toggle-save-file') {
    saveFile();
  } else if(command == 'toggle-save-as-file') {
    saveAsFile();
  }
});
