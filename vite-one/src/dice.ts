import { getRandomInt } from './utils.ts';

const VALID_ROLL_REGEX =
    /^(\d*)d(\d+)(?:(kh|kl|dh|dl)(\d+))?([+-]\d+)?$/i;

function validRoll(style: string): boolean {
    return VALID_ROLL_REGEX.test(style);
}

function parseRoll(styleInput: string) {
    if (!validRoll(styleInput)) {
        throw new Error(`Invalid dice roll style: ${styleInput}`);
    }

    const match = styleInput.match(VALID_ROLL_REGEX)!;

    return {
        rolls: match[1] ? Number(match[1]) : 1,
        sided: Number(match[2]),
        keepMode: match[3]?.toLowerCase(),
        keepCount: match[4] ? Number(match[4]) : 0,
        bonus: match[5] ? Number(match[5]) : 0,
    };
}

function applyKeepDrop(
    dice: number[],
    keepMode: string | undefined,
    keepCount: number,
): number[] {
    if (!keepMode || keepCount === 0) {
        return dice;
    }

    dice.sort((a, b) => a - b);

    switch (keepMode) {
        case 'kh':
            return dice.slice(-keepCount);
        case 'kl':
            return dice.slice(0, keepCount);
        case 'dh':
            return dice.slice(0, -keepCount);
        case 'dl':
            return dice.slice(keepCount);
        default:
            return dice;
    }
}

export function roll(styleInput: string): number {
    const { rolls, sided, keepMode, keepCount, bonus } =
        parseRoll(styleInput);

    const dice: number[] = [];

    for (let i = 0; i < rolls; i++) {
        dice.push(getRandomInt(1, sided));
    }

    const total = applyKeepDrop(dice, keepMode, keepCount)
        .reduce((sum, die) => sum + die, 0);

    return total + bonus;
}

export function rollWithAdvantage(styleInput: string): number {
    return Math.max(roll(styleInput), roll(styleInput));
}

export function rollWithDisadvantage(styleInput: string): number {
    return Math.min(roll(styleInput), roll(styleInput));
}

export function minRoll(styleInput: string): number {
    const { rolls, keepMode, keepCount, bonus } = parseRoll(styleInput);
    const dice = Array(rolls).fill(1);

    return applyKeepDrop(dice, keepMode, keepCount)
        .reduce((sum, die) => sum + die, 0) + bonus;
}

export function maxRoll(styleInput: string): number {
    const { rolls, sided, keepMode, keepCount, bonus } =
        parseRoll(styleInput);
    const dice = Array(rolls).fill(sided);

    return applyKeepDrop(dice, keepMode, keepCount)
        .reduce((sum, die) => sum + die, 0) + bonus;
}