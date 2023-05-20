import { writable, derived } from "svelte/store";
import { modelQueryTrans } from './model'

export const allTrans = writable([]);

export const queryTrans = writable({
	...modelQueryTrans
})

export const trans = derived([ allTrans, queryTrans ], ([ $allTrans, $queryTrans ]) => {
	let result = $allTrans
	if ($queryTrans.date.end) {
		result = result.filter(({ doc }) => {
			return doc[0].date <= $queryTrans.date.end
		})
	}
	if ($queryTrans.date.start) {
		result = result.filter(({ doc }) => {
			return doc[0].date >= $queryTrans.date.start
		})
	}

	return result
})

export const refs = derived(allTrans, ($allTrans) => {
	let result = {};
	$allTrans.forEach(({ ref }) => {
		result[ref] = true
	})
	return Object.keys(result).sort();
});

export const names = derived(allTrans, ($allTrans) => {
	let result = {};
	$allTrans.forEach(({ doc }) => {
		doc.forEach(({ name }) => {
			result[name] = true
		})
	})
	return Object.keys(result).sort();
});

export const accounts = derived(allTrans, ($allTrans) => {
	let result = {};
	$allTrans.forEach(({ ledger }) => {
		ledger.forEach(({ account }) => {
			result[account] = true
		})
	})
	return Object.keys(result).sort();
});
