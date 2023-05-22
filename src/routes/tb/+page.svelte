
<script>
  import { subtotal, query } from "../../lib/store";

</script>

<div class="px-2 pt-2">
  <h1 class="text-xl font-medium mb-2">Trial Balance</h1>
  <label class="inline-flex border items-center mb-2 mr-2">
    <span class="mr-2">Start Date:</span>
    <input class="" bind:value={$query.date.start} type="datetime-local" />
  </label>
  <label class="inline-flex border items-center mb-2 mr-2">
    <span class="mr-2">End Date:</span>
    <input class="" bind:value={$query.date.end} type="datetime-local" />
  </label>
  <table class="table-auto">
    <thead>
      <tr>
        <td class="pr-2 font-semibold border-y">Account</td>
        <td class="pr-2 font-semibold border-y text-right">Debit</td>
        <td class="font-semibold border-y text-right">Credit</td>
      </tr>
    </thead>
    <tbody>
      {#each Object.entries($subtotal) as [key,value], index (`item-${index}`)}
        <tr class="">
          <td class="pt-2 pr-2 border-b">{ key }</td>
          <td class="pt-2 pr-2 border-b text-right">{ value > 0 ? value : '' }</td>
          <td class="pt-2 border-b text-right">{ value < 0 ? (-value) : '' }</td>
        </tr>
      {/each}
    </tbody>
    <tfoot>
      <tr>
        <td class="pt-2 pr-2 font-semibold border-b">Balance</td>
        <td class="pt-2 pr-2 font-semibold border-b text-right">
          { Object.values($subtotal).reduce((accu, value) => (value > 0 ? accu + value : accu), 0) }
        </td>
        <td class="pt-2 font-semibold border-b text-right">
          { Object.values($subtotal).reduce((accu, value) => (value < 0 ? accu + (-value) : accu), 0) }
        </td>
      </tr>
    </tfoot>
  </table>
</div>