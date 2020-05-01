// @ts-ignore
import json from  '../../string_resourses.json'
const currentLanguage = "ua"


 export  function translate(value) {
   if (json[value]) {
    if(json[value][currentLanguage]){
    return json[value][currentLanguage]
   } else {
    return json[value]["en"]
   }
  } else {
    return "not found"
  }
}