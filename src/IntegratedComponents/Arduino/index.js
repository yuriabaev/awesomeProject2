import Bluetooth from './Bluetooth'

const bluetooth = new Bluetooth()

export const connect = async () => {
  await bluetooth.connect('ESP32_LED_Control')
}

export const water = async () => {
  await bluetooth.sendCommand('water')
}
export const getWateringDuration = async () => {
  return this.sendCommand('get_watering_duration')
}

export const setWateringDuration = async (duration) => {
  await this.sendCommand(`set_watering_duration ${duration * 1000}`)
}

export const getTimeToNextWater = async () => {
  return bluetooth.sendCommand('time')
}