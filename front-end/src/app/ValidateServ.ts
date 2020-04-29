
import {Validators} from '@angular/forms';

export default{

    validateUsername : [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern("[^ @]*")
    ],

    validateEmail : [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
    ],

    validatePassword : [
        Validators.required,
        Validators.minLength(8)
    ],

    validateIsParent : [
        Validators.required
    ]

}