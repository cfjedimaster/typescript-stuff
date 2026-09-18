import { describe, it, expect, vi } from 'vitest'
import { roll, rollWithAdvantage, rollWithDisadvantage, minRoll, maxRoll } from './dice'

describe('roll', () => {

    it('rolls a single die', () => {   
        const result = roll('1d6');
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(6);
    });

    it('rolls two dice', () => {   
        const result = roll('2d6');
        expect(result).toBeGreaterThanOrEqual(2);
        expect(result).toBeLessThanOrEqual(12);
    });

    it('rolls a die with a bonus', () => {
        const result = roll('1d6+2');
        expect(result).toBeGreaterThanOrEqual(3);
        expect(result).toBeLessThanOrEqual(8);
    });

    it('handles invalid strings', () => {
        expect(() => roll('invalid')).toThrow('Invalid dice roll style: invalid');
    });

    it('handles shorthand with no numnber of rolls', () => {
        const result = roll('d6');
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(6);
    });

    it('handles keep highest', () => {
        const spy = vi.spyOn(Math, 'random')
            .mockReturnValueOnce(0.1)  // first roll → low
            .mockReturnValueOnce(0.9);  // second roll → high

        const result = roll('2d6kh1');
        expect(result).toBe(6);

        spy.mockRestore();
    });

    it('handles drop lowest', () => {
        const spy = vi.spyOn(Math, 'random')
            .mockReturnValueOnce(0.1)  // first roll → low
            .mockReturnValueOnce(0.9);  // second roll → high

        const result = roll('2d6dl1');
        expect(result).toBe(6);

        spy.mockRestore();
    });

    it('can report minroll', () => {
        let result = minRoll('1d6');
        expect(result).toBe(1); 

        result = minRoll('2d6');
        expect(result).toBe(2); 
 
        result = minRoll('2d6kh1');
        expect(result).toBe(1);         
    })

    it('can report maxroll', () => {
        let result = maxRoll('1d6');
        expect(result).toBe(6); 

        result = maxRoll('2d6');
        expect(result).toBe(12); 
 
        result = maxRoll('2d6kh1');
        expect(result).toBe(6);         
    })
   
});

/*
Not sure about the tests for this one. As we can't "peek" inside to ensure it got the best one. 
So for now I'm going to repeat the tests for roll and ensure it just works. 
*/
describe('rollWithAdvantage', () => {
    it('rolls with advantage', () => {
        const result = rollWithAdvantage('1d6');
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(6);
    });

    it('returns the higher of two rolls', () => {
        const spy = vi.spyOn(Math, 'random')
            .mockReturnValueOnce(0.1)  // first roll → low
            .mockReturnValueOnce(0.9);  // second roll → high

        const result = rollWithAdvantage('1d20');
        expect(result).toBe(19); 

        spy.mockRestore();
    });

});

describe('rollWithDisadvantage', () => {
    it('rolls with disadvantage', () => {
        const result = rollWithDisadvantage('1d6');
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(6);
    });

    it('returns the lower of two rolls', () => {
        const spy = vi.spyOn(Math, 'random')
            .mockReturnValueOnce(0.1)  // first roll → low
            .mockReturnValueOnce(0.9);  // second roll → high

        const result = rollWithDisadvantage('1d20');
        expect(result).toBe(3); 

        spy.mockRestore();
    });

});

