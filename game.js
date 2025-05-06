// Estrae il parametro 'squadra' dall'URL
const urlParams = new URLSearchParams(window.location.search);
const squadra = urlParams.get('squadra')?.toUpperCase();

// Definizione delle sequenze per ciascuna squadra
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



// Mappa delle immagini da mostrare per ciascun punto
const images = {
  1: "img/punto_smat.jpg",
  2: "img/antenna.jpg",
  3: "img/lavatoio.jpg",
  4: "img/bocciofila.jpg",
  5: "img/madonna_cavallero.jpg",
  6: "img/parco_blu.jpg",
  7: "img/pista_ciclabile.jpg",
  8: "img/stefania.jpg",
  9: "img/altalene.jpg",
  10: "img/madonna_palme.jpg",
  11: "img/oscar.jpg"
};

// Mappa degli indizi testuali
const hints = {
  1: "Cerca dove l’acqua si incrocia sotto la città.",
  2: "Trova il punto più alto da cui trasmettere.",
  3: "Dove un tempo si lavavano i panni…",
  4: "Facendo il giro in senso antiorario qual è il numero di serie del secondo lampione?",
  5: "Un’edicola votiva nel verde.",
  6: "Il parco con il colore del cielo.",
  7: "Un percorso per biciclette.",
  8: "Una persona importante da cercare.",
  9: "Dondola nel vento con i bambini.",
  10: "Un’altra Madonna, tra le palme.",
  11: "OSCAR"
};

// Recupera i progressi salvati o inizia da capo
let progress = JSON.parse(localStorage.getItem(`progress_${squadra}`)) || {
  currentIndex: 0,
  visited: []
};

// Se la squadra non è valida, mostra errore
if (!squadra || !squadre[squadra]) {
  document.body.innerHTML = "<p>Squadra non valida. Aggiungi '?squadra=A' all'URL.</p>";
} else {
  document.getElementById('game').classList.remove('hidden');
  showPage();
}

// Mostra il contenuto della pagina attuale (immagine, indizio, input)
function showPage() {
  const page = squadre[squadra][progress.currentIndex];

  // Mostra messaggio finale se è l'ultima pagina
  if (page === 11) {
    document.getElementById('finalMessage').classList.remove('hidden');
    document.getElementById('hint').innerText = `Indizio: ${hints[page]}`;
    document.getElementById('placeImage').src = images[page];
    document.getElementById('inputSection').style.display = 'none';
    document.getElementById('feedback').innerText = '';
    document.getElementById("resetButton").style.display = "block";
  } else {
    // Altrimenti mostra l'indizio e l'immagine
    document.getElementById('finalMessage').classList.add('hidden');
    document.getElementById('hint').innerText = `${hints[page]}`;
    document.getElementById('placeImage').src = images[page];
    document.getElementById('answer').value = "";
    document.getElementById('feedback').innerText = "";
    document.getElementById('inputSection').style.display = 'block';
    document.getElementById("resetButton").style.display = "none";
  }
}

// Verifica la risposta inserita
function checkAnswer() {
  const answer = document.getElementById('answer').value.trim();
  const page = squadre[squadra][progress.currentIndex];

  if (answer == page) {
    if (!progress.visited.includes(page)) {
      progress.visited.push(page);
    }

    // Se sono stati visitati 10 punti, vai all'11 (Oscar)
    if (progress.visited.length >= 10) {
      progress.currentIndex = squadre[squadra].length - 1;
    } else {
      progress.currentIndex = (progress.currentIndex + 1) % (squadre[squadra].length - 1);
    }

    localStorage.setItem(`progress_${squadra}`, JSON.stringify(progress));
    showPage();
  } else {
    document.getElementById('feedback').innerText = "Risposta errata, riprova!";
  }
}

// Resetta il gioco
function resetGame() {
  if (confirm("Sei sicuro di voler resettare il gioco? Tutti i progressi saranno persi.")) {
    localStorage.removeItem(`progress_${squadra}`);
    location.href = `?squadra=${squadra}`;
  }
}
