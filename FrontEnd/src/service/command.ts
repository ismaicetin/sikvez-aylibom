export const MathLerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

export const stringToNumber = (numStr: string) => {
	if (!numStr) return;

	let _numStr = numStr;

	const matches = _numStr.match(/[^0-9]/g);
	if (matches) {
		if (matches.length > 1) {
			_numStr = _numStr.replace(new RegExp(`[${matches[0]}]`, "g"), "");
			if (matches[matches.length - 1] != matches[matches.length - 2]) {
				_numStr = _numStr.replace(/[,]/g, ".");
			}
		} else _numStr = _numStr.replace(/[,]/g, ".");
	}

	return Number(_numStr);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mergeDeep(...objects: any[]) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const isObject = (obj: any) => obj && typeof obj === "object";
	// console.log(objects);
	return objects.reduce((prev, obj) => {
		Object.keys(obj).forEach((key) => {
			const pVal = prev[key];
			const oVal = obj[key];

			if (Array.isArray(pVal) && Array.isArray(oVal)) {
				prev[key] = oVal;
			} else if (isObject(pVal) && isObject(oVal)) {
				prev[key] = mergeDeep(pVal, oVal);
			} else {
				prev[key] = oVal;
			}
		});
		return prev;
	}, {});
}

export function daysInMonth(month: number, year: number) {
	return new Date(year, month, 0).getDate();
}
