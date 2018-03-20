import React from 'react'
import { FormControl, FormGroup, Button, ButtonGroup } from 'react-bootstrap'

export default class BookmarkListItem extends React.Component {
  constructor (props) {
    super(props)
    const attributes = Object.assign({
      title: "",
      url: "",
      shortening: ""
    }, this.props.initialAttributes)
    this.state = {attributes}
  }

  isFormValid () {
    return this.isUrl(this.state.attributes.url) &&
      (this.state.attributes.shortening == "" || this.isUrl(this.state.attributes.shortening)) &&
      (this.state.attributes.title !== "")
  }

  // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
  isUrl(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                             '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
                             '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                             '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                             '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                             '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
  }

  getValidationState(name, value) {
    if (value ==="") {
      return null
    }

    const url = this.isUrl(value) ? "success" : "error"
    return {
      title: "success",
      url: url,
      shortening: url
    }[name]
  }

  handleChange (e) {
    this.setState({
      attributes: Object.assign(
        {}, this.state.attributes,
        {
          [e.target.name]: e.target.value
        })
    })
  }

  handleSave () {
    this.props.onSave(this.state.attributes)
  }

  handleCreate () {
    this.props.onCreate(this.state.attributes)
    this.reset()
  }

  reset() {
    const attributes = {}
    Object.keys(this.state.attributes).forEach(
      name => attributes[name] = "" )
    this.setState({attributes})
  }

  textAttribute(name, link) {
    const editable = this.props.editable || this.props.creator
    const style = editable
          ? {}
          : {
            cursor: "default", background: "none", border: "none", boxShadow: "none"
          }
    const value = this.state.attributes[name]
    const displayName = editable && name[0].toUpperCase() + name.substring(1)
    let control = (
        <FormControl
          style={style}
          disabled={!editable}
          type="text"
          value={value}
          placeholder={displayName}
          name={name}
          onChange={this.handleChange.bind(this)}
          />
    )
    if (editable) {
      control = (
        <FormGroup
          style={{marginBottom: 0}}
          validationState={this.getValidationState(name, value)}
          >
          {control}
          <FormControl.Feedback/>
        </FormGroup>
      )
    }
    if (!editable && link) {
      style.cursor = "pointer"
      control = (
        <a href={value} target="_new">
          {control}
        </a>
      )
    }
    return (
      <div>
        {control}
      </div>
    )
  }

  renderButtons () {
    if (this.props.editable) {
      return (
      <ButtonGroup>
        <Button bsSize="xsmall" bsStyle="default"
                disabled={!this.isFormValid()}
                onClick={this.props.onCancelEdit} >Cancel</Button>
        <Button bsSize="xsmall" bsStyle="primary" onClick={this.handleSave.bind(this)} >Save</Button>
        <Button bsSize="xsmall" bsStyle="danger" onClick={this.props.onDelete} >Delete</Button>
      </ButtonGroup>
      )
    }
    if (this.props.creator) {
      return (
      <ButtonGroup>
        <Button bsSize="xsmall" bsStyle="primary"
                disabled={!this.isFormValid()}
                onClick={this.handleCreate.bind(this)}>Submit</Button>
        <Button bsSize="xsmall" bsStyle="default" onClick={this.reset.bind(this)}>Reset</Button>
      </ButtonGroup>
      )
    }
    return (
      <Button bsSize="xsmall" bsStyle="info" onClick={this.props.onEdit} >Edit</Button>
    )
  }

  render () {
    return (
      <form className="bookmark-row">
          {this.textAttribute("title")}
          {this.textAttribute("url", true)}
          {this.textAttribute("shortening", true)}
          <div>
            {this.renderButtons() }
          </div>
      </form>
    )
  }


}
