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
		
		if (date <= $query.date.end || $query.date.end == '') {
			ledger.forEach(({ account, amount }) => {
				const group = Number(account.charAt(0))

				if (date < $query.date.start) {
					if (group >= 4) {
						account = '3 Generated retained earnings'
					}
				}

				if (result[account]) {
					result[account] += amount
				} else {
					result[account] = amount
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
