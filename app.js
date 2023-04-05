document.getElementById('input_columna').value = '';
document.getElementById('show_json').hidden = true;
document.getElementById('filas').hidden = true;
document.getElementById('json').hidden = true;

// function mostrarAgregarColumnas
document.getElementById('mostrarAgregarColumnas').addEventListener('click', () => {
    document.getElementById('columnas').hidden = false;
    document.getElementById('filas').hidden = true;
    document.getElementById('json').hidden = true;
});

// function mostrarAgregarFilas
document.getElementById('mostrarAgregarFilas').addEventListener('click', () => {
    document.getElementById('columnas').hidden = true;
    document.getElementById('filas').hidden = false;
    document.getElementById('json').hidden = true;
});

let json = '';
// function exportarJSON
document.getElementById('exportarJSON').addEventListener('click', () => {
    document.getElementById('columnas').hidden = true;
    document.getElementById('filas').hidden = true;
    document.getElementById('json').hidden = false;

    // setJSON
    json = setJSON();
    json.shift();
    json = JSON.stringify(json);
    if (json.includes('<br>') || json.includes('<div>') || json.includes('</div>')) {
        json = json.replace(/<br\s*[\/]?>/gi, '');
        json = json.replace(/<\s*[\/]?div>/gi, '');
    }
    document.getElementById('setJSON').innerText = json;
});

// function setJSON
const setJSON = () => {
    const table = document.getElementById('table');
    let data = [];

    // first row needs to be headers
    let headers = [];
    for (let i = 0; i < table.rows[0].cells.length; i++) {
        headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
    }

    // go through cells
    for (let i = 0; i < table.rows.length; i++) {
        let tableRow = table.rows[i];
        let rowData = {};
        for (let j = 0; j < tableRow.cells.length; j++) {
            rowData[headers[j]] = tableRow.cells[j].innerHTML;
        }
        data.push(rowData);
    }

    return data;
};


// function add_columna
document.getElementById('add_columna').addEventListener('click', () => {
    const input_columna = document.getElementById('input_columna').value;

    if (input_columna != '') {
        const th = document.createElement('th');

        th.innerHTML = input_columna;
        document.getElementById('table_header_tr').appendChild(th);
        document.getElementById('input_columna').value = '';
    } else {
        alert('Debes agregar un nombre a tu columna');
    }
});


// function add_row
document.getElementById('add_row').addEventListener('click', () => {
    const table = document.getElementById('table');
    const rowCount = table.rows.length;
    const row = table.insertRow(rowCount);
    const colCount = table.rows[0].cells.length;

    for (let i = 0; i < colCount; i++) {
        let cell = row.insertCell(i);
        cell.innerHTML = 'texto';
        cell.setAttribute('contenteditable', true)
    }
});


// function copyToClipboard

document.getElementById('copy_to_clipboard').addEventListener('click', () => {
    navigator.clipboard.writeText(json).then(function () {
        alert('JSON copiado!', JSON.stringify(json));
    }, function (err) {
        alert('No fue posible copiar el JSON');
    });
});
