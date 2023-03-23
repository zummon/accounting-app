import { writable, derived } from 'svelte/store';

export const trans = writable({});

export const names = derived(trans, ($trans) => {
	let result = {};
	for (const ref in $trans) {
		let [,name] = $trans[ref].doc;
		result[name] = true;
	}
	return Object.keys(result).sort();
});

export const accounts = derived(trans, ($trans) => {
	let result = {};
	for (const ref in $trans) {
		$trans[ref].ledger.forEach(([account]) => {
			result[account] = true;
		});
	}
	return Object.keys(result).sort();
});
