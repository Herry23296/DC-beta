function semakJawapan() {
  const n1Str = document.getElementById("num1").value.trim();
  const n2Str = document.getElementById("num2").value.trim();
  const op = document.getElementById("operator").value;
  const ansStr = document.getElementById("studentAns").value.trim();
  const resultDiv = document.getElementById("result");

  const n1 = parseFloat(n1Str);
  const n2 = parseFloat(n2Str);
  const studentAns = parseFloat(ansStr);

  if (isNaN(n1) || isNaN(n2) || isNaN(studentAns)) {
    resultDiv.className = "result-box wrong";
    resultDiv.innerText = "Sila masukkan semua nombor dengan betul.";
    return;
  }

  // Kira jawapan betul sebenar
  let correctAns = (op === "+") ? (n1 + n2) : (n1 - n2);
  correctAns = Math.round(correctAns * 1000) / 1000; // Kemaskan perpuluhan

  // Semak jika jawapan betul
  if (Math.abs(studentAns - correctAns) < 0.0001) {
    resultDiv.className = "result-box correct";
    resultDiv.innerText = "Syabas! Jawapan murid BETUL.";
    return;
  }

  // Analisis Kesilapan: Semak jika murid salah kerana menyusun tanpa mengikut titik perpuluhan
  const n1Clean = n1Str.replace('.', '');
  const n2Clean = n2Str.replace('.', '');
  let shiftedAns = (op === "+") ? (parseFloat(n1Clean) + parseFloat(n2Clean)) : (parseFloat(n1Clean) - parseFloat(n2Clean));

  let ulasan = `Jawapan murid SALAH.\nJawapan Sebenar: ${correctAns}`;

  // Semak bilangan tempat perpuluhan
  const dec1 = (n1Str.split('.')[1] || '').length;
  const dec2 = (n2Str.split('.')[1] || '').length;

  if (dec1 !== dec2) {
    ulasan += `\n\nAnalisis Kesilapan:\nKedudukan titik perpuluhan tidak selari! Digalakkan letak nilai '0' di hujung nombor supaya bilangan tempat perpuluhan sama.`;
  }

  resultDiv.className = "result-box wrong";
  resultDiv.innerText = ulasan;
}
