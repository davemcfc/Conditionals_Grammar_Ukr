import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, RefreshCw, Eye, EyeOff, Globe, Beaker, CheckCircle, AlertTriangle, Info, HelpCircle, MessageCircle, Send, User, Bot, Copy, Check } from 'lucide-react';

// --- API Configuration ---
const apiKey = process.env.REACT_APP_GEMINI_API_KEY; 

// --- Content Dictionary (EN/UA) ---
const content = {
  en: {
    title: "Conditionals and English Grammar Guide",
    navTheory: "Conditionals",
    navLab: "Random Lab",
    navGrammar: "Grammar Guide",
    grammarIntro: "Do you have any questions about other aspects of British grammar? Feel free to ask the Grammarian for help.",
    grammarGreeting: "Hello! I am your British English Grammarian.",
    askPlaceholder: "Ask your grammar question here...",
    askButton: "Ask",
    copyText: "Copy",
    copiedText: "Copied!",
    generateFurther: "Generate 5 more exercises",
    generateRandom: "Generate 10 Random Exercises",
    generateMoreRandom: "Generate 10 more",
    generating: "Generating...",
    revealAnswer: "Reveal Answer",
    hideAnswer: "Hide Answer",
    explanation: "Explanation",
    error: "An error occurred while fetching exercises. Please try again.",
    labIntro: "Test your knowledge across all conditional types. Answers will reveal their true colours!",
    nuancesTitle: "Nuances & Rules",
    qaTitle: "Q&A Section",
    emptyLabState: "Hit the generate button to begin your test.",
    formulaTitle: "Formula",
    examplesTitle: "Examples",
    practiceTitle: "Practice",
    qPrefix: "Q: ",
    aPrefix: "A: ",
    types: [
      {
        id: 'zero',
        navName: "Zero",
        name: "The Zero Conditional",
        colorTheme: "blue",
        overview: "The zero conditional is the most straightforward of the conditional tenses. We use it to talk about general truths, scientific facts, and things that always happen under certain conditions. It describes situations where a specific condition always guarantees the same result, whether in the past, present, or future. It is also frequently used to give instructions.",
        formula: "If + present simple, present simple (or imperative).",
        examples: [
          "If you heat water, it evaporates.",
          "If I drink coffee after 3 PM, I don't sleep at night.",
          "Text me if you get lost."
        ],
        nuances: [
          { title: "The Comma Rule", text: <>With all conditional sentences, the order of the clauses is not fixed. However, punctuation depends on this order. If the 'if' clause comes first, you <strong>must</strong> use a comma to separate the two clauses. If the 'if' clause comes second, there is no need for a comma.</> },
          { title: "\"If\" vs \"When\"", text: "Interestingly, in the zero conditional, you can usually replace the word 'if' with 'when' or 'whenever' without changing the meaning of the sentence, because the outcome is a guaranteed fact." },
          { title: "General \"You\"", text: "When the word 'you' is used in zero conditionals, it often refers to people in general, rather than you specifically." }
        ],
        qa: [
          { q: "What tense is used in both clauses of the zero conditional?", a: "The present simple tense is used for both the 'if' clause and the main clause." },
          { q: "Do you need a comma in the sentence 'Water boils if you heat it to 100 degrees'?", a: "No, because the main clause comes before the 'if' clause." },
          { q: "Can 'if' be replaced by another word without changing the meaning?", a: "Yes, it can usually be replaced with 'when' or 'whenever'." }
        ],
        staticExercises: [
          { question: "If you ___ (mix) red and blue, you ___ (get) purple.", answer: "If you mix red and blue, you get purple.", explanation: "A general fact that is always true.", typeIndex: 0 },
          { question: "If I ___ (eat) peanuts, I ___ (break) out in a rash.", answer: "If I eat peanuts, I break out in a rash.", explanation: "A personal condition that is generally true.", typeIndex: 0 },
          { question: "Plants ___ (die) if they ___ (not get) enough water.", answer: "Plants die if they do not get enough water.", explanation: "A scientific fact.", typeIndex: 0 },
          { question: "If you ___ (press) this button, the machine ___ (start).", answer: "If you press this button, the machine starts.", explanation: "A mechanical fact or instruction.", typeIndex: 0 },
          { question: "Ice ___ (melt) if you ___ (heat) it.", answer: "Ice melts if you heat it.", explanation: "A scientific fact.", typeIndex: 0 }
        ]
      },
      {
        id: 'first',
        navName: "First",
        name: "The First Conditional",
        colorTheme: "green",
        overview: "The first conditional is used to discuss real, specific situations and things that have a genuine possibility of happening in the future. Unlike the zero conditional, which speaks about general facts, the first conditional speaks about the real world and probable future outcomes based on a specific condition.",
        formula: "If + present simple, will (or another future form/modal) + infinitive (base verb).",
        examples: [
          "If we don't leave now, we will miss the train.",
          "If you study hard, you will pass the exam.",
          "If I see my boss, I'll ask her."
        ],
        nuances: [
          { title: "Modal Verbs", text: "You can replace 'will' in the main clause with modal verbs like 'might', 'could', 'may', or 'should' to express a degree of certainty, a recommendation, or permission. You can also use 'going to'." },
          { title: "Using \"Unless\"", text: "The word 'unless' is a very common alternative for 'if... not'. For example, 'Unless you get an invitation' means 'If you don't get an invitation'." },
          { title: "The \"Will\" Warning", text: <>A highly common mistake is putting the word 'will' inside the 'if' clause. Remember: 'If it is sunny, we will go to the beach'—<strong>never</strong> 'If it will be sunny'.</> }
        ],
        qa: [
          { q: "What is the correct grammatical structure for the first conditional?", a: "If + present simple, will + infinitive." },
          { q: "Is it correct to say 'If it will be sunny, we will go to the beach'?", a: "No, you must not put 'will' in the 'if' clause; the correct form is 'If it is sunny, we will go to the beach'." },
          { q: "Can you use modal verbs other than 'will' in the main clause?", a: "Yes, you can use modals like may, might, could, or should to express varying degrees of certainty or to make a recommendation." }
        ],
        staticExercises: [
          { question: "If it ___ (rain) tomorrow, we ___ (cancel) the picnic.", answer: "If it rains tomorrow, we will cancel the picnic.", explanation: "A real possibility in the future.", typeIndex: 1 },
          { question: "If you ___ (study) hard, you ___ (pass) the exam.", answer: "If you study hard, you will pass the exam.", explanation: "A probable future result.", typeIndex: 1 },
          { question: "I ___ (call) you if I ___ (finish) work early.", answer: "I will call you if I finish work early.", explanation: "A possible future action.", typeIndex: 1 },
          { question: "If she ___ (not hurry), she ___ (miss) the bus.", answer: "If she does not hurry, she will miss the bus.", explanation: "A probable future consequence.", typeIndex: 1 },
          { question: "We ___ (go) to the beach if the weather ___ (be) nice.", answer: "We will go to the beach if the weather is nice.", explanation: "A future plan depending on a condition.", typeIndex: 1 }
        ]
      },
      {
        id: 'second',
        navName: "Second",
        name: "The Second Conditional",
        colorTheme: "purple",
        overview: "The second conditional steps away from reality. We use it to talk about imaginary, impossible, highly unlikely, or hypothetical situations in the present or the future, along with their imaginary results. It is incredibly useful for talking about dreams, fantasies, or giving advice.",
        formula: "If + past simple, would (or could/might) + infinitive.",
        examples: [
          "If I won the lottery, I would buy a house in Barbados.",
          "If I had his number, I would call him.",
          "If I were shorter, I would wear heels more."
        ],
        nuances: [
          { title: "\"Were\" vs \"Was\"", text: "In the second conditional, it is considered more formally correct to use 'were' for all subjects (e.g., 'If I were', 'If he were') instead of 'was', particularly when giving advice like 'If I were you'. However, 'was' is still widely accepted and very common in modern spoken English." },
          { title: "The \"Would\" Warning", text: <>Similar to the first conditional rule, <strong>never</strong> put 'would' in the condition with 'if'. It is incorrect to say 'If I would meet Shakira'; the correct form is 'If I met Shakira'.</> }
        ],
        qa: [
          { q: "Even though the second conditional uses the past simple tense, what time period does it actually refer to?", a: "It refers to imaginary or hypothetical situations in the present or the future." },
          { q: "Is it grammatically correct to say 'If I would meet Shakira, my heart would go faster'?", a: "No, 'would' should not be in the 'if' clause. It should be 'If I met Shakira, my heart would go crazy'." },
          { q: "What are we usually discussing when we use the second conditional?", a: "We use it to talk about dreams, fantasies, and things in the present or future that are impossible or highly unlikely." }
        ],
        staticExercises: [
          { question: "If I ___ (have) a million pounds, I ___ (travel) the world.", answer: "If I had a million pounds, I would travel the world.", explanation: "An imaginary present/future situation.", typeIndex: 2 },
          { question: "If she ___ (know) his number, she ___ (call) him.", answer: "If she knew his number, she would call him.", explanation: "An impossible present situation (she doesn't know it).", typeIndex: 2 },
          { question: "I ___ (buy) a big house if I ___ (win) the lottery.", answer: "I would buy a big house if I won the lottery.", explanation: "A highly unlikely future scenario.", typeIndex: 2 },
          { question: "If I ___ (be) you, I ___ (not do) that.", answer: "If I were you, I would not do that.", explanation: "Giving hypothetical advice.", typeIndex: 2 },
          { question: "What ___ (you/do) if you ___ (see) a ghost?", answer: "What would you do if you saw a ghost?", explanation: "An imaginary, unlikely situation.", typeIndex: 2 }
        ]
      },
      {
        id: 'third',
        navName: "Third",
        name: "The Third Conditional",
        colorTheme: "red",
        overview: "The third conditional is used entirely to talk about the past. Specifically, it is used to describe a hypothetical situation that did not happen in the past, and to imagine the unreal result of that imaginary situation. Because it deals with missed opportunities and past events that cannot be changed, it is frequently used to express regret or criticism.",
        formula: "If + past perfect (had + past participle), would have (or could/might have) + past participle.",
        examples: [
          "If I had studied harder, I would have passed the exam.",
          "If we had left earlier, we wouldn't have arrived late.",
          "If I had gone to bed earlier, I would have woken up in time to catch the train."
        ],
        nuances: [
          { title: "Using Contractions", text: "Because the third conditional features complex grammar, native speakers rely heavily on contractions to sound natural and fluid. 'If I had known' becomes 'If I'd known', and 'I would have' often becomes 'I would've'." },
          { title: "Subject Consistency", text: "The word 'have' in 'would have' remains the same for every subject (I, you, he, she, it, we, they); it never changes to 'has'." }
        ],
        qa: [
          { q: "Does the third conditional describe a situation that actually happened?", a: "No, it is used to talk about a situation that did not happen in the past, allowing us to imagine the results of that unreal scenario." },
          { q: "Why do speakers often use contractions like 'I'd' and 'would've' with the third conditional?", a: "Using contractions helps with the pronunciation, making the complex grammatical structure sound much more natural in spoken English." }
        ],
        staticExercises: [
          { question: "If I ___ (know) you were coming, I ___ (bake) a cake.", answer: "If I had known you were coming, I would have baked a cake.", explanation: "A missed opportunity in the past.", typeIndex: 3 },
          { question: "We ___ (not get) wet if we ___ (take) an umbrella.", answer: "We would not have got wet if we had taken an umbrella.", explanation: "An unreal past result.", typeIndex: 3 },
          { question: "If she ___ (study) more, she ___ (pass) the test.", answer: "If she had studied more, she would have passed the test.", explanation: "A hypothetical past situation that didn't happen.", typeIndex: 3 },
          { question: "They ___ (arrive) on time if they ___ (not miss) the train.", answer: "They would have arrived on time if they had not missed the train.", explanation: "A past consequence of an unreal condition.", typeIndex: 3 },
          { question: "If I ___ (not eat) so much, I ___ (not feel) sick.", answer: "If I had not eaten so much, I would not have felt sick.", explanation: "A regret about a past action.", typeIndex: 3 }
        ]
      },
      {
        id: 'mixed',
        navName: "Mixed",
        name: "Mixed Conditionals",
        colorTheme: "orange",
        overview: "Mixed conditionals allow you to take your English to an even more advanced level! They mix two different time periods in a single sentence. While standard conditionals generally talk about actions in isolation within their own time, mixed conditionals help us move through time.",
        formula: "Comb 1: If + past perfect, would + infinitive. | Comb 2: If + past simple, would have + past participle.",
        examples: [
          "If I had saved more money, I would own this house. (Past condition, present result)",
          "If I had studied German in school, my German would be better. (Past condition, present result)",
          "If I were rich, I would have bought that coat. (Present condition, past result)"
        ],
        nuances: [
          { title: "Time vs. Tense", text: "Не плутайте час дієслова (tense) з реальним часом (time). Наприклад, у реченні 'If I were rich' ви використовуєте Past Simple, але насправді говорите про уявну ситуацію в теперішньому." },
          { title: "\"Were\" проти \"Was\"", text: "Коли ви поєднуєте теперішню умову з минулим результатом, застосовуйте правило другого типу: формально правильніше використовувати 'were' для всіх осіб." }
        ],
        qa: [
          { q: "What is the primary purpose of a mixed conditional?", a: "It is used to mix two different time periods in one sentence, such as an imaginary past situation that has a hypothetical present result." },
          { q: "In the sentence 'If I were rich, I would have bought that coat', what time period does the 'if' clause refer to?", a: "It refers to an unreal or hypothetical situation in the present, even though it uses the past simple tense." },
          { q: "True or False: You can only mix past conditions with present results.", a: "False. While that is a very common combination, you can also mix present conditions with past results, as well as several other time combinations." }
        ],
        staticExercises: [
          { question: "If I ___ (listen) to your advice, I ___ (not be) in this mess now.", answer: "If I had listened to your advice, I would not be in this mess now.", explanation: "Past condition (didn't listen), present result (in a mess).", typeIndex: 4 },
          { question: "If she ___ (be) a better driver, she ___ (not crash) her car yesterday.", answer: "If she were a better driver, she would not have crashed her car yesterday.", explanation: "Present condition (not a good driver generally), past result (crashed).", typeIndex: 4 },
          { question: "If we ___ (buy) the map, we ___ (not be) lost right now.", answer: "If we had bought the map, we would not be lost right now.", explanation: "Past condition, present result.", typeIndex: 4 },
          { question: "I ___ (have) a better job today if I ___ (go) to university.", answer: "I would have a better job today if I had gone to university.", explanation: "Present result from a hypothetical past condition.", typeIndex: 4 },
          { question: "If he ___ (speak) French, he ___ (move) to Paris last year.", answer: "If he spoke French, he would have moved to Paris last year.", explanation: "Present condition (doesn't speak French), past result (didn't move).", typeIndex: 4 }
        ]
      }
    ]
  },
  ua: {
    title: "Умовні речення та довідник з англійської граматики",
    navTheory: "Умовні речення",
    navLab: "Випадкова Лабораторія",
    navGrammar: "Граматичний Довідник",
    grammarIntro: "Маєте запитання щодо інших аспектів британської граматики? Звертайтеся до нашого граматика за допомогою.",
    grammarGreeting: "Привіт! Я ваш британський граматик.",
    askPlaceholder: "Введіть ваше запитання щодо граматики тут...",
    askButton: "Запитати",
    copyText: "Копіювати",
    copiedText: "Скопійовано!",
    generateFurther: "Згенерувати ще 5 вправ",
    generateRandom: "Згенерувати 10 випадкових вправ",
    generateMoreRandom: "Згенерувати ще 10",
    generating: "Генерування...",
    revealAnswer: "Показати відповідь",
    hideAnswer: "Сховати відповідь",
    explanation: "Пояснення",
    error: "Виникла помилка під час завантаження вправ. Будь ласка, спробуйте ще раз.",
    labIntro: "Перевірте свої знання з усіх типів умовних речень. Відповіді покажуть свої справжні кольори!",
    nuancesTitle: "Нюанси та правила",
    qaTitle: "Питання та відповіді",
    emptyLabState: "Натисніть кнопку генерування, щоб розпочати тест.",
    formulaTitle: "Формула",
    examplesTitle: "Приклади",
    practiceTitle: "Практика",
    qPrefix: "П: ",
    aPrefix: "В: ",
    types: [
      {
        id: 'zero',
        navName: "Нульовий",
        name: "Zero Conditional (Нульовий тип)",
        colorTheme: "blue",
        overview: "Нульовий тип є найпростішим серед умовних часів. Ми використовуємо його для обговорення загальновідомих істин, наукових фактів і речей, які завжди відбуваються за певних умов. Він описує ситуації, де конкретна умова завжди гарантує однаковий результат, незалежно від того, чи йдеться про минуле, теперішнє чи майбутнє.",
        formula: "If + present simple, present simple (або наказовий спосіб).",
        examples: [
          "If you heat water, it evaporates.",
          "If I drink coffee after 3 PM, I don't sleep at night.",
          "Text me if you get lost."
        ],
        nuances: [
          { title: "Правило коми", text: <>У всіх типах умовних речень порядок частин не є фіксованим. Якщо речення починається з частини з 'if', ви <strong>повинні</strong> використовувати кому для розділення двох частин. Якщо частина з 'if' стоїть другою, кома не потрібна.</> },
          { title: "\"If\" проти \"When\"", text: "У нульовому типі ви зазвичай можете замінити слово 'if' на 'when' або 'whenever' без зміни змісту речення, оскільки результат є гарантованим фактом." },
          { title: "Узагальнювальне \"You\"", text: "Коли слово 'you' використовується в реченнях нульового типу, воно часто стосується людей загалом, а не конкретної особи." }
        ],
        qa: [
          { q: "Який час використовується в обох частинах умовного речення нульового типу?", a: "В обох частинах (в 'if' clause та в головній частині) використовується час Present Simple." },
          { q: "Чи потрібна кома в реченні 'Water boils if you heat it to 100 degrees'?", a: "Ні, оскільки головна частина стоїть перед умовною ('if' clause)." },
          { q: "Чи можна замінити 'if' іншим словом без зміни значення?", a: "Так, зазвичай його можна замінити на 'when' (коли) або 'whenever' (щоразу, коли)." }
        ],
        staticExercises: [
          { question: "If you ___ (mix) red and blue, you ___ (get) purple.", answer: "If you mix red and blue, you get purple.", explanation: "Загальновідомий факт, який завжди є правдивим.", typeIndex: 0 },
          { question: "If I ___ (eat) peanuts, I ___ (break) out in a rash.", answer: "If I eat peanuts, I break out in a rash.", explanation: "Особистий стан, який загалом є правдивим.", typeIndex: 0 },
          { question: "Plants ___ (die) if they ___ (not get) enough water.", answer: "Plants die if they do not get enough water.", explanation: "Науковий факт.", typeIndex: 0 },
          { question: "If you ___ (press) this button, the machine ___ (start).", answer: "If you press this button, the machine starts.", explanation: "Механічний факт або інструкція.", typeIndex: 0 },
          { question: "Ice ___ (melt) if you ___ (heat) it.", answer: "Ice melts if you heat it.", explanation: "Науковий факт.", typeIndex: 0 }
        ]
      },
      {
        id: 'first',
        navName: "Перший",
        name: "First Conditional (Перший тип)",
        colorTheme: "green",
        overview: "Перший тип умовних речень використовується для обговорення реальних, конкретних ситуацій та речей, які мають цілком реальну ймовірність відбутися в майбутньому. На відміну від нульового типу, перший тип стосується реального світу та ймовірних майбутніх результатів.",
        formula: "If + present simple, will (або інша форма майбутнього/модальне дієслово) + infinitive.",
        examples: [
          "If we don't leave now, we will miss the train.",
          "If you study hard, you will pass the exam.",
          "If I see my boss, I'll ask her."
        ],
        nuances: [
          { title: "Модальні дієслова", text: "Ви можете замінити 'will' у головній частині модальними дієсловами ('might', 'could', 'may', 'should'), щоб виразити ступінь впевненості, рекомендацію або дозвіл." },
          { title: "Використання \"Unless\"", text: "Слово 'unless' є дуже поширеною альтернативою для 'if... not'. Наприклад, 'Unless you get an invitation' означає 'If you don't get an invitation'." },
          { title: "Застереження щодо \"Will\"", text: <>Дуже поширеною помилкою є вживання слова 'will' всередині умовної частини (з 'if'). Пам'ятайте: 'If it is sunny, we will go to the beach' — і <strong>ніколи</strong> 'If it will be sunny'.</> }
        ],
        qa: [
          { q: "Яка правильна граматична структура для першого типу умовних речень?", a: "If + present simple, will + infinitive." },
          { q: "Чи правильно сказати: 'If it will be sunny, we will go to the beach'?", a: "Ні, ви не повинні ставити 'will' у частині з 'if'; правильна форма: 'If it is sunny, we will go to the beach'." },
          { q: "Яке слово є поширеною альтернативою фразі 'if...not'?", a: "'Unless' (якщо не) є дуже поширеною альтернативою." }
        ],
        staticExercises: [
          { question: "If it ___ (rain) tomorrow, we ___ (cancel) the picnic.", answer: "If it rains tomorrow, we will cancel the picnic.", explanation: "Реальна можливість у майбутньому.", typeIndex: 1 },
          { question: "If you ___ (study) hard, you ___ (pass) the exam.", answer: "If you study hard, you will pass the exam.", explanation: "Ймовірний майбутній результат.", typeIndex: 1 },
          { question: "I ___ (call) you if I ___ (finish) work early.", answer: "I will call you if I finish work early.", explanation: "Можлива майбутня дія.", typeIndex: 1 },
          { question: "If she ___ (not hurry), she ___ (miss) the bus.", answer: "If she does not hurry, she will miss the bus.", explanation: "Ймовірний майбутній наслідок.", typeIndex: 1 },
          { question: "We ___ (go) to the beach if the weather ___ (be) nice.", answer: "We will go to the beach if the weather is nice.", explanation: "Плани на майбутнє, що залежать від умови.", typeIndex: 1 }
        ]
      },
      {
        id: 'second',
        navName: "Другий",
        name: "Second Conditional (Другий тип)",
        colorTheme: "purple",
        overview: "Другий тип умовних речень відходить від реальності. Ми використовуємо його, щоб говорити про уявні, неможливі, малоймовірні або гіпотетичні ситуації в теперішньому чи майбутньому, а також про їхні уявні результати. Він корисний для обговорення мрій або надання порад.",
        formula: "If + past simple, would (або could/might) + infinitive.",
        examples: [
          "If I won the lottery, I would buy a house in Barbados.",
          "If I had his number, I would call him.",
          "If I were shorter, I would wear heels more."
        ],
        nuances: [
          { title: "\"Were\" проти \"Was\"", text: "У другому типі вважається більш формально правильним використовувати 'were' для всіх осіб (наприклад, 'If I were') замість 'was', особливо коли ви даєте пораду. Проте 'was' залишається дуже поширеним у розмовній мові." },
          { title: "Застереження щодо \"Would\"", text: <><strong>Ніколи</strong> не ставте 'would' в умову з 'if'. Неправильно казати 'If I would meet Shakira'; правильна форма — 'If I met Shakira'.</> }
        ],
        qa: [
          { q: "До якого часового проміжку насправді відноситься другий тип?", a: "Він відноситься до уявних або гіпотетичних ситуацій у теперішньому або майбутньому часі." },
          { q: "Який варіант є більш формально правильним: 'If I was you' чи 'If I were you'?", a: "'If I were you' вважається більш формально правильним, хоча 'was' дуже часто зустрічається в розмовній англійській мові." },
          { q: "Що ми зазвичай обговорюємо, коли використовуємо другий тип?", a: "Ми використовуємо його, щоб говорити про мрії, фантазії та речі в теперішньому або майбутньому, які є неможливими або вкрай малоймовірними." }
        ],
        staticExercises: [
          { question: "If I ___ (have) a million pounds, I ___ (travel) the world.", answer: "If I had a million pounds, I would travel the world.", explanation: "Уявна ситуація в теперішньому або майбутньому.", typeIndex: 2 },
          { question: "If she ___ (know) his number, she ___ (call) him.", answer: "If she knew his number, she would call him.", explanation: "Неможлива ситуація в теперішньому (вона не знає номера).", typeIndex: 2 },
          { question: "I ___ (buy) a big house if I ___ (win) the lottery.", answer: "I would buy a big house if I won the lottery.", explanation: "Вкрай малоймовірний сценарій у майбутньому.", typeIndex: 2 },
          { question: "If I ___ (be) you, I ___ (not do) that.", answer: "If I were you, I would not do that.", explanation: "Надання гіпотетичної поради.", typeIndex: 2 },
          { question: "What ___ (you/do) if you ___ (see) a ghost?", answer: "What would you do if you saw a ghost?", explanation: "Уявна, малоймовірна ситуація.", typeIndex: 2 }
        ]
      },
      {
        id: 'third',
        navName: "Третій",
        name: "Third Conditional (Третій тип)",
        colorTheme: "red",
        overview: "Третій тип умовних речень використовується виключно для розмов про минуле. Він описує гіпотетичну ситуацію, яка не відбулася в минулому, та дозволяє уявити нереальний результат. Його часто використовують для висловлення жалю або критики.",
        formula: "If + past perfect (had + past participle), would have (або could/might have) + past participle.",
        examples: [
          "If I had studied harder, I would have passed the exam.",
          "If we had left earlier, we wouldn't have arrived late.",
          "If I had gone to bed earlier, I would have woken up in time to catch the train."
        ],
        nuances: [
          { title: "Скорочення", text: "Оскільки третій тип має складну структуру, носії мови часто використовують скорочення: 'If I had known' стає 'If I'd known', а 'I would have' — 'I would've'." },
          { title: "Узгодження підмета", text: "Слово 'have' у конструкції 'would have' ніколи не змінюється на 'has', незалежно від особи (I, you, he, she, it, we, they)." }
        ],
        qa: [
          { q: "Чи описує третій тип ситуацію, яка відбулася насправді?", a: "Ні, він використовується для розповіді про ситуацію, яка не відбулася в минулому, що дозволяє нам уявити результати цього нереального сценарію." },
          { q: "Чому мовці часто використовують скорочення на кшталт 'I’д' та 'would’ve'?", a: "Використання скорочень допомагає з вимовою, завдяки чому складна граматична структура звучить набагато природніше в розмовній англійській." }
        ],
        staticExercises: [
          { question: "If I ___ (know) you were coming, I ___ (bake) a cake.", answer: "If I had known you were coming, I would have baked a cake.", explanation: "Втрачена можливість у минулому.", typeIndex: 3 },
          { question: "We ___ (not get) wet if we ___ (take) an umbrella.", answer: "We would not have got wet if we had taken an umbrella.", explanation: "Нереальний результат у минулому.", typeIndex: 3 },
          { question: "If she ___ (study) more, she ___ (pass) the test.", answer: "If she had studied more, she would have passed the test.", explanation: "Гіпотетична минула ситуація, яка не відбулася.", typeIndex: 3 },
          { question: "They ___ (arrive) on time if they ___ (not miss) the train.", answer: "They would have arrived on time if they had not missed the train.", explanation: "Минулий наслідок нереальної умови.", typeIndex: 3 },
          { question: "If I ___ (not eat) so much, I ___ (not feel) sick.", answer: "If I had not eaten so much, I would not have felt sick.", explanation: "Жаль з приводу минулої дії.", typeIndex: 3 }
        ]
      },
      {
        id: 'mixed',
        navName: "Змішані",
        name: "Mixed Conditionals (Змішані типи)",
        colorTheme: "orange",
        overview: "Змішані типи дозволяють поєднувати два різні часові проміжки в одному реченні. Вони допомагають рухатися крізь час, пов'язуючи нереальні минулі дії з гіпотетичними теперішніми результатами, або навпаки.",
        formula: "Вар 1: If + past perfect, would + infinitive. | Вар 2: If + past simple, would have + past participle.",
        examples: [
          "If I had saved more money, I would own this house. (Минула умова, теперішній результат)",
          "If I had studied German in school, my German would be better. (Минула умова, теперішній результат)",
          "If I were rich, I would have bought that coat. (Теперішня умова, минулий результат)"
        ],
        nuances: [
          { title: "Time vs. Tense", text: "Не плутайте час дієслова (tense) з реальним часом (time). Наприклад, у реченні 'If I were rich' ви використовуєте Past Simple, але насправді говорите про уявну ситуацію в теперішньому." },
          { title: "\"Were\" проти \"Was\"", text: "Коли ви поєднуєте теперішню умову з минулим результатом, застосовуйте правило другого типу: формально правильніше використовувати 'were' для всіх осіб." }
        ],
        qa: [
          { q: "Яка основна мета змішаних умовних речень?", a: "Вони використовуються для поєднання двох різних часових періодів в одному реченні, наприклад, уявної минулої ситуації, яка має гіпотетичний теперішній результат." },
          { q: "В реченні 'If I were rich, I would have bought that coat', до якого часу відноситься частина з 'if'?", a: "Вона відноситься до нереальної або гіпотетичної ситуації в теперішньому часі, незважаючи на те, що використовується час Past Simple." },
          { q: "Правда чи брехня: ви можете змішувати лише минулі умови з теперішніми результатами?", a: "Брехня. Хоча це дуже поширена комбінація, ви також можете змішувати теперішні умови з минулими результатами, а також використовувати кілька інших часових комбінацій." }
        ],
        staticExercises: [
          { question: "If I ___ (listen) to your advice, I ___ (not be) in this mess now.", answer: "If I had listened to your advice, I would not be in this mess now.", explanation: "Минула умова (не послухав), теперішній результат (у біді).", typeIndex: 4 },
          { question: "If she ___ (be) a better driver, she ___ (not crash) her car yesterday.", answer: "If she were a better driver, she would not have crashed her car yesterday.", explanation: "Теперішня умова (вона загалом не є хорошим водієм), минулий результат (розбила машину).", typeIndex: 4 },
          { question: "If we ___ (buy) the map, we ___ (not be) lost right now.", answer: "If we had bought the map, we would not be lost right now.", explanation: "Минула умова, теперішній результат.", typeIndex: 4 },
          { question: "I ___ (have) a better job today if I ___ (go) to university.", answer: "I would have a better job today if I had gone to university.", explanation: "Теперішній результат від гіпотетичної минулої умови.", typeIndex: 4 },
          { question: "If he ___ (speak) French, he ___ (move) to Paris last year.", answer: "If he spoke French, he would have moved to Paris last year.", explanation: "Теперішня умова (не розмовляє французькою), минулий результат (не переїхав).", typeIndex: 4 }
        ]
      }
    ]
  }
};

// --- Theme Helper ---
const themeStyles = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', header: 'bg-blue-100', button: 'bg-blue-600 hover:bg-blue-700', activeTab: 'bg-blue-600 text-white shadow-md', inactiveTab: 'bg-white text-blue-700 hover:bg-blue-50', bullet: 'bg-blue-500' },
  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', header: 'bg-green-100', button: 'bg-green-600 hover:bg-green-700', activeTab: 'bg-green-600 text-white shadow-md', inactiveTab: 'bg-white text-green-700 hover:bg-blue-50', bullet: 'bg-green-500' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', header: 'bg-purple-100', button: 'bg-purple-600 hover:bg-purple-700', activeTab: 'bg-purple-600 text-white shadow-md', inactiveTab: 'bg-white text-purple-700 hover:bg-blue-50', bullet: 'bg-purple-500' },
  red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', header: 'bg-red-100', button: 'bg-red-600 hover:bg-red-700', activeTab: 'bg-red-600 text-white shadow-md', inactiveTab: 'bg-white text-red-700 hover:bg-blue-50', bullet: 'bg-red-500' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', header: 'bg-orange-100', button: 'bg-orange-600 hover:bg-orange-700', activeTab: 'bg-orange-600 text-white shadow-md', inactiveTab: 'bg-white text-orange-700 hover:bg-blue-50', bullet: 'bg-orange-500' }
};

const typeIndexMap = ["Type 0: Zero Conditional", "Type 1: First Conditional", "Type 2: Second Conditional", "Type 3: Third Conditional", "Mixed Conditional"];
const typeColorMap = ["text-blue-600", "text-green-600", "text-purple-600", "text-red-600", "text-orange-600"];

// --- API Service ---
const fetchExercisesFromGemini = async (count, specificType, lang, history) => {
  const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const typeInstruction = specificType === null 
    ? "Generate a random mix of all 5 types (Zero, First, Second, Third, Mixed)." 
    : `Generate ONLY exercises for type index ${specificType} (${typeIndexMap[specificType]}).`;

  const prompt = `
    You are an expert English grammar teacher. Generate ${count} fill-in-the-blank or sentence completion exercises for English Conditionals.
    Ensure all generated English text strictly follows British English spelling and punctuation conventions (e.g., 'colour', 'centre', 'travelling', 'Mr' instead of 'Mr.').
    ${typeInstruction}
    
    CRITICAL HISTORY CONSTRAINT: Do NOT generate any questions that match the following previously generated questions:
    [${history.join(" | ")}]
    
    Respond STRICTLY with a JSON array of objects. No markdown formatting, just the raw JSON.
    DO NOT translate the JSON keys. The keys MUST remain in English.
    The 'question' and 'answer' values MUST be in English.
    The 'explanation' value MUST be in the target language (${lang === 'en' ? 'English' : 'Ukrainian'}).
    
    Schema per object:
    {
      "question": "The sentence with a blank represented by 3 underscores (e.g., 'If it rains, we ___ (cancel) the picnic.')",
      "answer": "The full correct sentence (e.g., 'If it rains, we will cancel the picnic.')",
      "explanation": "Brief explanation of why this grammar is used (in ${lang === 'en' ? 'English' : 'Ukrainian'}).",
      "typeIndex": Number from 0 to 4 (0:Zero, 1:First, 2:Second, 3:Third, 4:Mixed)
    }
  `;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: "application/json" }
  };

  const delays = [1000, 2000, 4000, 8000, 16000];
  
  for (let i = 0; i < delays.length; i++) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Gemini API Error (${response.status}):`, errorText);
        let errorMsg = `API Error ${response.status}: ${response.statusText}`;
        try {
          const errObj = JSON.parse(errorText);
          if (errObj.error && errObj.error.message) errorMsg += ` - ${errObj.error.message}`;
        } catch(e) {}
        
        if (response.status >= 400 && response.status < 500 && response.status !== 429) {
          throw new Error(`Fatal ${errorMsg}`);
        }
        throw new Error(errorMsg);
      }
      
      const data = await response.json();
      let text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) throw new Error("Empty response from Gemini");
      
      // Clean up any potential markdown formatting from the response
      text = text.replace(/```(json)?\n?/g, '').replace(/```\n?/g, '').trim();
      
      return JSON.parse(text);
    } catch (error) {
      if (error.message.includes("Fatal")) throw error;
      if (i === delays.length - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delays[i]));
    }
  }
};

const askGrammarianFromGemini = async (query, history, lang) => {
  const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const systemPrompt = `Role: You are an expert grammarian. Answer all questions in the context of British English. All responses should be in British English and follow British English Conventions (colour, theatre, centre, Mr, Mrs, Dr etc.). Where British and American grammar differ, tell the questioner that American English differs and offer to explain the difference. You must always provide initial explanations with reference to British English and grammar. If the user asks in Ukrainian or the current target language is Ukrainian, respond and explain in Ukrainian, but strictly reference English grammar rules and provide English examples.

CRITICAL FORMATTING INSTRUCTIONS - YOU MUST OBEY THESE STRICTLY:
1. ALWAYS use **bold** for short labels at the start of a line (e.g., **Meaning:**, **Sentence:**, **Rule:**).
2. NEVER wrap entire sentences, rules, or paragraphs in bold or italics. This causes severe rendering errors.
3. Write all explanations and example sentences in PLAIN TEXT.
4. Use **bold** ONLY for the specific grammar words you are highlighting inside a sentence (e.g., "I do not know **whether** to go").
5. DO NOT output nested asterisks (e.g., **Sentence: **word****).
6. DO NOT use single asterisks (*) or triple asterisks (***). Use ONLY double asterisks (**) for the targeted grammar words.`;

  // Map local history to Gemini's expected conversational format
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));
  
  // Append current query
  contents.push({ role: 'user', parts: [{ text: query }] });

  const payload = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: contents
  };

  const delays = [1000, 2000, 4000, 8000, 16000];
  
  for (let i = 0; i < delays.length; i++) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Gemini API Error (${response.status}):`, errorText);
        let errorMsg = `API Error ${response.status}: ${response.statusText}`;
        try {
          const errObj = JSON.parse(errorText);
          if (errObj.error && errObj.error.message) errorMsg += ` - ${errObj.error.message}`;
        } catch(e) {}
        
        if (response.status >= 400 && response.status < 500 && response.status !== 429) {
          throw new Error(`Fatal ${errorMsg}`);
        }
        throw new Error(errorMsg);
      }
      
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) throw new Error("Empty response from Gemini");
      
      return text;
    } catch (error) {
      if (error.message.includes("Fatal")) throw error;
      if (i === delays.length - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delays[i]));
    }
  }
};

// --- Markdown Parser Helper ---
const formatInlineHTML = (text) => {
  let processedText = text;

  // 1. Clean messy asterisks around labels at the start of a line (e.g. *Meaning:*, **Meaning:*, Meaning:**)
  processedText = processedText.replace(/(^|<br\s*\/?>|\n)\s*\*+([A-Z][A-Za-z0-9]*(\s+[A-Za-z0-9]+){0,3})\*+:\s*\*+/g, '$1$2: ');
  processedText = processedText.replace(/(^|<br\s*\/?>|\n)\s*\*+([A-Z][A-Za-z0-9]*(\s+[A-Za-z0-9]+){0,3}):\s*\*+/g, '$1$2: ');
  processedText = processedText.replace(/(^|<br\s*\/?>|\n)\s*([A-Z][A-Za-z0-9]*(\s+[A-Za-z0-9]+){0,3})\*+:\s*\*+/g, '$1$2: ');

  // 2. Auto-bold all short labels to ensure absolute consistency
  processedText = processedText.replace(/(^|<br\s*\/?>|\n)\s*([A-Z][A-Za-z0-9]*(\s+[A-Za-z0-9]+){0,3}):\s/g, '$1**$2:** ');

  // 3. The Unwrapper: Remove outer bold from whole sentences that cause inversion
  // Detects the pattern: **(text)**(target word)**(text)** and unwraps the outer layer
  processedText = processedText.replace(/\*\*([^\*]+)\*\*([^\*]+)\*\*([^\*]+)\*\*/g, function(match, p1, p2, p3) {
    if (p2.trim().length === 0) return match; // Skip if the middle part is just space
    if (p1.trim().endsWith(':') || p3.trim().endsWith(':')) return match; // Skip if it involves a label
    if (p1.length > 3 || p3.length > 3) {
        return p1 + '**' + p2 + '**' + p3; // Unwrap the outer bold!
    }
    return match;
  });

  // 4. Standard Markdown replacements
  let html = processedText
    .replace(/\*\*\*([\s\S]+?)\*\*\*/g, '<strong class="font-bold text-slate-900 italic">$1</strong>')
    .replace(/\*\*([\s\S]+?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
    .replace(/\*([\s\S]+?)\*/g, '<em class="italic text-slate-800">$1</em>')
    .replace(/`([\s\S]+?)`/g, '<code class="bg-blue-50 text-blue-700 border border-blue-100 px-1.5 py-0.5 rounded text-[0.9em] font-mono">$1</code>');
    
  // 5. The Nuclear Option: Eradicate any surviving rogue asterisks
  html = html.replace(/\*/g, '');
  
  return html;
};

const formatMarkdown = (text) => {
  if (!text) return null;
  
  // Clean up any stray trailing asterisks at the very end of the response
  let cleanText = text.trim().replace(/\*+$/, '').trim();

  // Split the response into logical blocks separated by double newlines
  const blocks = cleanText.split(/\n{2,}/);
  
  return blocks.map((block, bIdx) => {
    // Strip errant asterisks from the end of individual blocks just in case
    block = block.replace(/\*+$/, '').trim();

    // 1. Headings
    const hMatch = block.match(/^(#{1,6})\s+(.*)/);
    if (hMatch) {
      const level = hMatch[1].length;
      const classes = level === 1 ? 'text-2xl font-bold mb-4 mt-6 text-slate-800' 
                    : level === 2 ? 'text-xl font-bold mb-3 mt-5 text-slate-800' 
                    : 'text-lg font-bold mb-2 mt-4 text-slate-800';
      const Tag = `h${level}`;
      return React.createElement(Tag, { key: bIdx, className: classes, dangerouslySetInnerHTML: { __html: formatInlineHTML(hMatch[2]) } });
    }
    
    // Split block into lines to check for lists and tables
    const lines = block.split('\n').map(l => l.trim()).filter(l => l);
    const isUnorderedList = lines.every(line => /^[\-\*]\s+/.test(line));
    const isOrderedList = lines.every(line => /^\d+\.\s+/.test(line));
    
    // Check if the block is a Markdown Table (Line 0 has pipes, Line 1 is the separator with hyphens and pipes)
    const isTable = lines.length >= 2 && lines[0].includes('|') && lines[1].includes('|') && lines[1].includes('-');

    // 2. Unordered Lists
    if (isUnorderedList) {
      return (
        <ul key={bIdx} className="list-disc pl-6 mb-4 space-y-2 text-slate-700">
          {lines.map((line, lIdx) => (
            <li key={lIdx} dangerouslySetInnerHTML={{ __html: formatInlineHTML(line.replace(/^[\-\*]\s+/, '')) }} />
          ))}
        </ul>
      );
    }

    // 3. Ordered Lists
    if (isOrderedList) {
      return (
        <ol key={bIdx} className="list-decimal pl-6 mb-4 space-y-2 text-slate-700">
          {lines.map((line, lIdx) => (
            <li key={lIdx} dangerouslySetInnerHTML={{ __html: formatInlineHTML(line.replace(/^\d+\.\s+/, '')) }} />
          ))}
        </ol>
      );
    }
    
    // 4. Tables
    if (isTable) {
      const parseRow = (line) => {
        // Remove leading and trailing pipes so we don't get empty cells at the edges
        const cleanedLine = line.replace(/^\|/, '').replace(/\|$/, '');
        return cleanedLine.split('|').map(cell => cell.trim());
      };

      const headers = parseRow(lines[0]);
      const rows = lines.slice(2).map(parseRow); // Skip line 1 (the separator)

      return (
        <div key={bIdx} className="overflow-x-auto mb-5 rounded-lg border border-slate-200">
          <table className="min-w-full border-collapse text-sm text-slate-800">
            <thead className="bg-slate-100">
              <tr>
                {headers.map((header, i) => (
                  <th key={i} className="border-b border-slate-200 px-4 py-3 text-left font-bold" dangerouslySetInnerHTML={{ __html: formatInlineHTML(header) }} />
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="border-b border-slate-100 px-4 py-3" dangerouslySetInnerHTML={{ __html: formatInlineHTML(cell) }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // 5. Standard Paragraphs (Convert single newlines to distinct block elements instead of <br/>)
    const paragraphLines = block.split('\n');
    return (
      <div key={bIdx} className="mb-4 last:mb-0 text-slate-700 leading-relaxed space-y-2">
        {paragraphLines.map((line, lIdx) => (
          <p key={lIdx} dangerouslySetInnerHTML={{ __html: formatInlineHTML(line) }} />
        ))}
      </div>
    );
  });
};

// --- Components ---

const ExerciseItem = ({ item, isLab }) => {
  const [revealed, setRevealed] = useState(false);

  // Split the question by 2 or more underscores to insert inputs
  const parts = item.question.split(/_{2,}/);
  const [userAnswers, setUserAnswers] = useState(Array(Math.max(0, parts.length - 1)).fill(""));
  const [fallbackAnswer, setFallbackAnswer] = useState("");

  const handleInputChange = (index, value) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const baseBg = isLab ? 'bg-[#FAF0E6] border-[#D2B48C]' : 'bg-white border-gray-200';
  const textQuestionColor = isLab ? 'text-[#5C4033]' : 'text-gray-800';
  const textAnswerColor = typeColorMap[item.typeIndex];

  return (
    <div className={`p-4 border rounded-xl shadow-sm mb-4 transition-all duration-300 ${baseBg}`}>
      {/* Question remains visible, now with interactive gaps */}
      <div className={`font-medium text-lg mb-2 leading-relaxed ${textQuestionColor} ${revealed ? 'opacity-60' : ''}`}>
        {parts.length > 1 ? (
          parts.map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index < parts.length - 1 && (
                <input
                  type="text"
                  value={userAnswers[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  disabled={revealed}
                  style={{ width: `${Math.max(6, userAnswers[index].length + 1.5)}ch` }}
                  className={`mx-1 px-1 py-0.5 text-center font-bold outline-none border-b-2 bg-transparent transition-all focus:border-blue-500 disabled:bg-transparent disabled:opacity-100 max-w-full sm:max-w-[250px] ${
                    revealed ? 'border-gray-300 text-gray-500' : 'border-slate-400 text-blue-700'
                  }`}
                />
              )}
            </React.Fragment>
          ))
        ) : (
          <div className="flex flex-col gap-3 mt-1">
            <span>{item.question}</span>
            <input 
              type="text"
              value={fallbackAnswer}
              onChange={(e) => setFallbackAnswer(e.target.value)}
              disabled={revealed}
              placeholder="Type your answer..."
              className={`w-full p-2 rounded-lg border outline-none bg-white/50 transition-colors focus:border-blue-500 focus:bg-white disabled:opacity-60 text-base ${
                 revealed ? 'border-gray-300 text-gray-500' : 'border-slate-300 text-blue-700'
              }`}
            />
          </div>
        )}
      </div>
      
      {/* Answer and Explanation drop down below the question */}
      {revealed && (
        <div className={`mt-4 pt-4 border-t ${isLab ? 'border-[#D2B48C]/40' : 'border-gray-200'} animate-in fade-in slide-in-from-top-2 duration-300`}>
          <p className={`font-bold text-xl mb-4 ${textAnswerColor}`}>
            {item.answer}
          </p>
          <div className={`p-4 rounded-lg bg-white/70 border ${isLab ? 'border-[#E6D5C3]' : 'border-gray-100'}`}>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className={`w-4 h-4 ${textAnswerColor}`} />
              <span className={`text-sm font-bold tracking-wide ${textAnswerColor}`}>
                {typeIndexMap[item.typeIndex]}
              </span>
            </div>
            <p className="text-sm text-gray-800 italic leading-relaxed">{item.explanation}</p>
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setRevealed(!revealed)}
        className={`mt-4 flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors
          ${isLab 
            ? 'bg-[#E6D5C3] hover:bg-[#D2B48C] text-[#5C4033]' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
      >
        {revealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        {revealed ? "Hide Answer" : "Reveal Answer"}
      </button>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState('en');
  const [activeMainTab, setActiveMainTab] = useState('theory');
  const [activeTheoryTab, setActiveTheoryTab] = useState('zero');
  const [questionHistory, setQuestionHistory] = useState([]);
  
  // Section states
  const [theoryExercises, setTheoryExercises] = useState({});
  const [theoryLoading, setTheoryLoading] = useState({});
  const [theoryError, setTheoryError] = useState({});
  
  const [labBatches, setLabBatches] = useState([]);
  const [labLoading, setLabLoading] = useState(false);
  const [labError, setLabError] = useState(null);

  // Grammar Guide Chat State
  const [grammarChat, setGrammarChat] = useState([]);
  const [grammarQuery, setGrammarQuery] = useState("");
  const [grammarLoading, setGrammarLoading] = useState(false);
  const [grammarError, setGrammarError] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const chatEndRef = useRef(null);
  const latestMessageRef = useRef(null);

  // Focus logic: Scroll to the start of the response/question when it arrives
  useEffect(() => {
    if (activeMainTab === 'grammar' && grammarChat.length > 0) {
      const lastMsg = grammarChat[grammarChat.length - 1];
      // If a response has just arrived, or if we just sent a question
      if (lastMsg.role === 'model' || lastMsg.role === 'user') {
        latestMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [grammarChat, activeMainTab]);

  const t = content[lang];
  const activeTheoryData = t.types.find(type => type.id === activeTheoryTab);
  const theme = themeStyles[activeTheoryData.colorTheme];

  const handleGenerateTheory = async (typeIndex, typeId) => {
    setTheoryLoading(prev => ({ ...prev, [typeId]: true }));
    setTheoryError(prev => ({ ...prev, [typeId]: null }));
    try {
      const results = await fetchExercisesFromGemini(5, typeIndex, lang, questionHistory);
      setTheoryExercises(prev => ({ ...prev, [typeId]: [...(prev[typeId] || []), ...results] }));
      setQuestionHistory(prev => [...prev, ...results.map(r => r.question)]);
    } catch (err) {
      console.error(err);
      setTheoryError(prev => ({ ...prev, [typeId]: err.message || "An unknown error occurred" }));
    }
    setTheoryLoading(prev => ({ ...prev, [typeId]: false }));
  };

  const handleGenerateLab = async () => {
    setLabLoading(true);
    setLabError(null);
    try {
      const results = await fetchExercisesFromGemini(10, null, lang, questionHistory);
      setLabBatches(prev => [...prev, results]);
      setQuestionHistory(prev => [...prev, ...results.map(r => r.question)]);
    } catch (err) {
      console.error(err);
      setLabError(err.message || "An unknown error occurred");
    }
    setLabLoading(false);
  };

  const handleAskGrammar = async (e) => {
    e?.preventDefault();
    if (!grammarQuery.trim() || grammarLoading) return;

    const userMsg = { role: 'user', text: grammarQuery };
    setGrammarChat(prev => [...prev, userMsg]);
    const currentQuery = grammarQuery;
    setGrammarQuery("");
    setGrammarLoading(true);
    setGrammarError(null);

    try {
      const responseText = await askGrammarianFromGemini(currentQuery, grammarChat, lang);
      setGrammarChat(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (err) {
      console.error(err);
      setGrammarError(err.message || "An unknown error occurred");
      setGrammarChat(prev => prev.slice(0, -1)); 
      setGrammarQuery(currentQuery);
    }
    setGrammarLoading(false);
  };

  const handleCopy = async (text, index) => {
    // Strip markdown formatting for a clean plain-text copy
    const cleanText = text
      .replace(/\*\*\*([\s\S]+?)\*\*\*/g, '$1') // Remove bold italic
      .replace(/\*\*([\s\S]+?)\*\*/g, '$1') // Remove bold
      .replace(/\*([\s\S]+?)\*/g, '$1') // Remove italic
      .replace(/`([\s\S]+?)`/g, '$1') // Remove code syntax
      .replace(/^(#{1,6})\s+(.*)/gm, '$2') // Remove heading hashes
      .replace(/\*/g, ''); // The Nuclear Option: eradicate all remaining stray asterisks

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(cleanText);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
        return; // Exit early if successful
      }
    } catch (err) {
      console.warn('Modern clipboard API failed, using fallback', err);
    }

    // Fallback for older browsers or restricted environments
    const textArea = document.createElement("textarea");
    textArea.value = cleanText;
    textArea.style.position = "absolute";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    
    document.body.removeChild(textArea);
  };

  // Group the chat into Q&A pairs (Chronological order)
  const chatPairs = [];
  for (let i = 0; i < grammarChat.length; i += 2) {
    chatPairs.push({
      userMsg: grammarChat[i],
      modelMsg: grammarChat[i+1] || null
    });
  }

  const isGrammarChatEmpty = chatPairs.length === 0 && !grammarLoading && !grammarError;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-md sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 min-h-[4rem] py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 flex-1">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 shrink-0" />
            <h1 className="text-sm sm:text-xl font-bold tracking-tight leading-tight">{t.title}</h1>
          </div>
          <button 
            onClick={() => setLang(lang === 'en' ? 'ua' : 'en')}
            className="flex items-center gap-1.5 sm:gap-2 bg-slate-800 hover:bg-slate-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors border border-slate-700 shadow-sm shrink-0 ml-2"
          >
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="hidden sm:inline">{lang === 'en' ? 'EN / UA' : 'UA / EN'}</span>
            <span className="sm:hidden">{lang === 'en' ? 'UA' : 'EN'}</span>
          </button>
        </div>
      </header>

      {/* Main Navigation */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 inline-flex">
          <button
            onClick={() => setActiveMainTab('theory')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeMainTab === 'theory' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
          >
            <BookOpen className="w-4 h-4" />
            {t.navTheory}
          </button>
          <button
            onClick={() => setActiveMainTab('lab')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeMainTab === 'lab' ? 'bg-[#5C4033] text-[#FAF0E6] shadow' : 'text-slate-600 hover:text-[#5C4033] hover:bg-[#FAF0E6]'}`}
          >
            <Beaker className="w-4 h-4" />
            {t.navLab}
          </button>
          <button
            onClick={() => setActiveMainTab('grammar')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeMainTab === 'grammar' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'}`}
          >
            <MessageCircle className="w-4 h-4" />
            {t.navGrammar}
          </button>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4">
        
        {/* TAB: THEORY */}
        {activeMainTab === 'theory' && (
          <div className="animate-in fade-in duration-300">
            <div className="sticky top-16 z-10 bg-slate-50 py-4 mb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex flex-wrap gap-2">
                {t.types.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setActiveTheoryTab(type.id)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${activeTheoryTab === type.id ? themeStyles[type.colorTheme].activeTab : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 shadow-sm'}`}
                  >
                    {type.navName}
                  </button>
                ))}
              </div>
            </div>

            <section className={`rounded-2xl border shadow-sm ${theme.bg} ${theme.border} overflow-hidden`}>
              <div className={`px-8 py-6 border-b ${theme.header} ${theme.border}`}>
                <h2 className={`text-3xl font-bold ${theme.text}`}>{activeTheoryData.name}</h2>
              </div>
              
              <div className="p-8 space-y-8">
                <div>
                  <p className="text-gray-800 text-lg leading-relaxed">{activeTheoryData.overview}</p>
                </div>

                <div className="bg-white/80 rounded-xl p-5 shadow-sm border border-black/5">
                  <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 ${theme.text} opacity-80 flex items-center gap-2`}>
                    <Info className="w-4 h-4" /> {t.formulaTitle}
                  </h3>
                  <p className="font-mono font-semibold text-gray-800 text-lg">
                    {activeTheoryData.formula}
                  </p>
                </div>

                <div>
                  <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${theme.text} opacity-80`}>{t.examplesTitle}</h3>
                  <ul className="space-y-3">
                    {activeTheoryData.examples.map((ex, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-800 bg-white/40 p-3 rounded-lg border border-black/5">
                        <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${theme.bullet} shadow-sm`} />
                        <span className="font-medium text-[1.05rem]">{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${theme.text} opacity-80 flex items-center gap-2`}>
                    <AlertTriangle className="w-4 h-4" /> {t.nuancesTitle}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {activeTheoryData.nuances.map((nuance, i) => (
                      <div key={i} className="bg-white/60 p-4 rounded-xl border border-black/5 shadow-sm">
                        <h4 className={`font-bold mb-2 ${theme.text}`}>{nuance.title}</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{nuance.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${theme.text} opacity-80 flex items-center gap-2`}>
                    <HelpCircle className="w-4 h-4" /> {t.qaTitle}
                  </h3>
                  <div className="space-y-3">
                    {activeTheoryData.qa.map((qaItem, i) => (
                      <div key={i} className="bg-white/60 p-4 rounded-xl border border-black/5 shadow-sm">
                        <p className="font-bold text-gray-800 mb-2">{t.qPrefix}{qaItem.q}</p>
                        <p className="text-gray-700">{t.aPrefix}{qaItem.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t-2 pt-8 border-black/10 mt-8">
                  <div className="mb-6">
                    <h3 className={`text-2xl font-bold ${theme.text}`}>{t.practiceTitle}</h3>
                  </div>

                  {theoryError[activeTheoryTab] && (
                    <div className="p-4 mb-6 rounded-lg bg-red-100 text-red-700 flex items-center gap-3 border border-red-200">
                      <AlertTriangle className="w-5 h-5 flex-shrink-0" /> 
                      <span className="font-medium">{theoryError[activeTheoryTab] === true ? t.error : theoryError[activeTheoryTab]}</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    {(activeTheoryData.staticExercises || []).map((ex, i) => (
                      <ExerciseItem key={`static-${activeTheoryTab}-${i}`} item={ex} isLab={false} />
                    ))}
                    {(theoryExercises[activeTheoryTab] || []).map((ex, i) => (
                      <ExerciseItem key={`dynamic-${activeTheoryTab}-${i}`} item={ex} isLab={false} />
                    ))}
                  </div>

                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={() => handleGenerateTheory(t.types.findIndex(type => type.id === activeTheoryTab), activeTheoryTab)}
                      disabled={theoryLoading[activeTheoryTab]}
                      className={`flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold shadow-md transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none disabled:cursor-not-allowed ${theme.button}`}
                    >
                      <RefreshCw className={`w-5 h-5 ${theoryLoading[activeTheoryTab] ? 'animate-spin' : ''}`} />
                      {theoryLoading[activeTheoryTab] ? t.generating : t.generateFurther}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB: RANDOM LAB */}
        {activeMainTab === 'lab' && (
          <div className="bg-[#FAF0E6] border-2 border-[#D2B48C] rounded-2xl shadow-xl overflow-hidden animate-in fade-in duration-300">
            <div className="bg-[#5C4033] text-[#FAF0E6] p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              <Beaker className="w-16 h-16 mx-auto mb-5 text-[#D2B48C]" />
              <h2 className="text-4xl font-extrabold mb-4 tracking-tight">{t.navLab}</h2>
              <p className="text-[#E6D5C3] text-lg max-w-xl mx-auto mb-8">{t.labIntro}</p>
              
              {labBatches.length === 0 && (
                <button
                  onClick={handleGenerateLab}
                  disabled={labLoading}
                  className="relative z-10 inline-flex items-center gap-3 bg-[#D2B48C] hover:bg-[#C19A6B] text-[#5C4033] font-bold text-lg px-8 py-4 rounded-xl shadow-lg transform transition hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none"
                >
                  <RefreshCw className={`w-6 h-6 ${labLoading ? 'animate-spin' : ''}`} />
                  {labLoading ? t.generating : t.generateRandom}
                </button>
              )}
            </div>

            <div className="p-8">
              {labError && (
                <div className="p-4 mb-6 rounded-xl bg-red-100 border border-red-200 text-red-700 flex items-center gap-3 font-medium">
                  <AlertTriangle className="w-6 h-6 flex-shrink-0" />
                  <p>{typeof labError === 'string' ? labError : t.error}</p>
                </div>
              )}

              {labBatches.map((batch, batchIndex) => (
                <div key={`lab-batch-${batchIndex}`} className="animate-in fade-in duration-300">
                  <div className="space-y-5">
                    {batch.map((ex, i) => (
                      <ExerciseItem key={`lab-ex-${batchIndex}-${i}`} item={ex} isLab={true} />
                    ))}
                  </div>
                  
                  <div className="mt-10 mb-10 flex justify-center">
                    <button
                      onClick={handleGenerateLab}
                      disabled={labLoading || batchIndex !== labBatches.length - 1}
                      className={`relative z-10 inline-flex items-center gap-3 bg-[#D2B48C] text-[#5C4033] font-bold text-lg px-8 py-4 rounded-xl shadow-lg transform transition ${
                        batchIndex === labBatches.length - 1 && !labLoading
                          ? 'hover:bg-[#C19A6B] hover:-translate-y-0.5' 
                          : 'opacity-50 cursor-default shadow-sm'
                      }`}
                    >
                      <RefreshCw className={`w-6 h-6 ${(labLoading && batchIndex === labBatches.length - 1) ? 'animate-spin' : ''}`} />
                      {(labLoading && batchIndex === labBatches.length - 1) ? t.generating : t.generateMoreRandom}
                    </button>
                  </div>
                </div>
              ))}
              
              {!labLoading && labBatches.length === 0 && !labError && (
                <div className="text-center py-16 text-[#8B4513] opacity-60 flex flex-col items-center">
                  <BookOpen className="w-16 h-16 mb-4 opacity-40" />
                  <p className="text-xl font-medium">{t.emptyLabState}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: GRAMMAR GUIDE */}
        {activeMainTab === 'grammar' && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[calc(100vh-12rem)] min-h-[500px] max-h-[800px] animate-in fade-in duration-300">
            {/* Chat Header */}
            <div className="bg-slate-50 px-4 sm:px-8 py-4 sm:py-6 border-b border-slate-200 flex items-center gap-3 sm:gap-4 shrink-0">
              <div className="p-2 sm:p-3 bg-blue-100 text-blue-600 rounded-full shrink-0">
                <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">{t.navGrammar}</h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">{t.grammarIntro}</p>
              </div>
            </div>

            {isGrammarChatEmpty ? (
              <div className="flex-1 flex flex-col bg-slate-50/50">
                <div className="p-4 sm:p-6 bg-white border-b border-slate-100 shadow-sm z-10 shrink-0">
                  <form onSubmit={handleAskGrammar} className="flex items-center gap-2 sm:gap-3">
                    <input 
                      type="text" 
                      value={grammarQuery}
                      onChange={(e) => setGrammarQuery(e.target.value)}
                      placeholder={t.askPlaceholder}
                      className="flex-1 bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 sm:p-4 transition-all outline-none"
                      disabled={grammarLoading}
                    />
                    <button 
                      type="submit"
                      disabled={!grammarQuery.trim() || grammarLoading}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-3 sm:p-4 rounded-xl font-bold shadow-md transition-all disabled:opacity-50 disabled:hover:bg-blue-600 flex items-center gap-2"
                    >
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">{t.askButton}</span>
                    </button>
                  </form>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 opacity-60 p-6 text-center">
                  <Bot className="w-12 h-12 sm:w-16 sm:h-16 mb-4" />
                  <p className="text-base sm:text-lg font-medium">{t.grammarGreeting}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8 bg-slate-50/50">
                  {chatPairs.map((pair, idx) => {
                    // We target the current/latest interaction for auto-scroll focus
                    const isLatest = idx === chatPairs.length - 1;
                    return (
                      <div key={idx} ref={isLatest ? latestMessageRef : null} className="flex flex-col gap-4 sm:gap-5 animate-in slide-in-from-bottom-4 fade-in duration-500">
                        {/* User Question */}
                        <div className="flex gap-2 sm:gap-4 flex-row-reverse">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm bg-slate-800 text-white">
                            <User className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <div className="max-w-[88%] sm:max-w-[85%] rounded-2xl p-3 sm:p-4 shadow-sm text-[14px] sm:text-[15px] leading-relaxed whitespace-pre-wrap bg-slate-800 text-white rounded-tr-none">
                            {pair.userMsg.text}
                          </div>
                        </div>

                        {/* Model Answer OR Loading */}
                        {pair.modelMsg ? (
                          <div className="flex gap-2 sm:gap-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm bg-blue-600 text-white mt-1">
                              <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            <div className="flex flex-col gap-1 items-start max-w-[92%] sm:max-w-[85%] w-full">
                              <div className="rounded-2xl p-4 sm:p-6 shadow-sm text-[14px] sm:text-[15px] bg-white border border-slate-200 text-slate-800 rounded-tl-none overflow-x-auto w-full">
                                {formatMarkdown(pair.modelMsg.text)}
                              </div>
                              <button 
                                onClick={() => handleCopy(pair.modelMsg.text, idx)}
                                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-blue-600 ml-1 mt-0.5 transition-colors px-2 py-1 rounded-md hover:bg-slate-100"
                                title="Copy to clipboard"
                              >
                                {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                                <span className={copiedIndex === idx ? "text-green-600" : ""}>
                                  {copiedIndex === idx ? t.copiedText : t.copyText}
                                </span>
                              </button>
                            </div>
                          </div>
                        ) : grammarLoading ? (
                          <div className="flex gap-2 sm:gap-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm bg-blue-600 text-white">
                              <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3 sm:p-5 flex items-center gap-2 shadow-sm">
                              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-bounce"></span>
                              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-4 sm:p-5 bg-white border-t border-slate-200 shadow-sm z-10 shrink-0">
                  <form onSubmit={handleAskGrammar} className="flex items-center gap-2 sm:gap-3">
                    <input 
                      type="text" 
                      value={grammarQuery}
                      onChange={(e) => setGrammarQuery(e.target.value)}
                      placeholder={t.askPlaceholder}
                      className="flex-1 bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 sm:p-4 transition-all outline-none"
                      disabled={grammarLoading}
                    />
                    <button 
                      type="submit"
                      disabled={!grammarQuery.trim() || grammarLoading}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-3 sm:p-4 rounded-xl font-bold shadow-md transition-all disabled:opacity-50 disabled:hover:bg-blue-600 flex items-center gap-2"
                    >
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">{t.askButton}</span>
                    </button>
                  </form>
                  {grammarError && (
                    <div className="mt-3 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center gap-2 text-sm font-medium animate-in fade-in">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" /> 
                      {typeof grammarError === 'string' ? grammarError : t.error}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
