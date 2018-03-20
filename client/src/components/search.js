import React from 'react'
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
export default class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: ""
    }
  }

  handleSearch (e) {
    e.preventDefault()
    this.props.searchBookmarks(this.state.query)
  }

  handleReset () {
    this.setState({
      query: ""
    })
    this.props.fetchBookmarks()
  }

  render () {
    return (
      <Form inline className="search">
        <FormGroup controlId="formQuery">
          <ControlLabel>Search: </ControlLabel>{' '}
          <FormControl
            type="text"
            placeholder="Query"
            onChange={(e) => this.setState({query: e.target.value})}
            />
        </FormGroup>{' '}
        <Button onClick={this.handleSearch.bind(this)} type="submit">Search</Button>{' '}
        <Button onClick={this.handleReset.bind(this)}>Reset</Button>
      </Form>
    )
  }
}
