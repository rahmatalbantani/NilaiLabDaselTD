function cariData() {
    const nimInput = document.getElementById('nimInput').value;
  
    // Menyertakan nama file Excel yang ingin dibaca
    const namaFileExcel = 'NilaiTD.xlsx';
  
    bacaFileExcel(namaFileExcel, nimInput, resultDiv);
  }
  
  function bacaFileExcel(namaFile, nim, resultDiv) {
    const xhr = new XMLHttpRequest();
  
    xhr.open('GET', namaFile, true);
    xhr.responseType = 'arraybuffer';
  
    xhr.onload = function () {
      const data = new Uint8Array(xhr.response);
      const workbook = XLSX.read(data, { type: 'array' });
  
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
  
      const dataJson = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 6 });
  
      console.log(dataJson);  // Tambahkan ini untuk melihat data di console
  
      const hasilPencarian = dataJson.find((row) => row[1] === nim);
  
      if (hasilPencarian) {
        tampilkanData(hasilPencarian, resultDiv);
      } else {
        resultDiv.innerHTML = 'Data tidak ditemukan';
      }
    };
  
    xhr.send();
  }
  
  function tampilkanData(data, resultDiv) {
    resultDiv.innerHTML = ''; // Mengosongkan hasil sebelumnya
  
    const tabel = document.createElement('table');
    const barisData = tabel.insertRow(0);
  
    data.forEach((kolom) => {
      const sel = barisData.insertCell();
      sel.innerHTML = kolom;
    });
  
    resultDiv.appendChild(tabel);
  }
  