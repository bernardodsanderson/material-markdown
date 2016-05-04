var initialMarkdown = "";

var simplemde = new SimpleMDE({ 
  element: document.getElementById("my-content"),
  spellChecker: false,
  toolbar: ["bold", "italic", "strikethrough", "|", "quote", "unordered-list", "ordered-list", "clean-block", "table", "|", "heading-1", "heading-2", "heading-3", "|", "code", "link", "image", "horizontal-rule", "|", "side-by-side"],
  initialValue: initialMarkdown,
  status: false
});

simplemde.toggleSideBySide();
simplemde.toggleSideBySide();

// Menu
$('<button id="demo-menu-lower-right" class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons" style="color: white;">more_vert</i></button>').appendTo('.editor-toolbar');

// Load Sample
function loadSample() {
  simplemde.value("### Welcome to Material Markdown!\n**Shortcuts**\n- Load Sample Page: Ctrl+Shift+4\n - Mac: Cmd+4\n- Open File: Ctrl+Shift+5\n	- Mac: Cmd+5\n- Save File: Ctrl+Shift+2\n	- Mac: Cmd+2\n- Save As File: Ctrl+Shift+3\n	- Mac: Cmd+3\n- Toggle Blockquote: Ctrl+'\n- Toggle Bold: Ctrl+B\n- Toggle Italic: Ctrl+I\n- Draw Link: Ctrl+K\n- Toggle Unordered List: Ctrl+L\n-----\n```\nvar test = 'hello from material markdown'\n```\n[Gitlab Repository](https://gitlab.com/bernardodsanderson/material-markdown)\n> This app uses the open source SimpleMDE markdown editor");
}


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
    case $('#load_sample')[0]: // LOAD SAMPLE
        loadSample();
        break;
    default:
        console.log('Nothing selected');
  }
});

var chosenFileEntry = null;

// File functions
// function openFile(){
//   var accepts = [{
//     mimeTypes: ['markdown/*'],
//     extensions: ['md', 'txt']
//   }];
//   chrome.fileSystem.chooseEntry({type: 'openFile', accepts: accepts}, function(readOnlyEntry) {
//     setEntry(readOnlyEntry, false);
//     readOnlyEntry.file(function(file) {
//       var reader = new FileReader();
//       reader.onloadend = function(e) {
//         simplemde.value(e.target.result);
//       };
//       reader.readAsText(file);
//     });
//   });
// }

function openFile() {
  var accepts = [{
    mimeTypes: ['markdown/*'],
    extensions: ['md', 'txt']
  }];
  chrome.fileSystem.chooseEntry({accepts: accepts}, function (entry) {
    if (chrome.runtime.lastError) {
      showError(chrome.runtime.lastError.message);
      return;
    }
    setEntry(entry, false);
    replaceDocContentsFromFileEntry();
  });
}

function replaceDocContentsFromFile(file) {
  var reader = new FileReader();
  reader.onload = function() {
    simplemde.value(reader.result);
  };
  reader.readAsText(file);
}

function replaceDocContentsFromFileEntry() {
  fileEntry.file(replaceDocContentsFromFile);
}

function saveAsFile() {
  var config = {type: 'saveFile', suggestedName: 'my-file.md'};
  chrome.fileSystem.chooseEntry(config, function(writableFileEntry) {
    writableFileEntry.createWriter(function(writer) {
      writer.write(new Blob([simplemde.value()], {type: 'text/plain'}));  
      activateToast();
    });
  });
}

// From Code Editor sample
var fileEntry;
var gotWritable = false;

function setEntry(anEntry, isWritable, name) {
  fileEntry = anEntry;
  gotWritable = isWritable;
}

function saveFile() {
  if (gotWritable) {
    saveToEntry();
  } else if (fileEntry) {
    chrome.fileSystem.getWritableEntry(fileEntry, function(entry) {
      if (chrome.runtime.lastError) {
        showError(chrome.runtime.lastError.message);
        return;
      }
      setEntry(entry, true);
      saveToEntry();
    });
  } else {
    saveAsFile();
  }
}

function saveToEntry() {
  fileEntry.createWriter(function(fileWriter) {
    var blob = new Blob([simplemde.value()], {type: 'text/plain'});
    fileWriter.write(blob);
    activateToast();
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
  } else if(command == 'toggle-open-sample') {
    loadSample();
  }
});

// Toast functionality
var snackbarContainer = document.querySelector('#demo-toast-example');
function activateToast() {
  'use strict';
  var data = {message: 'File Saved!'};
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
}