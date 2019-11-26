import BluetoothSerial from 'react-native-bluetooth-serial'

export default class Bluetooth {
  state = {
    connected: false,
    response: {data: ''}
  }

  init = async () => {
    BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`))
    BluetoothSerial.on('connectionLost', () => {
      if (this.state.device) {
        console.log(`Connection to device ${this.state.device.name} has been lost`)
      }
      this.setState({connected: false})
    })
    BluetoothSerial.on('read', (data) => {
      console.console.log('Reading data: ', data)
      this.setState({response: data})
    })
  }

  setState = (obj) => {
    this.state = {
      ...this.state,
      ...obj
    }
  }

  connect = (deviceName) => {
    Promise.all([
      BluetoothSerial.isEnabled(),
      BluetoothSerial.list()
    ])
      .then((values) => {
        const [isEnabled, devices] = values
        console.log('isEnabled,  devices', isEnabled, devices)
        this.setState({isEnabled, devices})
        const device = devices.filter((device) => device.name === deviceName)
        BluetoothSerial.connect(device.id)
          .then((res) => {
            console.log(`Connected to device  ${device.name}`)
            this.setState({device, connected: true, connecting: false})
          })
          .catch((err) => console.log(err.message))
      })
  }

  waitForAnswer = async () => {
    return new Promise((resolve, reject) => {
      this.setState({response: {data: ''}}, () => {

        let times = 0
        const intervalId = setInterval(() => {
          console.console.log('waiting', this.state.response)
          times++
          if (this.state.response.data !== '' || times > 3) {
            clearInterval(intervalId)
            const response = this.state.response.data.replace(/\n|\r/g, '')
            console.console.log('responding', response)
            resolve(response)
          }
        }, 1000)

      })
    })
  }

  sendCommand = async (command) => {
    try {
      console.log('sending:' + command)
      await BluetoothSerial.write(command)
      // const responseWithLineBreaks = await BluetoothSerial.readFromDevice()
      // console.log('responseWithLineBreaks: '+responseWithLineBreaks)

      await BluetoothSerial.withDelimiter('\r\n')

      const response = await this.waitForAnswer()
      console.log('res:' + response)
      return response
    } catch
      (err) {
      console.log(err.message)
    }
  }
}


