import { getRandomInt } from './utils.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Random Number Generator</h1>
  <p>Click the button to generate a random number between 1 and 100:</p>
  <button id="generate-btn">Generate Random Number</button>
  <p id="result"></p>
`;

const generateBtn = document.querySelector<HTMLButtonElement>('#generate-btn')!;
const resultParagraph = document.querySelector<HTMLParagraphElement>('#result')!;

generateBtn.addEventListener('click', () => {
  const randomNumber = getRandomInt(1, 3);
  resultParagraph.textContent = `Generated Random Number: ${randomNumber}`;
});

/*
import './style.css'
import heroImg from './assets/hero.png'
import typescriptLogo from './assets/typescript.svg'
import viteLogo from './assets/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${typescriptLogo}" class="framework" alt="TypeScript logo"/>
    <img src="${viteLogo}" class="vite" alt="Vite logo" />
</section>


<svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#documentation-icon"></use></svg>

`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
*/