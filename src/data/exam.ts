import type { Language } from "../i18n/language";

/** One exam task. `given` is the base form (part A) or the positive sentence (part B). */
export interface ExamItem {
  id: string;
  type: "type" | "choice";
  question: string;
  given?: string;
  source?: string | null;
  answer: string;
  distractors?: string[];
  explanation: string;
  translation: { uk: string; ru: string };
  hint?: Record<Language, string>;
}
export interface ExamSection { key: string; taskCount: number; type: "type" | "choice"; instruction: Record<Language, string>; items: ExamItem[] }

type TypeRow = [string, string, string, string, string, string, string];
type ChoiceRow = [string, string, string | null, string, string[], string, string, string];
interface RawSection { key: string; taskCount: number; type: "type" | "choice"; instruction: Record<Language, string>; items: (TypeRow | ChoiceRow)[] }
/* Original tasks in the format of the B1 grammar part (Poprawność gramatyczna) */
const RAW_EXAM: RawSection[] = [
  { key: "A", taskCount: 8, type: "type",
    instruction: { pl: "Proszę wpisać wyrazy z nawiasu w odpowiedniej formie.", uk: "Впиши слова з дужок у правильній формі.", ru: "Впиши слова из скобок в правильной форме." },
    items: [
      ["a1", "Wczoraj spotkałem się z ___.", "nowy kolega", "nowym kolegą", "z + Narzędnik: now{ym} koleg{ą}.", "Учора я зустрівся з новим колегою.", "Вчера я встретился с новым коллегой."],
      ["a2", "Nie znam ___.", "twoja siostra", "twojej siostry", "nie + znać: Dopełniacz, twoj{ej} siostr{y}.", "Я не знаю твоєї сестри.", "Я не знаю твою сестру."],
      ["a3", "Rano kupiłam ___.", "świeży chleb", "świeży chleb", "kupić + Biernik. Chleb jest nieżywotny, więc bez zmian.", "Зранку я купила свіжий хліб.", "Утром я купила свежий хлеб."],
      ["a4", "Czekam na ___.", "mój brat", "mojego brata", "czekać na + Biernik. Brat jest żywotny: moj{ego} brat{a}.", "Я чекаю на мого брата.", "Я жду моего брата."],
      ["a5", "Codziennie chodzę do ___.", "nowa praca", "nowej pracy", "do + Dopełniacz: now{ej} prac{y}.", "Щодня я ходжу на нову роботу.", "Каждый день я хожу на новую работу."],
      ["a6", "Mój tata jest ___.", "dobry kierowca", "dobrym kierowcą", "być + Narzędnik. Kierowca odmienia się jak żeński: dobr{ym} kierowc{ą}.", "Мій тато добрий водій.", "Мой папа хороший водитель."],
      ["a7", "To jest samochód ___.", "mój ojciec", "mojego ojca", "Czyj? Dopełniacz: moj{ego} ojc{a}.", "Це машина мого батька.", "Это машина моего отца."],
      ["a8", "Bez ___ nie mogę pracować.", "kawa", "kawy", "bez + Dopełniacz: kaw{y}.", "Без кави я не можу працювати.", "Без кофе я не могу работать."],
      ["a9", "Interesuję się ___.", "historia Polski", "historią Polski", "interesować się + Narzędnik: histori{ą} Polski.", "Я цікавлюся історією Польщі.", "Я интересуюсь историей Польши."],
      ["a10", "Mam dwóch ___.", "starszy brat", "starszych braci", "dwóch + mężczyźni: Dopełniacz liczby mnogiej, starsz{ych} brac{i}.", "У мене двоє старших братів.", "У меня два старших брата."],
      ["a11", "Kupiłem pięć ___.", "bilet", "biletów", "pięć + Dopełniacz liczby mnogiej: bilet{ów}.", "Я купив п'ять квитків.", "Я купил пять билетов."],
      ["a12", "Na przystanku widzę ___.", "wysoka kobieta", "wysoką kobietę", "widzieć + Biernik: wysok{ą} kobiet{ę}.", "На зупинці я бачу високу жінку.", "На остановке я вижу высокую женщину."],
      ["a13", "Niestety nie mam ___.", "wolny czas", "wolnego czasu", "nie mieć + Dopełniacz: woln{ego} czas{u}.", "На жаль, у мене немає вільного часу.", "К сожалению, у меня нет свободного времени."],
      ["a14", "Po studiach on został ___.", "nauczyciel", "nauczycielem", "zostać + Narzędnik: nauczyciel{em}.", "Після навчання він став учителем.", "После учёбы он стал учителем."],
      ["a15", "Dziękuję za ___.", "miła wiadomość", "miłą wiadomość", "za + Biernik: mił{ą} wiadomość. Żeński na spółgłoskę się nie zmienia.", "Дякую за приємне повідомлення.", "Спасибо за приятное сообщение."],
      ["a16", "Szukamy ___.", "tani pokój", "taniego pokoju", "szukać + Dopełniacz: tan{iego} pokoj{u}.", "Ми шукаємо дешеву кімнату.", "Мы ищем дешёвую комнату."],
      ["a17", "Do centrum jeżdżę ___.", "tramwaj", "tramwajem", "Czym? Narzędnik: tramwaj{em}.", "До центру я їжджу трамваєм.", "В центр я езжу на трамвае."],
      ["a18", "Dzieci boją się ___.", "ciemność", "ciemności", "bać się + Dopełniacz: ciemnośc{i}.", "Діти бояться темряви.", "Дети боятся темноты."],
      ["a19", "Od wczoraj mamy ___.", "nowe mieszkanie", "nowe mieszkanie", "mieć + Biernik. Rodzaj nijaki się nie zmienia.", "Від учора в нас нова квартира.", "Со вчерашнего дня у нас новая квартира."],
      ["a20", "Bardzo lubię ___.", "polska kuchnia", "polską kuchnię", "lubić + Biernik: polsk{ą} kuchni{ę}.", "Я дуже люблю польську кухню.", "Я очень люблю польскую кухню."],
    ] },
  { key: "B", taskCount: 4, type: "type",
    instruction: { pl: "Proszę zmienić zdania na przeczące.", uk: "Зроби речення запереченими.", ru: "Сделай предложения отрицательными." },
    items: [
      ["n1", "Nie mam ___.", "Mam samochód.", "samochodu", "nie + mieć: Dopełniacz, samochod{u}.", "У мене немає машини.", "У меня нет машины."],
      ["n2", "Nie lubię ___.", "Lubię tę piosenkę.", "tej piosenki", "nie + Dopełniacz: t{ej} piosenk{i}.", "Я не люблю цю пісню.", "Я не люблю эту песню."],
      ["n3", "Nie piję ___.", "Piję mleko.", "mleka", "nie + Dopełniacz: mlek{a}.", "Я не п'ю молока.", "Я не пью молоко."],
      ["n4", "Nie znam ___.", "Znam tego pana.", "tego pana", "Tu Biernik i Dopełniacz wyglądają tak samo: teg{o} pan{a}.", "Я не знаю цього пана.", "Я не знаю этого господина."],
      ["n5", "Nie jestem ___.", "Jestem studentem.", "studentem", "Przeczenie nie zmienia Narzędnika: student{em}.", "Я не студент.", "Я не студент."],
      ["n6", "Nie mam ___.", "Mam czas.", "czasu", "nie mieć + Dopełniacz: czas{u}.", "У мене немає часу.", "У меня нет времени."],
      ["n7", "Nie widzę ___.", "Widzę twoją siostrę.", "twojej siostry", "nie + Dopełniacz: twoj{ej} siostr{y}.", "Я не бачу твоєї сестри.", "Я не вижу твою сестру."],
      ["n8", "Nie interesuję się ___.", "Interesuję się sportem.", "sportem", "Przeczenie nie zmienia Narzędnika: sport{em}.", "Я не цікавлюся спортом.", "Я не интересуюсь спортом."],
    ] },
  { key: "C", taskCount: 4, type: "choice",
    instruction: { pl: "Proszę zadać pytanie do podkreślonej części zdania.", uk: "Постав питання до підкресленої частини речення.", ru: "Задай вопрос к подчёркнутой части предложения." },
    items: [
      ["q1", "___ jedziesz do pracy?", "Jadę do pracy [autobusem].", "Czym", ["Kim", "Co", "Czego"], "autobusem = Narzędnik, rzecz: czym?", "Чим ти їдеш на роботу?", "На чём ты едешь на работу?"],
      ["q2", "___ wczoraj spotkałeś?", "Wczoraj spotkałem [Annę].", "Kogo", ["Kim", "Kto", "Komu"], "Annę = Biernik, osoba: kogo?", "Кого ти вчора зустрів?", "Кого ты вчера встретил?"],
      ["q3", "___ nie masz?", "Nie mam [czasu].", "Czego", ["Co", "Czym", "Kogo"], "czasu = Dopełniacz, rzecz: czego?", "Чого в тебе немає?", "Чего у тебя нет?"],
      ["q4", "___ rozmawiasz?", "Rozmawiam [z bratem].", "Z kim", ["Z czym", "Kogo", "Kim"], "z bratem = z + Narzędnik, osoba: z kim?", "З ким ти розмовляєш?", "С кем ты разговариваешь?"],
      ["q5", "___ jest twoja siostra?", "Moja siostra jest [lekarką].", "Kim", ["Kto", "Czym", "Kogo"], "lekarką = Narzędnik, osoba: kim?", "Ким є твоя сестра?", "Кем является твоя сестра?"],
      ["q6", "___ jutro przyjdzie?", "[Marek] jutro przyjdzie.", "Kto", ["Kogo", "Kim", "Co"], "Marek = Mianownik, podmiot, osoba: kto?", "Хто завтра прийде?", "Кто завтра придёт?"],
      ["q7", "___ czekasz?", "Czekam [na autobus].", "Na co", ["Na kogo", "Czego", "Czym"], "na autobus = na + Biernik, rzecz: na co?", "На що ти чекаєш?", "Чего ты ждёшь?"],
      ["q8", "___ się boisz?", "Boję się [burzy].", "Czego", ["Co", "Kogo", "Czym"], "burzy = Dopełniacz po bać się: czego?", "Чого ти боїшся?", "Чего ты боишься?"],
    ] },
  { key: "D", taskCount: 4, type: "choice",
    instruction: { pl: "Proszę wybrać właściwy przyimek.", uk: "Обери правильний прийменник.", ru: "Выбери правильный предлог." },
    items: [
      ["p1", "Mieszkam ___ rodziców.", null, "u", ["do", "z", "na"], "u + Dopełniacz: u rodzic{ów}.", "Я живу в батьків.", "Я живу у родителей."],
      ["p2", "Idę ___ sklepu.", null, "do", ["na", "w", "u"], "do + Dopełniacz: do sklep{u}.", "Я йду до магазину.", "Я иду в магазин."],
      ["p3", "Piję kawę ___ cukru.", null, "bez", ["z", "dla", "od"], "bez + Dopełniacz: bez cukr{u}.", "Я п'ю каву без цукру.", "Я пью кофе без сахара."],
      ["p4", "Spotkamy się ___ kinem.", null, "przed", ["do", "u", "bez"], "przed + Narzędnik (miejsce): przed kin{em}.", "Зустрінемося перед кінотеатром.", "Встретимся перед кинотеатром."],
      ["p5", "Dziękuję ___ pomoc.", null, "za", ["na", "o", "do"], "dziękować za + Biernik.", "Дякую за допомогу.", "Спасибо за помощь."],
      ["p6", "Turysta pyta ___ drogę.", null, "o", ["na", "za", "do"], "pytać o + Biernik: o drog{ę}.", "Турист питає дорогу.", "Турист спрашивает дорогу."],
      ["p7", "To prezent ___ siostry.", null, "dla", ["do", "u", "na"], "dla + Dopełniacz: dla siostr{y}.", "Це подарунок для сестри.", "Это подарок для сестры."],
      ["p8", "Jestem ___ Ukrainy.", null, "z", ["od", "do", "u"], "z (skąd?) + Dopełniacz: z Ukrain{y}.", "Я з України.", "Я из Украины."],
    ] },
];
const PREPOSITION_HINTS: Record<string, Record<Language, string>> = {
  p1: { uk: "Значення: «живу в їхньому домі».", ru: "Значение: «живу в их доме».", pl: "Znaczenie: «mieszkam w ich domu»." },
  p2: { uk: "Куди? Напрямок до місця, далі Dopełniacz.", ru: "Куда? Направление к месту, дальше Dopełniacz.", pl: "Dokąd? Kierunek, potem Dopełniacz." },
  p3: { uk: "Значення: «не маючи чогось».", ru: "Значение: «не имея чего-то».", pl: "Znaczenie: «nie mając czegoś»." },
  p4: { uk: "Де саме? Місце спереду, далі Narzędnik.", ru: "Где именно? Место впереди, дальше Narzędnik.", pl: "Gdzie dokładnie? Miejsce z przodu, potem Narzędnik." },
  p5: { uk: "dziękować ___ coś: прийменник з Biernik.", ru: "dziękować ___ coś: предлог с Biernik.", pl: "dziękować ___ coś: przyimek z Biernikiem." },
  p6: { uk: "pytać ___ coś: питати про тему.", ru: "pytać ___ coś: спрашивать о теме.", pl: "pytać ___ coś: pytanie dotyczy tematu." },
  p7: { uk: "Кому призначений подарунок? Прийменник з Dopełniacz.", ru: "Кому предназначен подарок? Предлог с Dopełniacz.", pl: "Komu przeznaczony jest prezent? Przyimek z Dopełniaczem." },
  p8: { uk: "Звідки ти? Після прийменника Dopełniacz.", ru: "Откуда ты? После предлога Dopełniacz.", pl: "Skąd jesteś? Po przyimku jest Dopełniacz." },
};

export const EXAM: ExamSection[] = RAW_EXAM.map((section) => ({
  ...section,
  items: section.items.map((row): ExamItem => {
    if (section.type === "type") {
      const [id, question, given, answer, explanation, uk, ru] = row as TypeRow;
      return { id, type: "type", question, given, answer, explanation, translation: { uk, ru }, hint: PREPOSITION_HINTS[id] };
    }
    const [id, question, source, answer, distractors, explanation, uk, ru] = row as ChoiceRow;
    return { id, type: "choice", question, source, answer, distractors, explanation, translation: { uk, ru }, hint: PREPOSITION_HINTS[id] };
  }),
}));
