import type { Language } from "../i18n/language";
import type { Level } from "./levels";

export type TheoryKey = "base" | "mianownik" | "biernik" | "dopelniacz" | "narzednik" | "cheatSheet";
export const THEORY_KEYS: TheoryKey[] = ["base", "mianownik", "biernik", "dopelniacz", "narzednik", "cheatSheet"];

/** One theory block, shown from `minLevel` up to `maxLevel`. Text uses {ending} and [[term|shown]] markup. */
export interface Block {
  minLevel: Level;
  maxLevel?: Level;
  paragraph?: string;
  note?: string;
  examples?: [string, string?][];
  table?: { header: string[]; rows: string[][] };
}

const CHEAT_ROWS: string[][] = [
  ["[[mianownik|Mianownik]]", "dobry syn", "dobra kawa", "dobre dziecko"],
  ["[[biernik|Biernik]]", "dobr{ego} syn{a}", "dobr{ą} kaw{ę}", "dobr{e} dziecko"],
  ["[[dopelniacz|Dopełniacz]]", "dobr{ego} syn{a}", "dobr{ej} kaw{y}", "dobr{ego} dzieck{a}"],
  ["[[narzednik|Narzędnik]]", "dobr{ym} syn{em}", "dobr{ą} kaw{ą}", "dobr{ym} dzieck{iem}"],
];

export const THEORY = {} as Record<Language, Record<TheoryKey, Block[]>>;
THEORY.uk = {
  base: [
    { minLevel: "A0", maxLevel: "A0", paragraph: "[[case|Відмінок]] це форма слова. Українською ти кажеш «бачу сестру», «немає сестри», «з сестрою»: слово одне, а [[ending|закінчення]] змінюється. У польській усе так само, і відмінки майже збігаються з українськими." },
    { minLevel: "A1", paragraph: "[[case|Відмінок]] показує роль слова в реченні. На дошці було чотири відмінки із семи, найпотрібніші для розмови. Вони майже збігаються з українськими, тож спирайся на рідну мову." },
    { minLevel: "A0", maxLevel: "A0", paragraph: "Спершу навчись бачити [[gender|рід]] слова. Дивись на останню літеру:" },
    { minLevel: "A0", table: { header: ["[[gender|Рід]]", "[[wordEnd|Koniec słowa]]", "[[examples|Przykłady]]"], rows: [
      ["[[masculine|Чоловічий]], R.M.", "[[consonant|приголосна]]", "syn, dom, telefon"],
      ["[[feminine|Жіночий]], R.Ż.", "{-a}", "kaw{a}, prac{a}, siostr{a}"],
      ["[[neuter|Середній]], R.N.", "{-o}, {-e}", "jabłk{o}, dzieck{o}, mlek{o}"],
    ] } },
    { minLevel: "A1", paragraph: "[[adjective|Прикметник]] повторює рід [[noun|іменника]]: dobr{y} syn, dobr{a} kawa, dobr{e} dziecko." },
    { minLevel: "A2", table: { header: ["[[exception|Wyjątek]]", "Як виглядає", "[[examples|Przykłady]]"], rows: [
      ["[[masculine|Чоловічий]] на -a", "-a, але це чоловік", "tat{a}, programist{a}, mężczyzn{a}"],
      ["[[feminine|Жіночий]] на [[consonant|приголосну]]", "без -a", "noc, pomoc"],
      ["[[feminine|Жіночий]] на -i", "-i", "pan{i}"],
      ["[[neuter|Середній]] на -um, -ę", "-um, -ę", "muze{um}, imi{ę}"],
    ] } },
    { minLevel: "A2", note: "Слова [[masculine|чоловічого роду]] на -a (tata, programista) змінюють [[ending|закінчення]] як жіночі, а [[adjective|прикметник]] у них чоловічий: dobr{ym} programist{ą}." },
    { minLevel: "B1", paragraph: "У [[plural|множині]] головний поділ інший: чоловіки-люди ([[virile|męskoosobowe]]) і все інше. Mężczyzna стає mężczyź{ni}, а telefon стає telefon{y}." },
    { minLevel: "A0", note: "Telefon наочно показує закінчення, вони просто додаються в кінці: telefon, telefon{u}, telefon{em}, telefon{y}. Nie mam telefonu, Płacę telefonem, Mam dwa telefony." },
    { minLevel: "A0", maxLevel: "A0", note: "Не вчи все одразу. Почни з двох відмінків: Biernik (mam syna) і Narzędnik (jestem kasjerem). Вони потрібні майже в кожній розмові." },
  ],
  mianownik: [
    { minLevel: "A0", maxLevel: "A0", paragraph: "Це [[base|початкова форма]]: так слово записане у словнику, з неї все починається. kto? co? (хто? що?)." },
    { minLevel: "A1", paragraph: "[[base|Початкова форма]]. [[subject|Підмет]] і все, що йде після «To jest». kto? co?" },
    { minLevel: "A0", examples: [["To jest syn.", "Це син."], ["To jest telefon.", "Це телефон."], ["To jest kawa.", "Це кава."], ["To jest jabłko.", "Це яблуко."]] },
    { minLevel: "A0", maxLevel: "A0", note: "Після «To jest» слово завжди у початковій формі. Нічого змінювати не треба." },
    { minLevel: "A1", table: { header: ["", "[[masculine|Чоловічий]]", "[[feminine|Жіночий]]", "[[neuter|Середній]]"], rows: [
      ["[[adjective|Прикметник]]", "dobr{y}", "dobr{a}", "dobr{e}"],
      ["[[noun|Іменник]]", "syn", "kaw{a}", "dzieck{o}"],
    ] } },
    { minLevel: "A1", examples: [["To jest czerwone jabłko.", "Це червоне яблуко."], ["On jest szybki.", "Він швидкий."]] },
    { minLevel: "A1", note: "Пастка: після «On jest» сам [[adjective|прикметник]] лишається в Mianownik (On jest szybki), а [[noun|іменник]] іде в Narzędnik (On jest kasjerem). Як українською: «він був касиром»." },
    { minLevel: "A2", table: { header: ["[[gender|Рід]]", "[[ending|Закінчення]]", "[[examples|Przykłady]]"], rows: [
      ["[[masculine|Чоловічий]]", "[[consonant|приголосна]], -a", "syn, tat{a}, programist{a}"],
      ["[[feminine|Жіночий]]", "-a, -i, [[consonant|приголосна]]", "kaw{a}, pan{i}, noc"],
      ["[[neuter|Середній]]", "-o, -e, -um, -ę", "jabłk{o}, morz{e}, muze{um}, imi{ę}"],
    ] } },
    { minLevel: "B1", table: { header: ["[[plural|Множина]]", "[[ending|Закінчення]]", "[[examples|Przykłady]]"], rows: [
      ["Чоловіки-люди", "-i, -y, -owie", "mężczyź{ni}, studen{ci}, pan{owie}"],
      ["Інші ч. і ж.", "-y, -i, -e", "telefon{y}, kaw{y}, pan{ie}"],
      ["[[neuter|Середній]]", "-a", "jabłk{a}, okn{a}"],
    ] } },
    { minLevel: "B1", examples: [["Oni są dobrzy.", "Вони добрі (чоловіки)."], ["One są dobre.", "Вони добрі (жінки, тварини, речі)."]] },
  ],
  biernik: [
    { minLevel: "A0", maxLevel: "A0", paragraph: "Кого або що ти маєш, бачиш, любиш, купуєш. Як українською: «бачу сестру», «люблю каву». kogo? co? (кого? що?)." },
    { minLevel: "A1", paragraph: "[[directObject|Прямий додаток]]: mam, widzę, lubię, kocham, kupuję, jem, piję, znam. kogo? co?" },
    { minLevel: "A0", maxLevel: "A0", table: { header: ["[[gender|Рід]]", "Було", "Стало"], rows: [
      ["[[feminine|Жіночий]]", "kawa", "kaw{ę}"],
      ["[[masculine|Чоловічий]] [[animate|живий]]", "syn", "syn{a}"],
      ["[[masculine|Чоловічий]] [[inanimate|неживий]]", "dom", "dom, не змінюється"],
      ["[[neuter|Середній]]", "jabłko", "jabłko, не змінюється"],
    ] } },
    { minLevel: "A0", maxLevel: "A0", examples: [["Mam syna.", "У мене є син."], ["Mam brata.", "У мене є брат."], ["Mam siostrę.", "У мене є сестра."], ["Piję kawę.", "Я п'ю каву."], ["Mam dom.", "У мене є дім."]] },
    { minLevel: "A0", maxLevel: "A0", note: "Запам'ятай одне: kawa стає kawę, syn стає syna. Дім і яблуко не змінюються." },
    { minLevel: "A1", table: { header: ["", "[[adjective|Прикм.]]", "[[noun|Ім.]]", "[[example|Przykład]]"], rows: [
      ["[[masculine|Чол.]] [[animate|живий]]", "{-ego}", "{-a}", "dobr{ego} brat{a}"],
      ["[[masculine|Чол.]] [[inanimate|неживий]]", "як у словнику", "як у словнику", "nowy dom"],
      ["[[feminine|Жіночий]]", "{-ą}", "{-ę}", "dobr{ą} kaw{ę}"],
      ["[[neuter|Середній]]", "{-e}", "як у словнику", "dobr{e} dziecko"],
    ] } },
    { minLevel: "A1", examples: [["Mam dobrego brata.", "У мене добрий брат."], ["Widzę ładną kobietę.", "Я бачу гарну жінку."], ["Kupuję białe mleko.", "Я купую біле молоко."]] },
    { minLevel: "A1", note: "Головне правило: [[neuter|середній рід]] і [[inanimate|неживий]] [[masculine|чоловічий]] у Biernik не змінюються. Змінюються живі чоловічі (-a) і [[feminine|жіночий рід]] (-ę)." },
    { minLevel: "A2", table: { header: ["[[exception|Wyjątek]]", "[[adjective|Прикм.]]", "[[noun|Ім.]]", "[[example|Przykład]]"], rows: [
      ["[[masculine|Чол.]] на -a", "{-ego}", "{-ę}", "moj{ego} tat{ę}"],
      ["[[feminine|Жін.]] на [[consonant|приголосну]]", "{-ą}", "не змінюється", "ciepł{ą} noc"],
    ] } },
    { minLevel: "A2", note: "Після «nie» Biernik перетворюється на Dopełniacz: Mam kawę, але Nie mam kawy. Це одна з найчастіших помилок." },
    { minLevel: "B1", paragraph: "У [[plural|множині]] чоловіки-люди беруть форму Dopełniacz: Mam dobr{ych} rodzic{ów}. Усе інше виглядає як Mianownik: Mam now{e} telefon{y}." },
    { minLevel: "B1", examples: [["Widzę polskich studentów.", "Я бачу польських студентів."], ["Widzę polskie studentki.", "Я бачу польських студенток."]] },
  ],
  dopelniacz: [
    { minLevel: "A0", maxLevel: "A0", paragraph: "Коли чогось немає. Як українською: «немає кави», «немає телефону». kogo? czego? (кого? чого?)." },
    { minLevel: "A1", paragraph: "Відсутність, належність, кількість і низка [[verb|дієслів]]. kogo? czego?" },
    { minLevel: "A0", maxLevel: "A0", table: { header: ["[[gender|Рід]]", "Є", "Немає"], rows: [
      ["[[feminine|Жіночий]]", "kawa", "nie ma kaw{y}"],
      ["[[masculine|Чоловічий]]", "syn", "nie ma syn{a}"],
      ["[[neuter|Середній]]", "dziecko", "nie ma dzieck{a}"],
    ] } },
    { minLevel: "A0", maxLevel: "A0", examples: [["Nie mam syna.", "У мене немає сина."], ["Nie mam brata.", "У мене немає брата."], ["Nie piję kawy.", "Я не п'ю кави."], ["Szukam pracy.", "Я шукаю роботу."]] },
    { minLevel: "A0", maxLevel: "A0", note: "Слово «nie» перед [[verb|дієсловом]] майже завжди вмикає цей відмінок: Mam kawę, але Nie mam kawy. І запам'ятай: szukam pracy, хоча українською «шукаю роботу»." },
    { minLevel: "A1", table: { header: ["", "[[adjective|Прикм.]]", "[[noun|Ім.]]", "[[example|Przykład]]"], rows: [
      ["[[masculine|Чоловічий]]", "{-ego}", "{-a} або {-u}", "now{ego} telefon{u}"],
      ["[[feminine|Жіночий]]", "{-ej}", "{-y} або {-i}", "now{ej} prac{y}"],
      ["[[neuter|Середній]]", "{-ego}", "{-a}", "mał{ego} dzieck{a}"],
    ] } },
    { minLevel: "A1", note: "Де потрібен Dopełniacz: після nie (nie mam), після szukać і potrzebować, щоб сказати «чий» (dom brata, дім брата), після dużo, mało, kilogram, szklanka і після [[preposition|прийменника]] do (do sklepu)." },
    { minLevel: "A2", paragraph: "[[masculine|Чоловічий рід]]: -a чи -u? [[animate|Живе]] завжди -a: syn{a}, brat{a}. Предмети частіше -u: dom{u}, czas{u}, telefon{u}. Винятки запам'ятовуються з часом: chleb{a}, Krakow{a}." },
    { minLevel: "A2", paragraph: "[[feminine|Жіночий рід]]: -y чи -i? Після k, g і [[softConsonant|м'яких приголосних]] пишеться -i: książk{i}, pan{i}. Інакше -y: ryb{y}, prac{y}, noc{y}." },
    { minLevel: "A2", examples: [["Jadę do Krakowa.", "Я їду до Кракова."], ["Poproszę szklankę wody.", "Склянку води, будь ласка."], ["Nie znam twojego imienia.", "Я не знаю твого імені."]] },
    { minLevel: "B1", table: { header: ["[[plural|Множина]]", "[[ending|Закінчення]]", "[[examples|Przykłady]]"], rows: [
      ["[[masculine|Чоловічий]]", "{-ów} або {-i}", "telefon{ów}, nauczyciel{i}"],
      ["[[feminine|Жіночий]]", "без закінчення", "mam, sióstr"],
      ["[[neuter|Середній]]", "без закінчення", "jabłek, okien"],
    ] } },
    { minLevel: "B1", note: "Після [[numeral|числівників]] від 5 і більше теж Dopełniacz множини: pięć telefon{ów}, kilogram jabłek. Як українською: п'ять телефонів." },
  ],
  narzednik: [
    { minLevel: "A0", maxLevel: "A0", paragraph: "Ким ти є і з ким ти. Як українською: «працюю касиром», «плачу телефоном». kim? czym? (ким? чим?)." },
    { minLevel: "A1", paragraph: "Ким є людина, з ким або з чим, чим їдемо. kim? czym?" },
    { minLevel: "A0", maxLevel: "A0", table: { header: ["[[gender|Рід]]", "Було", "Стало"], rows: [
      ["[[masculine|Чоловічий]]", "kasjer", "kasjer{em}"],
      ["[[feminine|Жіночий]]", "siostra", "siostr{ą}"],
      ["[[neuter|Середній]]", "dziecko", "dzieck{iem}"],
    ] } },
    { minLevel: "A0", maxLevel: "A0", examples: [["Jestem kasjerem.", "Я касир."], ["Ona jest lekarką.", "Вона лікарка."], ["Płacę telefonem.", "Я плачу телефоном."], ["Jadę autobusem.", "Я їду автобусом."]] },
    { minLevel: "A0", maxLevel: "A0", note: "Професія після «jestem» завжди в цьому відмінку: Jestem kasjerem, Jestem kelnerem. Як українською «працюю касиром»." },
    { minLevel: "A1", table: { header: ["", "[[adjective|Прикм.]]", "[[noun|Ім.]]", "[[example|Przykład]]"], rows: [
      ["[[masculine|Чоловічий]]", "{-ym}", "{-em}", "dobr{ym} syn{em}"],
      ["[[feminine|Жіночий]]", "{-ą}", "{-ą}", "dobr{ą} kaw{ą}"],
      ["[[neuter|Середній]]", "{-ym}", "{-em}", "dobr{ym} dzieck{iem}"],
    ] } },
    { minLevel: "A1", examples: [["Jestem starszym kasjerem.", "Я старший касир."], ["Ona jest dobrą lekarką.", "Вона добра лікарка."], ["Ono jest dobrym dzieckiem.", "Воно добра дитина."]] },
    { minLevel: "A1", note: "Найчастіша плутанина. To jest lekarz: Mianownik. On jest lekarzem: Narzędnik. On jest dobry: знову Mianownik, бо там лише [[adjective|прикметник]]." },
    { minLevel: "A2", paragraph: "Після k і g додається i: Polak{iem}, wysok{im}. Слова [[masculine|чоловічого роду]] на -a беруть -ą: dobr{ym} programist{ą}, wysok{im} mężczyzn{ą}." },
    { minLevel: "A2", note: "Де ще потрібен Narzędnik: [[preposition|прийменник]] z (z bratem), транспорт (jadę autobusem), interesować się (interesuję się muzyką), zostać (został lekarzem)." },
    { minLevel: "B1", table: { header: ["[[plural|Множина]]", "[[adjective|Прикм.]]", "[[noun|Ім.]]", "[[example|Przykład]]"], rows: [
      ["Усі роди", "{-ymi} / {-imi}", "{-ami}", "z now{ymi} koleg{ami}"],
      ["[[exception|Wyjątek]]", "{-ymi}", "{-mi}", "z mał{ymi} dzieć{mi}"],
    ] } },
  ],
  cheatSheet: [
    { minLevel: "A1", paragraph: "Одна трійка слів через усі чотири відмінки. Видно, що [[masculine|чоловічий]] і [[neuter|середній]] майже збігаються, тож учити менше, ніж здається." },
    { minLevel: "A1", table: { header: ["", "[[masculine|Чоловічий]]", "[[feminine|Жіночий]]", "[[neuter|Середній]]"], rows: CHEAT_ROWS } },
    { minLevel: "A1", note: "Як обрати відмінок: To jest X, отже Mianownik. Mam, widzę, lubię X, отже Biernik. Nie mam X, szukam X, отже Dopełniacz. Jestem X ([[noun|іменник]]) або z X, отже Narzędnik." },
  ],
};
THEORY.ru = {
  base: [
    { minLevel: "A0", maxLevel: "A0", paragraph: "[[case|Падеж]] это форма слова. По-русски ты говоришь «вижу сестру», «нет сестры», «с сестрой»: слово одно, а [[ending|окончание]] меняется. В польском всё так же, и падежи почти совпадают с русскими." },
    { minLevel: "A1", paragraph: "[[case|Падеж]] показывает роль слова в предложении. На доске было четыре падежа из семи, самые нужные для разговора. Они почти совпадают с русскими, поэтому опирайся на родной язык." },
    { minLevel: "A0", maxLevel: "A0", paragraph: "Сначала научись видеть [[gender|род]] слова. Смотри на последнюю букву:" },
    { minLevel: "A0", table: { header: ["[[gender|Род]]", "[[wordEnd|Koniec słowa]]", "[[examples|Przykłady]]"], rows: [
      ["[[masculine|Мужской]], R.M.", "[[consonant|согласная]]", "syn, dom, telefon"],
      ["[[feminine|Женский]], R.Ż.", "{-a}", "kaw{a}, prac{a}, siostr{a}"],
      ["[[neuter|Средний]], R.N.", "{-o}, {-e}", "jabłk{o}, dzieck{o}, mlek{o}"],
    ] } },
    { minLevel: "A1", paragraph: "[[adjective|Прилагательное]] повторяет род [[noun|существительного]]: dobr{y} syn, dobr{a} kawa, dobr{e} dziecko." },
    { minLevel: "A2", table: { header: ["[[exception|Wyjątek]]", "Как выглядит", "[[examples|Przykłady]]"], rows: [
      ["[[masculine|Мужской]] на -a", "-a, но это мужчина", "tat{a}, programist{a}, mężczyzn{a}"],
      ["[[feminine|Женский]] на [[consonant|согласную]]", "без -a", "noc, pomoc"],
      ["[[feminine|Женский]] на -i", "-i", "pan{i}"],
      ["[[neuter|Средний]] на -um, -ę", "-um, -ę", "muze{um}, imi{ę}"],
    ] } },
    { minLevel: "A2", note: "Слова [[masculine|мужского рода]] на -a (tata, programista) меняют [[ending|окончание]] как женские, а [[adjective|прилагательное]] у них мужское: dobr{ym} programist{ą}." },
    { minLevel: "B1", paragraph: "Во [[plural|множественном числе]] главное деление другое: мужчины-люди ([[virile|męskoosobowe]]) и всё остальное. Mężczyzna становится mężczyź{ni}, а telefon становится telefon{y}." },
    { minLevel: "A0", note: "Telefon наглядно показывает окончания, они просто добавляются в конце: telefon, telefon{u}, telefon{em}, telefon{y}. Nie mam telefonu, Płacę telefonem, Mam dwa telefony." },
    { minLevel: "A0", maxLevel: "A0", note: "Не учи всё сразу. Начни с двух падежей: Biernik (mam syna) и Narzędnik (jestem kasjerem). Они нужны почти в каждом разговоре." },
  ],
  mianownik: [
    { minLevel: "A0", maxLevel: "A0", paragraph: "Это [[base|начальная форма]]: так слово записано в словаре, с неё всё начинается. kto? co? (кто? что?)." },
    { minLevel: "A1", paragraph: "[[base|Начальная форма]]. [[subject|Подлежащее]] и всё, что идёт после «To jest». kto? co?" },
    { minLevel: "A0", examples: [["To jest syn.", "Это сын."], ["To jest telefon.", "Это телефон."], ["To jest kawa.", "Это кофе."], ["To jest jabłko.", "Это яблоко."]] },
    { minLevel: "A0", maxLevel: "A0", note: "После «To jest» слово всегда в начальной форме. Ничего менять не нужно." },
    { minLevel: "A1", table: { header: ["", "[[masculine|Мужской]]", "[[feminine|Женский]]", "[[neuter|Средний]]"], rows: [
      ["[[adjective|Прилагательное]]", "dobr{y}", "dobr{a}", "dobr{e}"],
      ["[[noun|Существительное]]", "syn", "kaw{a}", "dzieck{o}"],
    ] } },
    { minLevel: "A1", examples: [["To jest czerwone jabłko.", "Это красное яблоко."], ["On jest szybki.", "Он быстрый."]] },
    { minLevel: "A1", note: "Ловушка: после «On jest» одно [[adjective|прилагательное]] остаётся в Mianownik (On jest szybki), а [[noun|существительное]] уходит в Narzędnik (On jest kasjerem). Как по-русски: «он был кассиром»." },
    { minLevel: "A2", table: { header: ["[[gender|Род]]", "[[ending|Окончания]]", "[[examples|Przykłady]]"], rows: [
      ["[[masculine|Мужской]]", "[[consonant|согласная]], -a", "syn, tat{a}, programist{a}"],
      ["[[feminine|Женский]]", "-a, -i, [[consonant|согласная]]", "kaw{a}, pan{i}, noc"],
      ["[[neuter|Средний]]", "-o, -e, -um, -ę", "jabłk{o}, morz{e}, muze{um}, imi{ę}"],
    ] } },
    { minLevel: "B1", table: { header: ["[[plural|Мн. число]]", "[[ending|Окончания]]", "[[examples|Przykłady]]"], rows: [
      ["Мужчины-люди", "-i, -y, -owie", "mężczyź{ni}, studen{ci}, pan{owie}"],
      ["Остальные м. и ж.", "-y, -i, -e", "telefon{y}, kaw{y}, pan{ie}"],
      ["[[neuter|Средний]]", "-a", "jabłk{a}, okn{a}"],
    ] } },
    { minLevel: "B1", examples: [["Oni są dobrzy.", "Они хорошие (мужчины)."], ["One są dobre.", "Они хорошие (женщины, животные, вещи)."]] },
  ],
  biernik: [
    { minLevel: "A0", maxLevel: "A0", paragraph: "Кого или что ты имеешь, видишь, любишь, покупаешь. Как по-русски: «вижу сестру», «люблю кофе». kogo? co? (кого? что?)." },
    { minLevel: "A1", paragraph: "[[directObject|Прямое дополнение]]: mam, widzę, lubię, kocham, kupuję, jem, piję, znam. kogo? co?" },
    { minLevel: "A0", maxLevel: "A0", table: { header: ["[[gender|Род]]", "Было", "Стало"], rows: [
      ["[[feminine|Женский]]", "kawa", "kaw{ę}"],
      ["[[masculine|Мужской]] [[animate|живой]]", "syn", "syn{a}"],
      ["[[masculine|Мужской]] [[inanimate|неживой]]", "dom", "dom, не меняется"],
      ["[[neuter|Средний]]", "jabłko", "jabłko, не меняется"],
    ] } },
    { minLevel: "A0", maxLevel: "A0", examples: [["Mam syna.", "У меня есть сын."], ["Mam brata.", "У меня есть брат."], ["Mam siostrę.", "У меня есть сестра."], ["Piję kawę.", "Я пью кофе."], ["Mam dom.", "У меня есть дом."]] },
    { minLevel: "A0", maxLevel: "A0", note: "Запомни одно: kawa становится kawę, syn становится syna. Дом и яблоко не меняются." },
    { minLevel: "A1", table: { header: ["", "[[adjective|Прилаг.]]", "[[noun|Сущ.]]", "[[example|Przykład]]"], rows: [
      ["[[masculine|Муж.]] [[animate|живой]]", "{-ego}", "{-a}", "dobr{ego} brat{a}"],
      ["[[masculine|Муж.]] [[inanimate|неживой]]", "как в словаре", "как в словаре", "nowy dom"],
      ["[[feminine|Женский]]", "{-ą}", "{-ę}", "dobr{ą} kaw{ę}"],
      ["[[neuter|Средний]]", "{-e}", "как в словаре", "dobr{e} dziecko"],
    ] } },
    { minLevel: "A1", examples: [["Mam dobrego brata.", "У меня хороший брат."], ["Widzę ładną kobietę.", "Я вижу красивую женщину."], ["Kupuję białe mleko.", "Я покупаю белое молоко."]] },
    { minLevel: "A1", note: "Главное правило: [[neuter|средний род]] и [[inanimate|неживой]] [[masculine|мужской]] в Biernik не меняются. Меняются живые мужские (-a) и [[feminine|женский род]] (-ę)." },
    { minLevel: "A2", table: { header: ["[[exception|Wyjątek]]", "[[adjective|Прилаг.]]", "[[noun|Сущ.]]", "[[example|Przykład]]"], rows: [
      ["[[masculine|Муж.]] на -a", "{-ego}", "{-ę}", "moj{ego} tat{ę}"],
      ["[[feminine|Жен.]] на [[consonant|согласную]]", "{-ą}", "не меняется", "ciepł{ą} noc"],
    ] } },
    { minLevel: "A2", note: "После «nie» Biernik превращается в Dopełniacz: Mam kawę, но Nie mam kawy. Это одна из самых частых ошибок." },
    { minLevel: "B1", paragraph: "Во [[plural|множественном]] мужчины-люди берут форму Dopełniacz: Mam dobr{ych} rodzic{ów}. Всё остальное выглядит как Mianownik: Mam now{e} telefon{y}." },
    { minLevel: "B1", examples: [["Widzę polskich studentów.", "Я вижу польских студентов."], ["Widzę polskie studentki.", "Я вижу польских студенток."]] },
  ],
  dopelniacz: [
    { minLevel: "A0", maxLevel: "A0", paragraph: "Когда чего-то нет. Как по-русски: «нет кофе», «нет телефона». kogo? czego? (кого? чего?)." },
    { minLevel: "A1", paragraph: "Отсутствие, принадлежность, количество и ряд [[verb|глаголов]]. kogo? czego?" },
    { minLevel: "A0", maxLevel: "A0", table: { header: ["[[gender|Род]]", "Есть", "Нет"], rows: [
      ["[[feminine|Женский]]", "kawa", "nie ma kaw{y}"],
      ["[[masculine|Мужской]]", "syn", "nie ma syn{a}"],
      ["[[neuter|Средний]]", "dziecko", "nie ma dzieck{a}"],
    ] } },
    { minLevel: "A0", maxLevel: "A0", examples: [["Nie mam syna.", "У меня нет сына."], ["Nie mam brata.", "У меня нет брата."], ["Nie piję kawy.", "Я не пью кофе."], ["Szukam pracy.", "Я ищу работу."]] },
    { minLevel: "A0", maxLevel: "A0", note: "Слово «nie» перед [[verb|глаголом]] почти всегда включает этот падеж: Mam kawę, но Nie mam kawy. И запомни: szukam pracy, хотя по-русски «ищу работу»." },
    { minLevel: "A1", table: { header: ["", "[[adjective|Прилаг.]]", "[[noun|Сущ.]]", "[[example|Przykład]]"], rows: [
      ["[[masculine|Мужской]]", "{-ego}", "{-a} или {-u}", "now{ego} telefon{u}"],
      ["[[feminine|Женский]]", "{-ej}", "{-y} или {-i}", "now{ej} prac{y}"],
      ["[[neuter|Средний]]", "{-ego}", "{-a}", "mał{ego} dzieck{a}"],
    ] } },
    { minLevel: "A1", note: "Где нужен Dopełniacz: после nie (nie mam), после szukać и potrzebować, чтобы сказать «чей» (dom brata, дом брата), после dużo, mało, kilogram, szklanka и после [[preposition|предлога]] do (do sklepu)." },
    { minLevel: "A2", paragraph: "[[masculine|Мужской род]]: -a или -u? [[animate|Живое]] всегда -a: syn{a}, brat{a}. Предметы чаще -u: dom{u}, czas{u}, telefon{u}. Исключения учатся по ходу: chleb{a}, Krakow{a}." },
    { minLevel: "A2", paragraph: "[[feminine|Женский род]]: -y или -i? После k, g и [[softConsonant|мягких согласных]] пишется -i: książk{i}, pan{i}. Иначе -y: ryb{y}, prac{y}, noc{y}." },
    { minLevel: "A2", examples: [["Jadę do Krakowa.", "Я еду в Краков."], ["Poproszę szklankę wody.", "Стакан воды, пожалуйста."], ["Nie znam twojego imienia.", "Я не знаю твоего имени."]] },
    { minLevel: "B1", table: { header: ["[[plural|Мн. число]]", "[[ending|Окончание]]", "[[examples|Przykłady]]"], rows: [
      ["[[masculine|Мужской]]", "{-ów} или {-i}", "telefon{ów}, nauczyciel{i}"],
      ["[[feminine|Женский]]", "без окончания", "mam, sióstr"],
      ["[[neuter|Средний]]", "без окончания", "jabłek, okien"],
    ] } },
    { minLevel: "B1", note: "После [[numeral|числительных]] от 5 и больше тоже Dopełniacz множественного: pięć telefon{ów}, kilogram jabłek. Как по-русски: пять телефонов." },
  ],
  narzednik: [
    { minLevel: "A0", maxLevel: "A0", paragraph: "Кем ты являешься и с кем ты. Как по-русски: «работаю кассиром», «плачу телефоном». kim? czym? (кем? чем?)." },
    { minLevel: "A1", paragraph: "Кем является человек, с кем или с чем, на чём едем. kim? czym?" },
    { minLevel: "A0", maxLevel: "A0", table: { header: ["[[gender|Род]]", "Было", "Стало"], rows: [
      ["[[masculine|Мужской]]", "kasjer", "kasjer{em}"],
      ["[[feminine|Женский]]", "siostra", "siostr{ą}"],
      ["[[neuter|Средний]]", "dziecko", "dzieck{iem}"],
    ] } },
    { minLevel: "A0", maxLevel: "A0", examples: [["Jestem kasjerem.", "Я кассир."], ["Ona jest lekarką.", "Она врач."], ["Płacę telefonem.", "Я плачу телефоном."], ["Jadę autobusem.", "Я еду на автобусе."]] },
    { minLevel: "A0", maxLevel: "A0", note: "Профессия после «jestem» всегда в этом падеже: Jestem kasjerem, Jestem kelnerem. Как по-русски «работаю кассиром»." },
    { minLevel: "A1", table: { header: ["", "[[adjective|Прилаг.]]", "[[noun|Сущ.]]", "[[example|Przykład]]"], rows: [
      ["[[masculine|Мужской]]", "{-ym}", "{-em}", "dobr{ym} syn{em}"],
      ["[[feminine|Женский]]", "{-ą}", "{-ą}", "dobr{ą} kaw{ą}"],
      ["[[neuter|Средний]]", "{-ym}", "{-em}", "dobr{ym} dzieck{iem}"],
    ] } },
    { minLevel: "A1", examples: [["Jestem starszym kasjerem.", "Я старший кассир."], ["Ona jest dobrą lekarką.", "Она хороший врач."], ["Ono jest dobrym dzieckiem.", "Оно хороший ребёнок."]] },
    { minLevel: "A1", note: "Самая частая путаница. To jest lekarz: Mianownik. On jest lekarzem: Narzędnik. On jest dobry: снова Mianownik, потому что там только [[adjective|прилагательное]]." },
    { minLevel: "A2", paragraph: "После k и g добавляется i: Polak{iem}, wysok{im}. Слова [[masculine|мужского рода]] на -a берут -ą: dobr{ym} programist{ą}, wysok{im} mężczyzn{ą}." },
    { minLevel: "A2", note: "Где ещё нужен Narzędnik: [[preposition|предлог]] z (z bratem), транспорт (jadę autobusem), interesować się (interesuję się muzyką), zostać (został lekarzem)." },
    { minLevel: "B1", table: { header: ["[[plural|Мн. число]]", "[[adjective|Прилаг.]]", "[[noun|Сущ.]]", "[[example|Przykład]]"], rows: [
      ["Все роды", "{-ymi} / {-imi}", "{-ami}", "z now{ymi} koleg{ami}"],
      ["[[exception|Wyjątek]]", "{-ymi}", "{-mi}", "z mał{ymi} dzieć{mi}"],
    ] } },
  ],
  cheatSheet: [
    { minLevel: "A1", paragraph: "Одна тройка слов через все четыре падежа. Видно, что [[masculine|мужской]] и [[neuter|средний]] почти совпадают, значит учить меньше, чем кажется." },
    { minLevel: "A1", table: { header: ["", "[[masculine|Мужской]]", "[[feminine|Женский]]", "[[neuter|Средний]]"], rows: CHEAT_ROWS } },
    { minLevel: "A1", note: "Как выбрать падеж: To jest X, значит Mianownik. Mam, widzę, lubię X, значит Biernik. Nie mam X, szukam X, значит Dopełniacz. Jestem X ([[noun|существительное]]) или z X, значит Narzędnik." },
  ],
};
THEORY.pl = {
  base: [
    { minLevel: "A0", maxLevel: "A0", paragraph: "[[case|Przypadek]] to forma słowa. Mówisz «widzę siostrę», «nie ma siostry», «z siostrą»: słowo jest jedno, a [[ending|końcówka]] się zmienia." },
    { minLevel: "A1", paragraph: "[[case|Przypadek]] pokazuje rolę słowa w zdaniu. Na tablicy były cztery przypadki z siedmiu, najważniejsze w rozmowie." },
    { minLevel: "A0", maxLevel: "A0", paragraph: "Najpierw zobacz [[gender|rodzaj]] słowa. Patrz na ostatnią literę:" },
    { minLevel: "A0", table: { header: ["[[gender|Rodzaj]]", "Koniec słowa", "Przykłady"], rows: [
      ["[[masculine|Męski]], R.M.", "[[consonant|spółgłoska]]", "syn, dom, telefon"],
      ["[[feminine|Żeński]], R.Ż.", "{-a}", "kaw{a}, prac{a}, siostr{a}"],
      ["[[neuter|Nijaki]], R.N.", "{-o}, {-e}", "jabłk{o}, dzieck{o}, mlek{o}"],
    ] } },
    { minLevel: "A1", paragraph: "[[adjective|Przymiotnik]] ma ten sam rodzaj co [[noun|rzeczownik]]: dobr{y} syn, dobr{a} kawa, dobr{e} dziecko." },
    { minLevel: "A2", table: { header: ["Wyjątek", "Jak wygląda", "Przykłady"], rows: [
      ["[[masculine|Męski]] na -a", "-a, ale to mężczyzna", "tat{a}, programist{a}, mężczyzn{a}"],
      ["[[feminine|Żeński]] na [[consonant|spółgłoskę]]", "bez -a", "noc, pomoc"],
      ["[[feminine|Żeński]] na -i", "-i", "pan{i}"],
      ["[[neuter|Nijaki]] na -um, -ę", "-um, -ę", "muze{um}, imi{ę}"],
    ] } },
    { minLevel: "A2", note: "Słowa [[masculine|rodzaju męskiego]] na -a (tata, programista) odmieniają się jak żeńskie, ale [[adjective|przymiotnik]] jest męski: dobr{ym} programist{ą}." },
    { minLevel: "B1", paragraph: "W [[plural|liczbie mnogiej]] najważniejszy podział to: mężczyźni-osoby ([[virile|męskoosobowe]]) i cała reszta. Mężczyzna: mężczyź{ni}, ale telefon: telefon{y}." },
    { minLevel: "A0", note: "Telefon dobrze pokazuje końcówki, po prostu dochodzą na końcu: telefon, telefon{u}, telefon{em}, telefon{y}. Nie mam telefonu, Płacę telefonem, Mam dwa telefony." },
    { minLevel: "A0", maxLevel: "A0", note: "Nie ucz się wszystkiego naraz. Zacznij od dwóch przypadków: Biernik (mam syna) i Narzędnik (jestem kasjerem). Są potrzebne prawie w każdej rozmowie." },
  ],
  mianownik: [
    { minLevel: "A0", maxLevel: "A0", paragraph: "To [[base|forma podstawowa]]: tak słowo wygląda w słowniku. kto? co?" },
    { minLevel: "A1", paragraph: "[[base|Forma podstawowa]]. [[subject|Podmiot]] i wszystko po «To jest». kto? co?" },
    { minLevel: "A0", examples: [["To jest syn.", ""], ["To jest telefon.", ""], ["To jest kawa.", ""], ["To jest jabłko.", ""]] },
    { minLevel: "A0", maxLevel: "A0", note: "Po «To jest» słowo jest zawsze w formie podstawowej. Nic nie zmieniasz." },
    { minLevel: "A1", table: { header: ["", "[[masculine|Męski]]", "[[feminine|Żeński]]", "[[neuter|Nijaki]]"], rows: [
      ["[[adjective|Przymiotnik]]", "dobr{y}", "dobr{a}", "dobr{e}"],
      ["[[noun|Rzeczownik]]", "syn", "kaw{a}", "dzieck{o}"],
    ] } },
    { minLevel: "A1", examples: [["To jest czerwone jabłko.", ""], ["On jest szybki.", ""]] },
    { minLevel: "A1", note: "Pułapka: po «On jest» sam [[adjective|przymiotnik]] zostaje w Mianowniku (On jest szybki), a [[noun|rzeczownik]] idzie do Narzędnika (On jest kasjerem)." },
    { minLevel: "A2", table: { header: ["[[gender|Rodzaj]]", "[[ending|Końcówki]]", "Przykłady"], rows: [
      ["[[masculine|Męski]]", "[[consonant|spółgłoska]], -a", "syn, tat{a}, programist{a}"],
      ["[[feminine|Żeński]]", "-a, -i, [[consonant|spółgłoska]]", "kaw{a}, pan{i}, noc"],
      ["[[neuter|Nijaki]]", "-o, -e, -um, -ę", "jabłk{o}, morz{e}, muze{um}, imi{ę}"],
    ] } },
    { minLevel: "B1", table: { header: ["[[plural|Liczba mnoga]]", "[[ending|Końcówki]]", "Przykłady"], rows: [
      ["Mężczyźni-osoby", "-i, -y, -owie", "mężczyź{ni}, studen{ci}, pan{owie}"],
      ["Inne m. i ż.", "-y, -i, -e", "telefon{y}, kaw{y}, pan{ie}"],
      ["[[neuter|Nijaki]]", "-a", "jabłk{a}, okn{a}"],
    ] } },
    { minLevel: "B1", examples: [["Oni są dobrzy.", "mężczyźni"], ["One są dobre.", "kobiety, zwierzęta, rzeczy"]] },
  ],
  biernik: [
    { minLevel: "A0", maxLevel: "A0", paragraph: "Kogo albo co masz, widzisz, lubisz, kupujesz. kogo? co?" },
    { minLevel: "A1", paragraph: "[[directObject|Dopełnienie bliższe]]: mam, widzę, lubię, kocham, kupuję, jem, piję, znam. kogo? co?" },
    { minLevel: "A0", maxLevel: "A0", table: { header: ["[[gender|Rodzaj]]", "Było", "Jest"], rows: [
      ["[[feminine|Żeński]]", "kawa", "kaw{ę}"],
      ["[[masculine|Męski]] [[animate|żywotny]]", "syn", "syn{a}"],
      ["[[masculine|Męski]] [[inanimate|nieżywotny]]", "dom", "dom, bez zmian"],
      ["[[neuter|Nijaki]]", "jabłko", "jabłko, bez zmian"],
    ] } },
    { minLevel: "A0", maxLevel: "A0", examples: [["Mam syna.", ""], ["Mam brata.", ""], ["Mam siostrę.", ""], ["Piję kawę.", ""], ["Mam dom.", ""]] },
    { minLevel: "A0", maxLevel: "A0", note: "Zapamiętaj jedno: kawa zmienia się w kawę, syn w syna. Dom i jabłko się nie zmieniają." },
    { minLevel: "A1", table: { header: ["", "[[adjective|Przym.]]", "[[noun|Rzecz.]]", "Przykład"], rows: [
      ["[[masculine|Męski]] [[animate|żyw.]]", "{-ego}", "{-a}", "dobr{ego} brat{a}"],
      ["[[masculine|Męski]] [[inanimate|nieżyw.]]", "jak w słowniku", "jak w słowniku", "nowy dom"],
      ["[[feminine|Żeński]]", "{-ą}", "{-ę}", "dobr{ą} kaw{ę}"],
      ["[[neuter|Nijaki]]", "{-e}", "jak w słowniku", "dobr{e} dziecko"],
    ] } },
    { minLevel: "A1", examples: [["Mam dobrego brata.", ""], ["Widzę ładną kobietę.", ""], ["Kupuję białe mleko.", ""]] },
    { minLevel: "A1", note: "Główna zasada: [[neuter|rodzaj nijaki]] i męski [[inanimate|nieżywotny]] w Bierniku się nie zmieniają. Zmieniają się męskie żywotne (-a) i [[feminine|rodzaj żeński]] (-ę)." },
    { minLevel: "A2", table: { header: ["Wyjątek", "[[adjective|Przym.]]", "[[noun|Rzecz.]]", "Przykład"], rows: [
      ["[[masculine|Męski]] na -a", "{-ego}", "{-ę}", "moj{ego} tat{ę}"],
      ["[[feminine|Żeński]] na [[consonant|spółgłoskę]]", "{-ą}", "bez zmian", "ciepł{ą} noc"],
    ] } },
    { minLevel: "A2", note: "Po «nie» Biernik zmienia się w Dopełniacz: Mam kawę, ale Nie mam kawy. To jeden z najczęstszych błędów." },
    { minLevel: "B1", paragraph: "W [[plural|liczbie mnogiej]] mężczyźni-osoby mają formę Dopełniacza: Mam dobr{ych} rodzic{ów}. Reszta wygląda jak Mianownik: Mam now{e} telefon{y}." },
    { minLevel: "B1", examples: [["Widzę polskich studentów.", "mężczyźni"], ["Widzę polskie studentki.", "kobiety"]] },
  ],
  dopelniacz: [
    { minLevel: "A0", maxLevel: "A0", paragraph: "Kiedy czegoś nie ma. kogo? czego?" },
    { minLevel: "A1", paragraph: "Brak, przynależność, ilość i niektóre [[verb|czasowniki]]. kogo? czego?" },
    { minLevel: "A0", maxLevel: "A0", table: { header: ["[[gender|Rodzaj]]", "Jest", "Nie ma"], rows: [
      ["[[feminine|Żeński]]", "kawa", "nie ma kaw{y}"],
      ["[[masculine|Męski]]", "syn", "nie ma syn{a}"],
      ["[[neuter|Nijaki]]", "dziecko", "nie ma dzieck{a}"],
    ] } },
    { minLevel: "A0", maxLevel: "A0", examples: [["Nie mam syna.", ""], ["Nie mam brata.", ""], ["Nie piję kawy.", ""], ["Szukam pracy.", ""]] },
    { minLevel: "A0", maxLevel: "A0", note: "Słowo «nie» przed [[verb|czasownikiem]] prawie zawsze włącza ten przypadek: Mam kawę, ale Nie mam kawy. Zapamiętaj też: szukam pracy." },
    { minLevel: "A1", table: { header: ["", "[[adjective|Przym.]]", "[[noun|Rzecz.]]", "Przykład"], rows: [
      ["[[masculine|Męski]]", "{-ego}", "{-a} lub {-u}", "now{ego} telefon{u}"],
      ["[[feminine|Żeński]]", "{-ej}", "{-y} lub {-i}", "now{ej} prac{y}"],
      ["[[neuter|Nijaki]]", "{-ego}", "{-a}", "mał{ego} dzieck{a}"],
    ] } },
    { minLevel: "A1", note: "Kiedy Dopełniacz: po nie (nie mam), po szukać i potrzebować, przy przynależności (dom brata), po dużo, mało, kilogram, szklanka i po [[preposition|przyimku]] do (do sklepu)." },
    { minLevel: "A2", paragraph: "[[masculine|Rodzaj męski]]: -a czy -u? [[animate|Żywotne]] zawsze -a: syn{a}, brat{a}. Rzeczy częściej -u: dom{u}, czas{u}, telefon{u}. Wyjątki przychodzą z czasem: chleb{a}, Krakow{a}." },
    { minLevel: "A2", paragraph: "[[feminine|Rodzaj żeński]]: -y czy -i? Po k, g i [[softConsonant|spółgłoskach miękkich]] piszemy -i: książk{i}, pan{i}. W innych wypadkach -y: ryb{y}, prac{y}, noc{y}." },
    { minLevel: "A2", examples: [["Jadę do Krakowa.", ""], ["Poproszę szklankę wody.", ""], ["Nie znam twojego imienia.", ""]] },
    { minLevel: "B1", table: { header: ["[[plural|Liczba mnoga]]", "[[ending|Końcówka]]", "Przykłady"], rows: [
      ["[[masculine|Męski]]", "{-ów} lub {-i}", "telefon{ów}, nauczyciel{i}"],
      ["[[feminine|Żeński]]", "bez końcówki", "mam, sióstr"],
      ["[[neuter|Nijaki]]", "bez końcówki", "jabłek, okien"],
    ] } },
    { minLevel: "B1", note: "Po [[numeral|liczebnikach]] od 5 w górę też Dopełniacz liczby mnogiej: pięć telefon{ów}, kilogram jabłek." },
  ],
  narzednik: [
    { minLevel: "A0", maxLevel: "A0", paragraph: "Kim jesteś i z kim jesteś. kim? czym?" },
    { minLevel: "A1", paragraph: "Kim ktoś jest, z kim lub z czym, czym jedziemy. kim? czym?" },
    { minLevel: "A0", maxLevel: "A0", table: { header: ["[[gender|Rodzaj]]", "Było", "Jest"], rows: [
      ["[[masculine|Męski]]", "kasjer", "kasjer{em}"],
      ["[[feminine|Żeński]]", "siostra", "siostr{ą}"],
      ["[[neuter|Nijaki]]", "dziecko", "dzieck{iem}"],
    ] } },
    { minLevel: "A0", maxLevel: "A0", examples: [["Jestem kasjerem.", ""], ["Ona jest lekarką.", ""], ["Płacę telefonem.", ""], ["Jadę autobusem.", ""]] },
    { minLevel: "A0", maxLevel: "A0", note: "Zawód po «jestem» jest zawsze w tym przypadku: Jestem kasjerem, Jestem kelnerem." },
    { minLevel: "A1", table: { header: ["", "[[adjective|Przym.]]", "[[noun|Rzecz.]]", "Przykład"], rows: [
      ["[[masculine|Męski]]", "{-ym}", "{-em}", "dobr{ym} syn{em}"],
      ["[[feminine|Żeński]]", "{-ą}", "{-ą}", "dobr{ą} kaw{ą}"],
      ["[[neuter|Nijaki]]", "{-ym}", "{-em}", "dobr{ym} dzieck{iem}"],
    ] } },
    { minLevel: "A1", examples: [["Jestem starszym kasjerem.", ""], ["Ona jest dobrą lekarką.", ""], ["Ono jest dobrym dzieckiem.", ""]] },
    { minLevel: "A1", note: "Częsta pomyłka. To jest lekarz: Mianownik. On jest lekarzem: Narzędnik. On jest dobry: znowu Mianownik, bo jest tylko [[adjective|przymiotnik]]." },
    { minLevel: "A2", paragraph: "Po k i g dodajemy i: Polak{iem}, wysok{im}. Słowa [[masculine|rodzaju męskiego]] na -a mają -ą: dobr{ym} programist{ą}, wysok{im} mężczyzn{ą}." },
    { minLevel: "A2", note: "Gdzie jeszcze Narzędnik: [[preposition|przyimek]] z (z bratem), transport (jadę autobusem), interesować się (interesuję się muzyką), zostać (został lekarzem)." },
    { minLevel: "B1", table: { header: ["[[plural|Liczba mnoga]]", "[[adjective|Przym.]]", "[[noun|Rzecz.]]", "Przykład"], rows: [
      ["Wszystkie rodzaje", "{-ymi} / {-imi}", "{-ami}", "z now{ymi} koleg{ami}"],
      ["Wyjątek", "{-ymi}", "{-mi}", "z mał{ymi} dzieć{mi}"],
    ] } },
  ],
  cheatSheet: [
    { minLevel: "A1", paragraph: "Trzy słowa przez cztery przypadki. Widać, że [[masculine|męski]] i [[neuter|nijaki]] są prawie takie same, więc nauki jest mniej, niż się wydaje." },
    { minLevel: "A1", table: { header: ["", "[[masculine|Męski]]", "[[feminine|Żeński]]", "[[neuter|Nijaki]]"], rows: CHEAT_ROWS } },
    { minLevel: "A1", note: "Jak wybrać przypadek: To jest X, czyli Mianownik. Mam, widzę, lubię X, czyli Biernik. Nie mam X, szukam X, czyli Dopełniacz. Jestem X ([[noun|rzeczownik]]) albo z X, czyli Narzędnik." },
  ],
};

const ADVANCED_THEORY: Record<Language, Partial<Record<TheoryKey, Block[]>>> = {
  uk: {
    base: [
      { minLevel: "B2", paragraph: "На B2 відмінки вже не про закінчення, а про керування: які [[verb|дієслова]] і [[preposition|прийменники]] вимагають якого відмінка. Вчи їх парами: czekać na + Biernik, bać się + Dopełniacz, zajmować się + Narzędnik." },
      { minLevel: "C1", paragraph: "На C1 головне тонкощі: [[negation|заперечення]] змінює тільки Biernik, рух і місце розрізняються відмінком (pod stół, pod stołem), а частина чогось іде в Dopełniacz (daj mi chleba)." },
    ],
    mianownik: [
      { minLevel: "B2", table: { header: ["[[plural|Множина]]", "Що відбувається", "[[examples|Przykłady]]"], rows: [
        ["-owie", "частина чоловіків-людей", "syn{owie}, pan{owie}, ojc{owie}"],
        ["[[adjective|Прикметник]] чоловіків-людей", "основа міняється", "wysoki, wysoc{y}; polski, polsc{y}; młody, młodz{i}"],
        ["Тільки множина", "однини немає", "drzwi, spodnie, urodziny, nożyczki"],
      ] } },
      { minLevel: "C1", note: "Після «to» в ототожненні завжди Mianownik: Nasz szef to pan Nowak. Але з «jest» [[noun|іменник]] іде в Narzędnik: Pan Nowak jest nasz{ym} szef{em}." },
    ],
    biernik: [
      { minLevel: "B2", table: { header: ["[[preposition|Прийменник]] + Biernik", "[[example|Przykład]]", "Значення"], rows: [
        ["na", "Czekam na autobus.", "чекати на"],
        ["o", "Pytam o drog{ę}.", "питати про"],
        ["za", "Dziękuję za pomoc.", "дякувати за"],
        ["przez", "Rozmawiam przez telefon.", "через"],
      ] } },
      { minLevel: "B2", note: "[[numeral|Числівники]] з чоловіками-людьми беруть форму Dopełniacz: dwa telefony, але dwóch brac{i}, trzech student{ów}." },
      { minLevel: "C1", table: { header: ["", "Biernik: куди?", "Narzędnik: де?"], rows: [
        ["pod", "Kładę książkę pod stół.", "Książka leży pod stoł{em}."],
        ["za", "Idę za dom.", "Stoję za dom{em}."],
        ["nad", "Jadę nad morze.", "Mieszkam nad morz{em}."],
      ] } },
      { minLevel: "C1", note: "Biernik також для тривалості: cały rok, cał{ą} noc, godzin{ę}. І za + Biernik у значенні «вважати кимось»: Uważam go za dobr{ego} przyjaciel{a}." },
    ],
    dopelniacz: [
      { minLevel: "B2", table: { header: ["[[verb|Дієслово]] + Dopełniacz", "[[example|Przykład]]"], rows: [
        ["bać się", "Boję się egzamin{u}."],
        ["uczyć się", "Uczę się język{a} polski{ego}."],
        ["słuchać", "Słucham muzyk{i}."],
        ["szukać, potrzebować", "Szukam prac{y}."],
      ] } },
      { minLevel: "B2", table: { header: ["[[preposition|Прийменник]] + Dopełniacz", "[[example|Przykład]]"], rows: [
        ["bez, dla, od", "Kawa bez cukr{u}."],
        ["u (у когось)", "Mieszkam u siostr{y}."],
        ["z (звідки?)", "Jestem z Ukrain{y}."],
        ["obok, koło, podczas", "obok dom{u}, podczas lekcj{i}"],
      ] } },
      { minLevel: "B2", note: "Дати теж у Dopełniacz: pierwszego maj{a}. Неправильну множину треба просто запам'ятати: ludzie, ludzi; pieniądze, pieniędzy; dzieci." },
      { minLevel: "C1", note: "Частина чогось: Daj mi chleb{a} (трохи) проти Daj mi chleb (увесь). Napiję się wod{y}. [[negation|Заперечення]] діє й через інфінітив: Nie chcę pić kaw{y}." },
      { minLevel: "C1", note: "П'ять і більше чоловіків-людей: Przyszło pięciu student{ów}, дієслово в середньому роді однини. Прийменники z powodu, zamiast, oprócz, w ciągu теж вимагають Dopełniacz." },
    ],
    narzednik: [
      { minLevel: "B2", table: { header: ["[[verb|Дієслово]] + Narzędnik", "[[example|Przykład]]"], rows: [
        ["zajmować się", "Zajmuję się marketing{iem}."],
        ["opiekować się", "Opiekuję się młodsz{ą} siostr{ą}."],
        ["interesować się", "Interesuję się muzyk{ą}."],
        ["kierować, rządzić", "Kieruję firm{ą}."],
      ] } },
      { minLevel: "B2", note: "Місце: przed, za, nad, pod, między + Narzędnik: przed kin{em}, między dom{em} a sklep{em}. Пори року: zim{ą}, wiosn{ą}, latem, jesienią." },
      { minLevel: "C1", note: "[[negation|Заперечення]] НЕ змінює Narzędnik: Jestem lekarzem, Nie jestem lekarz{em}. Змінюється тільки Biernik. Narzędnik також після wydawać się, stać się, zostać: Wydaje się mił{ym} człowiek{iem}." },
    ],
  },
  ru: {
    base: [
      { minLevel: "B2", paragraph: "На B2 падежи уже не про окончания, а про управление: какие [[verb|глаголы]] и [[preposition|предлоги]] требуют какого падежа. Учи их парами: czekać na + Biernik, bać się + Dopełniacz, zajmować się + Narzędnik." },
      { minLevel: "C1", paragraph: "На C1 главное тонкости: [[negation|отрицание]] меняет только Biernik, движение и место различаются падежом (pod stół, pod stołem), а часть чего-то идёт в Dopełniacz (daj mi chleba)." },
    ],
    mianownik: [
      { minLevel: "B2", table: { header: ["[[plural|Мн. число]]", "Что происходит", "[[examples|Przykłady]]"], rows: [
        ["-owie", "часть мужчин-людей", "syn{owie}, pan{owie}, ojc{owie}"],
        ["[[adjective|Прилагательное]] мужчин-людей", "основа меняется", "wysoki, wysoc{y}; polski, polsc{y}; młody, młodz{i}"],
        ["Только мн. число", "единственного нет", "drzwi, spodnie, urodziny, nożyczki"],
      ] } },
      { minLevel: "C1", note: "После «to» в отождествлении всегда Mianownik: Nasz szef to pan Nowak. Но с «jest» [[noun|существительное]] идёт в Narzędnik: Pan Nowak jest nasz{ym} szef{em}." },
    ],
    biernik: [
      { minLevel: "B2", table: { header: ["[[preposition|Предлог]] + Biernik", "[[example|Przykład]]", "Значение"], rows: [
        ["na", "Czekam na autobus.", "ждать"],
        ["o", "Pytam o drog{ę}.", "спрашивать о"],
        ["za", "Dziękuję za pomoc.", "благодарить за"],
        ["przez", "Rozmawiam przez telefon.", "через, по"],
      ] } },
      { minLevel: "B2", note: "[[numeral|Числительные]] с мужчинами-людьми берут форму Dopełniacz: dwa telefony, но dwóch brac{i}, trzech student{ów}." },
      { minLevel: "C1", table: { header: ["", "Biernik: куда?", "Narzędnik: где?"], rows: [
        ["pod", "Kładę książkę pod stół.", "Książka leży pod stoł{em}."],
        ["za", "Idę za dom.", "Stoję za dom{em}."],
        ["nad", "Jadę nad morze.", "Mieszkam nad morz{em}."],
      ] } },
      { minLevel: "C1", note: "Biernik также для длительности: cały rok, cał{ą} noc, godzin{ę}. И za + Biernik в значении «считать кем-то»: Uważam go za dobr{ego} przyjaciel{a}." },
    ],
    dopelniacz: [
      { minLevel: "B2", table: { header: ["[[verb|Глагол]] + Dopełniacz", "[[example|Przykład]]"], rows: [
        ["bać się", "Boję się egzamin{u}."],
        ["uczyć się", "Uczę się język{a} polski{ego}."],
        ["słuchać", "Słucham muzyk{i}."],
        ["szukać, potrzebować", "Szukam prac{y}."],
      ] } },
      { minLevel: "B2", table: { header: ["[[preposition|Предлог]] + Dopełniacz", "[[example|Przykład]]"], rows: [
        ["bez, dla, od", "Kawa bez cukr{u}."],
        ["u (у кого-то)", "Mieszkam u siostr{y}."],
        ["z (откуда?)", "Jestem z Ukrain{y}."],
        ["obok, koło, podczas", "obok dom{u}, podczas lekcj{i}"],
      ] } },
      { minLevel: "B2", note: "Даты тоже в Dopełniacz: pierwszego maj{a}. Неправильное множественное надо просто запомнить: ludzie, ludzi; pieniądze, pieniędzy; dzieci." },
      { minLevel: "C1", note: "Часть чего-то: Daj mi chleb{a} (немного) против Daj mi chleb (весь). Napiję się wod{y}. [[negation|Отрицание]] действует и через инфинитив: Nie chcę pić kaw{y}." },
      { minLevel: "C1", note: "Пять и больше мужчин-людей: Przyszło pięciu student{ów}, глагол в среднем роде единственного. Предлоги z powodu, zamiast, oprócz, w ciągu тоже требуют Dopełniacz." },
    ],
    narzednik: [
      { minLevel: "B2", table: { header: ["[[verb|Глагол]] + Narzędnik", "[[example|Przykład]]"], rows: [
        ["zajmować się", "Zajmuję się marketing{iem}."],
        ["opiekować się", "Opiekuję się młodsz{ą} siostr{ą}."],
        ["interesować się", "Interesuję się muzyk{ą}."],
        ["kierować, rządzić", "Kieruję firm{ą}."],
      ] } },
      { minLevel: "B2", note: "Место: przed, za, nad, pod, między + Narzędnik: przed kin{em}, między dom{em} a sklep{em}. Времена года: zim{ą}, wiosn{ą}, latem, jesienią." },
      { minLevel: "C1", note: "[[negation|Отрицание]] НЕ меняет Narzędnik: Jestem lekarzem, Nie jestem lekarz{em}. Меняется только Biernik. Narzędnik также после wydawać się, stać się, zostać: Wydaje się mił{ym} człowiek{iem}." },
    ],
  },
  pl: {
    base: [
      { minLevel: "B2", paragraph: "Na B2 przypadki to już nie końcówki, tylko rekcja: które [[verb|czasowniki]] i [[preposition|przyimki]] wymagają którego przypadka. Ucz się ich parami: czekać na + Biernik, bać się + Dopełniacz, zajmować się + Narzędnik." },
      { minLevel: "C1", paragraph: "Na C1 liczą się niuanse: [[negation|przeczenie]] zmienia tylko Biernik, ruch i miejsce rozróżnia przypadek (pod stół, pod stołem), a część czegoś idzie do Dopełniacza (daj mi chleba)." },
    ],
    mianownik: [
      { minLevel: "B2", table: { header: ["[[plural|Liczba mnoga]]", "Co się dzieje", "[[examples|Przykłady]]"], rows: [
        ["-owie", "część mężczyzn-osób", "syn{owie}, pan{owie}, ojc{owie}"],
        ["[[adjective|Przymiotnik]] męskoosobowy", "zmienia się temat", "wysoki, wysoc{y}; polski, polsc{y}; młody, młodz{i}"],
        ["Tylko liczba mnoga", "brak liczby pojedynczej", "drzwi, spodnie, urodziny, nożyczki"],
      ] } },
      { minLevel: "C1", note: "Po «to» przy identyfikacji zawsze Mianownik: Nasz szef to pan Nowak. Ale z «jest» [[noun|rzeczownik]] idzie do Narzędnika: Pan Nowak jest nasz{ym} szef{em}." },
    ],
    biernik: [
      { minLevel: "B2", table: { header: ["[[preposition|Przyimek]] + Biernik", "[[example|Przykład]]"], rows: [
        ["na", "Czekam na autobus."],
        ["o", "Pytam o drog{ę}."],
        ["za", "Dziękuję za pomoc."],
        ["przez", "Rozmawiam przez telefon."],
      ] } },
      { minLevel: "B2", note: "[[numeral|Liczebniki]] z mężczyznami-osobami mają formę Dopełniacza: dwa telefony, ale dwóch brac{i}, trzech student{ów}." },
      { minLevel: "C1", table: { header: ["", "Biernik: dokąd?", "Narzędnik: gdzie?"], rows: [
        ["pod", "Kładę książkę pod stół.", "Książka leży pod stoł{em}."],
        ["za", "Idę za dom.", "Stoję za dom{em}."],
        ["nad", "Jadę nad morze.", "Mieszkam nad morz{em}."],
      ] } },
      { minLevel: "C1", note: "Biernik także dla czasu trwania: cały rok, cał{ą} noc, godzin{ę}. Oraz za + Biernik w znaczeniu «uważać kogoś za kogoś»: Uważam go za dobr{ego} przyjaciel{a}." },
    ],
    dopelniacz: [
      { minLevel: "B2", table: { header: ["[[verb|Czasownik]] + Dopełniacz", "[[example|Przykład]]"], rows: [
        ["bać się", "Boję się egzamin{u}."],
        ["uczyć się", "Uczę się język{a} polski{ego}."],
        ["słuchać", "Słucham muzyk{i}."],
        ["szukać, potrzebować", "Szukam prac{y}."],
      ] } },
      { minLevel: "B2", table: { header: ["[[preposition|Przyimek]] + Dopełniacz", "[[example|Przykład]]"], rows: [
        ["bez, dla, od", "Kawa bez cukr{u}."],
        ["u (u kogoś)", "Mieszkam u siostr{y}."],
        ["z (skąd?)", "Jestem z Ukrain{y}."],
        ["obok, koło, podczas", "obok dom{u}, podczas lekcj{i}"],
      ] } },
      { minLevel: "B2", note: "Daty też w Dopełniaczu: pierwszego maj{a}. Nieregularną liczbę mnogą trzeba zapamiętać: ludzie, ludzi; pieniądze, pieniędzy; dzieci." },
      { minLevel: "C1", note: "Część czegoś: Daj mi chleb{a} (trochę) a Daj mi chleb (cały). Napiję się wod{y}. [[negation|Przeczenie]] działa też przez bezokolicznik: Nie chcę pić kaw{y}." },
      { minLevel: "C1", note: "Pięciu i więcej mężczyzn-osób: Przyszło pięciu student{ów}, czasownik w rodzaju nijakim liczby pojedynczej. Przyimki z powodu, zamiast, oprócz, w ciągu też wymagają Dopełniacza." },
    ],
    narzednik: [
      { minLevel: "B2", table: { header: ["[[verb|Czasownik]] + Narzędnik", "[[example|Przykład]]"], rows: [
        ["zajmować się", "Zajmuję się marketing{iem}."],
        ["opiekować się", "Opiekuję się młodsz{ą} siostr{ą}."],
        ["interesować się", "Interesuję się muzyk{ą}."],
        ["kierować, rządzić", "Kieruję firm{ą}."],
      ] } },
      { minLevel: "B2", note: "Miejsce: przed, za, nad, pod, między + Narzędnik: przed kin{em}, między dom{em} a sklep{em}. Pory roku: zim{ą}, wiosn{ą}, latem, jesienią." },
      { minLevel: "C1", note: "[[negation|Przeczenie]] NIE zmienia Narzędnika: Jestem lekarzem, Nie jestem lekarz{em}. Zmienia się tylko Biernik. Narzędnik także po wydawać się, stać się, zostać: Wydaje się mił{ym} człowiek{iem}." },
    ],
  },
};

for (const language of Object.keys(ADVANCED_THEORY) as Language[]) {
  for (const key of Object.keys(ADVANCED_THEORY[language]) as TheoryKey[]) THEORY[language][key].push(...(ADVANCED_THEORY[language][key] ?? []));
}
