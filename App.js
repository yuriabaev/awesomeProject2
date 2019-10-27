/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//import EasyBluetooth from 'easy-bluetooth-classic'
import BluetoothSerial from 'react-native-bluetooth-serial'
import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Button,
  Text,
  StatusBar,
} from 'react-native'

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen'

const log = (...args) => {
  console.log(...args)
}

export default class App extends Component {
  state = {
    connected: false,
    watering_duration: 0,
    desiredDuration: 0
  }

  componentDidMount () {
    this.connect()

    BluetoothSerial.on('error', (err) => log(`Error: ${err.message}`))
    BluetoothSerial.on('data', (data) => log('data:' + data))
    BluetoothSerial.on('rawData', (data) => log('rawData:' + data))
    BluetoothSerial.on('connectionLost', () => {
      if (this.state.device) {
        log(`Connection to device ${this.state.device.name} has been lost`)
      }
      this.setState({connected: false})
    })
    BluetoothSerial.on('read', (data) => {
      console.log('Reading data: ', data)
      this.setState({response: data})
    })
  }

  connect = () => {
    Promise.all([
      BluetoothSerial.isEnabled(),
      BluetoothSerial.list()
    ])
      .then((values) => {
        const [isEnabled, devices] = values
        log('isEnabled,  devices', isEnabled, devices)
        this.setState({isEnabled, devices})
        const device = devices[0]
        BluetoothSerial.connect(device.id)
          .then((res) => {
            log(`Connected to device  ${device.name}`)
            this.setState({device, connected: true, connecting: false})
          })
          .catch((err) => log(err.message))
      })
  }

  doWater = async () => {
    try {
      await this.sendCommand('water')

    } catch
      (err) {
      log(err.message)
    }
  }

  getDurationTimeout = async () => {
    try {
      const watering_duration = await this.sendCommand('get_watering_duration')

      this.setState({watering_duration, desiredDuration: watering_duration})
    } catch
      (err) {
      log(err.message)
    }
  }

  setDurationTimeout = async () => {
    try {
      await this.sendCommand(`set_watering_duration ${this.state.desiredDuration}`)

    } catch
      (err) {
      log(err.message)
    }
  }

  waitForAnswer = async () => {
    return new Promise((resolve, reject) => {
      this.setState({response: {data: ''}}, () => {


        let times = 0
        const nIntervId = setInterval(() => {
          console.log('waiting', this.state.response)
          times++
          if (this.state.response.data !== '' || times > 3) {
            clearInterval(nIntervId)
            const response = this.state.response.data.replace(/\n|\r/g, '')
            console.log('responding', response)
            resolve(response)
          }
        }, 1000)

      })
    })

  }

  sendCommand = async (command) => {
    try {
      log('sending:' + command)
      await BluetoothSerial.write(command)
      // const responseWithLineBreaks = await BluetoothSerial.readFromDevice()
      // log('responseWithLineBreaks: '+responseWithLineBreaks)

      await BluetoothSerial.withDelimiter('\r\n')

      const response = await this.waitForAnswer() //'ff'//responseWithLineBreaks.replace(/\n|\r/g, '')
      log('res:' + response)
      return response
    } catch
      (err) {
      log(err.message)
    }
  }

  onChangeDurationText = (text) => {
    this.setState({desiredDuration: text})
  }

  render () {
    return (
      <>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header/>
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <Text style={styles.sectionTitle}>connected: {this.state.connected.toString()}</Text>
            <Button title={'connect'} onPress={this.connect}/>
            <Text style={styles.sectionTitle}>Step One</Text>
            <Button title={'water'} onPress={this.doWater}/>
            <Text style={styles.sectionTitle}>Step One</Text>
            <Button title={'Get Duration Timeout'} onPress={this.getDurationTimeout}/>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={text => this.onChangeDurationText(text)}
              value={this.state.desiredDuration.toString()}
              placeHolder="fff"
            />
            <Button title={'Set Duration Timeout'} onPress={this.setDurationTimeout}/>


            <View style={styles.body}>
              <Text style={styles.sectionTitle}>{JSON.stringify(this.state, null, 2)}</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
})

