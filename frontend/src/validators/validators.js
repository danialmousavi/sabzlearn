import rules from "./rules"
const validator=(value,validations)=>{
    const validationsResults=[];
    for(const validator of validations){
        if(validator.value===rules.requierdValue){
            value.trim().length==0&&validationsResults.push(false);
        }
        if(validator.value===rules.minValue){
            value.trim().length<validator.min&&validationsResults.push(false);
        }
        if(validator.value===rules.maxValue){
            value.trim().length>validator.max&&validationsResults.push(false);
        }
        if(validator.value===rules.emailValue){
            !value.trim().includes('@')&&validationsResults.push(false)
        }
    }
    if(validationsResults.length){
        return false
    }
    else {
        return true
    }
}
export default validator