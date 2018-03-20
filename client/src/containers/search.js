import React from 'react'
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
export default class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: ""
    }
  }

  handleSearch () {
    this.props.onSearch(this.state.query)
  }

  handleReset () {
    this.setState({
      query: ""
    })
    this.props.handleReset()
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
        <Button >Reset</Button>
      </Form>
    )
  }
}
