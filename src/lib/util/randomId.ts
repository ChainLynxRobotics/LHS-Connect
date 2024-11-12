/**
 * Generates a new random positive whole number id from 0 to Number.MAX_SAFE_INTEGER
 * 
 * @returns A new Id
 */
export function generateRandomId(): number {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}