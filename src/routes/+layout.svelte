<script>
	import '../styles.css';
</script>

 <label class="inline-flex items-center mb-2 mr-2">
          <input type="radio" value="" v-model="duty" class="sr-only" />
          <span class="text-sky-500 hover:text-sky-700 cursor-pointer">Entry</span>
        </label>
        <label class="inline-flex items-center mb-2 mr-2">
          <input type="radio" value="tb" v-model="duty" class="sr-only" />
          <span class="text-sky-500 hover:text-sky-700 cursor-pointer">Trial Balance</span>
        </label>
        <label class="inline-flex items-center mb-2 mr-2">
          <input type="radio" value="pl" v-model="duty" class="sr-only" />
          <span class="text-sky-500 hover:text-sky-700 cursor-pointer">Income Statement</span>
        </label>
        <label class="inline-flex items-center mb-2 mr-2">
          <input type="radio" value="bs" v-model="duty" class="sr-only" />
          <span class="text-sky-500 hover:text-sky-700 cursor-pointer">Balance Sheet</span>
        </label>

<div class="">

	
	<slot />
	

</div>
    <a class="block w-fit mt-2 mx-auto text-sky-500 hover:text-sky-700 print:hidden" href="https://zummon.page/" target="_blank">Made by zummon</a>