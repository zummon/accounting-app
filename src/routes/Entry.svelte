<script>
	import { trans } from "../lib/store";
	import { onMount } from "svelte";

	onMount(async () => {});
</script>

<table class="my-4 w-full rounded-lg border">
	<thead>
		<tr>
			<td class="border-b px-4 py-2">Date</td>
			<td class="border-b px-4 py-2">Name</td>
			<td class="border-b px-4 py-2">Description</td>
		</tr>
	</thead>
	<tbody>
		{#each $trans as { ref, date, name, desc, ledger }, index (`tran-${index}`)}
			{#each ledger as { account, amount }, indexSec (`ledger-${index}-${indexSec}`)}
				<tr class="">
					<td class="border-b px-4 py-2">{new Date(date).toDateString()}</td>
					<td class="border-b px-4 py-2">{account}</td>
					<td class="border-b px-4 py-2">
						{amount}
					</td>
				</tr>
			{/each}
		{/each}
	</tbody>
	<tfoot>
		<tr>
			<td class="px-4 py-2" />
			<td class="px-4 py-2" />
			<td class="px-4 py-2" />
		</tr>
	</tfoot>
</table>
