import { writable, derived } from "svelte/store";

export const trans = writable([]);

export const refs = derived(trans, ($trans) => {
	let result = [];
	$trans.forEach(({ ref }) => {
		result.push(ref)
	})
	return result.sort();
});

// https://stackoverflow.com/questions/5467129/sort-javascript-object-by-key
export const names = derived(trans, ($trans) => {
	let result = {};
	$trans.forEach(({ doc }) => {
		doc.forEach(({ name }) => {
			result[name] = true
		})
	})
	return Object.keys(result).sort();
});

export const accounts = derived(trans, ($trans) => {
	let result = {};
	$trans.forEach(({ ledger }) => {
		ledger.forEach(({ account }) => {
			result[account] = true
		})
	})
	return Object.keys(result).sort();
});
