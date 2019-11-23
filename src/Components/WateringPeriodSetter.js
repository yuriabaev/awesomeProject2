import { StyleSheet, Text, View,Picker } from 'react-native'
import { Card, CardItem } from 'native-base'
import React ,{ useState } from 'react';

const WateringPeriodSetter = ({onChange,value}) => {
  return (
    <View style={{justifyContent: 'center'}}>
      <Card>
        <CardItem>
          <Text>Watering Period:</Text>
        </CardItem>
        <CardItem>
            <Picker>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          <View style={styles.durationSelectors}>
            <Text style={styles.durationText} border={1}>
              every 3 days
            </Text>
          </View>
        </CardItem>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({

  buttonText: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 3
  },

  waterButtons_btns2: {
    color: 'green',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10
  },
})

export default WateringPeriodSetter