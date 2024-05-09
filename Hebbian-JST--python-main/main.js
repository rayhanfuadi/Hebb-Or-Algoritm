async function startLearning() {
    let banyakData = parseInt(document.getElementById("banyak-data").value);
    let banyakX = parseInt(document.getElementById("banyak-x").value);

    let w = new Array(banyakX).fill(0);
    let dw = new Array(banyakX).fill(0);
    let b = 0;

    let x = [];
    let t = [];
    for (let i = 0; i < banyakData; i++) {
        x.push([]);
        for (let j = 0; j < banyakX; j++) {
            let inputValue = parseInt(prompt(`Input X${j + 1} Data ke-${i + 1} = `));
            x[i].push(inputValue);
        }
        let targetValue = parseInt(prompt(`Input T data ke-${i + 1} = `));
        t.push(targetValue);
    }

    let a = 0;
    let ep = 1;
    let outputHTML = '';
    outputHTML += `<h2>Epoch ke- ${ep}</h2>`;
    outputHTML += '<table>';
    outputHTML += '<tr>';
    for (let j = 0; j < banyakX; j++) {
        outputHTML += `<th>X${j + 1}</th>`;
    }
    outputHTML += '<th>T</th>';
    for (let j = 0; j < banyakX; j++) {
        outputHTML += `<th>ΔW${j + 1}</th>`;
    }
    outputHTML += '<th>ΔB</th>';
    for (let j = 0; j < banyakX; j++) {
        outputHTML += `<th>W${j + 1}</th>`;
    }
    outputHTML += '<th>B</th>';
    outputHTML += '</tr>';

    for (let i = 0; i < banyakData; i++) {
        for (let j = 0; j < banyakX; j++) {
            dw[j] = x[i][j] * t[i];
        }
        let db = t[i];
        for (let j = 0; j < banyakX; j++) {
            w[j] += dw[j];
        }
        b += db;

        outputHTML += `<tr>`;
        for (let j = 0; j < banyakX; j++) {
            outputHTML += `<td>${x[i][j]}</td>`;
        }
        outputHTML += `<td>${t[i]}</td>`;
        for (let j = 0; j < banyakX; j++) {
            outputHTML += `<td>${dw[j]}</td>`;
        }
        outputHTML += `<td>${db}</td>`;
        for (let j = 0; j < banyakX; j++) {
            outputHTML += `<td>${w[j]}</td>`;
        }
        outputHTML += `<td>${b}</td>`;
        outputHTML += `</tr>`;

        if (t[i] === 1) {
            a++;
        }
    }

    outputHTML += '</table>';
    outputHTML += `<p>W1, W2 = ${w}</p>`;
    outputHTML += `<p>B = ${b}</p>`;

    outputHTML += '<h2>Hasil Pengujian</h2>';
    outputHTML += '<table>';
    outputHTML += '<tr>';
    for (let j = 0; j < banyakX; j++) {
        outputHTML += `<th>X${j + 1}</th>`;
    }
    outputHTML += '<th>T</th><th>F(x,w)</th><th>Out</th><th>Akurasi</th>';
    outputHTML += '</tr>';
    for (let i = 0; i < banyakData; i++) {
        let fx = 0;
        for (let j = 0; j < banyakX; j++) {
            fx += w[j] * x[i][j];
        }
        fx += b;
        let out = fx >= 0 ? 1 : -1;
        let akurasi = out === t[i] ? 1 : 0;
        outputHTML += `<tr>`;
        for (let j = 0; j < banyakX; j++) {
            outputHTML += `<td>${x[i][j]}</td>`;
        }
        outputHTML += `<td>${t[i]}</td><td>${fx}</td><td>${out}</td><td>${akurasi}</td>`;
        outputHTML += `</tr>`;
    }
    outputHTML += '</table>';

    ep++;

    document.getElementById("output-container").innerHTML = outputHTML;

    let tx = [];
    for (let i = 0; i < banyakX; i++) {
        let inputValue = parseInt(prompt(`Input X${i + 1} = `));
        tx.push(inputValue);
    }

    let fx = 0;
    for (let i = 0; i < banyakX; i++) {
        fx += w[i] * tx[i];
    }
    fx += b;

    outputHTML += '<h2>Hasil Algoritma Hebb</h2>';
    outputHTML += `<p>FX = ${fx}</p>`;
    let out = fx >= 0 ? 1 : -1;
    outputHTML += `<p>Output = ${out}</p>`;

    document.getElementById("output-container").innerHTML = outputHTML;
}