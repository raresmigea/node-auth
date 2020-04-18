import React, { Component } from 'react';

export default class CustomInput extends Component {
  render() {
    const { input: { value, onChange } } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={ this.props.label }></label>
        <input
          name={ this.props.name }
          id={ this.props.id }
          placeholder={ this.props.placeholder }
          className="form-name"
          type={ this.props.type }
          value={ value }
          onChange= { onChange }
        />
      </div>
    );
  }
}
