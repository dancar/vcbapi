import React from 'react'
import { FormControl, Button, ButtonGroup } from 'react-bootstrap'

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
    let control = (
        <FormControl
          style={style}
          disabled={!editable}
          type="text"
          value={value}
          name={name}
          onChange={this.handleChange.bind(this)}
          />
    )
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
        <Button bsSize="xsmall" bsStyle="default" onClick={this.props.onCancelEdit} >Cancel</Button>
        <Button bsSize="xsmall" bsStyle="primary" onClick={this.handleSave.bind(this)} >Save</Button>
        <Button bsSize="xsmall" bsStyle="danger" onClick={this.props.onDelete} >Delete</Button>
      </ButtonGroup>
      )
    }
    if (this.props.creator) {
      return (
      <ButtonGroup>
        <Button bsSize="xsmall" bsStyle="primary" onClick={this.handleCreate.bind(this)}>Submit</Button>
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
