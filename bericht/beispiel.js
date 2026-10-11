// Beispieldaten "Mara" (wie im Beispielbericht auf der Startseite) für bericht.html?beispiel, Werte 0 bis 100 wie in localStorage 'ordinum-ergebnisse'.
// Die Bereichswerte des Facetten-Tests sind die Mittelwerte ihrer sechs Facetten (so rechnet auch die Testseite).
window.BERICHT_BEISPIEL = {
  name: 'Mara',
  date: '20261010',
  tests: {
    neo120: { date: '20261010',
      O1: 92, O2: 90, O3: 88, O4: 78, O5: 84, O6: 84, O: 86,
      C1: 64, C2: 30, C3: 66, C4: 50, C5: 38, C6: 40, C: 48,
      E1: 62, E2: 22, E3: 34, E4: 40, E5: 30, E6: 46, E: 39,
      A1: 70, A2: 84, A3: 80, A4: 64, A5: 54, A6: 80, A: 72,
      N1: 52, N2: 30, N3: 40, N4: 62, N5: 48, N6: 38, N: 45 },
    staerken: { date: '20261008',
      cur: 92, ori: 89, kin: 84, app: 81, lov: 79, per: 74, jud: 72, soc: 70, hum: 69, gra: 68, int: 67, cap: 66,
      for: 64, hop: 63, equ: 62, spi: 60, val: 58, cit: 55, zes: 54, ind: 52, mod: 50, pru: 46, lea: 40, sel: 38 },
    wohlbefinden: { date: '20261009', F: 74, M: 66, O: 70, S: 58, V: 72 },
    stress: { date: '20261009', A: 50, R: 28, U: 42, S: 64 },
    emotionen: { date: '20261010', W: 82, P: 66, N: 34, J: 76, E: 66 },
    beziehung: { date: '20261008', LM: 80, NO: 44, PA: 32, BC: 20, DE: 22, FG: 42, HI: 40, JK: 52 }
  }
};
