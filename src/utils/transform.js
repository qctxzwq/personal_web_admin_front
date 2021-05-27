// object转formdata
export const objToFormdata = (obj) => {
  let formdata = new FormData()
  for (let key in obj) {
    formdata.append(key, obj[key])
  }
  return formdata
}