import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'E-Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      }
    }
  };

  render () {
    const { controls } = this.state;

    const formElementsArr = [];
    for (let key in controls) {
      formElementsArr.push({
        id: key,
        config: controls[key],
      });
    }

    const form = formElementsArr.map(formElement => (
      <Input 
        key={formElement.id} 
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
      
    ));

    return (
      <div>
        <form>
          {form}
          <Button btnType='Success'>SUBMIT</Button>
        </form>
      </div>
    );
  }
}

export default Auth;