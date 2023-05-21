import { writable, derived } from "svelte/store";

export const trans = writable([]);

export const query = writable({
	date: { start: '', end: '' },
  refs: [],
  names: [],
  accounts: [],
})

export const subtotal = derived([ trans, query ], ([ $trans, $query ]) => {
	let result = {}
	$trans.forEach(({ ref, date, name, ledger }) => {

		if (date >= $query.date.start || date <= $query.date.end || $query.date.start == '' || $query.date.end == '') {
			
			ledger.forEach(({ account, amount }) => {
				let group = account.charAt(0)
				let positive = amount

				if (group == '2' || group == '3' || group == '4') {
					positive = -positive
				}
				if (result[group]) {
					result[group] += positive
				} else {
					result[group] = positive
				}
			})
			
		}

	})

	$query.accounts
	$query.refs
	$query.names
	
	return result
})

export const refs = derived(trans, ($trans) => {
	let result = {};
	$trans.forEach(({ ref }) => {
		result[ref] = true
	})
	return Object.keys(result).sort();
});

export const names = derived(trans, ($trans) => {
	let result = {};
	$trans.forEach(({ name }) => {
		result[name] = true
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
