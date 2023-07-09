<div class="">
	<div class="mb-2 flex items-center justify-center gap-2 font-semibold">
		<button
			class="inline-flex gap-2 rounded-full bg-green-500 px-4 py-2 font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-1 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500 dark:shadow-green-800"
			type="button"
			on:click={() => {
				if (tran.invoice) {
				} else {
					tran.invoice = { key: uuidv4() };
				}
			}}>
			<span class="">
				<!-- plus outline heroicons -->
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
						d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
			</span>
			<span class="">invoice</span>
		</button>
	</div>
	<div class="">
		<div class="max-w-lg">
			{JSON.stringify(tran.invoice)}
		</div>
	</div>
</div>
