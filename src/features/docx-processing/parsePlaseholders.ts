export function parsePlaseholders(arrayBuffer: ArrayBuffer): string[] {

	try {
		
		const text = new TextDecoder().decode(arrayBuffer);
		const re = /{{\s*([a-zA-Z0-9_]+)\s*}}/g;
		const set = new Set<string>();
		let m: RegExpExecArray | null;
		while ((m = re.exec(text)) !== null) {
			set.add(m[1]);
		}
		return Array.from(set);
	} catch {
		return [];
	}
}