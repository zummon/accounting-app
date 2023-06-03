<script>
	import { trans } from "../lib/store";
	import { onMount } from "svelte";

	onMount(async () => {});
</script>

<table class="my-4 w-full rounded-lg border">
	<thead>
		<tr>
			<td class="border-b border-black px-4 py-2">Date</td>
			<td class="border-b border-black px-4 py-2" colspan="2">Account</td>
			<td class="border-b border-black px-4 py-2 text-right">Debit</td>
			<td class="border-b border-black px-4 py-2 text-right">Credit</td>
		</tr>
	</thead>
	<tbody>
		{#each $trans as item, index (`tran-${index}`)}
			{#each item.ledger as itemSec, indexSec (`ledger-${index}-${indexSec}`)}
				<tr class="">
					<td class="border-b px-4 py-2">
						{#if indexSec == 0}
							{new Date(item.date).toDateString()}
						{:else if indexSec == 1}
							{item.name}
						{/if}
					</td>
					{#if itemSec.amount > 0}
						<td class="border-b px-4 py-2" colspan="2">{itemSec.account}</td>
						<td class="border-b px-4 py-2 text-right">{itemSec.amount}</td>
						<td class="border-b px-4 py-2 text-right" />
					{:else if itemSec.amount < 0}
						<td class="border-b px-4 py-2" />
						<td class="border-b px-4 py-2">{itemSec.account}</td>
						<td class="border-b px-4 py-2 text-right" />
						<td class="border-b px-4 py-2 text-right">{-itemSec.amount}</td>
					{/if}
				</tr>
			{/each}
			<tr class="">
				<td class="border-b border-black px-4 py-2" />
				<td class="border-b border-black px-4 py-2" colspan="2">{item.desc}</td>
				<td class="border-b border-black px-4 py-2 text-right" />
				<td class="border-b border-black px-4 py-2 text-right" />
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<tr>
			<td class="px-4 py-2" />
			<td class="px-4 py-2" colspan="2" />
			<td class="px-4 py-2 text-right" />
			<td class="px-4 py-2 text-right" />
		</tr>
	</tfoot>
</table>
