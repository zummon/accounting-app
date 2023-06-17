<script>
	// import { subtotal } from "../lib/store";

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
</script>

<!-- 
<div class="px-2 pt-2">
	<h1 class="mb-2 text-xl font-medium">Trial Balance</h1>

	<table class="table-auto">
		<thead>
			<tr>
				<td class="border-y pr-2 font-semibold">Account</td>
				<td class="border-y pr-2 text-right font-semibold">Debit</td>
				<td class="border-y text-right font-semibold">Credit</td>
			</tr>
		</thead>
		<tbody>
			{#each Object.entries($subtotal) as [key, value], index (`item-${index}`)}
				<tr class="">
					<td class="border-b pr-2 pt-2">{key}</td>
					<td class="border-b pr-2 pt-2 text-right"
						>{value > 0 ? value : ""}</td>
					<td class="border-b pt-2 text-right">{value < 0 ? -value : ""}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td class="border-b pr-2 pt-2 font-semibold">Balance</td>
				<td class="border-b pr-2 pt-2 text-right font-semibold">
					{Object.values($subtotal).reduce(
						(accu, value) => (value > 0 ? accu + value : accu),
						0
					)}
				</td>
				<td class="border-b pt-2 text-right font-semibold">
					{Object.values($subtotal).reduce(
						(accu, value) => (value < 0 ? accu + -value : accu),
						0
					)}
				</td>
			</tr>
		</tfoot>
	</table>
</div> -->
