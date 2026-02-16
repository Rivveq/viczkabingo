import './style.css'

// Bingo contents (min. 25)
const bingoWords: string[] = [
    "Twoja Stara", "Słychać mnie?", "Yoshi", "Jebane dzieciaki", "Żydzi",
    "Bek", "Ziewanie", "Siusiu", "Rucham ci starego", "Kurwa",
    "Mam nadzieje, że uciągnie", "Następny stream", "Dawno mnie nie było", "Panika", "Techno żul",
    "Krzyk", "Twój stary", "Rucham ci starą", "Sound alert", "Redeem siema",
    "wow niesamowite", "placeholder", "placeholder", "placeholder", "placeholder",
    "placeholder", "placeholder", "placeholder", "placeholder", "placeholder"
];

const welcomeScreen = document.querySelector<HTMLDivElement>('#welcome-screen')!;
const boardScreen = document.querySelector<HTMLDivElement>('#board-screen')!;
const generateBtn = document.querySelector<HTMLButtonElement>('#generate-btn')!;
const backBtn = document.querySelector<HTMLButtonElement>('#back-btn')!;
const gridContainer = document.querySelector<HTMLDivElement>('#bingo-grid')!;

// Shuffling function
function shuffleArray(array: string[]): string[] {
    const shuffled = [...array]; // Mirror the array before shuffling
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Generating the board
function generateBoard() {
    // Clear previous board
    gridContainer.innerHTML = '';

    // Shuffle and take only the first 25 words
    const words = shuffleArray(bingoWords).slice(0, 25);

    // Create the tiles
    words.forEach(word => {
        const cell = document.createElement('div');
        cell.className = 'bingo-cell';
        cell.innerText = word;

        // Crossing functionality
        cell.addEventListener('click', () => {
            cell.classList.toggle('checked');
        });

        gridContainer.appendChild(cell);
    });

    // Switching the view
    welcomeScreen.classList.add('hidden');
    boardScreen.classList.remove('hidden');
}

// Button handling
generateBtn.addEventListener('click', () => {
    generateBoard();
});

backBtn.addEventListener('click', () => {
    // Back to main page
    boardScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
});