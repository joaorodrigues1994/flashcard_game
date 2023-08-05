const flashcardText = document.getElementById('flashcard-text');
const flashcardAnswer = document.getElementById('flashcard-answer');
const showAnswerButton = document.getElementById('show-answer');
const nextCardButton = document.getElementById('next-card');

let currentFlashcardIndex = 0;
let flashcards = [];

async function fetchFlashcards() {
    // Faça uma chamada para a função Lambda para obter os flashcards do DynamoDB
    // Use a API fetch() ou uma biblioteca como Axios para fazer a chamada
    const response = await fetch('URL_DA_FUNCAO_LAMBDA');
    flashcards = await response.json();
}

function showNextFlashcard() {
    flashcardText.textContent = flashcards[currentFlashcardIndex].question;
    flashcardAnswer.textContent = '';
    showAnswerButton.style.display = 'block';
    nextCardButton.style.display = 'none';
}

function showAnswer() {
    flashcardAnswer.textContent = flashcards[currentFlashcardIndex].answer;
    showAnswerButton.style.display = 'none';
    nextCardButton.style.display = 'block';
}

function nextFlashcard() {
    currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcards.length;
    showNextFlashcard();
}

showAnswerButton.addEventListener('click', showAnswer);
nextCardButton.addEventListener('click', nextFlashcard);

fetchFlashcards().then(() => {
    showNextFlashcard();
});
