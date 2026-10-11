// Textbausteine des individualisierten Berichts (Stand: berichtstexte-entwurf.md, zweite Fassung).
// Diese Datei ist die Quelle für den späteren Bericht-Generator; Änderungen am Entwurf hier nachziehen.
window.TEXTE = {
  einleitung: [
    'Dieser Bericht verbindet deine Ergebnisse aus {n} Tests. Jeder Test schaut aus einem eigenen Blickwinkel auf dich, und keiner kann erfassen, wer du als Ganzes bist. Lies die folgenden Seiten deshalb als Impulse: Manches wird dir vertraut vorkommen, anderes vielleicht fremd. Beides kann wertvoll sein.'
  ],
  zahlen: 'Ein Wert zwischen 0 und 100 zeigt, wie sehr du den Aussagen im Test zugestimmt hast. Er ist kein Vergleich mit anderen Menschen und keine Note.',
  uebersicht: { topStaerken: 'Deine Top-Stärken', deutlichst: 'Am deutlichsten', wenigsten: 'Am wenigsten ausgeprägt', facetten: 'Ausgeprägteste Facetten',
    seltener: 'Seltener genutzt', wb: 'Wohlbefinden', belastbarkeit: 'Belastbarkeit', wbStark: 'Am stärksten', fordert: 'Fordert dich am meisten',
    schwerpunkt: 'Dein Schwerpunkt', ausgewogen: 'Ohne klaren Schwerpunkt', stileTop: 'Stärkste Stile', muster: 'Deine Muster' },
  profil: 'Hier siehst du deine Werte in den fünf großen Bereichen der Persönlichkeitsforschung, aus deinem {quelle} vom {datum}.',
  netz: 'Je weiter ein Punkt nach außen reicht, desto mehr hast du den Aussagen dieses Bereichs zugestimmt. Der helle Ring markiert den mittleren Bereich zwischen 40 und 60.',

  kapitel: [
    { nr: 1, titel: 'Dein Profil auf einen Blick' },
    { nr: 2, titel: 'Deine Muster' },
    { nr: 3, titel: 'Energiequellen' },
    { nr: 4, titel: 'Wie es dir gerade geht' },
    { nr: 5, titel: 'Fühlen und Begegnen' },
    { nr: 6, titel: 'Nächste Schritte' }
  ],

  // Kapitel 1: je Bereich "Im Alltag", "Kraftquelle", "Stolperstein" und "Frage an dich".
  // Im Alltag gibt es für eher hoch/niedrig zwei Stufen: high/low ab 76 bzw. unter 25, highm/lowm für 61 bis 75 und 25 bis 39.
  bereiche: {
    O: { name: 'Offenheit',
      alltag: {
        high: 'Du verlierst dich gern in Gedanken, hast viele Ideen und nimmst dir Zeit, über Dinge nachzudenken. Abstrakte Fragen reizen dich eher, als dass sie dich abschrecken. Gespräche, Bücher oder Projekte, die dich geistig fordern, geben dir Energie.',
        mid: 'Neue Ideen interessieren dich, wenn du einen Bezug zu deinem Leben siehst. Du denkst gern nach, ohne dich in Theorien zu verlieren.',
        low: 'Du denkst lieber praktisch und konkret als abstrakt. Theorien und Gedankenspiele reizen dich weniger als Dinge, die sich im Alltag bewähren. Damit hast du oft einen klaren Blick dafür, was wirklich funktioniert.',
        highm: 'Neue Ideen und Gedanken ziehen dich eher an, als dass sie dich abschrecken. Wenn dich ein Thema packt, denkst du gern weiter, als der Alltag verlangt.',
        lowm: 'Du hältst dich gern an Bewährtes und Konkretes. Neues interessiert dich vor allem dann, wenn du siehst, wofür es gut ist.' },
      kraft: {
        high: 'Neugier und Fantasie helfen dir, Neues zu lernen, Zusammenhänge zu sehen und ungewöhnliche Lösungen zu finden.',
        mid: 'Du kannst dich auf Neues einlassen und trotzdem schätzen, was sich bewährt hat.',
        low: 'Bodenständigkeit und ein Sinn für das Machbare machen dich verlässlich, gerade bei praktischen Fragen.' },
      stolper: {
        high: 'Wenn zu viele Ideen gleichzeitig locken, bleibt manches unfertig, oder der Alltag fühlt sich schnell eintönig an.',
        mid: 'Manchmal bleibst du beim Vertrauten, obwohl dich etwas Neues reizen würde.',
        low: 'Ungewohnte Wege oder neue Methoden wirken womöglich mühsamer, als sie am Ende sind.' },
      frage: {
        high: 'Welche Idee oder Frage beschäftigt dich gerade, und wie könntest du ihr mehr Raum geben?',
        mid: 'Wann hast du zuletzt etwas Neues ausprobiert, und was hat es dir gebracht?',
        low: 'Gibt es ein Thema, in das du gern tiefer einsteigen würdest, wenn es ganz praktisch wäre?' } },
    C: { name: 'Gewissenhaftigkeit',
      alltag: {
        high: 'Vermutlich bist du gut vorbereitet, achtest auf Details und erledigst Aufgaben lieber gleich als später. Eine Liste, ein Plan oder ein aufgeräumter Tisch geben dir Ruhe. Wenn es chaotisch wird oder andere unzuverlässig sind, kann dich das mehr Kraft kosten.',
        mid: 'Bei Dingen, die dir wichtig sind, planst du und bleibst dran; anderes darf auch mal liegen bleiben. Dein Kalender oder Schreibtisch sieht je nach Phase vermutlich sehr unterschiedlich aus.',
        low: 'Feste Zeitpläne und strenge Ordnung engen dich eher ein. Du arbeitest gern dann, wenn die Motivation da ist, und findest spontan Lösungen. Dass Sachen herumliegen oder Aufgaben warten, stört dich weniger. Bei Zielen, die dir wichtig sind, hilft oft ein leichter äußerer Rahmen, zum Beispiel eine feste Uhrzeit oder eine Verabredung mit jemandem.',
        highm: 'Was dir wichtig ist, gehst du meist geplant an und bringst es zu Ende. Ein gewisses Maß an Ordnung gibt dir Ruhe, ohne dass alles perfekt sein muss.',
        lowm: 'Du lässt dir gern Spielraum und planst nur so viel wie nötig. Wenn die Motivation da ist, kommst du gut voran; Routinearbeit schiebst du eher auf.' },
      kraft: {
        high: 'Du bringst Dinge zu Ende, auf dich ist Verlass, und gute Vorbereitung verschafft dir Ruhe.',
        mid: 'Du kannst planen, wenn es darauf ankommt, und spontan bleiben, wenn es die Lage erlaubt.',
        low: 'Du bleibst beweglich, kannst improvisieren und lässt dich von Unvorhergesehenem kaum aus dem Konzept bringen.' },
      stolper: {
        high: 'Hohe Ansprüche können Druck erzeugen, und es fällt dir womöglich schwer, etwas als gut genug abzuschließen.',
        mid: 'Ohne äußeren Rahmen rutschen Vorhaben, die dir eigentlich wichtig sind, leicht nach hinten.',
        low: 'Fristen und Routineaufgaben können sich stauen, bis sie mehr Kraft kosten als nötig.' },
      frage: {
        high: 'Wo hilft dir dein Anspruch, und wo dürfte etwas auch einfach gut genug sein?',
        mid: 'Bei welchem Vorhaben würde dir etwas mehr Struktur guttun, und wo genießt du gerade die Freiheit?',
        low: 'Welches Vorhaben liegt dir am Herzen, und welcher kleine Rahmen würde dir helfen, es anzugehen?' } },
    E: { name: 'Extraversion',
      alltag: {
        high: 'Vermutlich bist du die Person, die in einer neuen Runde das Gespräch eröffnet, auf einer Feier mit vielen verschiedenen Leuten redet und gut damit leben kann, im Mittelpunkt zu stehen. Lange Phasen allein, etwa im Homeoffice oder an einem Wochenende ohne Verabredung, können sich für dich zäh anfühlen.',
        mid: 'Ob du in einer Runde das Wort ergreifst oder lieber zuhörst, hängt bei dir stark davon ab, wen du vor dir hast und wie dein Tag war. In vertrauter Gesellschaft gehst du leichter aus dir heraus als unter Fremden.',
        low: 'Unter Fremden bist du eher still, und in Gruppen hältst du dich lieber im Hintergrund, als die Aufmerksamkeit auf dich zu ziehen. Du redest, wenn du etwas zu sagen hast, und nicht, um eine Stille zu füllen. Gespräche zu zweit liegen dir vermutlich näher als große Runden.',
        highm: 'Gesellschaft tut dir meist gut, und in Runden findest du leicht ins Gespräch. Nach geselligen Tagen brauchst du trotzdem ab und zu Zeit für dich.',
        lowm: 'Du tankst gern allein auf und genießt Gesellschaft eher in kleiner, vertrauter Runde. In großen Gruppen hörst du oft erst einmal zu.' },
      kraft: {
        high: 'Du knüpfst leicht Kontakte, bringst Schwung in Gruppen und tankst im Austausch mit anderen auf.',
        mid: 'Du kannst auf Menschen zugehen und genauso gut Zeit mit dir allein genießen.',
        low: 'Du hörst aufmerksam zu, denkst nach, bevor du sprichst, und gehst in Gesprächen zu zweit oft in die Tiefe.' },
      stolper: {
        high: 'Ruhige Phasen können sich schnell leer anfühlen, und du übergehst vielleicht, wann du selbst eine Pause brauchst.',
        mid: 'Manchmal braucht es etwas Aufmerksamkeit, um zu merken, ob dir gerade nach Gesellschaft oder nach Ruhe ist.',
        low: 'In großen Runden gehen deine Gedanken leicht unter, und viel Trubel kostet dich spürbar Kraft.' },
      frage: {
        high: 'Welche Begegnungen haben dir zuletzt richtig gutgetan, und wie kannst du mehr davon einplanen?',
        mid: 'Wann fällt es dir leicht, aus dir herauszugehen, und wann ziehst du dich lieber zurück?',
        low: 'Wo erlebst du Austausch, der sich für dich stimmig anfühlt, und was macht ihn aus?' } },
    A: { name: 'Verträglichkeit',
      alltag: {
        high: 'Das zeigt sich zum Beispiel darin, dass du nachfragst, wenn jemand bedrückt wirkt, dir Zeit für andere nimmst und spürst, wie es den Menschen um dich herum geht. Andere fühlen sich in deiner Nähe oft wohl.',
        mid: 'Du kannst mitfühlen und dir Zeit für andere nehmen, behältst dabei aber deine eigenen Anliegen im Blick. Wie sehr dich die Sorgen anderer beschäftigen, hängt davon ab, wie nah dir jemand steht.',
        low: 'Du begegnest anderen eher sachlich als gefühlsbetont. Die Sorgen und Gefühle anderer nimmst du zur Kenntnis, lässt dich davon aber weniger leiten. In schwierigen Lagen kann dir das einen klaren Kopf bewahren; manche Menschen erleben dich dadurch vielleicht distanzierter, als du es meinst.',
        highm: 'Dir liegt daran, dass es den Menschen um dich herum gut geht, und du kommst den meisten freundlich entgegen. Wenn dir etwas wichtig ist, vertrittst du trotzdem deinen Standpunkt.',
        lowm: 'Du sagst eher, was du denkst, als dass du Konflikten ausweichst. Mitgefühl zeigst du vor allem Menschen, die dir nahestehen.' },
      kraft: {
        high: 'Mitgefühl und Hilfsbereitschaft schaffen Vertrauen, und Menschen öffnen sich dir gern.',
        mid: 'Du kannst einfühlsam sein und trotzdem für deine eigenen Anliegen einstehen.',
        low: 'Du kannst nüchtern abwägen, Klartext reden und auch unbequeme Entscheidungen treffen.' },
      stolper: {
        high: 'Es fällt dir womöglich schwer, Nein zu sagen oder einen Konflikt auszutragen, auch wenn es dir selbst guttäte.',
        mid: 'In Konflikten schwankst du vielleicht zwischen Nachgeben und Durchsetzen und brauchst Zeit, deinen Weg zu finden.',
        low: 'Wer gerade Trost statt Lösungen sucht, fühlt sich bei dir womöglich nicht ganz verstanden.' },
      frage: {
        high: 'Wer fragt eigentlich dich, wie es dir geht?',
        mid: 'Bei welchen Menschen fällt es dir leicht, dich einzufühlen, und wo fällt es dir schwerer?',
        low: 'Welchem Menschen würdest du gern zeigen, dass du ihn schätzt, und wie könnte das auf deine Art aussehen?' } },
    S: { name: 'Emotionale Stabilität', what: 'Wie gelassen du mit Stress, Sorgen und Stimmungsschwankungen umgehst.',
      alltag: {
        high: 'Auch an vollen Tagen bleibst du meist entspannt. Kritik oder kleine Pannen bringen dich selten lange aus der Ruhe, und deine Stimmung ist eher gleichmäßig. In hektischen Momenten suchen andere vielleicht gern deine Nähe.',
        mid: 'Meist bist du ausgeglichen, aber in vollen Phasen merkst du Stress, Sorgen oder Gereiztheit deutlich. Wie schnell du wieder zur Ruhe kommst, hängt viel davon ab, wie gut du dich gerade erholen kannst.',
        low: 'Sorgen, Ärger oder gedrückte Stimmung erlebst du deutlich, und deine Stimmung kann sich schnell ändern. Das kann anstrengend sein. Gleichzeitig merkst du dadurch oft früh, wenn dir etwas nicht guttut. Erholung, Bewegung und Menschen, bei denen du offen sein kannst, sind hier besonders wertvoll.',
        highm: 'Meist bleibst du auch unter Druck recht gelassen, und kleine Pannen werfen dich selten aus der Bahn. Wenn sich vieles häuft, merkst du die Anspannung, findest aber gut wieder heraus.',
        lowm: 'Sorgen oder Ärger beschäftigen dich spürbar, vor allem in vollen Phasen. Gleichzeitig merkst du dadurch oft früh, wenn dir etwas nicht guttut.' },
      kraft: {
        high: 'Gelassenheit hilft dir, in schwierigen Lagen einen klaren Kopf zu behalten, und gibt auch anderen Halt.',
        mid: 'Meist findest du nach Aufregung wieder in dein Gleichgewicht.',
        low: 'Du merkst früh, wenn dir etwas nicht guttut, und kannst Warnsignale ernst nehmen, bevor sie größer werden.' },
      stolper: {
        high: 'Weil du viel aushältst, merkst du vielleicht erst spät, wenn dir etwas über den Kopf wächst.',
        mid: 'Wenn sich kleine Ärgernisse häufen, kann die Stimmung kippen, bevor du es selbst bemerkst.',
        low: 'Sorgen und Selbstzweifel können viel Raum einnehmen und dir Energie für anderes nehmen.' },
      frage: {
        high: 'Woran merkst du trotzdem, dass dir etwas zu viel wird?',
        mid: 'Was bringt dich nach einem anstrengenden Tag am zuverlässigsten wieder ins Gleichgewicht?',
        low: 'Was hilft dir, wenn sich Gedanken oder Gefühle im Kreis drehen?' } }
  },

  facetten: {
    intro: 'Jeder der fünf Bereiche besteht aus sechs Facetten. Das Rad zeigt alle dreißig: Je weiter ein Balken nach außen reicht, desto mehr hast du den Aussagen dieser Facette zugestimmt.',
    deutlich: 'Im Bereich {bereich} unterscheiden sich deine Facetten deutlich.',
    staerkste: 'Am stärksten ausgeprägt:',
    schwaechste: 'Am wenigsten ausgeprägt:',
    mitte: 'ein mittlerer Wert.',
    genauer: 'Zwei Menschen mit demselben Gesamtwert können sich in einem Bereich ganz unterschiedlich anfühlen. Hier siehst du, wie sich deine Facetten innerhalb jedes Bereichs verteilen.',
    stabilitaet: 'Die Facetten in diesem Bereich beschreiben, was die Stabilität herausfordert: Je höher der Wert, desto deutlicher erlebst du es.',
    nah: 'Deine sechs Facetten liegen hier nah beieinander. Der Gesamtwert beschreibt dich in diesem Bereich also recht gleichmäßig.',
    ohne: 'Der ausführliche Persönlichkeitstest zeigt jeden dieser Bereiche in sechs Facetten. Wenn du ihn machst, wird dieses Kapitel genauer.'
  },

  muster: {
    intro: 'Hier treffen sich deine Ergebnisse, meist aus zwei verschiedenen Tests. Jedes Muster ist ein Angebot zum Nachdenken, kein Urteil. Nimm mit, was für dich stimmt.',
    weitere: 'Weitere Verbindungen in deinen Ergebnissen',
    keins: 'Zwischen deinen Tests zeigt sich keine der Verbindungen, nach denen dieser Bericht sucht. Das heißt nicht, dass es keine gibt: Oft entdeckt man die eigenen Muster am besten selbst. Leg die Kapitel nebeneinander und frag dich, wo du dich wiedererkennst und was dich überrascht.',
    frage: 'Welches dieser Muster erkennst du sofort wieder, und welches überrascht dich?'
  },

  staerken: {
    intro: 'Charakterstärken sind Seiten an dir, die dir Energie geben, wenn du sie lebst. Hier siehst du alle 24 als Rangliste, ganz oben deine fünf stärksten.',
    ideen: {
      ori: 'Löse eine Alltagsaufgabe bewusst auf eine neue Art.',
      val: 'Sprich eine Sache an, die du bisher aufgeschoben hast.',
      cap: 'Sag einem Menschen konkret, was er dir bedeutet.',
      equ: 'Frag dich bei einer Entscheidung, die andere betrifft: Wäre sie auch fair, wenn ich auf der anderen Seite stünde?',
      for: 'Denk an einen kleinen Groll und entscheide, ob du ihn noch tragen willst.',
      app: 'Halte jeden Tag einen schönen Moment fest, mit einem Foto oder einer Notiz.',
      cur: 'Probiere etwas aus, das du noch nie gemacht hast: ein neues Gericht, einen anderen Weg, ein unbekanntes Café.',
      ind: 'Wähle ein liegengebliebenes Vorhaben und arbeite 20 Minuten daran.',
      kin: 'Tu jemandem unerwartet etwas Gutes, ohne dass es jemand erfahren muss.',
      lea: 'Bring Menschen zusammen, die sonst nicht zusammenkommen, etwa zu einem Essen oder einem gemeinsamen Vorhaben.',
      mod: 'Würdige bei etwas, das gemeinsam gelungen ist, ausdrücklich den Beitrag der anderen.',
      gra: 'Schreib einem Menschen, dem du nie richtig gedankt hast, ein paar Zeilen, und lies sie ihm vor oder schick sie ab.',
      jud: 'Betrachte eine anstehende Entscheidung bewusst aus der Gegenposition.',
      int: 'Achte darauf, wo du „ja“ sagst, aber „nein“ meinst.',
      soc: 'Frag in einem Gespräch einmal nach, wie es deinem Gegenüber wirklich geht, und hör zu.',
      cit: 'Unterstütze deine Gruppe bei etwas, das nicht deine Aufgabe ist.',
      pru: 'Plane eine Sache vor, die dir sonst Stress macht.',
      hop: 'Schreib auf, wie dein Leben in einem Jahr im besten Fall aussieht, so konkret wie möglich.',
      lov: 'Nimm dir 15 Minuten am Tag für etwas, das du lernen willst.',
      zes: 'Bring Bewegung in deinen Tag, am besten draußen.',
      sel: 'Wähle eine kleine Gewohnheit und halte sie sieben Tage durch.',
      hum: 'Schreib eine Woche lang abends drei Dinge auf, über die du lachen konntest.',
      per: 'Frag dich bei einem Problem: Was wird in fünf Jahren daran wichtig sein?',
      spi: 'Nimm dir täglich ein paar Minuten Stille, etwa für eine Meditation oder einen Spaziergang.'
    },
    forschung: 'Studien aus der Positiven Psychologie deuten darauf hin, dass es vielen Menschen guttut, ihre ausgeprägtesten Stärken bewusst und auf neue Weise einzusetzen. Probiere eine Idee aus, die dich anspricht, und beobachte, wie es dir damit geht.',
    verbindet: { titel: 'Was deine Top-Stärken verbindet',
      eine: '{N} deiner fünf Top-Stärken gehören zur Gruppe {g}: {l}.',
      alle: 'Alle deine fünf Top-Stärken gehören zur Gruppe {g}: {l}.',
      zwei: 'Zwei Paare fallen auf: {l1}, {k1}, und {l2}, {k2}. Wo beide Seiten zusammenkommen, bist du vermutlich ganz in deinem Element.',
      dazu: 'Dazu kommen {l}, {k}.',
      breit: 'Deine fünf Top-Stärken stammen aus fünf verschiedenen Gruppen. Du schöpfst also aus ganz unterschiedlichen Quellen, je nachdem, was eine Situation braucht.' },
    gruppen: {
      'Weisheit': { name: 'Weisheit und Wissen', kurz: 'die deinen Kopf in Bewegung halten', text: 'Diese Stärken drehen sich ums Denken und Verstehen: Neues aufnehmen, Dinge abwägen, den Überblick behalten. Energie geben dir vermutlich Fragen und Aufgaben, die deinen Kopf in Bewegung bringen.' },
      'Mut': { name: 'Mut', kurz: 'mit denen du Dinge anpackst', text: 'Diese Stärken helfen dir, für etwas einzustehen, dranzubleiben und mit ganzer Kraft bei der Sache zu sein. Energie gibt dir vermutlich, etwas anzupacken und zu spüren, dass du vorankommst.' },
      'Menschlichkeit': { name: 'Menschlichkeit', kurz: 'die dich mit Menschen verbinden', text: 'Diese Stärken zeigen sich in Beziehungen: in Nähe, Zuwendung und einem feinen Gespür für andere. Energie gibt dir vermutlich echter Kontakt, in dem du für andere da sein kannst und sie für dich.' },
      'Gerechtigkeit': { name: 'Gerechtigkeit', kurz: 'die dich im Miteinander stark machen', text: 'Diese Stärken zeigen sich im Miteinander: in Fairness, Verantwortung und dem Blick für das Gemeinsame. Energie gibt dir vermutlich, in einer Gruppe etwas zu bewirken, das allen zugutekommt.' },
      'Mäßigung': { name: 'Mäßigung', kurz: 'die dir Maß und Ruhe geben', text: 'Diese Stärken schützen vor dem Zuviel: Besonnenheit, Selbststeuerung, Bescheidenheit und die Fähigkeit zu verzeihen. Energie gibt dir vermutlich, mit Ruhe und Bedacht zu handeln und dir selbst treu zu bleiben.' },
      'Transzendenz': { name: 'Transzendenz', kurz: 'die deinem Alltag Leichtigkeit und Tiefe geben', text: 'Diese Stärken richten deinen Blick über das Alltägliche hinaus: auf Schönes, auf Dankbarkeit, Hoffnung, Humor oder Sinn. Energie gibt dir vermutlich alles, was dich staunen, lachen oder zuversichtlich nach vorn schauen lässt.' }
    },
    seltener: 'Diese drei sind bei dir derzeit am wenigsten ausgeprägt. Das sind keine Schwächen, sondern Seiten, die du seltener einsetzt. Manchmal lohnt es sich, eine davon bewusst auszuprobieren, wenn eine Situation sie braucht.',
    frage: 'Wann hast du zuletzt erlebt, wie eine deiner Stärken dich getragen hat?'
  },

  jetzt: {
    intro: 'Wohlbefinden und Stress verändern sich mit den Lebensumständen. Dieses Kapitel beschreibt, wie es dir zum Zeitpunkt der Tests ging.',
    // [Wohlbefinden][Belastbarkeit]
    gesamt: {
      high: { low: 'Insgesamt geht es dir gut, doch unter Druck kommst du schneller an deine Grenzen. Pflege deine Kraftquellen gerade jetzt, dann sind sie da, wenn es voll wird.',
              mid: 'Es geht dir gut, und mit Druck kommst du meist zurecht. Achte darauf, was dich in vollen Phasen stabil hält, und gib ihm einen festen Platz.',
              high: 'Dir geht es gerade gut, und du fühlst dich Druck gewachsen. Eine gute Zeit, um Neues anzugehen oder anderen Halt zu geben.' },
      mid:  { low: 'Licht und Schatten wechseln sich ab, und Druck setzt dir spürbar zu. Ein Blick auf den niedrigsten Bereich zeigt, wo Entlastung am meisten bringt.',
              mid: 'Du erlebst gute und anstrengende Phasen, und keine überwiegt. Kleine Veränderungen an der richtigen Stelle können hier viel bewirken.',
              high: 'Druck steckst du gut weg, doch im Alltag fehlt vielleicht etwas Freude oder Energie. Schau, welcher Bereich des Wohlbefindens am niedrigsten ist.' },
      low:  { low: 'Gerade kommt einiges zusammen: Es geht dir eher nicht gut, und Druck setzt dir zu. Sei behutsam mit dir und hol dir Unterstützung, auch von Menschen um dich herum.',
              mid: 'Es geht dir im Moment eher nicht gut. Achte darauf, was dir früher Kraft gegeben hat, und gönn dir davon bewusst etwas.',
              high: 'Du bist belastbar, doch im Moment geht es dir nicht gut. Belastbar zu sein heißt nicht, alles allein tragen zu müssen.' }
    },
    waage: { plus: 'Deine Kraftquellen überwiegen gerade.', minus: 'Gerade wiegt die Belastung schwerer.', gleich: 'Belastung und Kraftquellen halten sich ungefähr die Waage.' },
    staerkt: 'Am stärksten sind bei dir gerade {a} und {b}. Darauf kannst du bauen.',
    staerktEins: 'Am stärksten ist bei dir gerade {a}. Darauf kannst du bauen.',
    staerktKeins: 'Gerade liegt keiner dieser Bereiche hoch. Umso wertvoller sind kleine Dinge, die dir guttun. Schau bei deinen Energiequellen, welche Stärken dir dabei helfen können.',
    schritte: {
      F: 'Plane diese Woche eine Sache ein, die dir früher Freude gemacht hat, auch wenn dir gerade nicht danach ist. Oft kommt die Freude erst beim Tun.',
      M: 'Sprich mit einem Menschen, dem du vertraust, darüber, wie es dir geht. Wenn die gedrückte Stimmung über Wochen bleibt, hol dir fachliche Unterstützung.',
      O: 'Setz dir für diese Woche ein kleines, konkretes Ziel, das du sicher erreichen kannst, und hak es sichtbar ab.',
      S: 'Schreib abends eine Sache auf, die dir heute gelungen ist, auch wenn sie klein war.',
      V: 'Fang bei den Grundlagen an: feste Schlafzeiten, Tageslicht am Vormittag und etwas Bewegung. Das Arbeitsblatt „Schlaftagebuch“ hilft dabei.',
      A: 'Atme ein paarmal langsam aus, länger als du einatmest, bevor du die nächste Aufgabe anfängst. Gedanken, die kreisen, darfst du auf einen Zettel auslagern.',
      R: 'Wenn du merkst, dass der Ärger steigt, gönn dir zehn Sekunden Abstand, bevor du antwortest.',
      U: 'Schreib alles auf, wähle eine einzige nächste Aufgabe und erledige nur diese.',
      SW: 'Teile eine große Aufgabe in Schritte, die du heute schaffen kannst, und erledige den ersten.'
    },
    keinSchritt: 'Gerade ist kein Bereich auffällig. Halte fest, was dir im Moment guttut, damit du in vollen Zeiten darauf zurückgreifen kannst.',
    hilfe: 'Deine Antworten deuten darauf hin, dass es dir im Moment eher schwer fällt. Das ist kein Befund, aber ein Grund, gut auf dich zu achten. Sprich mit Menschen, denen du vertraust, oder mit deiner Hausärztin oder deinem Hausarzt. Rund um die Uhr, anonym und kostenlos erreichst du die TelefonSeelsorge unter 0800 111 0 111 oder 0800 111 0 222.',
    frage: 'Was würde dir in den nächsten zwei Wochen am meisten guttun?'
  },

  fuehlen: {
    intro: 'Wie du mit Gefühlen umgehst und wie du anderen begegnest, hängt eng zusammen. Hier kommen beide Blickwinkel zusammen.',
    zeigen: {
      hh: 'Man sieht dir Freude und Schweres an. Das macht Nähe leicht, weil andere wissen, wie es dir geht. In aufgeladenen Momenten kann eine kurze Pause helfen, bevor du reagierst.',
      hl: 'Freude teilst du gern, Schweres eher nicht. Andere erleben dich vielleicht als stets gut gelaunt und ahnen nicht, wenn dich etwas belastet.',
      lh: 'Schweres zeigst du eher als Freude. Vielleicht lohnt es sich, auch kleine Freuden bewusst auszusprechen, damit andere sie mitbekommen.',
      ll: 'Du behältst deine Gefühle eher bei dir, ob leicht oder schwer. Wer dich gut kennt, liest dich trotzdem; anderen hilft manchmal ein ausgesprochenes Wort.',
      mid: 'Wie viel du von deinen Gefühlen zeigst, hängt bei dir von der Situation ab und davon, wie sicher du dich fühlst.'
    },
    stile: {
      PA: { text: 'Du bringst Präsenz in Begegnungen, gibst gern den Ton an und scheust dich nicht, gesehen zu werden. In Gruppen sorgst du für Richtung und Schwung.', einladung: 'Frag bewusst nach den Ideen der anderen, bevor du entscheidest.' },
      BC: { text: 'Du sprichst Dinge an, statt sie zu umschiffen, und hältst Widerspruch aus. Bei dir weiß man, woran man ist.', einladung: 'Wenn es hitzig wird, nimm dir einen Atemzug Abstand, damit deine Klarheit ankommt, ohne zu verletzen.' },
      DE: { text: 'Du bleibst sachlich, lässt dich nicht leicht vereinnahmen und behältst den Überblick, auch wenn es emotional wird.', einladung: 'Zeig den Menschen, die dir wichtig sind, ruhig auch mal, was sie dir bedeuten.' },
      FG: { text: 'Du schützt deinen inneren Raum und lässt Nähe in deinem eigenen Tempo wachsen. Wer dein Vertrauen gewinnt, erlebt dich oft als tiefgründig und verlässlich.', einladung: 'Lass ab und zu einen Menschen etwas früher näher kommen als gewohnt.' },
      HI: { text: 'Du hörst zu, lässt ausreden und brauchst keine Bühne. In deiner Nähe fühlen sich Menschen gehört.', einladung: 'Bring deine Sicht öfter ein, sie wird oft vermisst.' },
      JK: { text: 'Du begegnest anderen mit Geduld und Rücksicht und machst kein großes Aufheben um dich. Das schafft Vertrauen und Ruhe.', einladung: 'Nimm deine eigenen Wünsche genauso ernst wie die der anderen.' },
      LM: { text: 'Du begegnest anderen mit Wärme und echtem Interesse, fragst nach und machst Mut. Viele fühlen sich in deiner Nähe willkommen.', einladung: 'Schenk dir selbst dieselbe Zuwendung.' },
      NO: { text: 'Du gehst gern auf Menschen zu, fängst Gespräche an und bringst Leben in eine Runde.', einladung: 'Gönn dir neben allem Austausch auch einzelne, tiefe Gespräche und ruhige Momente für dich.' },
      AUS: { text: 'Dein Beziehungsstil hat keinen klaren Schwerpunkt. Du kannst je nach Situation führen oder folgen, Nähe suchen oder Abstand halten. Diese Beweglichkeit hilft dir im Umgang mit sehr unterschiedlichen Menschen.', einladung: '' }
    },
    frage: 'Wie würde ein Mensch, der dich gut kennt, deine Art beschreiben, anderen zu begegnen?'
  },

  schritte: {
    intro: 'Aus allen Ideen in diesem Bericht haben wir {n} ausgewählt, die besonders gut zu deinen Ergebnissen passen. Fang mit der an, die dich am meisten anspricht.',
    blaetter: {
      emotion: { name: 'Emotionstagebuch', text: 'Gefühle im Alltag bemerken, benennen und einordnen.' },
      schlaf: { name: 'Schlaftagebuch mit Abendroutine', text: 'Schlaf und Energie eine Woche lang beobachten.' },
      gute: { name: 'Drei gute Dinge', text: 'Jeden Abend drei Dinge notieren, die gut waren.' },
      traum: { name: 'Traumtagebuch', text: 'Träume festhalten und nach Bildern und Themen schauen.' }
    },
    begleiter: 'Dein 7-Tage-Begleiter: Kreuze an, an welchen Tagen du es ausprobiert hast.',
    notizen: 'Platz für deine Gedanken'
  },

  schluss: 'Dieser Bericht ist eine Momentaufnahme. Menschen verändern sich, und manche Ergebnisse sehen in einem halben Jahr anders aus. Wenn du magst, wiederhole die Tests später und schau, was sich bewegt hat. Und vor allem: Vertraue dem, was du über dich selbst weißt, auch dort, wo es über diese Seiten hinausgeht.',
  hinweis: [
    'Die Tests beruhen auf frei verfügbaren Fragebögen aus der psychologischen Forschung (International Personality Item Pool, ipip.ori.org). Die deutschen Fassungen sind eigene Übersetzungen. Die Ergebnisse beschreiben, wie du dich zum Zeitpunkt des Tests selbst eingeschätzt hast. Sie sind keine Diagnose und ersetzen keine Beratung oder Behandlung.',
    'Deine Antworten wurden in deinem Browser ausgewertet und dort gespeichert. An uns wurden sie nicht übertragen.',
    'Wenn es dir über längere Zeit nicht gut geht, sprich mit Menschen, denen du vertraust, mit deiner Hausärztin oder deinem Hausarzt oder mit einer Psychotherapeutin oder einem Psychotherapeuten. Rund um die Uhr, anonym und kostenlos erreichst du die TelefonSeelsorge unter 0800 111 0 111 oder 0800 111 0 222. In akuten Notfällen wähle 112.'
  ]
};
