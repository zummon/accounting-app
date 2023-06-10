import { writable, derived } from "svelte/store";

export const date = writable("");

export const loading = writable(true);

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

// export const filterTrans = derived([trans, query], ([$trans, $query]) => {
// 	let result = [];

// 	$trans.forEach((item) => {
// 		if ($query.names.includes(item.name) || $query.names.length == 0) {
// 			let resultSec = { ...item, ledger: [] };

// 			if (item.date <= $query.date.end || $query.date.end == "") {
// 				item.ledger.forEach((itemSec) => {
// 					const group = Number(itemSec.account.charAt(0));

// 					if (item.date < $query.date.start) {
// 						if (group >= 4) {
// 							itemSec.account = "3 Generated retained earnings";
// 						}
// 					}

// 					resultSec.ledger.push(itemSec);
// 				});
// 			}

// 			result.push(resultSec);
// 		}
// 	});

// 	$query.accounts;
// 	$query.refs;

// 	return result;
// });

// export const subtotal = derived(filterTrans, ($filterTrans) => {
// 	let result = {};

// 	$filterTrans.forEach((item) => {
// 		item.ledger.forEach((itemSec) => {
// 			if (result[itemSec.account]) {
// 				result[itemSec.account] += itemSec.amount;
// 			} else {
// 				result[itemSec.account] = itemSec.amount;
// 			}
// 		});
// 	});

// 	return result;
// });
