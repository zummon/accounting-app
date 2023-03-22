<script>
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

		$: names() {
			let result = {}
			const trans = this.trans

			for (const ref in trans) {
				let [,name] = trans[ref].doc
				result[name] = 1
			}
			return Object.keys(result)
		}
		$: accounts() {
			let result = {}
			const trans = this.trans

			for (const ref in trans) {
				trans[ref].ledger.forEach(([account]) => {
					result[account] = 1
				})
			}
			return Object.keys(result).sort()
		},

</script>

    <div class="container border rounded-lg mx-auto print:border-0">
      <div class="flex flex-wrap justify-center border-b px-2 pt-2 print:hidden">
        <button @click="getTrans" class="text-sky-500 hover:text-sky-700 w-8 h-8 mb-2 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
       
        <button onclick="print()" class="text-sky-500 hover:text-sky-700 w-8 h-8 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
          </svg>
        </button>
      </div>

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


    </div>



