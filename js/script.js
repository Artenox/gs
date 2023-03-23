function createTable() {
    //Zufällige Farbe für den Tabellenhintergrund
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  
    //Name und Größe der Tabelle eingeben
    let tableName = prompt("Bitte geben Sie den Namen der Tabelle ein:");
    if (!tableName) {
      return;
    }
    let tableSize = prompt("Bitte geben Sie die maximale Größe der Tabelle ein:");
    if (tableSize == null) {
      return;
    }
    if (isNaN(tableSize) || tableSize <= 0) {
      alert("Bitte nur ganze Zahlen größer als Null eingeben!");
      return;
    }
    tableSize = parseInt(tableSize, 10);
    if (document.getElementById(tableName)) {
      alert("Eine Tabelle mit dem Namen " + tableName + " ist bereits vorhanden!");
      return;
    }
    //Erstellen der Header-Zeilen der Tabelle
    var table = createTableHeader(randomColor, tableName, tableSize);
    //Reihen entsprechend der Tabellengröße erstellen
    createRows(table, tableSize);
    }


function uploadCSV_fcfs() {
    // Array von Hintergrundfarben, die für die Zellen verwendet werden sollen.
    // "lightgreen" = Erstwunsch || "lightyellow" = Zweitwunsch || "lightsalmon" = Drittwunsch || "lightcoral" = Noch zuzuteilen, weil alle anderen Tabellen voll waren
    var backgroundColors = ["lightgreen", "lightyellow", "lightsalmon", "lightcoral"];
    
    // Datei-Upload Feld zum auswählen der Datei
    var fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.click();

    //Auswertung der Datei
    fileInput.addEventListener("change", function () {
        var file = fileInput.files[0];
        if (file.type !== "text/csv") {
            alert("Kein gültiges CSV-File");
            return;
        }
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            var csv = reader.result;

            // Überprüfen ob es sich um eine korrekte CSV-Datei handelt
            if (!isValidCSV(csv)) {
                alert("Kein gültiges CSV-File");
                return;
            }
            var csvData = reader.result;

            //Aufteilen der CSV-Datei in einzelne Zeilen und ...
            var rows = csvData.split("\n");
            rows.splice(0,1);
            for (var i = 0; i < rows.length; i++) {

                // ... der einzelnen Zellen nach den Kommata
                var rowData = rows[i].split(",");
                if (rowData.length > 3) {

                    //Entfernen unnötiger Zeichen wie Zeilenumbrüchen etc.
                    var tableIds = [rowData[2].trim(), rowData[3].trim(), rowData[4].trim()];
                }
                var tableFound = false;

                // Suche nach Tabellen mit ID = Eintrag in der CSV-Datei
                for (var j = 0; j < tableIds.length; j++) {
                    var tableId = tableIds[j];
                    var table = document.getElementById(tableId);

                    //Suche nach leeren Zellen
                    if (table) {
                        var rowIndex = 2;
                        var row = table.getElementsByTagName("tr")[rowIndex];
                        var column = row.getElementsByTagName("td")[1];
                        var column2 = row.getElementsByTagName("td")[2];
                        while (row) {
                            // Wenn eine leere Zelle gefunden wurde werden die Daten aus dem CSV-File eingefügt
                            // Außerdem entsprechende "Title" gesetzt mit den Infos aus dem CSV-File um so einen
                            // Tooltip mit allen Informationen der entsprechenden Zeile zu erzeugen
                            // Ebenso wird eine Hintergrundfarbe für die Zellen entsprechend Erstwahl/Zweitwahl/Drittwahl gesetzt
                            if (column.innerHTML === "") {
                                column.innerHTML = rowData[0];
                                column2.innerHTML = rowData[1];
                                column.style.backgroundColor = backgroundColors[j];
                                column2.style.backgroundColor = backgroundColors[j];
                                column.setAttribute("title", "Name: " + rowData[0] + ", Vorname: " + rowData[1] + ", Erstwunsch: " + rowData[2] + ", Zweitwunsch: " + rowData[3] + ", Drittwunsch: " + rowData[4]);
                                column2.setAttribute("title", "Name: " + rowData[0] + ", Vorname: " + rowData[1] + ", Erstwunsch: " + rowData[2] + ", Zweitwunsch: " + rowData[3] + ", Drittwunsch: " + rowData[4]);
                                tableFound = true;
                                break;
                            }
                            rowIndex++;
                            row = table.getElementsByTagName("tr")[rowIndex];
                            if (row) {
                                column = row.getElementsByTagName("td")[1];
                                column2 = row.getElementsByTagName("td")[2];
                            }
                        }
                        if (tableFound) {
                            break;
                        }
                    }
                }
                if (!tableFound) {
                    // Wenn keine Tabelle gefunden wurde, die passt (oder alle anderen voll sind)
                    // Soll eine neue Tabelle "Unsortiert" erstellt werden.
                    var unsortedTable = document.getElementById("Unsortiert");
                    if (!unsortedTable) {
                        var unsortedTable = createUnsortedTable();
                    }
                    fillUnsortedTable(unsortedTable, rowData, backgroundColors);
                }
            }
        };
    });
}

function uploadCSV_random() {
    // Array von Hintergrundfarben, die für die Zellen verwendet werden sollen.
    // "lightgreen" = Erstwunsch || "lightyellow" = Zweitwunsch || "lightsalmon" = Drittwunsch || "lightcoral" = Noch zuzuteilen, weil alle anderen Tabellen voll waren
    var backgroundColors = ["lightgreen", "lightyellow", "lightsalmon", "lightcoral"];
    
    // Datei-Upload Feld zum auswählen der Datei
    var fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.click();

    //Auswertung der Datei
    fileInput.addEventListener("change", function () {
        var file = fileInput.files[0];
        if (file.type !== "text/csv") {
            alert("Kein gültiges CSV-File");
            return;
        }
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            var csv = reader.result;

            // Überprüfen ob es sich um eine korrekte CSV-Datei handelt
            if (!isValidCSV(csv)) {
                alert("Kein gültiges CSV-File");
                return;
            }
            var csvData = reader.result;

            //Aufteilen der CSV-Datei in einzelne Zeilen und ...
            var rows = csvData.split("\n");
            rows.splice(0,1);
            for (var i = rows.length; i > 0; i--) {
                var randomIndex = Math.floor(Math.random() * rows.length);
                // ... der einzelnen Zellen nach den Kommata
                var rowData = rows[randomIndex].split(",");

                rows.splice(randomIndex,1);
                if (rowData.length > 3) {

                    //Entfernen unnötiger Zeichen wie Zeilenumbrüchen etc.
                    var tableIds = [rowData[2].trim(), rowData[3].trim(), rowData[4].trim()];
                }
                var tableFound = false;

                // Suche nach Tabellen mit ID = Eintrag in der CSV-Datei
                for (var j = 0; j < tableIds.length; j++) {
                    var tableId = tableIds[j];
                    var table = document.getElementById(tableId);

                    //Suche nach leeren Zellen
                    if (table) {
                        var rowIndex = 2;
                        var row = table.getElementsByTagName("tr")[rowIndex];
                        var column = row.getElementsByTagName("td")[1];
                        var column2 = row.getElementsByTagName("td")[2];
                        while (row) {
                            // Wenn eine leere Zelle gefunden wurde werden die Daten aus dem CSV-File eingefügt
                            // Außerdem entsprechende "Title" gesetzt mit den Infos aus dem CSV-File um so einen
                            // Tooltip mit allen Informationen der entsprechenden Zeile zu erzeugen
                            // Ebenso wird eine Hintergrundfarbe für die Zellen entsprechend Erstwahl/Zweitwahl/Drittwahl gesetzt
                            if (column.innerHTML === "") {
                                column.innerHTML = rowData[0];
                                column2.innerHTML = rowData[1];
                                column.style.backgroundColor = backgroundColors[j];
                                column2.style.backgroundColor = backgroundColors[j];
                                column.setAttribute("title", "Name: " + rowData[0] + ", Vorname: " + rowData[1] + ", Erstwunsch: " + rowData[2] + ", Zweitwunsch: " + rowData[3] + ", Drittwunsch: " + rowData[4]);
                                column2.setAttribute("title", "Name: " + rowData[0] + ", Vorname: " + rowData[1] + ", Erstwunsch: " + rowData[2] + ", Zweitwunsch: " + rowData[3] + ", Drittwunsch: " + rowData[4]);
                                tableFound = true;
                                break;
                            }
                            rowIndex++;
                            row = table.getElementsByTagName("tr")[rowIndex];
                            if (row) {
                                column = row.getElementsByTagName("td")[1];
                                column2 = row.getElementsByTagName("td")[2];
                            }
                        }
                        if (tableFound) {
                            break;
                        }
                    }
                }
                if (!tableFound) {
                    // Wenn keine Tabelle gefunden wurde, die passt (oder alle anderen voll sind)
                    // Soll eine neue Tabelle "Unsortiert" erstellt werden.
                    var unsortedTable = document.getElementById("Unsortiert");
                    if (!unsortedTable) {
                        var unsortedTable = createUnsortedTable();
                    }
                    fillUnsortedTable(unsortedTable, rowData, backgroundColors);
                }
            }
        };
    });
}

//____________________________________________________________________________________________\\

function createTableHeader(color, name, size){
    var tableName = name;
    var tableSize = size;
    var randomColor = color;

    let table = document.createElement("table");
    table.setAttribute("id", tableName);
    let header = document.createElement("tr");
    let nameHeader = document.createElement("th");
    let sizeHeader = document.createElement("th");
    sizeHeader.colSpan = "2"; 
    nameHeader.style.backgroundColor = "#" + randomColor;
    sizeHeader.style.backgroundColor = nameHeader.style.backgroundColor;
    let nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("value", tableName);
    nameInput.setAttribute("id", "tableNameInput");
    let sizeInput = document.createElement("input");
    sizeInput.setAttribute("type", "text");
    sizeInput.setAttribute("value", tableSize);
    sizeInput.setAttribute("id", "tableSizeInput");

    // Header-Zeile 2
    let header2 = document.createElement("tr");
    let numHeader = document.createElement("th");
    let lastNameHeader = document.createElement("th");
    let firstNameHeader = document.createElement("th");

    // Header-Zeile 2 Inhalt
    numHeader.innerText = "Anzahl";
    lastNameHeader.innerText = "Nachname";
    firstNameHeader.innerText = "Vorname";

    // Alle Header Zellen an die Tabelle anfügen
    header2.appendChild(numHeader);
    header2.appendChild(lastNameHeader);
    header2.appendChild(firstNameHeader);
    nameHeader.appendChild(nameInput);
    sizeHeader.appendChild(sizeInput);
    header.appendChild(nameHeader);
    header.appendChild(sizeHeader);
    table.appendChild(header);
    table.appendChild(header2);
    
    //Event-Listener für's Ändern des Namens der Tabelle
    nameInput.addEventListener("change", function () {
        table.setAttribute("id", this.value);
        console.log("Table-ID: ",this.value);
        changeRowId(this.value);
    });

    //Event-Listener + Änderungs-Funktion für's Ändern der Größe der Tabelle
    sizeInput.addEventListener("change", function () {
        var newSize = this.value;
        if (isNaN(newSize) || newSize <= 0) {
            alert("Bitte nur ganze Zahlen größer als Null eingeben!");
            return;
        }
        var currentRows = table.getElementsByTagName("tr").length - 2;
        //Ist der neue Wert größer, dann entsprechend Zeilen anhängen
        if (newSize > currentRows) {
            upscale(table, newSize, currentRows);
            changeRowId(table.id);
            //Ist der Wert kleiner, dann entsprechend Zeilen löschen
        } else if (newSize < currentRows) {
            downscale(table, newSize, currentRows);
            changeRowId(table.id);
        }
    });
    return table;
}

function changeRowId(table){
    console.log("Table inside change row ID: ", table);                     
    var tableToChange = document.getElementById(table);
    var rows = tableToChange.getElementsByTagName("tr");
    var index = 0;
    for (var i = 2; i < rows.length; i++){
        rows[i].setAttribute("id", table + " " + "row-" + index);
        rows[i].

        index++;
    }
}

function createRows(table, size) {
    var tableSize = size;
    var table = table;
    for (var i = 0; i < tableSize; i++) {
        var row = document.createElement("tr");
        row.setAttribute("id", table.id + " row-" + i);
        var column1 = document.createElement("td");
        column1.setAttribute("class", "table-header");
        var column2 = document.createElement("td");
        column2.setAttribute("draggable", "true");
        column2.addEventListener("dragstart", handleDragStart);
        column2.addEventListener("dragend", handleDragEnd);
        var column3 = document.createElement("td");
        column3.setAttribute("draggable", "true");
        column3.addEventListener("dragstart", handleDragStart);
        column3.addEventListener("dragend", handleDragEnd);
        column1.innerHTML = i + 1 + ".";
        row.appendChild(column1);
        row.appendChild(column2);
        row.appendChild(column3);
        row.setAttribute('draggable', "true");
        row.addEventListener("dragstart", handleDragStart);
        row.addEventListener("dragend", handleDragEnd);
        table.appendChild(row);
    }
    document.body.appendChild(table);
    registerTableEventListeners();
}

// Handler für Drag and Drop Events
var draggedRow;

function handleDragStart(e) {
    draggedRow = e.target.closest("tr");
    draggedRow.setAttribute('data-dragging', true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', draggedRow);
  }

  function handleDragEnd(e) {
    draggedRow = null;
    var table = e.target.closest("table");
    if (table) {
      renumberRows(table);
    }
  }

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function handleDrop(e) {
    e.preventDefault();
    var targetRow = e.target.closest("tr");
    var targetTable = targetRow.parentElement;
    var originalRow = document.querySelector("[data-dragging=true]");
    var originalTable = originalRow.parentElement;
    if(targetTable == originalTable){
        originalRow.removeAttribute('data-dragging');
        return; 
    }
    var newRow = originalRow.cloneNode(true);
    originalTable.removeChild(originalRow);
    targetTable.insertBefore(newRow, targetRow);
    renumberRows(originalTable);
    renumberRows(targetTable);
    newRow.removeAttribute('data-dragging');
  }

  function renumberRows(table) {
    var rows = table.getElementsByTagName("tr");
    for (var i = 2; i < rows.length; i++) {
      var row = rows[i];
      var cells = row.getElementsByTagName("td");
      cells[0].innerHTML = i -1 + ".";
      for (var j = 1; j < cells.length; j++) {
        var cell = cells[j];
        if (cell) {  // add null check
          cell.setAttribute("data-row", i);
          cell.setAttribute("data-column", j);
        }
      }
    }
  }

  function registerTableEventListeners() {
    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
      var table = tables[i];
      table.addEventListener("dragstart", handleDragStart);
      table.addEventListener("dragover", handleDragOver);
      table.addEventListener("drop", handleDrop);
    }
}



function upscale(table, newSize, currentRows) {
    var table = table;
    for (var i = currentRows; i < newSize; i++) {
        var row = document.createElement("tr");
        var column1 = document.createElement("td");
        column1.setAttribute("class", "table-header");
        var column2 = document.createElement("td");
        column2.setAttribute("draggable", "true");
        column2.addEventListener("dragstart", handleDragStart);
        column2.addEventListener("dragend", handleDragEnd);;
        column2.addEventListener("change", function () {
            column2.setAttribute("id", this.value);
        });
        var column3 = document.createElement("td");
        column3.setAttribute("draggable", "true");
        column3.addEventListener("dragstart", handleDragStart);
        column3.addEventListener("dragend", handleDragEnd);
        column3.addEventListener("change", function () {
            column3.setAttribute("id", this.value);
        });
        column1.innerHTML = i + 1 + ".";
        row.setAttribute('draggable', "true");
        row.addEventListener("dragstart", handleDragStart);
        row.addEventListener("dragend", handleDragEnd);
        row.appendChild(column1);
        row.appendChild(column2);
        row.appendChild(column3);
        table.appendChild(row);
    }
    return table;
}

function downscale(table, newSize, currentRows) {
    var table = table;
    var rowsToDelete = currentRows - newSize;
    for (var i = 0; i < rowsToDelete; i++) {
        var rowToDelete = table.rows[table.rows.length - 1];
        table.deleteRow(rowToDelete.rowIndex);
    }
    return table;
}

function isValidCSV(csv) {
    var lines = csv.split("\n");
    // Zunächst überprüfen, ob es üerbhaupt Zeilen gibt
    if (lines.length < 1) {
        return false;
    }
    // Überprüfung ob jede Zeile die gleiche Anzahl an Zellen hat
    var numFields = lines[0].split(",").length;
    for (var i = 1; i < lines.length; i++) {
        if (lines[i].split(",").length !== numFields) {
            return false;
        }
    }
    // Gültige CSV Datei
    return true;
}

var unsortedTableIndex = 1;
function createUnsortedTable() {
    var unsortedTable = document.createElement("table");
    unsortedTable.setAttribute("id", "Unsortiert");
    document.body.appendChild(unsortedTable);
    let unsortedTableHeader = document.createElement("tr");
    let unsortedTableHeaderData = document.createElement("th");
    unsortedTableHeaderData.colSpan = "3";
    unsortedTableHeaderData.innerHTML = "Unsortiert";
    unsortedTableHeader.appendChild(unsortedTableHeaderData);
    unsortedTable.appendChild(unsortedTableHeader);
    unsortedTableHeader.style.backgroundColor = "white";
    // Header-Row 2
    let unsortedHeader2 = document.createElement("tr");
    let unsortedNumHeader = document.createElement("th");
    let unsortedLastNameHeader = document.createElement("th");
    let unsortedFirstNameHeader = document.createElement("th");
    // Header-Row 2 Inhalt
    unsortedNumHeader.innerText = "Anzahl";
    unsortedLastNameHeader.innerText = "Nachname";
    unsortedFirstNameHeader.innerText = "Vorname";
    // Alle Header Zellen an die Tabelle anfügen
    unsortedHeader2.appendChild(unsortedNumHeader);
    unsortedHeader2.appendChild(unsortedLastNameHeader);
    unsortedHeader2.appendChild(unsortedFirstNameHeader);
    unsortedTable.appendChild(unsortedHeader2);
    return unsortedTable;
}

function fillUnsortedTable(table, data, background) {
    var unsortedTable = table;
    var rowData = data;
    var backgroundColors = background;
    var row = document.createElement("tr");
    var cell1 = document.createElement("td");
    cell1.innerHTML = unsortedTableIndex + ".";
    unsortedTableIndex++;
    var cell2 = document.createElement("td");
    cell2.innerHTML = rowData[0];
    cell2.style.backgroundColor = backgroundColors[3];
    cell2.setAttribute("draggable", "true");
    cell2.addEventListener("dragstart", handleDragStart);
    cell2.addEventListener("dragend", handleDragEnd);
    cell2.setAttribute("title", "Name: " + rowData[0] + ", Vorname: " + rowData[1] + ", Erstwunsch: " + rowData[2] + ", Zweitwunsch: " + rowData[3] + ", Drittwunsch: " + rowData[4]);
    var cell3 = document.createElement("td");
    cell3.innerHTML = rowData[1];
    cell3.style.backgroundColor = backgroundColors[3];
    cell3.setAttribute("draggable", "true");
    cell3.addEventListener("dragstart", handleDragStart);
    cell3.addEventListener("dragend", handleDragEnd);
    cell3.setAttribute("title", "Name: " + rowData[0] + ", Vorname: " + rowData[1] + ", Erstwunsch: " + rowData[2] + ", Zweitwunsch: " + rowData[3] + ", Drittwunsch: " + rowData[4]);
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.setAttribute('draggable', "true");
    row.addEventListener("dragstart", handleDragStart);
    row.addEventListener("dragend", handleDragEnd);
    unsortedTable.appendChild(row);
}

function printTableById() {
    var tableId = prompt("Welche Tabellen möchten Sie drucken?");
    if (!tableId) {
        return;
    }
    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
        tables[i].style.display = "none";
    }

    var table = document.getElementById(tableId);
    if (table) {
        // Alles was keine Tabelle ist soll ausgeblendet werden
        var nonTableElements = document.querySelectorAll(".print-hide");
        for (var i = 0; i < nonTableElements.length; i++) {
            nonTableElements[i].classList.add("print-hidden");
        }
        // Display_Style der Tabelle >>und ihrer Parents<< auf "Inline-Block" ändern
        table.style.display = "inline-block";
        var parent = table.parentElement;
        while (parent.tagName !== "BODY") {
            if (getComputedStyle(parent).display === "none" || getComputedStyle(parent).visibility === "hidden") {
                alert("Eine übergeordnete Element des Tabellenelements ist ausgeblendet. Bitte sichtbar machen und dann erneut drucken.");
                return;
            }
            parent.style.display = "inline-block";
            parent = parent.parentElement;
        }
        // Tabelle drucken
        window.print();
        // Alle Elemente wieder sichtbar machen
        for (var i = 0; i < nonTableElements.length; i++) {
            nonTableElements[i].classList.remove("print-hidden");
        }
        for (var i = 0; i < tables.length; i++) {
            tables[i].style.display = "inline-block";
        }
    } else {
        alert("Eine Tabelle mit dem Namen: -" + tableId + "- existiert nicht");
    }
}

function printAllTables() {
    var tables = document.getElementsByTagName("table");
    if (tables.length == 0) {
        alert("Auf dieser Seite sind keine Tabellen vorhanden");
        return;
    }
    // Alles was keine Tabelle ist soll ausgeblendet werden
    var nonTableElements = document.querySelectorAll(".print-hide");
    for (var i = 0; i < nonTableElements.length; i++) {
        nonTableElements[i].classList.add("print-hidden");
    }
    window.print();
    for (var i = 0; i < nonTableElements.length; i++) {
        nonTableElements[i].classList.remove("print-hidden");
    }
}

function saveToLocalStorage(){
    const tables = document.getElementsByTagName("table");
    const tableData = [];
    const snapshotName = prompt("Wie wollen Sie diesen Snapshot nennen?");
    if(!snapshotName || snapshotName === null){
        return;
    }
    let response = true;
  
    if(localStorage.getItem("tables_" + snapshotName)){
      response = confirm("Ein Eintrag mit diesem Namen existiert bereits. Möchten sie den existierenden Wert überschreiben?");
    }
  
    if (response === true){
      for (let i = 0; i < tables.length; i++) {
        const table = tables[i];
        const tableHtml = table.outerHTML;
        tableData.push(tableHtml);
      }
  
      localStorage.setItem("tables_" + snapshotName, JSON.stringify(tableData));
      console.log(localStorage);
    }
    displayLocalStorageItems();
  }

function clearLocalStorage(){
    localStorage.clear();
    console.log("Local Storage cleared");
    displayLocalStorageItems();
}

function restoreFromLocalStorage(){
    var snapshot = prompt("Welchen Snapshot wollen sie wiederherstellen?");
    var tables = document.getElementsByTagName("table");
        while (tables.length > 0) {
            tables[0].parentNode.removeChild(tables[0]);
        }
    const tableData = JSON.parse(localStorage.getItem("tables_" + snapshot));
  
    //Outer HTML in temporäres Element einfügen um auf ID zugreifen zu können
    var tempElement = document.createElement("div");
    tempElement.innerHTML = tableData;

    // Greife auf das Attribut "id" des Table-Elements zu
    var tableElements = tempElement.querySelectorAll("table");
        console.log(tableElements);


    if (tableData) {
        for (let i = 0; i < tableData.length; i++) {
        const tableHtml = tableData[i];
        const table = document.createElement("table");
        table.innerHTML = tableHtml;
        table.id = tableElements[i].id;
        document.body.appendChild(table);
      }
    }
}

function displayLocalStorageItems() {
    const localStorageKeys = Object.keys(localStorage);
    console.log(localStorageKeys);
    const list = document.createElement("ul");

    for (let i = 0; i < localStorageKeys.length; i++) {
      const key = localStorageKeys[i];
      const snapshotName = key.substring(7);
      const item = document.createElement("li");
      item.innerText = snapshotName;
      list.appendChild(item);
    }

    var container = document.getElementById("local-storage-items-container");
    // Remove previous list before appending the new one
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(list);
}
  
  // Update the displayed items whenever a new item is added
  window.addEventListener("storage", function() {
    displayLocalStorageItems();
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    displayLocalStorageItems();
});


//____________________________________________________________________________________________\\

document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("removeBtn");
    var btn2 = document.getElementById("removeBtn2");
    var btn3 = document.getElementById("deleteTablesButton");
    var btn4 = document.getElementById("deleteSpecific");
    btn.addEventListener("click", function () {
        var tables = document.getElementsByTagName("table");
        for (var i = 0; i < tables.length; i++) {
            var table = tables[i];
            var rows = table.rows;
            for (var j = 2; j < rows.length; j++) {
                var row = rows[j];
                var cells = row.cells;
                cells[1].innerHTML = "";
                cells[1].style.backgroundColor = "white";
                cells[2].innerHTML = "";
                cells[2].style.backgroundColor = "white";
            }
        }
        var unsortedTable = document.getElementById("Unsortiert");
        if(unsortedTable){// Save table whenever it is created or modified
        document.addEventListener('click', function(event) {
          const target = event.target;
          if (target.tagName === 'TD' || target.tagName === 'TH') {
            const table = target.closest('table');
            const tableName = table.id;
            saveTable(tableName, table);
          }
        });
        table.parentNode.removeChild(unsortedTable);
        unsortedTableIndex = 1;
    }
    });
    btn2.addEventListener("click", function () {
        var contentToDelete = prompt("Den Inhalt welcher Tabelle wollen sie entfernen?");
        var table = document.getElementById(contentToDelete);
        if ((table.id = "Unsortiert")) {
            var unsortedTable = document.getElementById("Unsortiert");
            table.parentNode.removeChild(unsortedTable);
            unsortedTableIndex = 1;
        }
        if (!table) {
            alert("Keine Tabelle mit diesem Namen vorhanden");
            return;
        }
        var rows = table.rows;
        for (var j = 2; j < rows.length; j++) {
            var row = rows[j];
            var cells = row.cells;
            cells[1].innerHTML = "";
            cells[1].style.backgroundColor = "white";
            cells[2].innerHTML = "";
            cells[2].style.backgroundColor = "white";
        }
    });
    btn3.addEventListener("click", function () {
        var tables = document.getElementsByTagName("table");
        while (tables.length > 0) {
            tables[0].parentNode.removeChild(tables[0]);
        }
    });
    btn4.addEventListener("click", function () {
        var tableToDelete = prompt("Welche Tabelle wollen sie löschen");
        var table = document.getElementById(tableToDelete);
        if (!tableToDelete) {
            alert("Tablle mit diesem Namen nicht vorhanden");
        }
        table.parentNode.removeChild(table);
    });
});
