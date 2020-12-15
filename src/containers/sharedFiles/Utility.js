export const checkValidity = (value, rules ) => {
    let isValid = true
   
    if(rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLen) {
        isValid = value.length >= rules.minLen  && isValid;
    }
    if(rules.maxLen) {
        isValid = value.length <= rules.maxLen  && isValid;
    }
    if(rules.isEmail) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = pattern.test(value) && isValid
    }
    if(rules.isNumeric) {
        const pattern = /^\d+$/ ;
        isValid = pattern.test(value) && isValid
    }
  return isValid
}
