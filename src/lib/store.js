import { writable, derived } from "svelte/store";

export const date = writable("");

export const loading = writable(false);

export const warnings = writable([]);

export const trans = writable([]);

export const keys = derived(trans, ($trans) => {
	return $trans.map((item) => item.key);
});

export const names = derived(trans, ($trans) => {
	let result = $trans.map((item) => {
		return item.name;
	});
	return [...new Set(result)];
});

export const accounts = derived(trans, ($trans) => {
	let result = [];
	$trans.forEach((item) => {
		if (Array.isArray(item.ledger)) {
			item.ledger.forEach((itemSec) => {
				result.push(itemSec.account);
			});
		}
	});
	return [...new Set(result)];
});
