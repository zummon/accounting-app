<script>
  let trans
      Vue.createApp({
        data() {
          let date = new Date().toISOString().slice(0,10)
          this.getTrans()

          return {
            duty: '',
            trans: {},
            entry: {doc:[,,,],ledger:[[,],[,]]},
            startDate: '2020-04-27',
            endDate: date,
          }
        },
        computed: {
          report() {
            let result = {}
            const duty = this.duty
            const trans = Object.entries(this.trans)

            trans.forEach(([key, {doc, ledger}]) => {
              const [date, name] = doc
              if (date <= this.endDate) {
                ledger.forEach(([account, amount]) => {
                  const accountType = Number(account.charAt(0))

                  if (date < this.startDate) {
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
          },
        },
        methods: {
          getEntry(event) {
            let trans = this.trans
            const orgRef = Object.keys(trans)[0]
            let ref = orgRef
            if (event) {
              ref = event.target.value
            }
            let tran = trans[ref]
            if (!tran) {
              tran = trans[orgRef]
            }
            this.entry = {...tran, doc: [ref, ...tran.doc]}
          },
          
        }
      }).mount('#app')

  $: names = ((trans) => {
    let result = {}
    for (const ref in trans) {
      let [,name] = trans[ref].doc
      result[name] = 1
    }
    return Object.keys(result)
  })(trans)

  $: accounts = ((trans) => {
    let result = {}
    for (const ref in trans) {
      trans[ref].ledger.forEach(([account]) => {
        result[account] = 1
      })
    }
    return Object.keys(result).sort()
  })(trans)

</script>

<div v-if="duty === ''" class="px-2 pt-2">
  <h1 class="text-xl font-medium mb-2">Entry</h1>
  <label class="inline-flex items-center border mb-2 mr-2">
    <span class="font-semibold mr-2">Ref:</span>
    <input :value="entry.doc[0]" @input="getEntry" type="text" list="refs" class="" />
  </label>
  <datalist id="refs">
    <option v-for="(,key) in trans" :value="key" />
  </datalist>

  <label class="inline-flex items-center border mb-2 mr-2">
    <span class="font-semibold mr-2">Date:</span>
    <input v-model="entry.doc[1]" type="date" class="" />
  </label>

  <label class="inline-flex items-center border mb-2 mr-2">
    <span class="font-semibold mr-2">To/From:</span>
    <input v-model="entry.doc[2]" type="text" list="names" class="" />
  </label>
  <datalist id="names">
    <option v-for="value in names" :value="value" />
  </datalist>

  <label class="inline-flex border mb-2">
    <span class="font-semibold mr-2">Description:</span>
    <textarea v-model="entry.doc[3]" class=""></textarea>
  </label>

  <hr />

  <span class="inline-flex font-semibold mr-2">Account:</span>
  <span class="inline-flex font-semibold">Amount:</span>
  <datalist id="accounts">
    <option v-for="value in accounts" :value="value" />
  </datalist>
  <div v-for="([account, amount]) in entry.ledger" class="">
    <label class="inline-flex items-center border mb-2 mr-2">
      <input v-model="account" type="text" list="accounts" class="" />
    </label>

    <label class="inline-flex items-center border mb-2">
      <input v-model.number="amount" type="number" class="text-right" />
    </label>
  </div>
</div>





