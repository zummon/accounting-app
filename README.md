[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/oxvxjo)

This is an experimental project to help accountant works easier.

    if (request) {
      if (request.parameter) {
        if (request.parameter.get) {
          let result = {}
          if (request.parameter.get === 'object') {
            // https://script.google.com/macros/s/AKfycbx2QVrLDxaneu3yNIme-Tdlv79YzU6aW9wRx694Q0Kd/dev?get=object
            result = getTrans()
          } else if (request.parameter.get === 'table') {
            // https://script.google.com/macros/s/AKfycbx2QVrLDxaneu3yNIme-Tdlv79YzU6aW9wRx694Q0Kd/dev?get=table
            result = getCollections()
          } else if (request.parameter.get === 'array') {
            // https://script.google.com/macros/s/AKfycbx2QVrLDxaneu3yNIme-Tdlv79YzU6aW9wRx694Q0Kd/dev?get=array
            result = getArrayTrans()
          }
          let str = JSON.stringify(result)
          let textOutput = ContentService.createTextOutput(str)
          let json = textOutput.setMimeType(ContentService.MimeType.JSON)
          return json
        }
      }
    }
