import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../actions';
import CustomInput from './CustomInput';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(formData) {
    console.log('formData: ', formData);
    // we need to call some actionCreator - from actions folder
    // it should contact the backend server & dispatch some message for auth reducer
    await this.props.signUp(formData);
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <Field
              name='email'
              type='text'
              id='email'
              label='enter your email'
              placeholder='example@example.com'
              component={CustomInput}
            />
          </fieldset>

          <fieldset>
            <Field
              name='password'
              type='password'
              id='password'
              label='enter your password'
              placeholder='your secret password'
              component={CustomInput}
            />
          </fieldset>

          <button type='submit' className='btn btn-primary'>
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default compose(
  connect(null, actions),
  reduxForm({ form: 'signup' })
)(SignUp);
