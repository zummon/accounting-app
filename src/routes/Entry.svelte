<script>
	import { filterTrans } from "../lib/store";
	import { onMount } from "svelte";

	onMount(async () => {});
</script>

<table class="my-4 w-full rounded-lg border">
	<thead>
		<tr>
			<td class="border-b border-black px-4 py-2 font-semibold">Date</td>
			<td class="border-b border-black px-4 py-2 font-semibold" colspan="2"
				>Account</td>
			<td class="border-b border-black px-4 py-2 text-right font-semibold"
				>Debit</td>
			<td class="border-b border-black px-4 py-2 text-right font-semibold"
				>Credit</td>
		</tr>
	</thead>
	<tbody>
		{#each $filterTrans as item, index (`tran-${index}`)}
			{#each item.ledger as itemSec, indexSec (`ledger-${index}-${indexSec}`)}
				<tr class="">
					<td class="border-b">
						{#if indexSec == 0}
							<abbr class="no-underline" title="Date">
								<input
									class="w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
									type="datetime-local"
									bind:value={item.date} />
							</abbr>
						{:else if indexSec == 1}
							<abbr class="no-underline" title="Name">
								<input
									class="w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
									list="names"
									bind:value={item.name} />
							</abbr>
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
				<td class="border-b border-black" colspan="2">
					<abbr class="no-underline" title="Description">
						<textarea
							class="w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
							rows="2"
							bind:value={item.desc} />
					</abbr>
				</td>
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

<!-- 

				<button
					class="rounded-full bg-green-500 px-4 py-2 text-lg font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-2 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500 disabled:bg-white disabled:text-green-500 disabled:shadow-none"
					disabled={$loading}
					on:click={async () => {
						await setData([tran]);
					}}>
					Save
				</button>
						<div class="">
							<label class="">
								<input
									class="rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
									type="text"
									list="accounts"
									bind:value={item.account} />
							</label>
							<label class="">
								<input
									class="rounded-md border-0 py-2 text-right text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
									type="number"
									bind:value={item.amount} />
							</label>
							<button
								class="text-sky-500"
								on:click={() => {
									tran.ledger.splice(index, 1);
									tran.ledger = tran.ledger;
								}}>
								 !-- x-mark outline heroicons --
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
										d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					<div class="">
						<button
							class="rounded-full bg-green-500 px-4 py-2 text-lg font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-2 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500"
							on:click={() => {
								tran.ledger = [{}, {}, ...tran.ledger];
							}}>
							Add
						</button>
					</div>

 -->
