const params = new URLSearchParams(window.location.search);
const squadra = params.get("squadra");
const squadre = {
  A: [1,2,3,4,5,6,7,8,9,10,11],
  B: [2,3,4,5,6,7,8,9,10,1,11],
  C: [3,4,5,6,7,8,9,10,1,2,11],
  D: [4,5,6,7,8,9,10,1,2,3,11],
  E: [5,6,7,8,9,10,1,2,3,4,11],
  F: [6,7,8,9,10,1,2,3,4,5,11],
  G: [7,8,9,10,1,2,3,4,5,6,11],
  H: [8,9,10,1,2,3,4,5,6,7,11],
  I: [9,10,1,2,3,4,5,6,7,8,11],
  J: [10,1,2,3,4,5,6,7,8,9,11]
};
const indizi = {
  1: "PUNTO SMAT", 2: "ANTENNA", 3: "LAVATOIO", 4: "BOCCIOFILA",
  5: "MADONNA CAVALLERO", 6: "PARCO BLU", 7: "CICLABILE",
  8: "STEFANIA", 9: "ALTALENE", 10: "MADONNA PALME", 11: "OSCAR"
};
const container = document.getElementById("container");

if (!squadra || !squadre[squadra]) {
  document.body.innerHTML = "<p>Squadra non valida. Aggiungi '?squadra=A' all'URL.</p>";
} else {
  let percorso = squadre[squadra];
  let pagineAperte = JSON.parse(localStorage.getItem("pagineAperte")) || [];
  let paginaCorrente = parseInt(localStorage.getItem("paginaCorrente")) || percorso[0];
  mostraPagina(paginaCorrente);

  function mostraPagina(pagina) {
    if (pagina === 11) {
      mostraPaginaFinale();
      return;
    }
    container.innerHTML = `
      <p>Indizio: <strong>${indizi[pagina]}</strong></p>
      <input id="risposta" placeholder="Inserisci la risposta..." />
      <button onclick="controllaRisposta()">Invia</button>
    `;
    localStorage.setItem("paginaCorrente", pagina);
  }

  function controllaRisposta() {
    const rispostaUtente = document.getElementById("risposta").value.trim();
    const paginaAttuale = parseInt(localStorage.getItem("paginaCorrente"));
    if (rispostaUtente === paginaAttuale.toString()) {
      if (!pagineAperte.includes(paginaAttuale)) {
        pagineAperte.push(paginaAttuale);
        localStorage.setItem("pagineAperte", JSON.stringify(pagineAperte));
      }
      const prossimoIndice = (squadre[squadra].indexOf(paginaAttuale) + 1) % percorso.length;
      const prossimaPagina = percorso[prossimoIndice];
      if (pagineAperte.length >= 10) {
        mostraPaginaFinale();
      } else {
        mostraPagina(prossimaPagina);
      }
    } else {
      alert("Risposta sbagliata. Riprova!");
    }
  }

  function mostraPaginaFinale() {
    container.innerHTML = `
      <p>Complimenti! Hai completato la caccia al tesoro 🎉</p>
      <button onclick="ricomincia()">Ricomincia</button>
    `;
  }

  function ricomincia() {
    localStorage.removeItem("pagineAperte");
    localStorage.removeItem("paginaCorrente");
    location.href = location.origin + location.pathname + location.search;
  }
}