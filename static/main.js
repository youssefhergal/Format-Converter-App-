var xmlEditor;
var jsonEditor;







document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('fileUpload').addEventListener('change', function (e) {
    var file = e.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            // Mettre à jour le contenu du premier textarea
            document.getElementById('xmlContent').value = e.target.result;

            // Mettre à jour le contenu de l'éditeur CodeMirror pour XML
            xmlEditor.setValue(e.target.result);
        };
        reader.readAsText(file);
    }
    });


    document.getElementById('fileDownload').addEventListener('click', function (e) {
        var jsonData = document.getElementById('jsonData').value;
        if (jsonData.trim() === '') {
            $('#emptyOutputModal').modal('show');
        } else {
            var blob = new Blob([jsonData], { type: 'application/json' });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'converted.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    });

    document.getElementById('delete').addEventListener('click' , function (e){
        xmlEditor.setValue('');
        jsonEditor.setValue('');
    });

    // Éditeur CodeMirror pour XML
    xmlEditor = CodeMirror.fromTextArea(document.getElementById("xmlContent"), {
        lineNumbers: true,
        mode: "xml",
        matchBrackets: true,
        autoCloseBrackets: true,
        autocomplete: "true",
        theme: "dracula", //dracula
        foldGutter: true,  // Activer la gestion des plages repliables
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
    });

    // Éditeur CodeMirror pour JSON
    jsonEditor = CodeMirror.fromTextArea(document.getElementById("jsonData"), {
        lineNumbers: true,
        mode:"json",
        matchBrackets: true,
        autoCloseBrackets: true,
        autocomplete:"true",
        theme: "dracula",
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
    });
    // Ajuster dynamiquement la hauteur et la largeur de CodeMirror en fonction du contenu des textarea
       xmlEditor.setSize("100%", "400px");
       jsonEditor.setSize("100%", "400px");


    // Redimensionner CodeMirror lors du changement de contenu des textarea
    document.getElementById("xmlContent").addEventListener("input", function () {
        xmlEditor.setSize("100%", xmlEditor.getScrollInfo().height + "px");
    });

    document.getElementById("jsonData").addEventListener("input", function () {
        jsonEditor.setSize("100%", jsonEditor.getScrollInfo().height + "px");
    });


});

function changeHeader(newHeaderText) {
    // Get the header element by its class name
    var headerElement = document.querySelector('header.text-center h1');

    // Check if the header element exists
    if (headerElement) {
        // Change the text content of the header
        headerElement.textContent = newHeaderText;
    }
}


