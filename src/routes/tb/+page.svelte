
<script>
  import { trans } from "../lib/store";

  let startDate = "2020-04-27T00:00";
	let endDate = new Date().toISOString().slice(0, 16);

  const report = () => {
    let result = {}
    
    $trans.forEach(({ ref, { doc, ledger } }) => {
      const [date, name] = doc
      if (date <= endDate) {
        ledger.forEach(({ account, amount }) => {
          const accountType = Number(account.charAt(0))

          if (date < startDate) {
            if (accountType >= 4) {
              account = '3 Generated retained earnings'
            }
          }

          if (result[account]) {
            result[account] += amount
          } else {
            result[account] = amount
          }
        })
      }
    })

    result = Object.keys(result).sort()
    .reduce(
      (obj, key) => {
        let amount = result[key]
        let credit = 0
        if (amount < 0) {
          amount = -amount
          credit = 1
        }
        if (duty === 'pl') {
          if (accountType >= 4) {
            obj[key]
          }
        } else {

          obj[key] = ['','']
          obj[key][credit] = amount
          return obj
        }
      },
      {}
    )

    // accountType <= 1
    // accountType >= 2
    // accountType >= 5

    return result
  }
</script>

<div class="px-2 pt-2">
  <h1 class="text-xl font-medium mb-2">Trial Balance</h1>
  <label class="inline-flex border items-center mb-2 mr-2">
    <span class="mr-2">Start Date:</span>
    <input class="" bind:value={startDate} type="datetime-local" />
  </label>
  <label class="inline-flex border items-center mb-2 mr-2">
    <span class="mr-2">End Date:</span>
    <input class="" bind:value={endDate} type="datetime-local" />
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
      {#each report as value, index (`item-${index}`)}
        <tr class="">
          <td class="pt-2 pr-2 border-b">{ index + 1 }</td>
          <td class="pt-2 pr-2 border-b text-right">{ value > 0 ? value : '' }</td>
          <td class="pt-2 border-b text-right">{ value < 0 ? (-value) : '' }</td>
        </tr>
      {/each}
    </tbody>
    <tfoot>
      <tr>
        <td class="pt-2 pr-2 font-semibold border-b">Balance</td>
        <td class="pt-2 pr-2 font-semibold border-b text-right">
          { Object.values(report).reduce((accu, value) => (value > 0 ? accu + value : accu), 0) }
        </td>
        <td class="pt-2 font-semibold border-b text-right">
          { Object.values(report).reduce((accu, value) => (value < 0 ? accu + (-value) : accu), 0) }
        </td>
      </tr>
    </tfoot>
  </table>
</div>