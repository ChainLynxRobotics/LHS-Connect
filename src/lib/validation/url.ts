const allowedProtocols = new Set(['https:', 'mailto:', 'sms:', 'tel:']);

const isValidUrl = (value: string): boolean => {
	try {
		const parsed = new URL(value);
		return allowedProtocols.has(parsed.protocol);
	} catch {
		return false;
	}
};

export default isValidUrl;
