
const facts = [
  // fact````,

  fact`Quellcode|Chatbot|Programmierung``Den Code zu diesem Chat-Bot findest du unter https://github.com/voltbonn/chat.volt.link`,
  fact`Chatbot|Programmierung``Dieser Volt-Chat-Bot wurde mit Node.js und OpenAI ChatGPT geschrieben.`,
  fact`Chatbot|Programmierung|Erfinder``Der Chat-Bot wurde von Thomas Rosen für Volt Europa entwickelt.`,

  fact````,

  fact`Name|Abkürzung``Volt Europa, Volt Deutschland, Volt Potsdam usw. werden Volt abgekürzt.`,
  fact`Name|Abkürzung``Volt selber ist keine Abkürzung, der Name steht für die neuen Spannung, die Volt in die Politik bringt. Die einzelnen Buchstaben stehen nicht für einzelne Worte.`,
  fact`Abkürzung``MG steht für Meet&Greet.`,
  fact`Europa|Personen``Der Italiener Andrea Venzon, die Französin Colombe Cahen-Salvador und der Deutsche Damian Boeselager gründeten Volt Europa am 29. März 2017.`,
  fact`Statistiken|Deutschland``In Deutschland wurde Volt als Partei am 3. März 2018 registriert.`,
  fact`Always|Policy``Volt ist eine europaweite Partei und Bewegung.`,
  fact`Europa|Personen|Abgeordnete|Prozent``Seit 2019 ist Damian Boeselager für Volt Europa angetreten. In Deutschland hat er für Volt 0.7% erreicht. Seit dem sitzt er mit Volt in der Fraktion der Grünen im EU-Parlament.`,
  fact`Mitmachen``Unter https://www.voltdeutschland.org/mitmachen kannst du dich bei Volt anmelden und mitmachen.`,

  fact`Statistiken|Europa|Länder``Volt existiert in Albania, Austria, Belgium, Bulgaria, Switzerland, Cyprus, Česká republika, Germany, Danmark, Estonia, España, France, Greece, Croatia, Hungary, Ireland, Italia, Lithuania, Luxembourg, Latvia, Malta, Nederland, Poland, Portugal, Romania, Slovenia, Slovensko, Suomi, Sverige, Ukraine, UK (England, Schottland, Wales, Nord-Irland).`,
  fact`Statistiken|Europa|Personen|Abgeordnete``Volt hat über 100 gewählte Vertreter*innen in Europa. Darunter einen gewählten Vertreter im Europäischen Parlament.`,
  fact`Brandenburg|Spenden``Unter https://www.voltbrandenburg.org/spenden kann man an Volt Brandenburg spenden.`,
  fact`Deutschland|Shop``T-Shirts, Sweatshirts, Flaggen und vieles mehr gibt es unter https://merch.voltdeutschland.org/ (der Volt DE Shop)`,

  fact`Deutschland|Vorsitz|Personen``Der Bundesvorstand von Volt Deutschland besteht aus Rebekka Müller (Vorsitzende), Tim Marton (Vorsitzender), Leo Lüddecke (Schatzmeister), Carina Beckmann (Stv), Martin Finck (Stv), Jennifer Scharpenberg (Stv) und Jens Többen (Stv).`,
  fact`Europa|Vorsitz|Personen``Volt Europa is lead by the Co-Presidents Francesca Romana D'Antuono and Reinier Van Lanschot.`,

  fact`Europa``Volt liebt Europa, aber möchte die EU reformieren.`,
  fact`Brandenburg|Landesvorsitz|Personen``Evelyn Steffens und Benjamin Körner sind Landesvorsitzende von Volt Brandenburg. Stellvertreten von Annika Robohm und Guido Richter.`,
  fact`Potsdam|City-Leads|Personen``Die City-Leads von Volt Potsdam sind Thomas Rosen und Georg Sichardt.`,
  fact`Potsdam|Email``Potsdam kann unter potsdam@voltdeutschland.org erreicht werden.`,
  fact`Brandenburg|Email``Volt Brandenburg hat die Email Adresse: brandenburg@volteuropa.org. Damit können auch Städte in BB erreicht werden.`,
  fact`Brandenburg|Potsdam|Cottbus|Lübbenau|Brandenburg an der Havel``Potsdam, Cottbus, Lübbenau, Brandenburg an der Havel, usw sind Städte in Brandenburg.`,
  fact`Events|Potsdam``Das nächste Meet&Greet in Potsdam ist am 06.03.2023 um 19 Uhr.`,
  fact`Events|Potsdam``Generell ist jeden Donnerstag um 19 Uhr ein Arbeitstreffen in Potsdam. Dies findet in einer lockern Arbeitsatmosphäre statt.`,
  fact`Events|Potsdam``Am ersten Donnerstag im Monat ist um 19 Uhr Meet&Greet anstatt Arbeitstreffen. Dies findet meisten in einem Café oder einer Bar statt.`,
  fact`Events|Potsdam``Ab und zu veranstalten wir Infostände oder verteilen Flyer.`,
  fact`Events|Potsdam``Unregelmäßig gibt es Team-Events wie Bouldern oder Grillen.`,
  fact`Events|Socialmedia|Webseite|Potsdam|Brandenburg|Email``Infos zum Meet&Greet gibt es auf Instagram (@voltpotsdam) und der Webseite (https://www.voltbrandenburg.org/potsdam)`,

  fact`Statistiken|Deutschland``Volt Deutschland ist in 12 Bundesländern aktiv.`,
  fact`Deutschland|Bundestag``Volt Deutschland ist nicht im Bundestag vertreten.`,
  fact`kommunal|Erfolg|Regierung``Volt ist in einigen kommunalen Parlamenten in der Regierung beteiligt.`,
  fact`kommunal|Erfolg|Prozent|Darmstadt``Volt hat 6,88 Prozent in Darmstadt erreicht.`,
  fact`kommunal|Erfolg|Prozent|Bonn``In Bonn haben 5,07 Prozent für Volt gestimmt. (In Köln 4,98 Prozent)`,
  fact`national|Erfolg|Niederlande|Bulgarien``Volt ist in den nationalen Parlamenten der Niederlande und Bulgarien vertreten.`,
  fact`Statistiken|Mitglieder|Europa``Volt Europa hat zirka 22000 Mitglieder und zirka 4500 Supporter. (Stand 2023-03-02)`,
  fact`Statistiken|Mitglieder|Niederlande``Volt Niederlande hat zirka 12000 Mitglieder. (Stand 2023-03-02)`,
  fact`Statistiken|Mitglieder|Deutschland``Volt Deutschland hat zirka 4180 Mitglieder. (Stand 2023-01-01)`,
  fact`Statistiken|Mitglieder|Brandenburg``Volt Brandenburg hat zirka 60 Mitglieder. (Stand 2023-03-02)`,
  fact`Statistiken|Mitglieder|Potsdam``Volt Potsdam hat zirka 15 Mitglieder. (Stand 2023-03-02)`,
  fact`Statistiken|Mitglieder|Belgien``Volt Belgien hat 235 Mitglieder. (Stand 2023-01-01)`,
  fact`Statistiken|Mitglieder|Czechia``Volt Czechia hat 27 Mitglieder. (Stand 2023-01-01)`,
  fact`Statistiken|Mitglieder|Frankreich``Volt Frankreich hat 190 Mitglieder. (Stand 2023-01-01)`,
  fact`Statistiken|Mitglieder|Großbritanien``Volt hat in Großbritanien 298 Mitglieder. (Stand 2023-01-01)`,
  fact`kommunal|Erfolg|Großbritanien``Mit Ewan Hoyle hat Volt UK in Glasgow 4% erreicht.`,

  fact`Europa|Tech|Help``Technische Hilfe für interne technische Probleme in Volt Europa bekommst du unter https://help.volteuropa.org/`,
  fact`always|Europa|Tech|Help``Beim Helpdesk kannst jederzeit von echten Menschen Hilfe zu deinen technischen Problemen bekommen. Die Email Adresse des Volt Europa Helpdesk lautet help@volteuropa.org.`,
  fact`Europa|Tech``Informationen zu technischen Themen in Volt Europa gibt es im Tech Intranet unter https://sites.google.com/volteuropa.org/eur-tech`,
  fact`Europa|Tech|Leads``Die Tech-Leads von Volt Europa sind: Derhen Coulomb und Jose Antonio Abellan Lax.`,
  fact`Europa|Tech|Leads``Tech-Innovation wird von Yannick Retel Helmrich geleitet.`,
  fact`Europa|Tech|Leads|Website``Das EUR Website-Tema leitet Ruben Zimmermann.`,
  fact`Europa|Tech|Email|Mitmachen``Falls du bei EUR Tech mitmachen möchtest, kannst du die Tech-Leads unter techleads@volteuropa.org direkt erreichen.`,
  fact`Europa|GA|Parteitag|Events``Die nächste europäische Generall Assembly findet am 3ten bis 4ten Juni 2023 in Bucharest statt. Mehr Infos zum Europäischen Parteitag gibt es unter https://events.volteuropa.org/`,
  fact`GA|Parteitag|Events``Die einzelnen Chapter haben eigene Parteitage. Infos zu Terminen und Orten bekommst du beim jeweiligen Chapter.`,

  fact`Europa|Tech|Help``Volt Europa hat einen Helpdesk, der dir bei technischen Problemen helfen kann.`,
  fact`Tech|Help|Workplace``Workplace ist eine Plattform von Meta. Es ist eine Art Facebook für Unternehmen. Volt nutzt Workplace um mit den Mitgliedern zu kommunizieren und um interne Arbeitsgruppen zu organisieren.
  
  Volt Brandenburg hat ein Introvideo zu Workplace aufgenommen. Das Video findest du hier: https://drive.google.com/file/d/16tblV2w761Z-OznXvtJeVYzjpQZ_UiOK/preview`,

  fact`Glossar|City-Leads|kommunal``City-Leads = Personen die ein lokales Team in Volt leiten.`,



  fact`Policy``Volt main topics are the 5+1 Challenges: Smart State, Economic Renaissance, Social Equality, Global Balance, Citizen Empowerment and EU Reform.`,
  fact`Policy``Volts 5 Challenges are basically the same for every country, but their implementation can be adapted on the national level to take local realities into account. `,
  fact`Policy``Der jetzige Slogan von Volt lautet "Future. Made in Europe."`,
  fact`Policy``Der ehemalige Slogan von Volt lautete: paneuropäisch, pragmatisch und progressiv.`,

  fact`Policy|Challenges``
Volt hat 5+1 Herausforderungen definiert, die jedes europäische Land angehen muss.

Die ersten drei Herausforderungen betreffen den Staat, seine Organisation, die Wirtschaft und das soziale Umfeld in unserer Gesellschaft.
Zwei weitere Herausforderungen konzentrieren sich auf zwei der wichtigsten Themen unserer Zeit:
Wie schaffen wir ein nachhaltiges, globales Gleichgewicht und stellen sicher, dass Bürger auch in Zukunft in der Lage sind bestmöglich an Politik teilzuhaben?
Basierend auf diesen 5 Herausforderungen werden wir unsere nationalen Programme entwickeln.

„+1“ ist unser Vorschlag, die EU zu stärken und zu reformieren. Diese Herausforderung wird in allen nationalen Programmen gleich enthalten sein und bildet den Leitfaden unserer Europapolitik.

Die 5+1 Herausforderungen sind:
- 1. Smart State
- 2. Economic Renaissance
- 3. Social Equality
- 4. Global Balance
- 5. Citizen Empowerment
- +1 EU-Reform
`,
  /*
  fact`Policy|Smart State``
1. Intelligenter Staat

Um seinen Bürgern und Bürgerinnen optimal zu dienen, sollte der Staat dazu in der Lage sein, schnell, effektiv und effizient zu handeln. Damit ist nicht gemeint, dass der Staat sich immer weiter zurückziehen soll, bis jede seiner Aufgaben privatisiert ist.
Staatsausgaben sollten weder drastisch gekürzt noch erhöht werden.
Vielmehr sollen Ressourcen stets rational und zielgerichtet eingesetzt werden (z.B. Steuerflucht stoppen, gute Bildungssysteme bereitstellen und Berufsethik im öffentliche Sektor verbessern)

- Reduzierung von Abfall im öffentlichen Sektor
- Leistung und Attraktivität in unseren Administrationen neu denken
- Fördernde Bildungspolitik
- Erreichen eines optimalen Schuldenniveaus
- Ausgeglichene Steuerlasten und Verhinderung von Steuerflucht
- Für alle funktionierende und nachhaltige Rentensysteme
- Hochwertige Gesundheitsversicherungen für jeden
- Gerechte und zuverlässige Rechtssysteme sicherstellen
- Effektive Verbrechensbekämpfung und Strafverfolgung
  `,
  fact`Policy|Economic Renaissance``
2. Wirtschaftliche Renaissance

Die europäischen Volkswirtschaften müssen sich wieder bewusst werden, wie sie Anreize für Fortschritt schaffen, der es jedem ermöglicht, einen angemessenen Lebensstandard zu erreichen.
Dabei sollen wirtschaftlich benachteiligte Regionen gefördert und Europa zu einem Innovationszentrum werden (z.B. Bekämpfung der Jugendarbeitslosigkeit, gemeinsame Maßnahmen gegen Unterbeschäftigung)

- Abbau unnötiger Bürokratie und Stärkung des Arbeitsmarktes
- Innovationskraft unser Volkswirtschaften erhöhen
- Bekämpfung von Jugendarbeitslosigkeit durch unkonventionelle Maßnahmen
- Wirtschaftliche Entwicklung in benachteiligten Regionen anschieben
- Zukunftsindustrien mitdenken und fördern
- Finanzmärkte balancieren um Weiterentwicklung unser Volkswirtschaften zu ermöglichen
- Investitionen in Produktivität und Handel
  `,
  fact`Policy|Economic Renaissance``
Gestalten wir die Arbeit der Zukunft

Den Übergang zur Arbeit der Zukunft erfolgreich zu gestalten, erfordert zunächst eine entschlossene Anstrengung der EU, sich zur “Sozialen Union” weiterzuentwickeln.
Volt wird sich entschieden dafür einsetzen, dass in Europäischer Kooperation eine solche Soziale Entwicklung vorangetrieben wird: Standards sozialer Absicherung, angemessene Arbeit und Bezahlung, erfolgreiche digitale Transformation, die zu größerem Wohlstand und besseren Arbeitsbedingungen beiträgt.
Höchste Priorität misst Volt Konzepten und Maßnahmen zu, die die Arbeitslosigkeit verringern, vor allem bei jungen Menschen. Dazu gehören die weitere Öffnung des Europäischen Arbeitsmarktes und die aktive Förderung der Mobilität von Arbeitssuchenden in ganz Europa.
  `,
  fact`Policy|Social Equality``
3. Soziale Gleichberechtigung

Gleiche Chancen sollten für jeden zugänglich sein, egal aus welchem Hintergrund wir stammen.
Konzertierte Aktionen sind notwendig, um die Benachteiligten unserer Gesellschaft zu fördern (z.B. Barrieren für die gesellschaftliche Beteiligung von Obdachlosen reduzieren, Aufstiegschancen von benachteiligten Menschen erhöhen)

- Gleiche Möglichkeiten und Chancen für alle erschließen
- Vielfalt begünstigen und Diskriminierung einschränken
- Einhaltung der Menschenrechte und Gleichheit vor dem Gesetz
- Solidarität und Unterstützung für Benachteiligte
- Unterstützung für Familien
  `,
  fact`Policy|Social Equality``
Geschlechtergleichbehandlung bis 2025

“Schaffen wir Gleichheit in Europa bis 2025!” Um die Gleichbehandlung der Geschlechter zu erreichen, müssen Arbeitgeber sehr viel fortschrittlichere und auch transparentere Wege gehen, um sicherzustellen, dass Frauen als gleichwertige Beschäftigte behandelt werden, dass ihre Fähigkeiten zählen, dass ihre Rechte geschützt werden und dass sie sich voll entfalten können.
Volt wird alles dafür tun, Frauen besseren Zugang zum Arbeitsmarkt zu verschaffen, ihnen Mittel zur beruflichen Entwicklung an die Hand zu geben, ihnen die gleichen Möglichkeiten zu bieten, die männlichen Kollegen offenstehen, sie in traditionell von Männern dominiertenFeldern zu stärken.
Dabei müssen Sicherheit und Respekt gelten.
Volt wird gegenüber Regierungen und Institutionen jeglicher Art auf die Durchsetzung dieser Konzepte und Maßnahmen drängen.
  `,
  fact`Policy|Social Equality``
Kampf um gleiche Rechte für alle

Kurz gesagt: Liebe ist Liebe!
Volt tritt dafür ein, sowohl rechtliche Schritte als auch konkrete Maßnahmen zu ergreifen, um die Gleichheit aller vor dem Gesetz und in der Lebenswirklichkeit herzustellen.
Wir meinen damit kein abstraktes Konzept von Gleichheit, sondern tatsächliche Gleichheit - weniger wird Volt nicht akzeptieren.
Volt will sicherstellen, dass alle LGBTIQ-Mitmenschen gleiche Rechte und gleichen Schutz genießen.
Darüber hinaus ist entscheidend, alle Formen von Diskriminierung zu beseitigen, mögen sie im privaten oder öffentlichen Raum geschehen,vor allem durch Erziehung oder Anreize in der Arbeitswelt.
  `,
  fact`Policy|Global Balance|Klimawandel|Artenvielfalt|Migration``
4. Globaler Ausgleich

In vernetzten und voneinander abhängigen Gesellschaften müssen wir Verantwortung für unsere Rolle in der globalen Ordnung übernehmen.
Gerade die Bereiche internationale Entwicklung, Klimawandel und Migration verlangen nach kooperativen Ansätzen zur Lösung globaler Herausforderungen (z.B. Fördern einer europäischen Antwort auf Migration, Belastung der Meere durch Verschmutzung und nicht nachhaltige Fischerei, Streben nach einer Kreislaufwirtschaft).

- Schaffung eines wirksamen und humanen Asylsystems
- Aufbau internationaler Lösungen für Flüchtlingskrisen
- Soziale Integration als wichtigstes Mittel zur Bekämpfung von Extremismus und Radikalisierung
- Kampf gegen den Klimawandel: drastische und schnelle Verringerung des Treibhausgasausstoßes und eine schneller Ausbau erneuerbarer Energien
- Nachhaltige und verantwortungsvolle Landnutzung und Lebensmittelproduktion
- Schutz von Artenvielfalt, Wasserqualität und Widerstandsfähigkeit im Hinblick auf Katastrophen.
- Ausbau der Kreislaufwirtschaft, grüne Städte und Gemeinden
- Rationale und plurale Ziele für internationalen Handel und Balance in der internationalen Zusammenarbeit.
- Prinzip der Einhaltung von internationalem Recht
  `,
  fact`Policy|Citizen Empowerment``
5. Aktive Bürger

Der technologische Fortschritt hat neue Möglichkeiten geschaffen, um die direkte demokratische Teilhabe von Bürgern zu erhöhen.
Die entsprechenden Instrumente müssen jedoch angewandt werden, sodass sie es Bürgern ermöglichen optimal informiert zu sein.
Dabei muss darauf geachtet werden, dass die Instrumente eine sinnvolle und sachgerechte öffentliche Diskussion fördern.
Genauso muss der Staat genügend Informationen veröffentlichen, um es den Bürgern zu ermöglichen sich demokratisch zu beteiligen und Staatshandlungen zu kontrollieren.

- Teilnahme für jeden Bürger am politischen Prozess und der Gesetzesentstehung
- Abbau von Hürden bei der politischen Mitwirkung
- “Open Government”-Initiative: öffentliche Daten für Bürgerinnen und Bürger unter Berücksichtigung von Privatspährenschutz zugänglich machen
- Bürgerliches Engagement und soziale Betätigungen fördern
- Öffentlich rechtliche Medien von Staats- und Wirtschaftsinteressen strukturell unabhängig machen
  `,
  fact`Policy|Citizen Empowerment``
Bürger müssen im politischen Prozess gehört werden, ganz besonders wenn es um wichtige und einschneidende gesellschaftliche Fragen geht.
Wir wollen, dass die öffentlich-politische Debatte Perspektiven möglichst breiter Schichten der Bevölkerung einschließt, und dass dabei qualitativ hochwertige, repräsentative Informationen für jeden Bürger zugänglich sind.
Wir glauben daran, dass Bürger die Möglichkeit erhalten sollten, ihre Sorgen und Forderungen so öffentlich zu machen, dass das Regierungshandeln auch zwischen den Wahlen effektiv beeinflusst werden kann.
Deshalb wollen wir Politikvorschläge machen, die dabei helfen politische Aufmerksamkeit auf Themen zu lenken, die direkt von Bürgern geäußert werden und die helfen demokratische Diskussion zu fördern sowie die Bürger dabei unterstützen, Zugang zu zuverlässigen und qualitativ hochwertigen Informationen zu erhalten.
Dabei ist besonders die Rolle der öffentlich-rechtlichen Medien so zu gestalten, dass sie strukturell von Staats- und Wirtschaftsinteressen unabhängig sind.
  `,
  fact`Policy|EU Reform|Parlament``
+1. EU Reform

Die Europäische Union muss demokratisch legitimiert sein und ihre Kompetenzen müssen sich auf die Bereiche beschränken, in denen sie den meisten Mehrwert schaffen kann.
Genauso muss die Entscheidungsfindung klar strukturiert sein (z.B., durch ein Parlament mit größerer Kontrolle über die Europäische Kommission, eine Zuordnung von Parlamentariern zu Wahlkreisen, ein proportionales Wahlsystem , ein europäisches Investitionsprogramm mit klaren Zielen und Stärkung des Subsidiaritätsprinzips)
  `,
  fact`Policy|EU Reform|Föderalismus``
Volt möchte ein Vereintes Europa.

Die Antwort auf bestehende Problem in der EU kann nicht ‘mehr Europa’ oder ‘weniger Europa’ lauten, sondern nur: ein ‘besseres Europa’.
Demokratie muss auf lokaler, regionaler, nationaler und europäischer Ebene gelebt werden.
Nur die Demokratie kann das Vertrauen der Bürger in die politischen Institutionen wiederherstellen und zu gemeinsamen Lösungen für gemeinsame Probleme führen.
Dies erfordert umfassende institutionelle Veränderungen: manche davon sofort, andere über eine Veränderung derEuropäischen Verträge.
Nur so kann eine echte Erneuerung gelingen und der Weg zu einer föderalen Ordnung Europas beschritten werden.

Ja: Wir setzen uns leidenschaftlich für ein föderales Europa mit transparenteren, effizienteren und tatsächlich demokratischen Institutionen ein.
Wir fordern die Einsetzung einer rechenschaftspflichtigen Exekutive, die sich aus einem Präsidenten, einem Premierminister und einem Kabinett föderaler Minister zusammensetzt, sowie ein Zweikammern-Parlament aus direkt gewählten Abgeordneten und Vertretern der Mitgliedstaaten, und ein föderales Justizwesen, das die Verfassungstreue und Einhaltung von Grundrechten gewährleistet.
  `,
  fact`Policy|EU Reform|Sicherheit|Verteidigung``
Schafft ein gemeinsames europäisches Sicherheitssystem

Die Sicherheit der Europäer wiegt schwerer als das Prestige und die Macht der nationalen politischen und wirtschaftlichen Eliten.
Unsere Vision für eine Europäische Sicherheits- und Verteidigungspolitik baut auf drei Blöcken auf:
  `,
  fact`Policy|EU Reform|Sicherheit|Verteidigung``
​(1) unabhängige militärische und zivile Fähigkeiten​

Das beinhaltet vollständig integrierte Verteidigungskräfte - eine Europäische Armee - die Europa dazu befähigt, mit konventionellen und unkonventionellen Gefahren angemessen umzugehen.
Das beinhaltet auch eine ‘Armee im Einsatz’, die soweit notwendig auch autonom Entscheidungen treffen kann und als Teil einer umfassenden Sicherheitspolitik einschließlich ziviler Instrumente der Konfliktlösung (humanitäre Einsätze, Entwaffnung, Aufbau von Staaten) fungiert.
Die Kommandostrukturen einer solchen Armee würden vereint, doch die integrierten Europäischen Streitkräfte würden dezentral auf dem Kontinent stationiert.
Europäische Bürger können sich unabhängig von ihrem Heimatland der Armee anschließen.
  `,
  fact`Policy|EU Reform|Sicherheit|Verteidigung``
(2) Demokratische Entscheidungen

Europäische Fähigkeiten müssen mit europäischer Entscheidungsfindung einhergehen.
Fragen der europäischen Sicherheit und Verteidigung sollten auf europäischer Ebene in einem demokratischen und parlamentarischen Prozess geklärt werden: keine Hintertür-Abmachungen zwischen nationalen Regierungen beim Thema Sicherheit der europäischen Bürger.
  `,
  fact`Policy|EU Reform|Sicherheit``
​(3) Eine neue Sicherheitsdoktrin

​Wir wollen den Spielraum fürSicherheitspolitik eingrenzen: Wir wollen ein System, das die es infrage stellt, wenn Mächtige ein Problem als eine Frage der Sicherheit definieren.
Probleme als ‘Gefährdung unserer Sicherheit’ zu bezeichnen ist nicht ohne Hintergedanken: solche Aussagen schaffen Furcht und können Bürger verunsichern.
Danach folgt oft eine Forderung, das Problem schnellstmöglich anzugehen - oft außerhalb des normalen demokratischen Prozesses und unter Aufwendung beträchtlicher Ressourcen.
Stattdessen fordern wir ein System der gegenseitigen Kontrolle, welches das Ausweiten der Sicherheitspolitik in die europäische Gesellschaft verhindert.
  `,
  fact`Policy|EU Reform|Steuergerechtigkeit``
Schaffung europäischer Steuergerechtigkeit

Volt will die Regeln für die Wirtschaft innerhalb des Kontinents vereinfachen und gleichzeitig sicherstellen, dass internationale Firmen ihren gerechten Steueranteil zahlen.
Eine EU-weite Harmonisierung der Steuergesetzgebung wird Firmen Klarheit über den Grund der Besteuerung geben während die Eliminierung von Steuerhinterziehung eine gerechte Behandlung für alle sicherstellt.

Dieses Grundgerüst stützt auf zwei Säulen:

1. Eine allgemein gültige Auffassung der Gewinn-Definition;
2. Ein gemeinsames Verständnis über den Zusammenhang von Steuerzahlung und der Herkunft des Gewinns.

Die Entstehung eines transparenteren Steuersystems innerhalb der EU und eines angemessenen Wirtschaftswachstums sind das Ziel.
  `,
  fact`Policy|EU Reform|Borders``
Verantwortung der europäischen Grenzen teilen

Die Europäische Union sollte die ausschließliche Kompetenz für den Grenzschutz erhalten.
Der aktuelle, nationale Grenzschutz sollte in einen kohärenten und effizienten europäischen Grenzschutz integriert werden.
Wir benötigen eine verantwortungsvolle europäische Gemeinschaft, die alle Mitgliedsstaaten bei Bedarf zum Schutz der gemeinsamen Grenzen unterstützt.
Wir bestehen darauf, dass diese Gemeinschaft auf ihrem gesamten Gebiet, inklusive der Grenzen und darüber hinaus, Menschenrechte anerkennt und von ihren Partnern einfordert.
Ein funktionierender europäischer Grenzschutz ist die Voraussetzung für die Freizügigkeit der Menschen innerhalb der EU.
Wir wollen daher ein System erstellen und unterstützen, welches die Integrität der EU Grenzen an erste Stelle stellt, grenzüberschreitende Kriminalität bekämpft und die die Sicherheit der europäischen Bürger gewährleistet.
Wir wollen ein europäisches Grenzschutz-System, welches unter anderem die Erstaufnahme von Asylsuchenden in einer geordneten und humanen Weise gewährleistet.
Unsere gemeinsamen, europäischen Werte sollen sicherstellen, dass Geflüchtete beim ersten Kontakt erkennen können, wofür wir als europäische Bürger stehen.
`,
*/

  fact`Tech|Tusker|Voting|Email|Purpose``For what? Tusker serves two main functions: voting for Volt members (whether this be at General Assemblies, National Assemblies or Local Assemblies as well of course for our Policy Votes and all different democratic expressions within Volt) & emailing (again, across the wide variety of segments Volt has).`,
  fact`Tech|Tusker|Voting|Email|Access``For who? Tusker is reserved for usage by the following functions
- General Secretary
- Policy Co-Leads
- Communications Team (European, National or Local)
- People who have been nominated to manage a voting process by the adequate decision-making authority (more often than not this would the Executive Board of a given Chapter - national, regional or local) - this would often be someone who has been trained to use Tusker.

Although Tech might support voting procedures and on relevant tickets where problems
arise, the responsibility of voting procedures cannot be seen as a Tech-only owned activity but
is conducted in conjunction with the relevant chapter (at either level that might be) so we can
ensure the integrity of all votes.`,
  fact`Tech|Tusker|Voting|Email``For when? Voting procedures happen very regularly across our different chapters. The same applies to emails to our members or email subscribers.`,
  fact`Tech|Tusker|Voting|Usage``How to set-up a Tusker LiveEvent?
For the smaller chapters, we understand that Tusker can be sometimes a hassle to set-up without any prior experience. Therefore, the Tech team will try and support to the best of our abilities the different chapters that require help.
If this is the case, please copy and complete the following sheet (https://docs.google.com/spreadsheets/d/1jgFQBZCqeITaOycFEAc3-ziVTycjcOq91BbkfAhb49A/edit) with all relevant info and create a ticket by sending an email to help@volteuropa.org.
In the title of the email, please use the following format:
Tusker LiveEvent - {Chapter Name/Team Name) - {Date}
Also please note that you should start this process at least 30 days ahead of the given voting date to ensure we can include the voting emails in your communications for the event and make sure we have enough bandwidth to support.
For the larger chapter, we will strive to work with your teams but would prefer if a dedicated person within the chapter is responsible for Tusker LiveEvents (typically at the national level).
For those interested, hereby a guide on how to set up a Tusker LiveEvent. (https://docs.google.com/document/d/1JiJDy3NOpCN5b8ZEFZRoVBrKUUz8ULFzxk5WSQeF4S8/edit)`,
  fact`Tech|Tusker|Email|Usage``How to set-up a Tusker Emailing? No information available yet.`,
  fact`Tech|Tusker|Voting|Email|Guide|Usage|Video``Recording for First Show & Tell for Tusker: https://drive.google.com/file/d/1KOVlx5wo2A7jgTTlQ2EhSb7WLjQTLl7I/view`,
  fact`Tech|volt.team|AWS|Commands``A guide about volt.team that describes some useful commands for executing everyday maintenance tasks in volt.team: https://docs.google.com/document/d/18r6o9zSrgnEqTgD_93uj323nNlDPEx4e91QG_dd4Eb4/edit`,
  fact`Tech|volt.team|AWS|Deployment``A document about how Carlo, Thor and Thomas deployed changes to volt.team: https://docs.google.com/document/d/1_UMmtlawvZvC9VnekaHXy4J6kFGOmNOJEvvj_cxhH8o/edit`,

  fact`Tech|Tusker|Voting|LiveEvent|Guide|Create``Creating a LiveEvent in Tusker (Only Superadmins)
1. Sign in to Tusker at https://tusker.volteuropa.org
2. Click on “LiveEvents” in the sidebar and then on “Create new LiveEvent” on the top right
3. Enter the information for the LiveEvent: Name, Team, and End date. The LiveEvent will be available until the chosen End date, so it’s usually a good idea to put the end day a day or two after the planned end of the actual event.
4. Click on “Save” and the event is now created. You are now the super admin of this event and the only one who will be able to add members to this event.
`,
  fact`Tech|Tusker|Voting|LiveEvent|Guide|Members``Adding Members to an Event (Only Superadmins)
1. After you’ve saved your new event, you can see the “Go to admin panel” button at the top of the page. Click on it in order to open the LiveEvent. You will be signed in automatically.
2. Click on “Manage participants” in order to see the list of participants
3. Click on “Add participants” in the top right corner of the modal dialog. You can now add a list of volt.team IDs and confirm by clicking on “Add participants”. You have to put one volt.team ID per line.
`,
  fact`Tech|Tusker|Voting|LiveEvent|Guide|Participants|Edit``Managing Participants
1. After having added participants, you can see them in the “Manage participants” dialog.
2. You can search for participants by their name or volt.team ID.
3. If there are participants who are not supposed to have voting rights (e.g. a chair from another association), you can disable their voting rights by clicking on “Toggle voting rights”. Clicking the button again restores their voting rights.
4. If there are participants who should be able to access the admin panel for the LiveEvent, you can grant them admin rights by clicking on “Toggle admin rights”. Clicking the button again removes their admin rights.
5. You can send a link to the LiveEvent to individual participants by clicking on “Send link”. This link will enable them to access the LiveEvent even before an official invitation has been sent out via Tusker Mailing.
`,
  fact`Tech|Tusker|Voting|LiveEvent|Guide|Settings``Setting up the Event
1. Before inviting participants, the event should be set up with the necessary information. Click on “Settings” in the admin panel in order to do so.
2. In the “Settings” panel, you can change the following information:
2a. Name: This name will be displayed at the top of the page
2b. Description: This text is displayed to participants and guests of the event. You can use Markdown for formatting.
2c. Welcome Text: This text is displayed to participants before they join the event. You can use Markdown for formatting.
2d. YouTube ID: If the event includes a live stream on YouTube, you can add the video ID here. Please note that the video ID is just the part after ?v=, e.g.  https://www.youtube.com/watch?v=corSEueGSgM
2e. Buttons: You can add one or several buttons to the LiveEvent.
Each button can have an optional icon, a label, and a link. The link can include the \`$NAME\`, \`$TOKEN\` variable placeholders. These will be automatically replaced by the participant’s full name or a voting token respectively.
Buttons can be set to only be displayed for participants; by default they are also visible to guests.`,
  fact`Tech|Tusker|Voting|LiveEvent|Guide|Invitations``Sending Participant Invitations
1. Invitations can be sent via Tusker Mailing.
2. Only the team that has been set up to own the event (or its parent teams) can send out a LiveEvent invitation
3. In order to send out the invitations, a Mailings channel needs to be set up. It is recommended that every team which holds LiveEvents maintains a LiveEvent mailing channel. (N.B.: German teams often call these channels “Parteitag …”, Dutch teams use “Digitale stemlink …”. Ideally the naming convention for new teams would include the term “Live” so it’s easy to recognize the relevant channels)
4. The channel can be configured by clicking on the “Edit” button on the top right of the channel page.
5. The channel needs to be updated for every new LiveEvent.
6. The channel settings should include the following
6a. Disable opt-out: Yes
6b. Mark channel as private: Yes
6c. Send campaigns in this channel to people who are in a … LiveEvent
6d. LiveEvent Selection: Your Live Event
7. You can then create a new campaign in the channel.
The placeholder \`{{ live_event_token_url }}\` will be replaced with the participant’s access link. NB: If you send a preview email, the placeholder will remain empty. It’s best practice to make the access link a button for good visibility. This can be achieved with the following Markdown:
\`#### [Join now!]({{ live_event_token_url }}?locale=de)\`
You may replace “Join now” with your desired button label and the language code in “?locale=de” with your desired language (or leave it out to default to English).
`,

  // fact````,
]

function fact(strings) {

  function first_string(strings) {
    return (strings || [])
      .filter(Boolean)
      .map(string => string.trim())
      .pop()
  }

  const tags = (first_string(strings) || '')
    .trim()
    .toLowerCase()
    .split('|')
    .filter(Boolean)
    .map(tag => tag.trim())

  return strings => {
    const text = (first_string(strings) || '')
      .trim()

    return {
      text,
      tags,
    }
  }
}

module.exports = {
  fact,
  facts,
}
