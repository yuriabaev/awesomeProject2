import { StyleSheet, Text, View } from 'react-native'
import { Button as ButtonNB } from "native-base"
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'

 const DashboardButton = (props)=>{
  return (
    <View style={styles.waterButtons_btns2}>
      <ButtonNB block info style={{ borderRadius:10}} onPress={props.onPress}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </ButtonNB>
    </View>
  )
}

const styles = StyleSheet.create({

  buttonText: {
    color:'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 3
  },

  waterButtons_btns2: {
    color: 'green',
    justifyContent: 'center',
    borderRadius: 10,
    margin:10
  },
})





export default DashboardButton