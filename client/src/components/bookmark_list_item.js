import React from 'react'
import { FormControl, Button, ButtonGroup } from 'react-bootstrap'

export default class BookmarkListItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = Object.assign({
      title: "",
      url: "",
      shortening: ""
    }, this.props)
  }

  textAttribute(name, link) {
    const editable = this.props.editable || this.props.creator
    const style = editable
          ? {}
          : {
            cursor: "default", background: "none", border: "none", boxShadow: "none"
          }
    const value = this.state[name]
    let control = (
        <FormControl
          style={style}
          disabled={!editable}
          type="text"
          defaultValue={value}
          name={name}
          />
    )
    if (!editable && link) {
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
        <Button bsSize="xsmall" bsStyle="primary"  type="submit">Save</Button>
        <Button bsSize="xsmall" bsStyle="danger" onClick={this.props.onDelete} >Delete</Button>
      </ButtonGroup>
      )
    }
    if (this.props.creator) {
      return (
      <ButtonGroup>
        <Button bsSize="xsmall" bsStyle="primary" type="submit">Submit</Button>
        <Button bsSize="xsmall" bsStyle="default" type="reset" >Reset</Button>
      </ButtonGroup>
      )
    }
    return (
      <Button bsSize="xsmall" bsStyle="info" onClick={this.props.onEdit} >Edit</Button>
    )
  }

  handleSubmit (e) {
    e.preventDefault()
    const attributeNames = ["title", "url", "shortening"]
    const attributes = {}
    attributeNames.forEach(
      name => attributes[name] = e.target[name].value
    )
    this.setState(attributes)
    this.props.onSubmit(attributes)
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="bookmark-row">
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
