document.getElementById('fileUpload').addEventListener('change', function (e) {
    var file = e.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('xmlContent').value = e.target.result;
        };
        reader.readAsText(file);
    }
});

function downloadJson() {
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
}

function deleteInputs() {
    document.getElementById('xmlContent').value = '';
    document.getElementById('jsonData').value = '';
}
