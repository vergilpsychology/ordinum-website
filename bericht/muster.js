// Muster (Kapitel 2): Verbindungen zwischen den Tests, Stand berichtstexte-entwurf.md (zweite Fassung).
// b = Belastungsbezug, main = Hauptthemen (für die Vielfalt der Auswahl), ok = Bedingung, pills = die beiden Ergebnisse der Verbindungsgrafik.
(function(){
  function top(m, keys){ if (!m.top) return null; for (var i = 0; i < m.top.length; i++) if (keys.indexOf(m.top[i].k) >= 0) return m.top[i]; return null; }
  function rank(m, k){ for (var i = 0; i < m.top.length; i++) if (m.top[i].k === k) return i + 1; return 0; }
  function sName(k){ return window.QUELLE.staerken[k].name; }
  function P(m, k){ return { test: m.P.src, label: window.TEXTE.bereiche[k].name, value: m.P[k] }; }
  function S(m, k){ return { test: 'staerken', label: sName(k), value: 'Platz ' + rank(m, k) }; }
  function F(m, f){ return { test: 'neo120', label: window.QUELLE.facetten[f].name, value: m.P.facets[f] }; }
  var bezNames = { PA:'Bestimmend', BC:'Direkt', DE:'Nüchtern', FG:'Reserviert', HI:'Leise', JK:'Nachsichtig', LM:'Warmherzig', NO:'Gesellig' };
  function B(m){ return { test: 'beziehung', label: 'Schwerpunkt', value: m.bez.focus === 'AUS' ? 'ausgewogen' : bezNames[m.bez.focus] }; }
  var hasF = function(m){ return m.P && m.P.facets; };

  window.MUSTER = [
    { id:'M1', main:['O'], ok: function(m){ return m.P && m.P.O > 60 && m.P.C <= 60; },
      pills: function(m){ return [P(m,'O'), P(m,'C')]; },
      titel: 'Du denkst in Möglichkeiten und brauchst Freiraum, um sie umzusetzen.',
      text: function(m){ return 'Neue Ideen geben dir Energie. Deine Gewissenhaftigkeit liegt ' + (m.P.C < 40 ? 'eher niedrig' : 'im mittleren Bereich') + ': Feste Pläne helfen dir, solange sie dir Spielraum lassen. Werden sie zu eng, bleiben Projekte eher liegen.'; },
      uebung: 'Gib einem neuen Projekt einen festen, kurzen Block von 45 Minuten pro Tag und entscheide erst in diesem Moment, woran genau du arbeitest. So verbindest du Struktur mit der Freiheit, die du brauchst.',
      kurz: '45 Minuten Projektzeit' },
    { id:'M2', main:['O'], ok: function(m){ return m.P && m.P.O > 60 && top(m, ['cur','lov']); },
      pills: function(m){ return [P(m,'O'), S(m, top(m, ['cur','lov']).k)]; },
      titel: 'Dein Interesse an Neuem zeigt sich doppelt.',
      text: function(){ return 'Es steckt in deiner Persönlichkeit und in deinen Charakterstärken: Du blühst auf, wenn du etwas verstehen, entdecken oder durchdenken darfst. Routinen ohne Lernmoment können dich auf Dauer ermüden.'; },
      uebung: 'Leg dir eine Liste mit Fragen an, die dich wirklich interessieren. Nimm dir jede Woche eine davon vor und gib ihr eine Stunde: mit einem Buch, einem Gespräch oder einem Spaziergang zum Nachdenken.',
      kurz: 'Einer Frage eine Stunde geben' },
    { id:'M3', main:['E'], ok: function(m){ return m.P && m.P.E < 40 && top(m, ['kin','cap']); },
      pills: function(m){ return [P(m,'E'), S(m, top(m, ['kin','cap']).k)]; },
      titel: 'Deine Wärme zeigt sich leise.',
      text: function(m){ var k = top(m, ['kin','cap']).k; return 'Große Runden sind nicht unbedingt deine Bühne, doch ' + (k === 'kin' ? 'Freundlichkeit' : 'die Fähigkeit zu lieben') + ' gehört zu deinen stärksten Seiten. Menschen, die dir nahestehen, erleben deine Zuwendung vermutlich eher im Gespräch zu zweit als in der großen Gruppe.'; },
      uebung: 'Verabrede dich diese Woche zu zweit mit einem Menschen, der dir wichtig ist: für einen Spaziergang, einen Kaffee oder ein Telefonat ohne Nebenbei.',
      kurz: 'Ein Treffen zu zweit' },
    { id:'M4', main:['S'], ok: function(m){ return m.P && m.emo && m.P.S < 40 && m.emo.W > 60; },
      pills: function(m){ return [P(m,'S'), { test:'emotionen', label:'Gefühle wahrnehmen', value:m.emo.W }]; },
      titel: 'Du hast feine Antennen für dein Innenleben.',
      text: function(){ return 'Gefühle erlebst du deutlich, und du schaust bewusst hin, was in dir vorgeht. Das kann manchmal viel sein. Es kann aber auch eine gute Grundlage sein, um mit Gefühlen umzugehen: Was du bemerkst, kannst du besser einordnen.'; },
      uebung: 'Wenn ein Gefühl stark wird, benenne es in einem Wort, etwa „Sorge“ oder „Ärger“, und notiere, was es ausgelöst hat. Schon das Benennen schafft oft etwas Abstand. Das Arbeitsblatt „Emotionstagebuch“ hilft dabei.',
      kurz: 'Gefühle in einem Wort benennen' },
    { id:'M5', b:true, main:['C'], ok: function(m){ return m.P && m.stress && m.P.C > 60 && m.stress.A > 60; },
      pills: function(m){ return [P(m,'C'), { test:'stress', label:'Anspannung', value:m.stress.A }]; },
      titel: 'Hoher Anspruch trifft auf Anspannung.',
      text: function(){ return 'Du willst Dinge gut machen, und wenn vieles gleichzeitig ansteht, spürst du das als Unruhe. Beides hängt oft zusammen: Wer viel Verantwortung empfindet, nimmt offene Aufgaben leicht mit in den Feierabend.'; },
      uebung: 'Sortiere deine Aufgaben in zwei Spalten: „braucht meine volle Gründlichkeit“ und „gut genug reicht“. Erlaube dir bei der zweiten Spalte bewusst, früher aufzuhören.',
      kurz: 'Zwei Spalten: gründlich oder gut genug' },
    { id:'M6', main:['SW'], ok: function(m){ return m.stress && m.wb && m.stress.S > 60 && m.wb.O > 60; },
      pills: function(m){ return [{ test:'stress', label:'Selbstwirksamkeit', value:m.stress.S }, { test:'wohlbefinden', label:'Zuversicht', value:m.wb.O }]; },
      titel: 'Du vertraust deinem eigenen Weg.',
      text: function(){ return 'Du traust dir zu, mit Herausforderungen umzugehen, und blickst hoffnungsvoll nach vorn. Diese Verbindung kann dich auch durch unsichere Phasen tragen.'; },
      uebung: 'Schreib drei Situationen auf, die du gemeistert hast, obwohl du vorher unsicher warst. Leg die Liste dorthin, wo du sie bei der nächsten Herausforderung findest.',
      kurz: 'Drei gemeisterte Situationen notieren' },
    { id:'M7', b:true, main:['A'], ok: function(m){ return m.P && m.emo && m.P.A > 60 && m.emo.N < 40; },
      pills: function(m){ return [P(m,'A'), { test:'emotionen', label:'Schweres zeigen', value:m.emo.N }]; },
      titel: 'Du bist für andere da, dein eigenes Schweres behältst du eher für dich.',
      text: function(){ return 'Dir liegt viel daran, wie es anderen geht, und Traurigkeit, Angst oder Ärger machst du eher mit dir selbst aus. Das schont dein Umfeld. Es kann aber bedeuten, dass deine eigenen Bedürfnisse leiser bleiben, als sie sein müssten.'; },
      uebung: 'Überlege, bei welchem Menschen du dich sicher genug fühlst, auch etwas Schweres zu teilen. Fang klein an und erzähl von einer Sache, die dich gerade beschäftigt.',
      kurz: 'Etwas Schweres teilen' },
    { id:'M8', main:['E'], ok: function(m){ return m.P && m.emo && m.P.E > 60 && m.emo.P > 60; },
      pills: function(m){ return [P(m,'E'), { test:'emotionen', label:'Freude zeigen', value:m.emo.P }]; },
      titel: 'Deine Freude steckt an.',
      text: function(){ return 'Wenn dich etwas begeistert, merken es die anderen. Du gehst auf Menschen zu und zeigst offen, was dich freut, und damit ziehst du andere mit.'; },
      uebung: 'Lade diese Woche Menschen zu etwas ein, das dich begeistert, und teile es mit ihnen.',
      kurz: 'Andere zu etwas einladen' },
    { id:'M9', b:true, main:['V'], ok: function(m){ return m.wb && m.wb.V < 40 && top(m, ['zes']); },
      pills: function(m){ return [{ test:'wohlbefinden', label:'Lebendigkeit', value:m.wb.V }, S(m,'zes')]; },
      titel: 'Tatendrang ist eine deiner Stärken, doch gerade fehlt dir Energie.',
      text: function(){ return 'Das kann ein Hinweis sein, dass dir im Moment Gelegenheiten fehlen, diese Stärke zu leben, oder dass du Erholung brauchst. Beides ist ernst zu nehmen.'; },
      uebung: 'Schau auf die letzten zwei Wochen: Wann hast du dich lebendig gefühlt, und was hast du da getan? Plane eine kleine Version davon für die nächsten Tage ein und achte daneben auf Schlaf und Pausen.',
      kurz: 'Eine kleine lebendige Sache planen' },
    { id:'M10', main:['Bauch'], ok: function(m){ return m.emo && m.emo.E > 60 && top(m, ['jud']); },
      pills: function(m){ return [{ test:'emotionen', label:'Bauchgefühl', value:m.emo.E }, S(m,'jud')]; },
      titel: 'Kopf und Bauch sind bei dir im Gespräch.',
      text: function(){ return 'Du hörst bei Entscheidungen auf dein Gefühl und wägst zugleich sorgfältig ab. Am leichtesten fällt dir eine Entscheidung oft, wenn beide in dieselbe Richtung zeigen.'; },
      uebung: 'Schreib bei der nächsten Entscheidung zuerst auf, was dein Bauch sagt, dann die Argumente. Wo beide sich widersprechen, lohnt ein genauerer Blick, denn dort steckt oft die eigentliche Frage.',
      kurz: 'Bauch und Argumente aufschreiben' },
    { id:'M11', main:['Bez'], ok: function(m){ return m.P && m.bez && (m.bez.focus === 'LM' || m.bez.focus === 'NO') && m.P.A > 60; },
      pills: function(m){ return [B(m), P(m,'A')]; },
      titel: 'Du gehst offen und herzlich auf andere zu.',
      text: function(){ return 'Das zeigt sich in zwei Tests: in deiner Persönlichkeit und in der Art, wie du anderen begegnest.'; },
      uebung: 'Achte eine Woche lang darauf, bei welchen Menschen du auftankst und bei welchen du vor allem gibst. Ein Gleichgewicht aus Geben und Nehmen hält deine Wärme lebendig.',
      kurz: 'Auftanken und Geben beobachten' },
    { id:'M12', main:['Bez'], ok: function(m){ return m.bez && (m.bez.focus === 'PA' || m.bez.focus === 'BC') && top(m, ['lea']); },
      pills: function(m){ return [B(m), S(m,'lea')]; },
      titel: 'Du gibst gern Richtung.',
      text: function(){ return 'Du übernimmst Verantwortung und bringst Dinge voran, das zeigt sich in deinem Beziehungsstil und in deinen Stärken. In Gruppen bist du oft die Person, die Entscheidungen möglich macht.'; },
      uebung: 'Frag in der nächsten Runde zuerst nach der Meinung der Leisesten, bevor du deine eigene sagst.',
      kurz: 'Zuerst die Leisesten fragen' },
    { id:'M13', main:['O2'], ok: function(m){ return hasF(m) && m.P.facets.O2 > 60 && top(m, ['app']); },
      pills: function(m){ return [F(m,'O2'), S(m,'app')]; },
      titel: 'Schönheit ist für dich eine Kraftquelle.',
      text: function(){ return 'Kunst, Natur und gelungene Formen berühren dich, das zeigt sich in deiner Persönlichkeit und in deinen Stärken. Zeit mit Schönem ist für dich keine Nebensache.'; },
      uebung: 'Plane diese Woche bewusst ein Erlebnis mit etwas Schönem ein, etwa ein Konzert, eine Ausstellung oder einen Weg durch die Natur, und schalte dabei das Handy stumm.',
      kurz: 'Ein Erlebnis mit etwas Schönem' },
    { id:'M14', main:['N4'], ok: function(m){ return hasF(m) && m.bez && m.P.facets.N4 > 60 && (m.bez.focus === 'HI' || m.bez.focus === 'FG'); },
      pills: function(m){ return [F(m,'N4'), B(m)]; },
      titel: 'Im ersten Kontakt bist du vorsichtig.',
      text: function(){ return 'Unter Fremden fühlst du dich schnell beobachtet und hältst dich zurück. Wenn Vertrauen gewachsen ist, zeigst du mehr von dir.'; },
      uebung: 'Geh in eine neue Situation mit einer kleinen, festen Aufgabe, zum Beispiel einer Frage, die du jemandem stellst. Eine klare Rolle macht den Einstieg oft leichter.',
      kurz: 'Mit einer kleinen Aufgabe starten' },
    { id:'M15', main:['O3'], ok: function(m){ return hasF(m) && m.emo && m.P.facets.O3 > 60 && m.emo.W > 60; },
      pills: function(m){ return [F(m,'O3'), { test:'emotionen', label:'Gefühle wahrnehmen', value:m.emo.W }]; },
      titel: 'Dein Innenleben ist dir nah.',
      text: function(){ return 'Zwei Tests zeigen dasselbe: Deine Gefühle sind dir wichtig, und du nimmst sie bewusst wahr. Das ist eine gute Grundlage für Selbsterkundung.'; },
      uebung: 'Halte eine Woche lang abends fest, welches Gefühl den Tag geprägt hat. Das Emotionstagebuch oder das Traumtagebuch aus dem Arbeitsmaterial passen dazu.',
      kurz: 'Abends das Gefühl des Tages notieren' },
    { id:'M16', main:['E5'], ok: function(m){ return hasF(m) && m.P.facets.E5 > 60 && m.P.facets.C6 < 40; },
      pills: function(m){ return [F(m,'E5'), F(m,'C6')]; },
      titel: 'Du gehst mit Schwung voran.',
      text: function(){ return 'Du suchst das Neue und entscheidest gern spontan. Das macht dich lebendig und offen für Gelegenheiten.'; },
      uebung: 'Gönn dir bei großen Entscheidungen eine Nacht Bedenkzeit. Bei kleinen darfst du ruhig spontan bleiben.',
      kurz: 'Eine Nacht Bedenkzeit' },
    { id:'M17', b:true, main:['C4'], ok: function(m){ return hasF(m) && m.wb && m.P.facets.C4 > 60 && m.wb.V < 40; },
      pills: function(m){ return [F(m,'C4'), { test:'wohlbefinden', label:'Lebendigkeit', value:m.wb.V }]; },
      titel: 'Viel Einsatz, wenig Energie.',
      text: function(){ return 'Du gibst viel und willst mehr erreichen, als von dir erwartet wird, fühlst dich im Moment aber eher erschöpft.'; },
      uebung: 'Plane diese Woche zwei feste Pausen ein, so verbindlich wie einen Termin, und beobachte, wie es dir danach geht.',
      kurz: 'Zwei feste Pausen' },
    { id:'M18', b:true, main:['U'], ok: function(m){ return m.stress && m.wb && m.stress.U > 60 && m.wb.ov < 40; },
      pills: function(m){ return [{ test:'stress', label:'Überforderung', value:m.stress.U }, { test:'wohlbefinden', label:'Wohlbefinden', value:m.wb.ov }]; },
      titel: 'Gerade ist viel auf einmal.',
      text: function(){ return 'Deine Ergebnisse deuten darauf hin, dass dich im Moment einiges belastet. Das beschreibt einen Zustand, keine Eigenschaft. Im Kapitel „Wie es dir gerade geht“ und bei den nächsten Schritten findest du Anregungen. Wenn es länger so bleibt, kann ein Gespräch mit einer Fachperson entlasten.'; },
      uebung: 'Schreib alles auf, was gerade ansteht, und streiche oder verschiebe bewusst eine Sache. Frag dich: Wer könnte mir bei einer Aufgabe helfen?',
      kurz: 'Eine Sache streichen oder abgeben' }
  ];

  // Grundmuster: verbinden Ergebnisse, die fast immer vorliegen, über die eigenen höchsten Werte statt über feste Schwellen.
  // Sie füllen auf, wenn weniger als drei Muster zutreffen, und stehen nie unter „Weitere Verbindungen“.
  var WBN = { F:'Lebensfreude', M:'Ausgeglichene Stimmung', O:'Zuversicht', S:'Selbstwert', V:'Lebendigkeit' };
  var LAST = { A:'Anspannung', R:'Reizbarkeit', U:'Überforderung' };
  function topDom(m){ return ['O','C','E','A','S'].sort(function(a, b){ return m.P[b] - m.P[a]; })[0]; }
  function lowWb(m){ return ['F','M','O','S','V'].sort(function(a, b){ return m.wb[a] - m.wb[b]; })[0]; }
  function hiLast(m){ return ['A','R','U'].sort(function(a, b){ return m.stress[b] - m.stress[a]; })[0]; }
  var DOMSATZ = {
    O: 'Offenheit zeigt sich darin, dass dich Ideen, Neues und eigene Gedanken anziehen.',
    C: 'Gewissenhaftigkeit zeigt sich darin, dass du planst, dranbleibst und Dinge zu Ende bringst.',
    E: 'Extraversion zeigt sich darin, dass dir Menschen, Austausch und Bewegung Energie geben.',
    A: 'Verträglichkeit zeigt sich darin, dass dir das Wohl anderer am Herzen liegt.',
    S: 'Emotionale Stabilität zeigt sich darin, dass du auch in bewegten Zeiten oft bei dir bleibst.'
  };
  var LASTTEXT = {
    A: { text: 'Anspannung lässt oft nach, wenn du etwas tust, das dich ganz einnimmt. Eine Tätigkeit, in der {s} zum Zug kommt, kann dich aus dem Gedankenkreisen holen.',
         uebung: 'Wenn du das nächste Mal merkst, dass die Anspannung steigt, nimm dir zehn Minuten für etwas, bei dem {s} zum Zug kommt. Beobachte, was sich danach verändert hat.' },
    R: { text: 'Wenn du schneller gereizt bist, hilft oft eine kurze Pause, bevor du reagierst. Danach kann dir {s} helfen, die Situation auf deine Art anzugehen.',
         uebung: 'Atme beim nächsten Ärger dreimal tief durch, bevor du antwortest. Frag dich dann: Wie würde ich hier reagieren, wenn ich {s} einsetze?' },
    U: { text: 'Wenn dir alles zu viel wird, hilft es, nur die nächste kleine Sache anzugehen, am besten so, dass {s} dabei zum Zug kommt.',
         uebung: 'Schreib auf, was dich gerade fordert, und such dir eine Sache aus, die du mit {s} angehen kannst. Erledige heute nur diese eine.' }
  };
  window.GRUNDMUSTER = [
    { id:'G1', ok: function(m){ return m.P && m.top; },
      pills: function(m){ return [P(m, topDom(m)), S(m, m.top[0].k)]; },
      titel: function(m){ return sName(m.top[0].k) + ' und ' + window.TEXTE.bereiche[topDom(m)].name + ' können sich bei dir gegenseitig stärken.'; },
      text: function(m){ var d = topDom(m); return 'In deiner Persönlichkeit ist ' + window.TEXTE.bereiche[d].name + ' am deutlichsten ausgeprägt, und unter deinen Charakterstärken steht ' + sName(m.top[0].k) + ' ganz oben. ' + DOMSATZ[d] + ' Wo du beides zusammenbringst, findest du vermutlich Tätigkeiten, die dir besonders viel Energie geben.'; },
      uebung: function(m){ return 'Such dir diese Woche eine Gelegenheit, bei der beides zum Zug kommt: ' + sName(m.top[0].k) + ' und deine ' + window.TEXTE.bereiche[topDom(m)].name + '. Plane sie fest ein und achte danach darauf, wie viel Energie sie dir gegeben hat.'; },
      kurz: function(m){ return sName(m.top[0].k) + ' und ' + window.TEXTE.bereiche[topDom(m)].name; } },
    { id:'G2', ok: function(m){ return m.wb && m.top && m.top.length > 1 && m.wb[lowWb(m)] < 50; },
      pills: function(m){ var w = lowWb(m); return [{ test:'wohlbefinden', label:WBN[w], value:m.wb[w] }, S(m, m.top[1].k)]; },
      titel: function(m){ return sName(m.top[1].k) + ' kann dir gerade Rückenwind geben.'; },
      text: function(m){ var w = lowWb(m); return 'Von den Bereichen deines Wohlbefindens liegt gerade dieser am niedrigsten: ' + WBN[w] + ' (' + m.wb[w] + '). Gleichzeitig gehört ' + sName(m.top[1].k) + ' zu deinen stärksten Seiten. Wer eine ausgeprägte Stärke bewusst einsetzt, erlebt oft mehr Freude und Sinn, und das kann auch auf diesen Bereich ausstrahlen.'; },
      uebung: function(m){ return 'Setz ' + sName(m.top[1].k) + ' diese Woche an drei Tagen bewusst auf eine neue Art ein. Notiere abends in einem Satz, wie es dir damit ging, und achte darauf, ob sich in diesem Bereich etwas bewegt.'; },
      kurz: function(m){ return sName(m.top[1].k) + ' neu einsetzen'; } },
    { id:'G3', ok: function(m){ return m.stress && m.top && m.top.length > 2 && m.stress[hiLast(m)] >= 50; },
      pills: function(m){ var l = hiLast(m); return [{ test:'stress', label:LAST[l], value:m.stress[l] }, S(m, m.top[2].k)]; },
      titel: function(m){ return sName(m.top[2].k) + ' kann dir in vollen Zeiten helfen.'; },
      text: function(m){ var l = hiLast(m); return 'Wenn es voll wird, zeigt sich bei dir am ehesten diese Seite: ' + LAST[l] + ' (' + m.stress[l] + '). ' + LASTTEXT[l].text.replace('{s}', sName(m.top[2].k)); },
      uebung: function(m){ return LASTTEXT[hiLast(m)].uebung.replace('{s}', sName(m.top[2].k)); },
      kurz: function(m){ return sName(m.top[2].k) + ' in vollen Zeiten'; } }
  ];

  // Auswahl: bis zu fünf ausführlich. Stärkende zuerst (jedes Hauptthema möglichst nur einmal),
  // ein Platz für das erste Muster mit Belastungsbezug (M18 hat Vorrang), ein zweites nur bei freiem Platz.
  // Sind es weniger als drei, füllen Grundmuster auf; sie stehen vor den Mustern mit Belastungsbezug.
  window.waehleMuster = function(m){
    var test = function(r){ try { return !!r.ok(m); } catch(e){ return false; } };
    var hits = window.MUSTER.filter(test);
    var res = hits.filter(function(r){ return !r.b; }), bur = hits.filter(function(r){ return r.b; });
    var firstB = bur.filter(function(r){ return r.id === 'M18'; })[0] || bur[0] || null;
    var slots = firstB ? 4 : 5, chosen = [], used = {}, bs = [];
    res.forEach(function(r){ if (chosen.length < slots && !r.main.some(function(k){ return used[k]; })) { chosen.push(r); r.main.forEach(function(k){ used[k] = 1; }); } });
    res.forEach(function(r){ if (chosen.length < slots && chosen.indexOf(r) < 0) chosen.push(r); });
    if (firstB) bs.push(firstB);
    if (chosen.length + bs.length < 5) { var second = bur.filter(function(r){ return r !== firstB; })[0]; if (second) bs.push(second); }
    var pair = function(r){ try { return r.pills(m).map(function(p){ return p.label; }).sort().join('|'); } catch(e){ return ''; } };
    var taken = chosen.concat(bs).map(pair);
    window.GRUNDMUSTER.forEach(function(r){ if (chosen.length + bs.length < 3 && test(r) && taken.indexOf(pair(r)) < 0) chosen.push(r); });
    chosen = chosen.concat(bs);
    return { gezeigt: chosen, weitere: hits.filter(function(r){ return chosen.indexOf(r) < 0; }) };
  };
})();
