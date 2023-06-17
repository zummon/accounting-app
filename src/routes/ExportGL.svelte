<!-- <script>
	import { filterTrans } from "../lib/store";
</script>

<table class="">
	<thead>
		<tr>
			<td class="border">Date</td>
			<td class="border">To From</td>
			<td class="border">Description</td>
			<td class="border">Account</td>
			<td class="border">Debit-Credit</td>
		</tr>
	</thead>
	<tbody>
		{#each $filterTrans as item, index (`tran-${index}`)}
			{#each item.ledger as itemSec, indexSec (`ledger-${index}-${indexSec}`)}
				<tr>
					<td class="border">{item.date}</td>
					<td class="border">{item.name}</td>
					<td class="border">{item.desc}</td>
					<td class="border">{itemSec.account}</td>
					<td class="border">{itemSec.amount}</td>
				</tr>
			{/each}
		{/each}
	</tbody>
	<tfoot>
		<tr>
			<td class="border" />
			<td class="border" />
			<td class="border" />
			<td class="border">Balance</td>
			<td class="border">
				{Object.values($filterTrans).reduce((prev, curr) => {
					return (
						curr.ledger.reduce((prevSec, currSec) => {
							return prevSec + currSec.amount;
						}, 0) + prev
					);
				}, 0)}
			</td>
		</tr>
	</tfoot>
</table> -->
