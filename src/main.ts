import './style.css'

import confetti from 'canvas-confetti';

// Bingo contents (min. 25)
const bingoWords: string[] = [
    "Twoja Stara", "Słychać mnie?", "Yoshi", "Dzieciaki w pracy", "placeholder",
    "Bek", "Ziewanie", "Siusiu", "Rucham ci starego", "Kurwa",
    "Mam nadzieje, że uciągnie", "Następny stream", "Dawno mnie nie było", "Panika", "Techno żul",
    "Krzyk", "Twój stary", "Rucham ci starą", "Sound alert", "Redeem siema",
    "wow niesamowite", "oh mysecko", "Zimno mi", "placeholder", "placeholder",
    "placeholder", "placeholder", "placeholder", "placeholder", "placeholder"
];

// Main elements
const welcomeScreen = document.querySelector<HTMLDivElement>('#welcome-screen')!;
const boardScreen = document.querySelector<HTMLDivElement>('#board-screen')!;
const generateBtn = document.querySelector<HTMLButtonElement>('#generate-btn')!;
const backBtn = document.querySelector<HTMLButtonElement>('#back-btn')!;
const gridContainer = document.querySelector<HTMLDivElement>('#bingo-grid')!;

// Cat logo and sound
const catLogo = document.querySelector<HTMLImageElement>('.corner-logo');
const catSound = new Audio('meow.mp3');

// Click sound
const clickSound = new Audio('click.mp3');
clickSound.volume = 0.3;

// Shuffling function
function shuffleArray(array: string[]): string[] {
    const shuffled = [...array]; // Mirror the array before shuffling
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

let checkedState: boolean[] = []; // Checked boxes list
let completedLines = new Set<string>(); // Compleated lines set

const winningCombinations = [
    // Rows
    [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
    // Columns
    [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
    // Diagonals
    [0, 6, 12, 18, 24], [4, 8, 12, 16, 20]
];

function fireConfetti() {
    const duration = 1500;
    const end = Date.now() + duration;

    (function frame() {
        // Left cannon
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 1 },
            colors: ['#7d73ba', '#ffffff', '#ff0000'],
            startVelocity: 60
        });

        // Right cannon
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 1 },
            colors: ['#7d73ba', '#ffffff', '#ff0000'],
            startVelocity: 60
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function checkBingo() {
    let newWin = false;

    // Check each combination
    winningCombinations.forEach((combo, index) => {
        const lineId = `line-${index}`;

        if (!completedLines.has(lineId)) {
            // Check each tile in line
            const isFull = combo.every(cellIndex => checkedState[cellIndex]);

            if (isFull) {
                completedLines.add(lineId); // Record line in set
                newWin = true;
            }
        }
    });

    if (newWin) {
        fireConfetti();
    }
}

// Generating the board
function generateBoard() {
    // Clear previous board
    gridContainer.innerHTML = '';
    checkedState = new Array(25).fill(false);
    completedLines.clear();

    // Shuffle and take only the first 25 words
    const words = shuffleArray(bingoWords).slice(0, 25);

    // Create the tiles
    words.forEach((word, index) => {
        const cell = document.createElement('div');
        cell.className = 'bingo-cell';
        cell.innerText = word;

        // Crossing functionality
        cell.addEventListener('click', () => {
            clickSound.playbackRate = 0.9 + (Math.random() * 0.2); // Little randomness for tha spice
            clickSound.play().catch(() => {});

            cell.classList.toggle('checked');

            // Switching checked status after click
            checkedState[index] = !checkedState[index];

            // Check for bingo
            if (checkedState[index]) {
                checkBingo();
            }
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
    clickSound.play().catch(() => {});
});

backBtn.addEventListener('click', () => {
    boardScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
    clickSound.play().catch(() => {});
});

catSound.playbackRate = 1.5;

if (catLogo) {
    catLogo.addEventListener('click', () => {
        catSound.currentTime = 0; // Reset the sound if clicked again

        // Playing the sound
        catSound.play().catch(e => console.error("ERROR: Sound problem", e));
    });
}