import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import Slider from '@react-native-community/slider';
import { Colors } from 'react-native/Libraries/NewAppScreen'
import React, { Component } from 'react'
import DashboardButton from '../../Components/DashboardButton'
import { Container, Content, CardItem, Card, Text } from 'native-base'

const image = require('../../assets/download.jpg')

const borderWidth = 0

export default class Settings extends Component {
  state = {
    connected: false,
    watering_duration: 0,
    desiredDuration: 0,
  }

  componentDidMount () {
    //this.connect()
  }

  componentWillUnmount () {
  }

  connect = () => {
    //Arduino.connect()
  }

  setDurationTimeout = async () => {
    this.setState({modal: true})

    const {navigate} = this.props.navigation

    navigate('Home')
    // try {
    //   //await Arduino.setWateringDuration(this.state.desiredDuration)
    // } catch
    //   (err) {
    //   log(err.message)
    // }
  }

  onChangeDurationText = (text) => {
    this.setState({desiredDuration: text})
  }

  render () {
    return (
      <>
        <Container>
          <ImageBackground source={image} style={{width: '100%', height: '100%'}}>
            <Content  padder contentContainerStyle={{height: '100%',justifyContent: 'flex-end', borderWidth}}>
              <SafeAreaView style={{borderWidth, borderColor: 'red'}}>
                <View style={{justifyContent: 'center', borderWidth, borderColor: 'blue', height: '100%'}}>
                  <View style={{justifyContent: 'center',flex:10}}>
                   <Card >
                  {/*<View>*/}
                    <CardItem >
                      <Text>Choose the amount of water </Text>
                    </CardItem>
                    <CardItem>
                      <View style={styles.durationSelectors}>
                        <Slider
                          style={{width: 200, height: 40}}
                          minimumValue={0}
                          maximumValue={10}
                          step={1}
                          minimumTrackTintColor="light blue"
                          maximumTrackTintColor="#000000"
                          value={this.state.desiredDuration}
                          onValueChange={text => this.onChangeDurationText(text)}
                        />
                        <Text style={styles.durationText} border={1}>
                          {this.state.desiredDuration.toString()} seconds
                        </Text>
                      </View>
                    </CardItem>
                  {/*</View>*/}
                  </Card>
                  </View>
                  <View style={{justifyContent: 'center',flex:2}}>
                  <DashboardButton onPress={this.setDurationTimeout}>Set Duration Timeout</DashboardButton>
                  </View>
                </View>
                <StatusBar barStyle="dark-content"/>
              </SafeAreaView>
            </Content>
          </ImageBackground>
        </Container>
      </>
    )
  }
}

const styles = StyleSheet.create({
  durationSelectors: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.gray,
    flex: 1,
    borderWidth
  },
  durationText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: 10
  },
})