import React, { Component } from "react";

class DeleteField extends Component {
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render = () => {
    return (
      <div id="delete-field-wrapper-div">
        <button
          type="button"
          disabled={this.validateDelete()}
          onClick={this.props.delete}>
          destroy this {this.props.formName.slice(3).toLowerCase()}
        </button>
        <input
          type="text"
          name="deleteField"
          value={this.state && this.state.deleteField}
        />{" "}
        type in "delete" to enable delete button
      </div>
    );
  };
  validateDelete = () => this.state.deleteField === "delete";
}
