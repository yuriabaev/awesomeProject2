import { Toast } from "native-base"

export const success = function ({msg}) {
  show({msg,type:'success'})
}

export const error = function ({msg}) {
  show({msg,type:'danger'})
}

export const show = function ({msg, type}) {//danger, success, warning
  Toast.show({
    text: msg,
    duration: 3000,
    type
  })
}
export default {
  success,
  error,
  show
}