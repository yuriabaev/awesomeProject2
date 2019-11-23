import { Container, Content } from 'native-base'
import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import DashboardButton from '../Components/DashboardButton'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import React, { Component } from 'react'

const image = require('../assets/download.jpg')
const log = (...args) => {
  console.log(...args)
}
const borderWidth = 0

function msToTime (s) {

  // Pad to 2 or 3 digits, default is 2
  function pad (n, z) {
    z = z || 2
    return ('00' + n).slice(-z)
  }

  const mm = s

  var secs = s % 60
  s = (s - secs) / 60
  var mins = s % 60
  s = (s - mins) / 60
  var hrs = s % 24
  s = (s - hrs) / 24
  var days = s

  return pad(days) + ':' + pad(hrs) + ':' + pad(mins) + ':' + pad(secs)
}

const Reconnect = ({onPress}) => {

  return (<View style={{width: 150, alignSelf: 'flex-start', flex: 1}}>
    <TouchableHighlight onPress={onPress}>
      <View style={styles.reconnect}>
        <Text style={styles.buttonText}>reconnect</Text>
        <FontAwesomeIcon icon={faSyncAlt} marginLeft={10}/>
      </View>
    </TouchableHighlight>
  </View>)
}
export const WATERING_DURATION = 'watering_duration'

export default class HomeScreen extends Component {
  state = {
    connected: false,
    [WATERING_DURATION]: 0,
    modal: false,
    time: 60 * 60 * 24 * 3,
    interval: 0
  }

  componentDidMount () {
    this.connect()
    const interval = setInterval(() => {
      this.setState({time: this.state.time - 1})
    }, 1000)
    this.setState({interval})


  }

  componentWillUnmount () {
    clearInterval(this.state.interval)
  }

  connect = () => {
    console.log('connect')
    //Arduino.connect()
  }

  doWater = async () => {
    console.log('watering')
    try {
      // await Arduino.water()
    } catch
      (err) {
      log(err.message)
    }
  }

  fetchDurationTimeout = async () => {
    const {navigation} = this.props

    const wateringFromNavigation =  navigation.getParam(WATERING_DURATION)

    if(wateringFromNavigation){

    }
    try {
      // const watering_duration = await Arduino.getWateringDuration()
    } catch
      (err) {
      log(err.message)
    }
  }

  durationTimeout = () => {
    const {navigation} = this.props

    const wateringFromNavigation =  navigation.getParam(WATERING_DURATION) || 0

    return wateringFromNavigation
  }

  goToSettings = async () => {
    this.setState({modal: true})

    const {navigate} = this.props.navigation

    navigate('Settings')
  }

  render () {
    const durationTimeout = this.durationTimeout()
    return (
      <>
        <Container>
          <ImageBackground source={image} style={{width: '100%', height: '100%'}}>
            <Content padder contentContainerStyle={{height: '100%'}}>
              <StatusBar barStyle="dark-content"/>
              <SafeAreaView style={{borderWidth, borderColor: 'red', height: '100%'}}>
                {/*<ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>*/}
                {!this.state.connected && <Reconnect onPress={this.connect}/>}

                <View style={{justifyContent: 'flex-start', borderWidth, borderColor: 'blue', flex: 12}}>
                  <View style={{borderWidth, justifyContent: 'center', alignItems: 'center', flex: 2}}>
                    <Text style={{borderWidth, fontSize: 28}}>Next watering:</Text>
                    <Text style={{borderWidth, fontSize: 40}}>{msToTime(this.state.time)}</Text>
                    <Text style={{borderWidth, fontSize: 28}}>watering
                      duration: {durationTimeout} sec</Text>
                  </View>
                  <View style={styles.waterButtons}>
                    <DashboardButton onPress={this.doWater}>water plant</DashboardButton>
                    <DashboardButton onPress={this.fetchDurationTimeout}>get duration timeout</DashboardButton>
                    <DashboardButton onPress={this.goToSettings}>Settings</DashboardButton>
                  </View>
                  <View style={styles.state}>
                    <Text style={styles.sectionTitle}>{JSON.stringify(this.state, null, 2)}</Text>
                  </View>
                </View>
                {/*</ScrollView>*/}
              </SafeAreaView>
            </Content>
          </ImageBackground>
        </Container>
      </>
    )
  }
}

const styles = StyleSheet.create({

  scrollView: {
    backgroundColor: Colors.lighter,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 3
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  state: {
    backgroundColor: Colors.white,
    borderWidth,
    flex: 1
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.black,
  },
  waterButtons: {
    // flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 5,
    //height: '35%'

  },

  reconnect: {
    backgroundColor: 'gray',
    flexDirection: 'row',
    margin: 10,
    borderWidth,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
})