import React, { Component } from "react";

export default class DeleteField extends Component {
  constructor() {
    super();
    this.state = { deleteField: "I dare you" };
  }
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
          disabled={!this.validateDelete()}
          onClick={this.props.handleDelete}>
          destroy this {this.props.formName.slice(4).toLowerCase()}
        </button>
        <input
          type="text"
          name="deleteField"
          onChange={this.handleChange}
          value={this.state && this.state.deleteField}
        />{" "}
        type in "delete" to enable delete button
      </div>
    );
  };
  validateDelete = () => this.state.deleteField === "delete";
}
