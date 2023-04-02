import { writable, derived } from "svelte/store";

export const trans = writable({
	1: {
		doc: ["2020-01-01T00:00", "zummon Owner", "Example Open company"],
		ledger: [
			["103 Cash at Wonder Bank", 800000],
			["102 Cash on hand", 100000],
			["101 Cash at zummon Bank", 100000],
			["300 Capital stock", -100000],
			["300 Capital stock", -100000],
			["300 Capital stock", -800000],
		],
	},
	5: {
		doc: ["2020-01-02T00:00", "First vendor", "Example buy inventory"],
		ledger: [
			["120 Merchandise Inventory", 50000],
			["120 Merchandise Inventory", 5000],
			["103 Cash at Wonder Bank", -5000],
			["201 Accounts Payable", -50000],
		],
	},
	8: {
		doc: [
			"2020-02-04T00:00",
			"Customer company",
			"Example data thanks to https://www.business-case-analysis.com/ledger.html",
		],
		ledger: [
			["112 Accounts Receivable", 20000],
			["410 Product Sales Revenue", -20000],
		],
	},
	10: {
		doc: ["2020-02-04T00:00", "Customer company", "Example Sales somthing"],
		ledger: [
			["112 Accounts Receivable", 30000],
			["410 Product Sales Revenue", -30000],
		],
	},
	12: {
		doc: ["2020-02-04T00:00", "My company", "Example Cost sold"],
		ledger: [
			["510 Cost of goods sold", 25000],
			["120 Merchandise Inventory", -25000],
		],
	},
	14: {
		doc: ["2020-02-12T00:00", "Vendor", "Example buy somthing"],
		ledger: [
			["121 Supplies Inventory", 2000],
			["201 Accounts Payable", -2000],
		],
	},
	16: {
		doc: ["2020-03-24T00:00", "Customer company", "Example collect"],
		ledger: [
			["103 Cash at Wonder Bank", 20000],
			["112 Accounts Receivable", -20000],
		],
	},
	18: {
		doc: ["2020-02-28T00:00", "Vendor", "Example clear liability"],
		ledger: [
			["201 Accounts Payable", 2000],
			["103 Cash at Wonder Bank", -2000],
		],
	},
	20: {
		doc: ["2020-03-01T00:00", "Customer company", "Example collect"],
		ledger: [
			["103 Cash at Wonder Bank", 30000],
			["112 Accounts Receivable", -30000],
		],
	},
	22: {
		doc: ["2020-03-04T00:00", "Personal customer", "Example Sales somthing"],
		ledger: [
			["103 Cash at Wonder Bank", 4000.5],
			["410 Product Sales Revenue", -4000.5],
		],
	},
	24: {
		doc: ["2020-03-05T00:00", "My company", "Example run out supplies"],
		ledger: [
			["631 Supplies Expense", 1000],
			["121 Supplies Inventory", -1000],
		],
	},
	26: {
		doc: ["2020-03-09T00:00", "Customer company", "Example Sales somthing"],
		ledger: [
			["112 Accounts Receivable", 15000],
			["410 Product Sales Revenue", -15000],
		],
	},
	28: {
		doc: [
			"2020-04-10T00:00",
			"First vendor",
			"Example data thanks to https://www.accountingtools.com/articles/2017/5/17/debits-and-credits",
		],
		ledger: [
			["103 Cash at Wonder Bank", 50000],
			["201 Accounts Payable", -50000],
		],
	},
	30: {
		doc: ["2020-04-10T00:00", "Workers", "Example Pay employees"],
		ledger: [
			["726 Wages Expense", 22000],
			["103 Cash at Wonder Bank", -22000],
		],
	},
	32: {
		doc: ["2020-04-14T00:00", "Bank FF7", "Example Take out a loan"],
		ledger: [
			["102 Cash on hand", 100000],
			["209 Loans payable", -100000],
		],
	},
	34: {
		doc: ["2020-04-22T00:00", "Bank FF7", "Example Repay a loan"],
		ledger: [
			["209 Loans payable", 50000],
			["101 Cash at zummon Bank", -50000],
		],
	},
	36: {
		doc: ["2020-04-24T00:00", "Customer company", "Example Sales somthing"],
		ledger: [
			["112 Accounts Receivable", 30000],
			["410 Product Sales Revenue", -30000],
		],
	},
	38: {
		doc: ["2020-04-24T00:00", "My company", "Example Cost sold"],
		ledger: [
			["510 Cost of goods sold", 15000],
			["120 Merchandise Inventory", -15000],
		],
	},
	40: {
		doc: ["2020-04-27T00:00", "Vendor", "Example buy somthing"],
		ledger: [
			["121 Supplies Inventory", 2000],
			["201 Accounts Payable", -2000],
		],
	},
	42: {
		doc: ["2020-04-28T00:00", "Customer company", "Example collect"],
		ledger: [
			["103 Cash at Wonder Bank", 20000],
			["112 Accounts Receivable", -20000],
		],
	},
	44: {
		doc: ["2020-04-29T00:00", "Vendor", "Example clear liability"],
		ledger: [
			["201 Accounts Payable", 2000],
			["103 Cash at Wonder Bank", -2000],
		],
	},
	46: {
		doc: ["2020-05-04T00:00", "Customer company", "Example collect"],
		ledger: [
			["103 Cash at Wonder Bank", 30000],
			["112 Accounts Receivable", -30000],
		],
	},
	48: {
		doc: ["2020-05-05T00:00", "Personal customer", "Example Sales somthing"],
		ledger: [
			["103 Cash at Wonder Bank", 4000],
			["410 Product Sales Revenue", -4000],
		],
	},
	50: {
		doc: ["2020-05-06T00:00", "My company", "Example run out supplies"],
		ledger: [
			["631 Supplies Expense", 1000],
			["121 Supplies Inventory", -1000],
		],
	},
	52: {
		doc: ["2020-05-07T00:00", "Customer company", "Example Sales somthing"],
		ledger: [
			["112 Accounts Receivable", 15000],
			["410 Product Sales Revenue", -15000],
		],
	},
	54: {
		doc: ["2020-05-13T00:00", "Workers", "Example Pay employees"],
		ledger: [
			["726 Wages Expense", 22000],
			["103 Cash at Wonder Bank", -22000],
		],
	},
	56: {
		doc: ["2020-05-19T00:00", "Workers", "Example Pay employees"],
		ledger: [
			["726 Wages Expense", 22000],
			["103 Cash at Wonder Bank", -22000],
		],
	},
});

export const names = derived(trans, ($trans) => {
	let result = {};
	for (const ref in $trans) {
		let [, name] = $trans[ref].doc;
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
