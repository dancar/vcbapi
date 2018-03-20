import React from 'react'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

// TODO: validations

export default class BookmarkForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: "",
      shortening: "",
      url: ""
    }
  }

  handleSubmit () {
    const { title, url, shortening } = this.state
    const attributes = {title, url, shortening}
    this.props.onSubmit(attributes)
  }

  handleChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render () {
    return (
      <form className="bookmark-form">
        <div className="bookmark-form-field">
          <ControlLabel htmlFor="title">Title: </ControlLabel>
          <FormControl onChange={this.handleChange.bind(this)} type="text" id="title" name="title" value={this.state.title}/>
        </div>

        <div className="bookmark-form-field">
          <ControlLabel htmlFor="url">URL: </ControlLabel>
          <FormControl onChange={this.handleChange.bind(this)} type="text" id="url" name="url" value={this.state.url}/>
        </div>

        <div className="bookmark-form-field">
          <ControlLabel htmlFor="shortening">Shortening: </ControlLabel>
          <FormControl type="text" id="shortening" onChange={this.handleChange.bind(this)} name="shortening" value={this.state.shortening}/>
        </div>

        <Button onClick={this.handleSubmit.bind(this)} bsStyle="primary">Submit</Button>

      </form>
    )
  }
}
