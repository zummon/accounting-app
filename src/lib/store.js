import { writable, derived } from "svelte/store";

export const getData = async () => {
	loading.set(true);
	google.script.run
		.withSuccessHandler((result) => {
			result = JSON.parse(result);
			trans.set(result.data);
			date.set(result.date);
			warnings.set(result.warning);
			loading.set(false);
		})
		.withFailureHandler((error) => {})
		.getData();
};

export const setData = async (data) => {
	data = JSON.stringify(data);
	google.script.run
		.withSuccessHandler((result) => {
			getData();
		})
		.withFailureHandler((error) => {})
		.setData(data);
};

export const date = writable("");

export const loading = writable(false);

export const warnings = writable([]);

export const trans = writable([]);

export const query = writable({
	date: { start: "", end: "" },
	refs: [],
	names: [],
	accounts: [],
});

export const filterTrans = derived([trans, query], ([$trans, $query]) => {
	let result = [];

	$trans.forEach((item) => {
		if ($query.names.includes(item.name) || $query.names.length == 0) {
			let resultSec = { ...item, ledger: [] };

			if (item.date <= $query.date.end || $query.date.end == "") {
				item.ledger.forEach((itemSec) => {
					const group = Number(itemSec.account.charAt(0));

					if (item.date < $query.date.start) {
						if (group >= 4) {
							itemSec.account = "3 Generated retained earnings";
						}
					}

					resultSec.ledger.push(itemSec);
				});
			}

			result.push(resultSec);
		}
	});

	$query.accounts;
	$query.refs;

	return result;
});

export const subtotal = derived(filterTrans, ($filterTrans) => {
	let result = {};

	$filterTrans.forEach((item) => {
		item.ledger.forEach((itemSec) => {
			if (result[itemSec.account]) {
				result[itemSec.account] += itemSec.amount;
			} else {
				result[itemSec.account] = itemSec.amount;
			}
		});
	});

	return result;
});

export const refs = derived(trans, ($trans) => {
	let result = {};
	$trans.forEach((item) => {
		result[item.ref] = true;
	});
	return Object.keys(result).sort();
});

export const names = derived(trans, ($trans) => {
	let result = {};
	$trans.forEach((item) => {
		result[item.name] = true;
	});
	return Object.keys(result).sort();
});

export const accounts = derived(trans, ($trans) => {
	let result = {};
	$trans.forEach((item) => {
		item.ledger.forEach((itemSec) => {
			result[itemSec.account] = true;
		});
	});
	return Object.keys(result).sort();
});
