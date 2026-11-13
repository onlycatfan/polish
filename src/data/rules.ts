/** More examples per rule: [Polish with marked endings, UA, RU]; RULE_BY_CARD maps card id to rule */
export const RULES: Record<string, [string, string, string][]> = {
  "mianownik": [["To jest syn.", "Це син.", "Это сын."], ["To jest nowy telefon.", "Це новий телефон.", "Это новый телефон."], ["To jest dobra kawa.", "Це добра кава.", "Это хороший кофе."]],
  "mianownik-adjective": [["On jest szybki.", "Він швидкий.", "Он быстрый."], ["Ona jest miła.", "Вона мила.", "Она милая."], ["Dom jest duży.", "Дім великий.", "Дом большой."]],
  "mianownik-plural": [["To są mężczyź{ni}.", "Це чоловіки.", "Это мужчины."], ["To są studen{ci}.", "Це студенти.", "Это студенты."], ["To są Pola{cy}.", "Це поляки.", "Это поляки."]],
  "biernik-animate": [["Mam brat{a}.", "У мене є брат.", "У меня есть брат."], ["Widzę sąsiad{a}.", "Я бачу сусіда.", "Я вижу соседа."], ["Kocham syn{a}.", "Я люблю сина.", "Я люблю сына."]],
  "biernik-inanimate": [["Mam telefon.", "У мене є телефон.", "У меня есть телефон."], ["Kupuję mleko.", "Я купую молоко.", "Я покупаю молоко."], ["Widzę dom.", "Я бачу дім.", "Я вижу дом."]],
  "biernik-feminine": [["Piję kaw{ę}.", "Я п'ю каву.", "Я пью кофе."], ["Mam siostr{ę}.", "У мене є сестра.", "У меня есть сестра."], ["Widzę now{ą} sąsiadk{ę}.", "Я бачу нову сусідку.", "Я вижу новую соседку."]],
  "biernik-a-masculine": [["Kocham tat{ę}.", "Я люблю тата.", "Я люблю папу."], ["Widzę koleg{ę}.", "Я бачу колегу.", "Я вижу коллегу."], ["Znam tego programist{ę}.", "Я знаю цього програміста.", "Я знаю этого программиста."]],
  "biernik-plural-virile": [["Znam twoich koleg{ów}.", "Я знаю твоїх колег.", "Я знаю твоих коллег."], ["Mam dobr{ych} sąsiad{ów}.", "У мене добрі сусіди.", "У меня хорошие соседи."], ["Widzę polsk{ich} student{ów}.", "Я бачу польських студентів.", "Я вижу польских студентов."]],
  "biernik-plural-other": [["Mam now{e} telefon{y}.", "У мене нові телефони.", "У меня новые телефоны."], ["Kupuję jabłk{a}.", "Я купую яблука.", "Я покупаю яблоки."], ["Widzę studentk{i}.", "Я бачу студенток.", "Я вижу студенток."]],
  "dopelniacz-negation-masculine": [["Nie mam brat{a}.", "У мене немає брата.", "У меня нет брата."], ["Nie mam telefon{u}.", "У мене немає телефону.", "У меня нет телефона."], ["Nie mam czas{u}.", "У мене немає часу.", "У меня нет времени."]],
  "dopelniacz-feminine": [["Nie piję kaw{y}.", "Я не п'ю кави.", "Я не пью кофе."], ["Szukam prac{y}.", "Я шукаю роботу.", "Я ищу работу."], ["Poproszę szklankę wod{y}.", "Склянку води, будь ласка.", "Стакан воды, пожалуйста."]],
  "dopelniacz-neuter": [["Nie mam dzieck{a}.", "У мене немає дитини.", "У меня нет ребёнка."], ["Nie ma mlek{a}.", "Немає молока.", "Нет молока."], ["Nie znam twojego imieni{a}.", "Я не знаю твого імені.", "Я не знаю твоего имени."]],
  "dopelniacz-do": [["Jadę do Krakow{a}.", "Я їду до Кракова.", "Я еду в Краков."], ["Idę do sklep{u}.", "Я йду до магазину.", "Я иду в магазин."], ["Idę do dom{u}.", "Я йду додому.", "Я иду домой."]],
  "dopelniacz-possession": [["To jest dom brat{a}.", "Це дім брата.", "Это дом брата."], ["To jest telefon moj{ego} syn{a}.", "Це телефон мого сина.", "Это телефон моего сына."], ["To jest kawa siostr{y}.", "Це кава сестри.", "Это кофе сестры."]],
  "dopelniacz-plural": [["Mam pięć telefon{ów}.", "У мене п'ять телефонів.", "У меня пять телефонов."], ["Kilogram jabłek.", "Кілограм яблук.", "Килограмм яблок."], ["Nie mam sióstr.", "У мене немає сестер.", "У меня нет сестёр."]],
  "narzednik-job": [["Jestem kasjer{em}.", "Я касир.", "Я кассир."], ["Ona jest lekark{ą}.", "Вона лікарка.", "Она врач."], ["On jest dobr{ym} kierowc{ą}.", "Він добрий водій.", "Он хороший водитель."]],
  "narzednik-z": [["Idę z brat{em}.", "Я йду з братом.", "Я иду с братом."], ["Piję kawę z mlek{iem}.", "Я п'ю каву з молоком.", "Я пью кофе с молоком."], ["Rozmawiam z siostr{ą}.", "Я розмовляю з сестрою.", "Я разговариваю с сестрой."]],
  "narzednik-tool": [["Płacę telefon{em}.", "Я плачу телефоном.", "Я плачу телефоном."], ["Jadę autobus{em}.", "Я їду автобусом.", "Я еду на автобусе."], ["Interesuję się muzyk{ą}.", "Я цікавлюся музикою.", "Я интересуюсь музыкой."]],
};
export const RULE_BY_CARD: Record<string, string> = {};
const assign = (rule: string, cardIds: string) => cardIds.split(" ").forEach((id) => { RULE_BY_CARD[id] = rule; });
assign("mianownik", "m1 m2 m3 m8 m4 m6"); assign("mianownik-adjective", "m5"); assign("mianownik-plural", "m7");
assign("biernik-animate", "b1 b18 b6 b10"); assign("biernik-inanimate", "b3 b4 b7 b9"); assign("biernik-feminine", "b2 b5 b8 b12");
assign("biernik-a-masculine", "b11"); assign("biernik-plural-virile", "b14 b16"); assign("biernik-plural-other", "b15 b17 b19");
assign("dopelniacz-negation-masculine", "d1 d23 d5 d10 d11 d22 d9"); assign("dopelniacz-feminine", "d2 d4 d6 d8 d12 d15 d21"); assign("dopelniacz-neuter", "d3 d7 d13");
assign("dopelniacz-do", "d14 d16"); assign("dopelniacz-possession", "d17"); assign("dopelniacz-plural", "d18 d19 d20");
assign("narzednik-job", "n1 n2 n5 n6 n7 n9 n10 n11 n12 n15"); assign("narzednik-z", "n8 n14 n16 n17"); assign("narzednik-tool", "n3 n4 n13");

/* B2 and C1 */
Object.assign(RULES, {
  "mianownik-plural-owie": [["To są moi syn{owie}.", "Це мої сини.", "Это мои сыновья."], ["Pan{owie}, proszę!", "Панове, прошу!", "Господа, прошу!"], ["Nasi ojc{owie} pracują.", "Наші тати працюють.", "Наши отцы работают."]],
  "mianownik-plural-adjective": [["Oni są wysoc{y}.", "Вони високі.", "Они высокие."], ["To są polsc{y} studenci.", "Це польські студенти.", "Это польские студенты."], ["Moi bracia są młodz{i}.", "Мої брати молоді.", "Мои братья молодые."]],
  "pluralia": [["Moje spodnie są czarne.", "Мої штани чорні.", "Мои брюки чёрные."], ["Drzwi są otwarte.", "Двері відчинені.", "Дверь открыта."], ["Moje urodziny są w maju.", "Мій день народження в травні.", "Мой день рождения в мае."]],
  "biernik-preposition": [["Czekam na autobus.", "Я чекаю на автобус.", "Я жду автобус."], ["Pytam o drog{ę}.", "Я питаю дорогу.", "Я спрашиваю дорогу."], ["Dziękuję za pomoc.", "Дякую за допомогу.", "Спасибо за помощь."]],
  "biernik-numeral-virile": [["Mam dwóch brac{i}.", "У мене двоє братів.", "У меня два брата."], ["Widzę trzech student{ów}.", "Я бачу трьох студентів.", "Я вижу трёх студентов."], ["Znam czterech Polak{ów}.", "Я знаю чотирьох поляків.", "Я знаю четырёх поляков."]],
  "dopelniacz-verbs": [["Boję się egzamin{u}.", "Я боюся іспиту.", "Я боюсь экзамена."], ["Uczę się język{a} polski{ego}.", "Я вчу польську мову.", "Я учу польский язык."], ["Słucham muzyk{i}.", "Я слухаю музику.", "Я слушаю музыку."]],
  "dopelniacz-prepositions": [["Kawa bez cukr{u}.", "Кава без цукру.", "Кофе без сахара."], ["Mieszkam u siostr{y}.", "Я живу в сестри.", "Я живу у сестры."], ["Jestem z Ukrain{y}.", "Я з України.", "Я из Украины."]],
  "dopelniacz-date": [["Urodziłem się pierwszego maj{a}.", "Я народився першого травня.", "Я родился первого мая."], ["Wracam piątego styczni{a}.", "Я повертаюся п'ятого січня.", "Я возвращаюсь пятого января."], ["Dziś jest dziesiąty listopad{a}.", "Сьогодні десяте листопада.", "Сегодня десятое ноября."]],
  "dopelniacz-plural-irregular": [["Tu jest dużo ludzi.", "Тут багато людей.", "Здесь много людей."], ["Nie mam pieniędzy.", "У мене немає грошей.", "У меня нет денег."], ["Mam troje dzieci.", "У мене троє дітей.", "У меня трое детей."]],
  "narzednik-verbs": [["Zajmuję się marketing{iem}.", "Я займаюся маркетингом.", "Я занимаюсь маркетингом."], ["Opiekuję się młodsz{ą} siostr{ą}.", "Я доглядаю молодшу сестру.", "Я забочусь о младшей сестре."], ["Kieruję firm{ą}.", "Я керую фірмою.", "Я руковожу фирмой."]],
  "narzednik-place": [["Spotkamy się przed kin{em}.", "Зустрінемося перед кінотеатром.", "Встретимся перед кинотеатром."], ["Sklep jest za dom{em}.", "Магазин за будинком.", "Магазин за домом."], ["Lampa wisi nad stoł{em}.", "Лампа висить над столом.", "Лампа висит над столом."]],
  "narzednik-time": [["Zim{ą} jeździmy w góry.", "Взимку ми їздимо в гори.", "Зимой мы ездим в горы."], ["Wiosn{ą} jest ciepło.", "Навесні тепло.", "Весной тепло."], ["Wieczor{em} czytam.", "Увечері я читаю.", "Вечером я читаю."]],
  "biernik-za": [["Uważam go za dobr{ego} przyjaciel{a}.", "Я вважаю його добрим другом.", "Я считаю его хорошим другом."], ["Wzięli mnie za Polak{a}.", "Мене прийняли за поляка.", "Меня приняли за поляка."], ["Uznano go za najlepsz{ego}.", "Його визнали найкращим.", "Его признали лучшим."]],
  "motion-place": [["Kładę książkę pod stół.", "Я кладу книжку під стіл.", "Я кладу книгу под стол."], ["Książka leży pod stoł{em}.", "Книжка лежить під столом.", "Книга лежит под столом."], ["Jadę nad morze. Mieszkam nad morz{em}.", "Їду на море. Живу біля моря.", "Еду на море. Живу у моря."]],
  "biernik-time": [["Pracowałem tam cały rok.", "Я працював там цілий рік.", "Я работал там целый год."], ["Spałem cał{ą} noc.", "Я спав цілу ніч.", "Я спал всю ночь."], ["Czekałem godzin{ę}.", "Я чекав годину.", "Я ждал час."]],
  "dopelniacz-partitive": [["Daj mi chleb{a}.", "Дай мені хліба.", "Дай мне хлеба."], ["Napiję się wod{y}.", "Я вип'ю води.", "Я выпью воды."], ["Kup mlek{a}.", "Купи молока.", "Купи молока."]],
  "dopelniacz-numeral-virile": [["Przyszło pięciu student{ów}.", "Прийшло п'ятеро студентів.", "Пришло пять студентов."], ["Pracuje tu sześciu lekarz{y}.", "Тут працює шестеро лікарів.", "Здесь работает шесть врачей."], ["Czekało dwóch pan{ów}.", "Чекали двоє панів.", "Ждали двое мужчин."]],
  "dopelniacz-prepositions-c1": [["Zostałem w domu z powodu chorob{y}.", "Я лишився вдома через хворобу.", "Я остался дома из-за болезни."], ["Zamiast kaw{y} piję herbatę.", "Замість кави я п'ю чай.", "Вместо кофе я пью чай."], ["W ciągu tygodni{a} skończę.", "Протягом тижня я закінчу.", "В течение недели я закончу."]],
  "negation-keeps": [["Nie jestem lekarz{em}.", "Я не лікар.", "Я не врач."], ["Nie interesuję się polityk{ą}.", "Я не цікавлюся політикою.", "Я не интересуюсь политикой."], ["Nie mieszkam z brat{em}.", "Я не живу з братом.", "Я не живу с братом."]],
  "narzednik-copula": [["Wydaje się mił{ym} człowiek{iem}.", "Він здається милою людиною.", "Он кажется милым человеком."], ["Został dyrektor{em}.", "Він став директором.", "Он стал директором."], ["Stała się gwiazd{ą}.", "Вона стала зіркою.", "Она стала звездой."]],
  "mianownik-to": [["Nasz szef to pan Nowak.", "Наш шеф це пан Новак.", "Наш шеф это пан Новак."], ["Pan Nowak jest nasz{ym} szef{em}.", "Пан Новак наш шеф.", "Пан Новак наш шеф."], ["Moja siostra to lekarka.", "Моя сестра лікарка.", "Моя сестра врач."]],
  "dopelniacz-negation-infinitive": [["Nie chcę pić kaw{y}.", "Я не хочу пити кави.", "Я не хочу пить кофе."], ["Nie mogę znaleźć telefon{u}.", "Я не можу знайти телефон.", "Я не могу найти телефон."], ["Nie lubię czytać gazet.", "Я не люблю читати газети.", "Я не люблю читать газеты."]],
});
assign("mianownik-plural-owie", "m9"); assign("mianownik-plural-adjective", "m10"); assign("pluralia", "m11");
assign("biernik-preposition", "b20 b21 b22"); assign("biernik-numeral-virile", "b23");
assign("dopelniacz-verbs", "d24 d25 d33"); assign("dopelniacz-prepositions", "d26 d27 d28"); assign("dopelniacz-date", "d29"); assign("dopelniacz-plural-irregular", "d30");
assign("narzednik-verbs", "n18 n19"); assign("narzednik-place", "n20"); assign("narzednik-time", "n21");
assign("biernik-za", "b24"); assign("motion-place", "b25 n22"); assign("biernik-time", "b26");
assign("dopelniacz-partitive", "d31 d32"); assign("dopelniacz-numeral-virile", "d34"); assign("dopelniacz-prepositions-c1", "d35");
assign("negation-keeps", "n23 n24"); assign("narzednik-copula", "n25"); assign("mianownik-to", "m12"); assign("dopelniacz-negation-infinitive", "d36");

/** What to look at first in a sentence, per rule (used by hints) */
export const RULE_TRIGGERS: Record<string, string> = {
  "mianownik": "To jest", "mianownik-adjective": "On jest + przymiotnik", "mianownik-plural": "To są", "biernik-animate": "mam, widzę, kocham + osoba",
  "biernik-inanimate": "mam, kupuję, jem + rzecz", "biernik-feminine": "mam, piję, widzę + rodzaj żeński", "biernik-a-masculine": "kocham + tata, kolega",
  "biernik-plural-virile": "widzę + mężczyźni", "biernik-plural-other": "mam, kupuję + liczba mnoga", "dopelniacz-negation-masculine": "nie mam, nie ma",
  "dopelniacz-feminine": "nie, szukać, szklanka", "dopelniacz-neuter": "nie + rodzaj nijaki", "dopelniacz-do": "do", "dopelniacz-possession": "czyj?",
  "dopelniacz-plural": "pięć, kilogram, nie mam + liczba mnoga", "narzednik-job": "jestem, jest + kim?", "narzednik-z": "z (z kim? z czym?)",
  "narzednik-tool": "płacę, jadę, interesuję się", "mianownik-plural-owie": "To są + mężczyźni", "mianownik-plural-adjective": "Oni są + przymiotnik",
  "pluralia": "podmiot, tylko liczba mnoga", "biernik-preposition": "na, o, za, przez", "biernik-numeral-virile": "dwóch, trzech + mężczyźni",
  "dopelniacz-verbs": "bać się, uczyć się, spodziewać się", "dopelniacz-prepositions": "bez, u, z, dla, od", "dopelniacz-date": "data",
  "dopelniacz-plural-irregular": "dużo + liczba mnoga", "narzednik-verbs": "zajmować się, opiekować się", "narzednik-place": "przed, za, nad, pod: gdzie?",
  "narzednik-time": "pora roku: kiedy?", "biernik-za": "uważać za", "motion-place": "pod: dokąd czy gdzie?", "biernik-time": "jak długo?",
  "dopelniacz-partitive": "trochę, napić się", "dopelniacz-numeral-virile": "pięciu + mężczyźni", "dopelniacz-prepositions-c1": "z powodu, zamiast",
  "negation-keeps": "nie + Narzędnik", "narzednik-copula": "wydawać się, zostać", "mianownik-to": "X to Y", "dopelniacz-negation-infinitive": "nie chcę + bezokolicznik",
};
