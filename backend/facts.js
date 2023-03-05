
const facts = [
  // fact``,

  fact`Quellcode|Chatbot|Programmierung``Den Code zu diesem Chat-Bot findest du unter https://github.com/voltbonn/chat.volt.link`,
  fact`Chatbot|Programmierung``Dieser Volt-Chat-Bot wurde mit Node.js und OpenAI ChatGPT geschrieben.`,
  fact`Chatbot|Programmierung``Der Chat-Bot wurde von Thomas Rosen entwickelt.`,

  fact`Name|Abkürzung``Volt Europa, Volt Deutschland, Volt Potsdam usw. werden Volt abgekürzt.`,
  fact`Name|Abkürzung``Volt selber ist keine Abkürzung und die einzelnen Buchstaben stehen nicht für einzelne Worte.`,
  fact`Abkürzung``MG steht für Meet&Greet.`,
  fact`Europa|Personen``Der Italiener Andrea Venzon, die Französin Colombe Cahen-Salvador und der Deutsche Damian Boeselager gründeten Volt Europa am 29. März 2017.`,
  fact`Statistiken|Deutschland``In Deutschland wurde Volt als Partei am 3. März 2018 registriert.`,
  fact`Policy``Volt ist eine europaweite Partei und Bewegung.`,
  fact`Europa|Personen``Seit 2019 sitzt Damian Boeselager für Volt Europa im EU-Parlament.`,
  fact`Mitmachen``Unter https://www.voltdeutschland.org/mitmachen kannst du dich bei Volt anmelden und mitmachen.`,

  fact`Statistiken|Europa|Länder``Volt existiert in Albania, Austria, Belgium, Bulgaria, Switzerland, Cyprus, Česká republika, Germany, Danmark, Estonia, España, France, Greece, Croatia, Hungary, Ireland, Italia, Lithuania, Luxembourg, Latvia, Malta, Nederland, Poland, Portugal, Romania, Slovenia, Slovensko, Suomi, Sverige, Ukraine, UK (England, Schottland, Wales, Nord-Irland).`,
  fact`Statistiken|Europa|Personen``Volt hat über 100 gewählte Vertreter*innen in Europa.`,
  fact`Brandenburg|Spenden``Unter https://www.voltbrandenburg.org/spenden kann man an Volt Brandenburg spenden.`,
  fact`Deutschland|Shop``T-Shirts, Sweatshirts, Flaggen und vieles mehr gibt es unter https://merch.voltdeutschland.org/ (der Volt DE Shop)`,

  fact`Deutschland|Vorsitz|Personen``Der Bundesvorstand von Volt Deutschland besteht aus Rebekka Müller (Vorsitzende), Tim Marton (Vorsitzender), Leo Lüddecke (Schatzmeister), Carina Beckmann (Stv), Martin Finck (Stv), Jennifer Scharpenberg (Stv) und Jens Többen (Stv).`,
  fact`Europa|Vorsitz|Personen``Volt Europa is lead by the Co-Presidents Francesca Romana D'Antuono and Reinier Van Lanschot.`,
  fact`Policy``Volt main topics are the 5+1 Challenges: Smart State, Economic Renaissance, Social Equality, Global Balance, Citizen Empowerment and EU Reform.`,
  fact`Policy``Volts 5 Challenges are basically the same for every country, but their implementation can be adapted on the national level to take local realities into account. `,
  fact`Policy``Der Slogan von Volt lautet "Future. Made in Europe."`,

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

  fact`City-Lead|Potsdam``City-Leads von Volt Potsdam: Thomas Rosen und Georg Sichardt`,

  fact`Europa|Tech|Help``Technische Hilfe für interne technische Probleme in Volt Europa bekommst du unter https://helpdesk.volteuropa.org/`,
  fact`Europa|Tech|Help``Die Email Adresse des Helpdesk lautet help@volteuropa.org`,
  fact`Europa|Tech``Informationen zu technischen Themen in Volt Europa gibt es im Tech Intranet unter https://sites.google.com/volteuropa.org/eur-tech`,
  fact`Europa|Tech|Email|Mitmachen``Falls du bei EUR Tech mitmachen möchtest, kannst du die Tech-Leads unter techleads@volteuropa.org direkt erreichen.`,
  fact`Europa|GA|Parteitag|Events``Die nächste europäische Generall Assembly findet am 3ten bis 4ten Juni 2023 in Bucharest statt. Mehr Infos zum Europäischen Parteitag gibt es unter https://events.volteuropa.org/`,
  fact`GA|Parteitag|Events``Die einzelnen Chapter haben eigene Parteitage. Infos zu Terminen und Orten bekommst du beim jeweiligen Chapter.`,
  
  // fact``,
]

function fact(strings) {

  function first_string(strings) {
    return (strings || [])
      .filter(Boolean)
      .map(string => string.trim())
      .pop()
  }

  const tags = (first_string(strings) || '')
    .split('|')
    .filter(Boolean)

  return strings => {
    const text = first_string(strings) || ''
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
