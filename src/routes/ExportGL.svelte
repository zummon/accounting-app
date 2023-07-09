<!-- <script>
	import { filterTrans } from "../lib/store";
</script>

<button
	class="rounded-full bg-green-500 px-4 py-2 font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-1 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500 dark:shadow-green-800"
	on:click={() => {}}>
	 magnifying-glass outline heroicons 
	<svg
		class="h-6 w-6"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor">
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
	</svg>
</button>


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
