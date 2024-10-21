const words = {
    "la pomme": "der Apfel",
    "la banane": "die Banane",
    "la poire": "die Birne",
    "le kiwi": "die Kiwi",
    "l'orange": "die Orange",
    "le concombre": "die Gurke",
    "la pomme de terre": "die Kartoffel",
    "la salade": "der Salat",
    "la tomate": "die Tomate",
    "l'oignon": "die Zwiebel",
    "le pain": "das Brot",
    "le petit pain": "das Brötchen",
    "le biscuit": "der Keks",
    "le gâteau": "der Kuchen",
    "l'œuf": "das Ei",
    "le poisson": "der Fisch",
    "la viande": "das Fleisch",
    "le poulet": "das Hähnchen",
    "le salami": "die Salami",
    "le jambon": "der Schinken",
    "la saucisse / la charcuterie": "die Wurst",
    "le beurre": "die Butter",
    "le yaourt": "das Joghurt",
    "le fromage": "der Käse",
    "la crème": "die Sahne",
    "le sucre": "der Zucker",
    "le sel": "das Salz",
    "l'huile": "das Öl",
    "les nouilles / pâtes": "die Nudel",
    "le riz": "der Reis"
};

const conjugations = {
    "finden": {
        "ich": "finde",
        "du": "findest",
        "er/sie/es": "findet",
        "wir": "finden",
        "ihr": "findet",
        "sie/Sie": "finden"
    },
    "haben": {
        "ich": "habe",
        "du": "hast",
        "er/sie/es": "hat",
        "wir": "haben",
        "ihr": "habt",
        "sie/Sie": "haben"
    },
    "sein": {
        "ich": "bin",
        "du": "bist",
        "er/sie/es": "ist",
        "wir": "sind",
        "ihr": "seid",
        "sie/Sie": "sind"
    },
    "kaufen": {
        "ich": "kaufe",
        "du": "kaufst",
        "er/sie/es": "kauft",
        "wir": "kaufen",
        "ihr": "kauft",
        "sie/Sie": "kaufen"
    },
    "suchen": {
        "ich": "suche",
        "du": "suchst",
        "er/sie/es": "sucht",
        "wir": "suchen",
        "ihr": "sucht",
        "sie/Sie": "suchen"
    },
    "essen": {
        "ich": "esse",
        "du": "isst",
        "er/sie/es": "isst",
        "wir": "essen",
        "ihr": "esst",
        "sie/Sie": "essen"
    },
    "trinken": {
        "ich": "trinke",
        "du": "trinkst",
        "er/sie/es": "trinkt",
        "wir": "trinken",
        "ihr": "trinkt",
        "sie/Sie": "trinken"
    }
};

let remainingWords = Object.entries(words);
let currentWords = [];
let incorrectAnswers = []; // Erreurs de vocabulaire
let currentConjugations = [];
let incorrectConjugations = []; // Erreurs de conjugaison
const pronouns = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];

// Fonction pour mélanger les éléments d'un tableau
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Chargement des mots pour le quiz de vocabulaire
function loadWords() {
    const wordListDiv = document.getElementById('word-list');
    wordListDiv.innerHTML = '';

    currentWords = shuffle(remainingWords).slice(0, 10);
    remainingWords = remainingWords.filter(item => !currentWords.includes(item));

    currentWords.forEach(([frenchWord], index) => {
        const wordItemDiv = document.createElement('div');
        wordItemDiv.className = 'word-item';

        const label = document.createElement('label');
        label.innerText = frenchWord;

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `input-${index}`;
        input.setAttribute('data-correct', words[frenchWord]);

        wordItemDiv.appendChild(label);
        wordItemDiv.appendChild(input);
        wordListDiv.appendChild(wordItemDiv);
    });
}

// Validation des réponses pour le quiz de vocabulaire
function validateAndNext() {
    const wordListDiv = document.getElementById('word-list');
    const inputs = wordListDiv.getElementsByTagName('input');

    // Validation des réponses
    for (let input of inputs) {
        const correctAnswer = input.getAttribute('data-correct').toLowerCase();
        const userAnswer = input.value.trim().toLowerCase();

        if (userAnswer !== correctAnswer) {
            incorrectAnswers.push({
                word: input.previousSibling.innerText,
                correctAnswer,
                userAnswer
            });
        }
    }

    // Charger le prochain groupe de mots ou afficher les résultats
    if (remainingWords.length > 0) {
        loadWords();
    } else {
        showResults(); // Afficher les résultats
    }
}

// Affichage des résultats pour le quiz de vocabulaire
function showResults() {
    const resultContainer = document.getElementById('result-container');
    const incorrectList = document.getElementById('incorrect-answers');

    incorrectList.innerHTML = ''; // Réinitialiser la liste des erreurs

    if (incorrectAnswers.length > 0) {
        incorrectAnswers.forEach(({ word, correctAnswer, userAnswer }) => {
            const listItem = document.createElement('li');
            listItem.innerText = `${word}: Votre réponse: "${userAnswer}", Correct: "${correctAnswer}"`;
            incorrectList.appendChild(listItem);
        });
    } else {
        incorrectList.innerHTML = '<li>Toutes les réponses sont correctes !</li>';
    }

    resultContainer.style.display = 'block';
    document.getElementById('quiz-container').style.display = 'none';
}

// Chargement du quiz de conjugaison
function loadConjugationQuiz() {
    const conjugationListDiv = document.getElementById('pronouns-list');
    conjugationListDiv.innerHTML = '';

    // Sélection aléatoire des verbes
    const verbs = Object.keys(conjugations);
    currentConjugations = shuffle(pronouns).map(pronoun => {
        const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
        return { pronoun, verb: randomVerb, correct: conjugations[randomVerb][pronoun] };
    });

    currentConjugations.forEach(({ pronoun, verb }, index) => {
        const conjugationItemDiv = document.createElement('div');
        conjugationItemDiv.className = 'conjugation-item';

        const label = document.createElement('label');
        label.innerText = `${pronoun} (${verb})`;

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `input-conjugation-${index}`;
        input.setAttribute('data-correct', conjugations[verb][pronoun]);

        conjugationItemDiv.appendChild(label);
        conjugationItemDiv.appendChild(input);
        conjugationListDiv.appendChild(conjugationItemDiv);
    });
}

// Validation des conjugaisons
function validateConjugation() {
    const conjugationListDiv = document.getElementById('pronouns-list');
    const inputs = conjugationListDiv.getElementsByTagName('input');

    // Validation des réponses
    for (let input of inputs) {
        const correctAnswer = input.getAttribute('data-correct').toLowerCase();
        const userAnswer = input.value.trim().toLowerCase();

        if (userAnswer !== correctAnswer) {
            incorrectConjugations.push({
                pronounVerb: input.previousSibling.innerText,
                correctAnswer,
                userAnswer
            });
        }
    }

    showConjugationResults(); // Afficher les résultats de conjugaison
}

// Affichage des résultats de conjugaison
function showConjugationResults() {
    const resultContainer = document.getElementById('result-container');
    const incorrectList = document.getElementById('incorrect-conjugations');

    incorrectList.innerHTML = ''; // Réinitialiser la liste des erreurs

    if (incorrectConjugations.length > 0) {
        incorrectConjugations.forEach(answer => {
            const listItem = document.createElement('li');
            listItem.innerText = `${answer.pronounVerb} -> Correct: ${answer.correctAnswer}, Votre réponse: ${answer.userAnswer}`;
            incorrectList.appendChild(listItem);
        });
    } else {
        incorrectList.innerHTML = '<li>Toutes les réponses sont correctes !</li>';
    }

    resultContainer.style.display = 'block';
    document.getElementById('conjugation-quiz').style.display = 'none';
}

// Charger le quiz de vocabulaire français-allemand ou de conjugaison au démarrage
window.onload = () => {
    // Vérifier si l'on est sur la page de conjugaison
    if (document.getElementById('pronouns-list')) {
        loadConjugationQuiz();
    } else {
        loadWords();
    }
};
