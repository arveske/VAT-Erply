import React from 'react';

class DataEntry extends React.Component {
  state = {number: ''}

  handleNumberChange = (e) => {
    this.setState({
      number: e.target.value
      })
  }

  handleNumberSubmit = (e) => {
    e.preventDefault()

    this.props.onNumberReset(this.state.number)
  }

  render() {

    const {number} = this.state

    return (
      <form onSubmit={this.handleNumberSubmit}>
        <div className="field is-grouped is-grouped-centered">
          <p className="control input-control">
            <input className="input is-medium is-uppercase"  value={number} onChange={this.handleNumberChange} placeholder="Enter VAT number" />
          </p>
          <div className="control">
            <button className="button is-light is-medium is-outlined">
              Check
            </button>
          </div>
        </div>
      </form>
            )
          }
  }

  export default DataEntry
