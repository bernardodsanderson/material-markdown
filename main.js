var initialMarkdown = "";
var theValue;
var badConnection = false;
var localImage = false;
var localURL;

var simplemde = new SimpleMDE({ 
  element: document.getElementById("my-content"),
  spellChecker: false,
  toolbar: ["bold", "italic", "strikethrough", "|", "quote", "unordered-list", "ordered-list", "clean-block", "table", "|", "heading-1", "heading-2", "heading-3", "|", "code", "link", "image",
    {
      name: "local",
      action: console.log('local image'),
      className: "fa fa-file-image-o",
      title: "Local Image"
    }, "horizontal-rule", "|", "side-by-side"],
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

function getSavedValue() {
  chrome.storage.local.get(function(values){simplemde.value(values.value);});
}

getSavedValue();

// Hidden upper right menu
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
    case $('#get_html')[0]: // DOWNLOAD HTML
        saveAsHTML();
        break;
    default:
        console.log('Nothing selected');
  }
});

var chosenFileEntry = null;

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
    setEntry(writableFileEntry, true);
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

var exportHTML = false;

function saveAsHTML() {
  exportHTML = true;
  var HTMLcontent = simplemde.options.previewRender(simplemde.value());
  var config = {type: 'saveFile', suggestedName: 'my-file.html'};
  chrome.fileSystem.chooseEntry(config, function(writableFileEntry) {
    setEntry(writableFileEntry, true);
    writableFileEntry.createWriter(function(writer) {
      writer.write(new Blob([HTMLcontent], {type: 'text/plain'}));  
      activateToast();
    });
  });
  exportHTML = false;
}

// Get initial data
// function loadInitialFile(launchData) {
//   if (launchData && launchData.items && launchData.items[0]) {
//     loadFileEntry(launchData.items[0].entry);
//   } 
//   else {
//     // see if the app retained access to an earlier file or directory
//     chrome.storage.local.get('chosenFile', function(items) {
//       if (items.chosenFile) {
//         // if an entry was retained earlier, see if it can be restored
//         chrome.fileSystem.isRestorable(items.chosenFile, function(bIsRestorable) {
//           // the entry is still there, load the content
//           console.info("Restoring " + items.chosenFile);
//           chrome.fileSystem.restoreEntry(items.chosenFile, function(chosenEntry) {
//             if (chosenEntry) {
//               chosenEntry.isFile ? loadFileEntry(chosenEntry) : loadDirEntry(chosenEntry);
//             }
//           });
//         });
//       }
//     });
//   }
// }

// loadInitialFile(launchData);

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

simplemde.codemirror.on("change", function(){
  theValue = simplemde.value();
  saveChanges();
});

function saveChanges() {
  // Save it using the Chrome extension storage API.
  chrome.storage.local.set({'value': theValue}, function() {
    // Notify that we saved.
    // console.log('Editor saved');
  });
}

// Context (right click) Menus
chrome.contextMenus.create({
  id: "open-file",
  title: "Open File",
  contexts: ["launcher", "all"]
}, function(){
  console.log(chrome.runtime.lastError);
});

chrome.contextMenus.create({
  id: "save-file",
  title: "Save",
  contexts: ["launcher", "all"]
}, function(){
  console.log(chrome.runtime.lastError);
});

chrome.contextMenus.create({
  id: "save-as-file",
  title: "Save As",
  contexts: ["launcher", "all"]
}, function(){
  console.log(chrome.runtime.lastError);
});

chrome.contextMenus.create({
  id: "save-html",
  title: "Get HTML",
  contexts: ["launcher", "all"]
}, function(){
  console.log(chrome.runtime.lastError);
});

chrome.contextMenus.create({
  id: "load-sample",
  title: "Load Sample Page",
  contexts: ["launcher", "all"]
}, function(){
  console.log(chrome.runtime.lastError);
});

chrome.contextMenus.onClicked.addListener(function(itemData) {
  if (itemData.menuItemId == "save-file") {
    saveFile();
  }
  if (itemData.menuItemId == "open-file") {
    openFile();
  }
  if (itemData.menuItemId == "save-as-file") {
    saveAsFile();
  }
  if (itemData.menuItemId == "load-sample") {
    loadSample();
  }
  if (itemData.menuItemId == "save-html") {
    saveAsHTML();
  }
});

// Local Image
$('a.fa.fa-file-image-o').on('click', function(){
  localImage = true;
  openDirectoryImage();
});

function openDirectoryImage(){
  // Within your app's code, somehow get a DirectoryEntry (or FileEntry):
  chrome.fileSystem.chooseEntry({}, function(fileEntry) {
    fileEntry.file(function(file) {
      var url = URL.createObjectURL(file);
      // url looks like "blob:chrome-extension%3A//[extensionid]/[uuid]"
      localURL = url;
      simplemde.drawImage();
      localImage = false;
    });
  });
}

// Online Image
// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://gitlab.com/bernardodsanderson/material-neutral-theme/raw/master/screenshot.png', true);
// xhr.responseType = 'blob';
// xhr.onload = function(e) {
//   console.log(window.URL.createObjectURL(this.response));
// };

// xhr.send();

// Check for connectivity
chrome.system.network.getNetworkInterfaces(function(e){
  if(e.length == 0) {
    badConnection = true;
  } else {
    badConnection = false;
  }
});