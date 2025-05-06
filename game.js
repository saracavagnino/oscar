const urlParams = new URLSearchParams(window.location.search);
const squadra = urlParams.get('squadra')?.toUpperCase();

const squadre = {
  A: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  B: [2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 11],
  C: [3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 11],
  D: [4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 11],
  E: [5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 11],
  F: [6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 11],
  G: [7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 11],
  H: [8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 11],
  I: [9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 11],
  J: [10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11],
};

const hints = {
  1: "IMMAGINE PUNTO SMAT",
  2: "IMMAGINE ANTENNA",
  3: "IMMAGINE LAVATOIO",
  4: "IMMAGINE BOCCIOFILA",
  5: "IMMAGINE MADONNA CAVALLERO",
  6: "IMMAGINE PARCO BLU",
  7: "IMMAGINE CICLABILE",
  8: "IMMAGINE STEFANIA",
  9: "IMMAGINE ALTALENE",
  10: "IMMAGINE MADONNA PALME",
  11: "IMMAGINE OSCAR"
};

let progress = JSON.parse(localStorage.getItem(`progress_${squadra}`)) || {
  currentIndex: 0,
  visited: []
};

if (!squadra || !squadre[squadra]) {
  document.body.innerHTML = "<p>Squadra non valida. Aggiungi '?squadra=A' all'URL.</p>";
} else {
  document.getElementById('game').classList.remove('hidden');
  showPage();
}

function showPage() {
  const page = squadre[squadra][progress.currentIndex];

  if (page === 11) {
    // Mostra messaggio finale e reset, nasconde input
    document.getElementById('finalMessage').classList.remove('hidden');
    document.getElementById('hint').innerText = `Indizio: ${hints[page]}`;
    document.getElementById('inputSection').style.display = 'none';
    document.getElementById('feedback').innerText = '';
    document.getElementById("resetButton").style.display = "block";
  } else {
    // Mostra tutto normalmente
    document.getElementById('finalMessage').classList.add('hidden');
    document.getElementById('hint').innerText = `Indizio: ${hints[page]}`;
    document.getElementById('answer').value = "";
    document.getElementById('feedback').innerText = "";
    document.getElementById('inputSection').style.display = 'block';
    document.getElementById("resetButton").style.display = "none";
  }
}

function checkAnswer() {
  const answer = document.getElementById('answer').value.trim();
  const page = squadre[squadra][progress.currentIndex];

  if (answer == page) {
    if (!progress.visited.includes(page)) {
      progress.visited.push(page);
    }

    if (progress.visited.length >= 10) {
      progress.currentIndex = squadre[squadra].length - 1; // Vai alla pagina 11
    } else {
      progress.currentIndex = (progress.currentIndex + 1) % (squadre[squadra].length - 1);
    }

    localStorage.setItem(`progress_${squadra}`, JSON.stringify(progress));
    showPage();
  } else {
    document.getElementById('feedback').innerText = "Risposta errata, riprova!";
  }
}

function resetGame() {
  if (confirm("Sei sicuro di voler resettare il gioco? Tutti i progressi saranno persi.")) {
    localStorage.removeItem(`progress_${squadra}`);
    location.href = `?squadra=${squadra}`;
  }
}
