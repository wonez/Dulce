export const validateField = (rules, value) => {
    let valid = true;

    for(let rule in rules){
        valid = valid && singleRule(rule, value, rules[rule]);
    }

    return valid;
}

export const validateForm = (fields) => {
    let valid = true;

    for(let field in fields){
        valid = valid && fields[field].valid
    }

    return valid;
}

const singleRule = (rule, value, check) => {
    let valid = true;
    switch(rule){
        case 'email': 
            if(check) {
                valid = valid && value.match(/^[A-Za-z0-9]+@[A-Za-z0-9]+(\.[A-Za-z0-9]+)+$/)
            } break;
        case 'required': 
            if(check) {
                valid = valid && value.length > 0
            } break;
        case 'minLength': 
            valid = valid && value.length >= check
            break;
    }
    return valid;
}

