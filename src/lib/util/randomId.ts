
/**
 * Generates a new random 24 character hex string, for mongodb ids
 *
 * @returns A new Id
 */
export function generateRandomId(): string {
	return [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
	//return new Types.ObjectId().toHexString()
}
