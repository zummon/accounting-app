<script>
  import { trans } from '../lib/store'

  let entry = {}
  let duty = ''
  let startDate = '2020-04-27T00:00'
  let endDate = new Date().toISOString().slice(0,16)

  const getEntry = (event) => {
    const orgRef = Object.keys($trans)[0]
    let ref = orgRef
    if (event) {
      ref = event.target.value
    }
    let tran = $trans[ref]
    if (!tran) {
      tran = $trans[orgRef]
    }
    entry = {...tran, doc: [ref, ...tran.doc]}
  }

  let report = () => {
    let result = {}
    
    Object.entries($trans).forEach(([key, {doc, ledger}]) => {
      const [date, name] = doc
      if (date <= endDate) {
        ledger.forEach(([account, amount]) => {
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

    // https://stackoverflow.com/questions/5467129/sort-javascript-object-by-key
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
  <h1 class="text-xl font-medium mb-2">Entry</h1>
  <label class="inline-flex items-center border mb-2 mr-2">
    <span class="font-semibold mr-2">Ref:</span>
    <input on:input={getEntry} value={entry.doc[0]} type="text" list="refs" class="" />
  </label>

  <label class="inline-flex items-center border mb-2 mr-2">
    <span class="font-semibold mr-2">Date:</span>
    <input bind:value={entry.doc[1]} type="date" class="" />
  </label>

  <label class="inline-flex items-center border mb-2 mr-2">
    <span class="font-semibold mr-2">To/From:</span>
    <input bind:value={entry.doc[2]} type="text" list="names" class="" />
  </label>

  <label class="inline-flex border mb-2">
    <span class="font-semibold mr-2">Description:</span>
    <textarea bind:value={entry.doc[3]} class=""></textarea>
  </label>

  <hr />

  <span class="inline-flex font-semibold mr-2">Account:</span>
  <span class="inline-flex font-semibold">Amount:</span>

	{#each entry.ledger as [account, amount], index (`ledger-${index}`)}		
    <div class="">
      <label class="inline-flex items-center border mb-2 mr-2">
        <input bind:value={account} type="text" list="accounts" class="" />
      </label>

      <label class="inline-flex items-center border mb-2">
        <input bind:value={amount} type="number" class="text-right" />
      </label>
    </div>
	{/each}
</div>





