import { RegistrationAddCreateFamilyComponent } from '../registration-add-create-family/registration-add-create-family.component';
import $ from 'node_modules/jquery'

export default {

    createComponent(registrationBody, componentFactoryResolver, isChild): any {
        const componentFactory = componentFactoryResolver.resolveComponentFactory(RegistrationAddCreateFamilyComponent);
        const componentRef = registrationBody.createComponent(componentFactory);
        (<RegistrationAddCreateFamilyComponent>componentRef.instance).isChild = isChild;
    },

    forwardToSecondStep(registrationBody, componentFactoryResolver) : void {
        var isChild = $(".input-radio--registration__child").is(':checked')
          
        $(".registration__form").remove()
        $(".registration__footer").remove()
    
        this.createComponent(registrationBody, componentFactoryResolver, isChild);
      },

      forwardToSignIn() : void {
        $(".registration__form").remove()
        $(".registration__footer").remove()
      },

      registerNewUser(api, data, registrationBody, componentFactoryResolver) : void {
        this.forwardToSecondStep(registrationBody, componentFactoryResolver)
        /*api.registerNewUser(data).subscribe(
          data => {
              this.forwardToSecondStep(registrationBody, componentFactoryResolver)
              api.setCookie(data)
          },
          error => {
            console.log(error)
          }
        )*/
      }
}