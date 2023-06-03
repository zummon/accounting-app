<script>
	import { filterTrans, loading, setData } from "../lib/store";
	import { onMount } from "svelte";

	onMount(async () => {});
</script>

<div class="container mx-auto flex flex-wrap gap-4">
	{#each $filterTrans as tran, index (`tran-${index}`)}
		<div class="flex flex-col gap-2 rounded-lg px-4 py-3 shadow-md">
			<div class="">
				<abbr class="no-underline" title="Name">
					<input
						class="rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
						list="names"
						bind:value={tran.name} />
				</abbr>
			</div>
			<div class="w-full">
				<textarea
					class="w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
					rows="2"
					bind:value={tran.desc} />
			</div>
			<div class="flex justify-end gap-2">
				<div class="">
					<input
						class="rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
						type="datetime-local"
						bind:value={tran.date} />
				</div>
			</div>
			<div class="">
				<button
					class="rounded-full bg-green-500 px-4 py-2 text-lg font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-2 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500 disabled:bg-white disabled:text-green-500 disabled:shadow-none"
					disabled={$loading}
					on:click={async () => {
						await setData([tran]);
					}}>
					Save
				</button>

				<div class="">
					<span class="mr-2 inline-flex font-semibold">Account:</span>
					<span class="inline-flex font-semibold">Amount:</span>

					{#each tran.ledger as item, index (`ledger-${index}`)}
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
								class="text-fuchsia-500"
								on:click={() => {
									tran.ledger.splice(index, 1);
									tran.ledger = tran.ledger;
								}}>
								<!-- x-mark outline heroicons -->
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
					{/each}
					<div class="">
						<button
							class="rounded-full bg-green-500 px-4 py-2 text-lg font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-2 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500"
							on:click={() => {
								tran.ledger = [{}, {}, ...tran.ledger];
							}}>
							Add
						</button>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
