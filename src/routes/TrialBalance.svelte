<script>
	import { subtotal, query } from "../lib/store";
</script>

<div class="px-2 pt-2">
	<h1 class="mb-2 text-xl font-medium">Trial Balance</h1>
	<label class="mb-2 mr-2 inline-flex items-center border">
		<span class="mr-2">Start Date:</span>
		<input class="" bind:value={$query.date.start} type="datetime-local" />
	</label>
	<label class="mb-2 mr-2 inline-flex items-center border">
		<span class="mr-2">End Date:</span>
		<input class="" bind:value={$query.date.end} type="datetime-local" />
	</label>
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
					<td class="border-b pr-2 pt-2 text-right">{value > 0 ? value : ""}</td
					>
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
</div>
