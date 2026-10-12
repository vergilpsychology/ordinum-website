// Textbausteine des individualisierten Berichts (Stand: berichtstexte-entwurf.md, zweite Fassung).
// Diese Datei ist die Quelle für den späteren Bericht-Generator; Änderungen am Entwurf hier nachziehen.
window.TEXTE = {
  einleitung: [
    'Dieser Bericht verbindet deine Ergebnisse aus {n} Tests. Jeder Test schaut aus einem eigenen Blickwinkel auf dich, und keiner kann erfassen, wer du als Ganzes bist. Lies die folgenden Seiten deshalb als Impulse: Manches wird dir vertraut vorkommen, anderes vielleicht fremd. Beides kann wertvoll sein.'
  ],
  zahlen: 'Ein Wert zwischen 0 und 100 zeigt, wie sehr du den Aussagen im Test zugestimmt hast. Er ist kein Vergleich mit anderen Menschen und keine Note.',
  uebersicht: { topStaerken: 'Deine Top-Stärken', deutlichst: 'Am deutlichsten', wenigsten: 'Am wenigsten ausgeprägt', facetten: 'Ausgeprägteste Facetten',
    seltener: 'Am wenigsten ausgeprägt', wb: 'Wohlbefinden', belastbarkeit: 'Belastbarkeit', wbStark: 'Am stärksten', fordert: 'Fordert dich am meisten',
    schwerpunkt: 'Dein Schwerpunkt', ausgewogen: 'Ohne klaren Schwerpunkt', stileTop: 'Stärkste Stile', muster: 'Deine Muster',
    wichtig: 'Am wichtigsten', rhythmus: 'Tagesrhythmus', chronotyp: 'Dein Chronotyp', hoch: 'Leistungshoch', jetlag: 'Sozialer Jetlag' },
  profil: 'Hier siehst du deine Werte in den fünf großen Bereichen der Persönlichkeitsforschung, aus deinem {quelle} vom {datum}.',
  netz: 'Je weiter ein Punkt nach außen reicht, desto mehr hast du den Aussagen dieses Bereichs zugestimmt. Der helle Ring markiert den mittleren Bereich zwischen 40 und 60. Sehr hohe oder sehr niedrige Werte heißen, dass du dich in den Aussagen sehr deutlich wiedererkannt hast oder eben nicht.',

  kapitel: [
    { nr: 1, titel: 'Dein Profil auf einen Blick' },
    { nr: 2, titel: 'Deine Muster' },
    { nr: 3, titel: 'Energiequellen' },
    { nr: 4, titel: 'Wie es dir gerade geht' },
    { nr: 5, titel: 'Fühlen und Begegnen' },
    { nr: 6, titel: 'Nächste Schritte' },
    { nr: 7, titel: 'Was dir wichtig ist' },
    { nr: 8, titel: 'Dein Tagesrhythmus' },
    { nr: 9, titel: 'Licht und Schatten' }
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
    frage: 'Welches dieser Muster erkennst du sofort wieder, und welches überrascht dich?',
    spannung: 'Wo es in dir zieht',
    spannungIntro: 'Manche Ergebnisse ziehen in verschiedene Richtungen. Solche Spannungen sind keine Fehler. Oft liegt gerade dort eine Entwicklungsaufgabe: die Frage, wie beide Seiten zu ihrem Recht kommen.'
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
    seltener: 'Diese drei sind bei dir derzeit am wenigsten ausgeprägt. Sie sind kein Mangel, aber auch nicht bedeutungslos: Manchmal fehlt eine Stärke genau dort, wo eine Situation sie bräuchte. Es lohnt sich, ehrlich hinzuschauen, wo das bei dir der Fall ist.',
    blick: 'Ein zweiter Blick',
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
    achsen: 'Der Kreis hat zwei Achsen: Senkrecht geht es darum, wie sehr du im Kontakt Einfluss nimmst oder anderen Raum lässt, waagrecht darum, wie viel Nähe oder Abstand du suchst. Der Punkt zeigt, wohin deine Antworten insgesamt weisen.',
    frage: 'Wie würde ein Mensch, der dich gut kennt, deine Art beschreiben, anderen zu begegnen?'
  },

  // Werte: Schwerpunkt, Einzeltexte und Namen kommen aus der Testseite (QUELLE.werte)
  werte: {
    intro: 'Werte beschreiben, was dir im Leben wichtig ist. Sie sind Orientierungspunkte: Sie zeigen, wofür du gern Zeit und Kraft aufbringst und was dich zufrieden macht, wenn du danach lebst.',
    kreis: 'Je weiter ein Feld nach außen reicht, desto wichtiger ist dir dieser Wert. Werte, die im Kreis nebeneinander liegen, gehen oft gut zusammen; gegenüberliegende stehen eher in Spannung.',
    schwerpunkt: 'Dein Schwerpunkt',
    staerke: ['ausgewogen', 'leicht ausgeprägt', 'deutlich ausgeprägt', 'stark ausgeprägt'],
    wichtigste: 'Was dir am wichtigsten ist',
    hinten: 'Weniger im Vordergrund',
    hintenText: '{w} steht bei dir eher hinten. {t}',
    mitStaerken: 'Werte und Stärken',
    // Welche Charakterstärken einem Wert besonders dienen können
    passt: { SD:['ori','cur','jud','val'], ST:['cur','val','zes','lov'], HE:['zes','hum','app','gra'], AC:['ind','lov','per','zes'], PO:['lea','val','soc'],
      SE:['pru','sel','ind'], CO:['pru','mod','sel','cit'], TR:['mod','gra','spi'], BE:['kin','cap','for','int'], UN:['equ','app','per','spi','kin'] },
    wofuer: { SD:'eigene Wege zu finden und zu gehen', ST:'Neues zu entdecken und dich darauf einzulassen', HE:'Freude zu erleben und schöne Momente wahrzunehmen',
      AC:'Ziele zu verfolgen und gut in dem zu werden, was du tust', PO:'mitzugestalten und Dinge in Bewegung zu bringen', SE:'Halt und Verlässlichkeit in dein Leben zu bringen',
      CO:'achtsam mit anderen umzugehen und Absprachen zu tragen', TR:'das zu pflegen, was dich geprägt hat', BE:'für die Menschen da zu sein, die dir nahestehen',
      UN:'deinen Blick über dein eigenes Umfeld hinaus zu richten' },
    passtEins: 'Zu {w} passt unter deinen Top-Stärken besonders {s}. Diese Stärke hilft dir, {f}.',
    passtMehr: 'Zu {w} passen unter deinen Top-Stärken besonders {s}. Diese Stärken helfen dir, {f}.',
    nochEins: 'Auch {w} findet Rückhalt in deinen Stärken, vor allem in {s}. Diese Stärke kann dir helfen, {f}.',
    nochMehr: 'Auch {w} findet Rückhalt in deinen Stärken, vor allem in {s}. Sie können dir helfen, {f}.',
    passtKeins: 'Unter deinen Top-Stärken ist keine, die direkt zu {w} gehört. Das ist kein Widerspruch: Was dir wichtig ist und was dir leichtfällt, muss nicht dasselbe sein. Vielleicht lohnt sich die Frage, wie dir {s} helfen kann, {w} mehr Raum zu geben.',
    frage: 'Wann hast du zuletzt ganz nach dem gelebt, was dir wichtig ist? Was war in diesem Moment anders?',
    quelle: 'Der Werte-Test ist ein eigener Fragebogen von Ordinum auf Grundlage der Theorie der zehn Grundwerte nach Shalom H. Schwartz. Er ist noch nicht wissenschaftlich überprüft.'
  },

  // Chronotyp: Typ-, Tages- und Jetlag-Texte kommen aus der Testseite (QUELLE.chrono)
  rhythmus: {
    intro: 'Dein Chronotyp beschreibt, wann deine innere Uhr dich wach und wann sie dich müde werden lässt. Er ist zu einem guten Teil biologisch angelegt, verändert sich im Lauf des Lebens und ist keine Frage von Disziplin.',
    hoch: 'Dein Leistungshoch: etwa {a} bis {b} Uhr',
    kurve: 'Grobe Orientierung: So verläuft die Wachheit über den Tag bei deinem Chronotyp. Die Kurve ist keine Messung.',
    tag: 'Dein Tag',
    abend: 'Abend und Schlaf',
    jetlag: 'Sozialer Jetlag',
    frage: 'Zu welcher Tageszeit fühlst du dich am meisten wie du selbst? Wie viel davon hat gerade Platz in deinem Alltag?',
    quelle: 'Der Chronotyp-Test ist ein eigener Fragebogen von Ordinum und als Orientierung gedacht. Er ist noch nicht wissenschaftlich überprüft.'
  },

  schritte: {
    intro: 'Aus allen Ideen in diesem Bericht haben wir {n} ausgewählt, die besonders gut zu deinen Ergebnissen passen. Fang mit der an, die dich am meisten anspricht.',
    blaetter: {
      emotion: { name: 'Emotionstagebuch', text: 'Gefühle im Alltag bemerken, benennen und einordnen.' },
      schlaf: { name: 'Schlaftagebuch mit Abendroutine', text: 'Schlaf und Energie eine Woche lang beobachten.' },
      gute: { name: 'Drei gute Dinge', text: 'Jeden Abend drei Dinge notieren, die gut waren.' },
      traum: { name: 'Traumtagebuch', text: 'Träume festhalten und nach Bildern und Themen schauen.' }
    },
    rueckblick: 'Rückblick nach einer Woche',
    rueckblickFrage: 'Wann hat sich einer dieser Schritte in den letzten Tagen besonders stimmig oder besonders schwer angefühlt? Was sagt dir das?',
    notizen: 'Platz für deine Gedanken'
  },

  // Kapitel Licht und Schatten: Kehrseiten der Stärken, was leiser ist, Spannungsfelder
  schatten: {
    intro: 'Jede Stärke hat eine Kehrseite, und was bei dir leiser ist, hat oft auch einen Nutzen. Dieses Kapitel schaut auf beides: wo deine Stärken zu viel werden können, was bei dir weniger ausgeprägt ist und wo sich Ergebnisse beißen. Es geht nicht um Fehler, sondern um einen ehrlicheren Blick.',
    zuViel: 'Wenn Stärken zu viel werden',
    zuVielIntro: 'Was dich trägt, kann in manchen Situationen auch im Weg stehen. Meist dann, wenn eine Stärke zur Gewohnheit wird und nicht mehr gefragt wird, ob sie gerade passt.',
    kehrseite: 'Kehrseite',
    leiser: 'Was bei dir leiser ist',
    leiserIntro: 'Deine am niedrigsten ausgeprägten Seiten zeigen, wo deine natürlichen blinden Flecken liegen können. Es geht nicht darum, sie zu reparieren, sondern zu wissen, wo sie dir im Alltag in die Quere kommen.',
    staerkeLabel: 'Charakterstärke',
    facetteLabel: 'Facette',
    frage: 'Welche dieser Kehrseiten kennst du am besten, und woran merkst du, dass sie sich gerade zeigt?',
    // Wenn eine Charakterstärke zu viel wird (für die drei stärksten)
    viel: {
      ori: 'Kann zu viel werden, wenn alles neu erfunden werden muss und Bewährtes keine Chance bekommt. Dann bleiben Dinge im Entwurf, statt fertig zu werden.',
      val: 'Kann in Leichtsinn kippen oder in Kämpfe, die gar nicht deine sind. Nicht jede Unstimmigkeit braucht deinen Einsatz.',
      cap: 'Kann bedeuten, dass du dich in Beziehungen verlierst und Nähe wichtiger wird als deine eigenen Grenzen.',
      equ: 'Kann starr werden, wenn Regeln wichtiger werden als der Mensch vor dir. Manchmal braucht eine Situation Nachsicht statt Gleichbehandlung.',
      for: 'Kann dazu führen, dass du zu schnell verzeihst und keine Grenze ziehst, wo eine nötig wäre.',
      app: 'Kann in hohe Ansprüche umschlagen: Wenn das Unvollkommene stört, wirkt der gewöhnliche Alltag schnell zu wenig.',
      cur: 'Kann zerstreuen: Immer neue Fragen lassen wenig Zeit, bei einer zu bleiben. Manchmal wird Neugier auch zum Ausweg vor dem, was gerade langweilig, aber wichtig ist.',
      ind: 'Kann zu Sturheit werden: Du bleibst an Dingen dran, die du längst loslassen dürftest.',
      kin: 'Kann dich erschöpfen, wenn du mehr gibst, als du hast, oder hilfst, wo niemand darum gebeten hat.',
      lea: 'Kann anderen den Raum nehmen, selbst Verantwortung zu übernehmen. Wer immer vorangeht, merkt nicht immer, wer zurückbleibt.',
      mod: 'Kann dich unsichtbar machen: Was du leistest, bleibt ungesehen, manchmal sogar von dir selbst.',
      gra: 'Kann dazu führen, dass du dich mit zu wenig zufriedengibst oder berechtigte Wünsche kleinredest.',
      jud: 'Kann in endloses Abwägen münden: Wer alles von allen Seiten prüft, entscheidet manchmal zu spät oder gar nicht.',
      int: 'Kann verletzen, wenn eine Wahrheit ohne Gespür für den Moment ausgesprochen wird. Nicht alles, was stimmt, muss jetzt gesagt werden.',
      soc: 'Kann dazu führen, dass du dich ständig nach anderen ausrichtest und Stimmungen auffängst, die nicht deine Aufgabe sind.',
      cit: 'Kann bedeuten, dass du dich der Gruppe anpasst, auch wenn du eigentlich anderer Meinung bist.',
      pru: 'Kann bremsen: Wer jedes Risiko vermeiden will, lässt auch manche Gelegenheit vorbeiziehen.',
      hop: 'Kann den Blick für Warnzeichen trüben. Wer fest mit einem guten Ausgang rechnet, plant manchmal zu wenig für den anderen Fall.',
      lov: 'Kann zum Aufschieben werden: noch ein Kurs, noch ein Buch, bevor du anfängst. Wissen ersetzt nicht das Tun.',
      zes: 'Kann dich auslaugen, wenn du keine Pausen einplanst, und andere überrollen, die ein anderes Tempo brauchen.',
      sel: 'Kann starr werden: Wer sich ständig im Griff hat, erlaubt sich wenig Spontaneität und Genuss.',
      hum: 'Kann zum Ausweichen werden: Ein Witz lockert vieles, aber manches braucht Ernst, auch dir selbst gegenüber.',
      per: 'Kann abgehoben wirken, wenn der Blick aufs Große die kleinen, konkreten Sorgen anderer übersieht. Auch ein guter Rat ist nicht immer gefragt.',
      spi: 'Kann dazu verleiten, Schweres schnell mit Sinn zu überdecken, statt es erst einmal schwer sein zu lassen.'
    },
    // Wenn eine Charakterstärke leise ist (für die drei am seltensten genutzten)
    wenig: {
      ori: 'Neues zu erfinden, ist gerade nicht deine erste Wahl. Das macht dich verlässlich im Bewährten. Es kann aber bedeuten, dass du eigene Lösungen gar nicht erst ausprobierst.',
      val: 'Für etwas einzustehen, auch gegen Widerstand, liegt dir derzeit weniger. Das erspart dir Konflikte. Manchmal bleibt dabei aber etwas ungesagt, das dir wichtig wäre.',
      cap: 'Nähe zu geben und anzunehmen, setzt du derzeit selten ein. Das sagt nichts darüber, wie viel dir Menschen bedeuten. Es kann aber heißen, dass Nähe für dich mit Vorsicht verbunden ist und du dich weniger verbunden fühlst, als du es dir wünschst.',
      equ: 'Gleichbehandlung steht bei dir nicht im Vordergrund. Du entscheidest eher nach Lage und Sympathie. Das kann beweglich sein, andere erleben es aber vielleicht als ungerecht.',
      for: 'Verzeihen fällt dir nicht leicht. Das kann deine Grenzen schützen. Alter Ärger bindet aber auch Kraft, und oft trägt ihn am Ende vor allem der, der ihn festhält.',
      app: 'Schönheit im Alltag fällt dir derzeit selten auf. Vielleicht ist gerade wenig Raum dafür. Damit fehlt aber auch eine leise Quelle von Erholung.',
      cur: 'Neugier treibt dich derzeit wenig an. Das gibt dir Fokus. Es kann aber auch heißen, dass Neues an dir vorbeizieht, das dich bereichern würde.',
      ind: 'Dranbleiben, wenn es zäh wird, fällt dir schwerer. Du merkst früh, wenn etwas nicht mehr passt. Manches Ziel bleibt dadurch aber kurz vor dem Ende liegen.',
      kin: 'Anderen Gutes zu tun, steht bei dir gerade nicht im Vordergrund. Vielleicht brauchst du deine Kraft im Moment für dich. Andere könnten dich aber distanzierter erleben, als du bist.',
      lea: 'Gruppen zu lenken, ist nicht deine Rolle. So lässt du anderen Raum. Manchmal wartest du aber vielleicht, bis jemand anders entscheidet, obwohl du eine klare Meinung hast.',
      mod: 'Bescheidenheit setzt du selten ein. Du zeigst, was du kannst, und das ist erst einmal gut. Achte darauf, dass daneben Raum für die Beiträge anderer bleibt.',
      gra: 'Dankbarkeit bemerkst du derzeit selten. Vielleicht ist gerade viel schwer. Wer das Gute kaum sieht, dem fehlt aber leicht ein Gegengewicht zu dem, was belastet.',
      jud: 'Gründliches Abwägen ist nicht deine erste Wahl. Du entscheidest schnell und aus dem Moment. Bei folgenreichen Fragen kann ein zweiter Blick vor Fehlern bewahren.',
      int: 'Wort halten und den eigenen Werten treu bleiben, ist bei dir derzeit wenig ausgeprägt. Manchmal gibt man dann den Erwartungen anderer nach, auch wenn man selbst etwas anderes für richtig hält.',
      soc: 'Stimmungen anderer zu lesen, fällt dir nicht leicht. Du nimmst Menschen eher beim Wort. Das ist ehrlich, aber Ungesagtes entgeht dir dabei leichter.',
      cit: 'Im Team zu arbeiten, ist nicht deine liebste Form. Du gehst lieber eigene Wege. Das schafft Unabhängigkeit, manchmal aber auch Abstand zu Menschen, die mit dir an einem Strang ziehen wollen.',
      pru: 'Vorsicht und Bedacht setzt du selten ein. Das macht dich spontan und offen für Gelegenheiten. Warnsignale werden dabei aber leichter überhört.',
      hop: 'Zuversicht trägt dich derzeit wenig. Du rechnest eher mit Schwierigkeiten, und das kann dich gut vorbereiten. Es kann dir aber auch die Kraft nehmen, Neues anzufangen.',
      lov: 'Gezielt Neues zu lernen, reizt dich derzeit wenig. Du verlässt dich auf das, was du kannst. Das spart Energie, kann dich aber auch auf der Stelle treten lassen.',
      zes: 'Tatendrang ist bei dir gerade leise. Vielleicht brauchst du Ruhe, vielleicht fehlt etwas, das dich wirklich begeistert. Beides lohnt einen ehrlichen Blick.',
      sel: 'Selbstregulation setzt du selten ein. Stimmungen und Impulse bekommen bei dir schnell Raum. Das wirkt echt und lebendig, kann dich aber von deinen eigenen Vorsätzen entfernen.',
      hum: 'Humor setzt du selten ein. Du nimmst die Dinge ernst, und das verdient Respekt. In schweren Momenten kann ein wenig Leichtigkeit aber Abstand schaffen.',
      per: 'Das große Ganze im Blick zu behalten, ist nicht deine stärkste Seite. Du bist eher im Konkreten zuhause. Dabei kann aus dem Blick geraten, wozu etwas eigentlich dient.',
      spi: 'Spiritualität spielt für dich derzeit keine große Rolle. Sinn findest du vermutlich eher im Konkreten. Die Frage, was dich über den Alltag hinaus trägt, kann trotzdem lohnen.'
    },
    // Niedrige Facetten (nur ausführlicher Persönlichkeitstest, ohne emotionale Stabilität)
    facette: {
      O1: 'Du bleibst lieber bei den Tatsachen. Das macht dich klar und bodenständig. Es kann aber schwerfallen, dir Dinge vorzustellen, die es noch nicht gibt.',
      O2: 'Kunst und Schönheit sprechen dich wenig an. Dir entgeht dadurch vielleicht eine Quelle von Erholung und Berührung.',
      O3: 'Deine Gefühle stehen bei dir nicht im Vordergrund. Das hält dich stabil. Es kann aber dazu führen, dass du erst spät merkst, was in dir vorgeht.',
      O4: 'Vertrautes ist dir lieber als Neues. Das gibt dir Sicherheit. Es kann aber bedeuten, dass dein Leben enger wird, als es sein müsste.',
      O5: 'Abstrakte Gedankenspiele reizen dich wenig. Du gehst die Dinge praktisch an. Manchmal fehlt dadurch aber die Geduld für Fragen, die keine schnelle Antwort haben.',
      O6: 'Du hältst an Bewährtem und an Regeln fest. Das gibt Orientierung. Es kann aber schwerfallen, Sichtweisen gelten zu lassen, die deinen widersprechen.',
      C1: 'Du traust dir weniger zu, als du vielleicht kannst. Das macht vorsichtig, kann aber Chancen verhindern, bevor du sie überhaupt prüfst.',
      C2: 'Ordnung und Systeme sind dir nicht wichtig. Das macht dich beweglich. Im Alltag kann es aber Kraft kosten, Dinge zu suchen und den Überblick zu behalten.',
      C3: 'Regeln und Verpflichtungen nimmst du eher locker. Das gibt dir Freiheit. Andere verlassen sich aber vielleicht auf Zusagen, die für dich weniger Gewicht haben.',
      C4: 'Ehrgeiz treibt dich wenig. Das schützt vor Druck. Es kann aber bedeuten, dass du unter deinen Möglichkeiten bleibst, gerade dort, wo dir etwas wirklich wichtig wäre.',
      C5: 'Dich zu etwas zu zwingen, liegt dir nicht. Was keinen Spaß macht, bleibt eher liegen, und das kann sich irgendwann stapeln.',
      C6: 'Du entscheidest schnell und aus dem Bauch. Das macht dich spontan. Manche Entscheidung hättest du im Nachhinein aber lieber länger bedacht.',
      E1: 'Du zeigst Zuneigung eher zurückhaltend. Wer dich kennt, weiß, was du meinst. Andere könnten dich aber kühler erleben, als du bist.',
      E2: 'Große Runden meidest du eher. Du brauchst sie nicht. Es kann aber sein, dass dir dadurch Begegnungen fehlen, die dir gutgetan hätten.',
      E3: 'Mit deiner Meinung hältst du dich eher zurück. Das schafft Raum für andere. Es kann aber bedeuten, dass deine Sicht in Entscheidungen zu kurz kommt.',
      E4: 'Du lässt es lieber ruhig angehen. Das schützt vor Hektik. Manchmal bleiben aber Dinge liegen, die mit etwas mehr Schwung leichter gingen.',
      E5: 'Aufregung und Nervenkitzel suchst du nicht. Das macht dich besonnen. Es kann aber sein, dass dein Alltag weniger Farbe hat, als du dir eigentlich wünschst.',
      E6: 'Überschwängliche Freude zeigst du selten. Vielleicht ist deine Freude eher still. Es lohnt sich aber zu prüfen, ob gerade genug da ist, das dich freut.',
      A1: 'Du schenkst Vertrauen nicht leicht. Das schützt dich vor Enttäuschungen. Es kann aber auch Nähe verhindern, die dir guttun würde.',
      A2: 'Du weißt, wie man andere für sich gewinnt, und setzt das auch gezielt ein. Das kann wirksam sein. Andere spüren aber oft, wenn etwas nicht ganz offen ist.',
      A3: 'Du hilfst nicht ohne Weiteres. Deine Kraft bleibt bei dir. Andere könnten das aber als Desinteresse missverstehen.',
      A4: 'Konflikten gehst du nicht aus dem Weg. Das macht dich klar. Es kann Beziehungen aber belasten, wenn jeder Streit ausgetragen werden muss.',
      A5: 'Du stehst offen zu dem, was du kannst. Das ist erst einmal gesund. Andere können es aber als Überlegenheit erleben.',
      A6: 'Das Leid anderer bewegt dich wenig. Das schützt dich vor Überforderung. Es kann aber Abstand zu Menschen schaffen, die gerade Zuwendung bräuchten.'
    }
  },

  autor: 'Konzept und Texte: Jannik Wessling, M.Sc. Psychologie',
  schluss: 'Dieser Bericht ist eine Momentaufnahme. Menschen verändern sich, und manche Ergebnisse sehen in einem halben Jahr anders aus. Wenn du magst, wiederhole die Tests später und schau, was sich bewegt hat. Und vor allem: Vertraue dem, was du über dich selbst weißt, auch dort, wo es über diese Seiten hinausgeht.',
  // Nur wenn Werte oder Chronotyp eingeflossen sind, nach dem ersten Absatz
  hinweisEigen: {
    werte: 'Der Werte-Test ist ein eigener Fragebogen von Ordinum, noch nicht wissenschaftlich überprüft und als Orientierung gedacht.',
    chrono: 'Der Chronotyp-Test ist ein eigener Fragebogen von Ordinum, noch nicht wissenschaftlich überprüft und als Orientierung gedacht.',
    beide: 'Der Werte-Test und der Chronotyp-Test sind eigene Fragebögen von Ordinum, noch nicht wissenschaftlich überprüft und als Orientierung gedacht.'
  },
  einordnung: 'Ein Wort zur Einordnung',
  hinweis: [
    'Die Tests beruhen auf frei verfügbaren Fragebögen aus der psychologischen Forschung (International Personality Item Pool, ipip.ori.org). Die deutschen Fassungen sind eigene Übersetzungen. Die Ergebnisse beschreiben, wie du dich zum Zeitpunkt des Tests selbst eingeschätzt hast. Sie sind keine Diagnose und ersetzen keine Beratung oder Behandlung.',
    'Deine Antworten wurden in deinem Browser ausgewertet und dort gespeichert. An uns wurden sie nicht übertragen.',
    'Wenn es dir über längere Zeit nicht gut geht, sprich mit Menschen, denen du vertraust, mit deiner Hausärztin oder deinem Hausarzt oder mit einer Psychotherapeutin oder einem Psychotherapeuten. Rund um die Uhr, anonym und kostenlos erreichst du die TelefonSeelsorge unter 0800 111 0 111 oder 0800 111 0 222. In akuten Notfällen wähle 112.'
  ]
};
