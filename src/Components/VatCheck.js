import React from 'react';
import DataEntry from './DataEntry';
import Request from 'react-http-request';
import './VatCheck.css';
import Particles from 'react-particles-js';

class VatCheck extends React.Component {
  constructor(props) {
    super(props)


    this.state = {
      countryCode: 'EE',
      vatNumber: '100247019',
      name: 'Selver AS',
      address: 'Pärnu mnt 238   11624 Nõmme linnaosa Tallinn',
      valid: false,
      vatMiss: "",
      url: 'https://vat.erply.com/numbers?vatNumber=',
      checked: false

    }
  }


  handleNumberReset = (vatMiss) => {
    this.setState({
      valid: false,
      });
    console.log(vatMiss);
    var url1 = 'https://vat.erply.com/numbers?vatNumber=' + vatMiss;
    this.setState({
      url: url1,
      });
    var p2 = new Promise(function(resolve, reject) {
      let response = fetch(url1);
      resolve(response);
    });
    p2.then((response) => {
      return response.json();
    }).then((response) => {
      if (response.Valid) {
        this.setState({
          valid: true,
          checked: true
          });
      } else {
        this.setState({
          checked: false
          });
      }
    })

  }



  render() {

    const isValid = this.state.valid;
    const isChecked = this.state.checked;
    return (<section className="hero is-primary is-bold is-fullheight has-text-centered">
      <div className="polygon" ><Particles
        params={{
          "particles": {
              "number": {
                  "value": 110
              },
              "size": {
                  "value": 3
              }
          },
          "interactivity": {
              "events": {
                  "onhover": {
                      "enable": true,
                      "mode": "repulse"
                  }
              }
          }
      }}/></div>
              <div className="hero-body">
                <div className="container">
                  <h2 data-shadow='VAT number check'>VAT number check</h2>

                  <DataEntry onNumberReset={this.handleNumberReset}/>
                  {isValid ? (
                    <Request
                      url={this.state.url}
                      method='get'
                      accept='application/json'
                      verbose={true}
                    >
                      {
                        ({error, result, loading}) => {
                          if (loading) {
                            return <div className="section info-section">
                              <nav className="columns">
                                <div className="column has-text-centered">
                                  <div>
                                    <div className="lds-dual-ring"></div>
                                  </div>
                                </div>
                              </nav>
                            </div>;
                          } else {
                            if (result.body.Valid) {
                            return <div className="section info-section">
                              <nav className="columns">
                                <div className="column has-text-centered">
                                  <div>
                                    <p className="heading is-size-6">Country code</p>
                                    <p className="is-size-4">{result.body.CountryCode}</p>
                                  </div>
                                </div>
                                <div className="column has-text-centered">
                                  <div>
                                    <p className="heading is-size-6">VAT number</p>
                                    <p className="is-size-4">{result.body.VATNumber}</p>
                                  </div>
                                </div>
                                <div className="column has-text-centered">
                                  <div>
                                    <p className="heading is-size-6">Name</p>
                                    <p className="is-size-4">{result.body.Name}</p>
                                  </div>
                                </div>
                                <div className="column has-text-centered">
                                  <div>
                                    <p className="heading is-size-6">Address</p>
                                    <p className="is-size-4">{result.body.Address}</p>
                                  </div>
                                </div>
                              </nav>
                            </div>;
                          } else {
                            return <div className="section info-section">
                              <nav className="columns">
                                <div className="column has-text-centered">
                                  <div>
                                    <p className="heading is-size-6">Enter valid VAT number</p>
                                    <p className="is-size-4"></p>
                                  </div>
                                </div>
                              </nav>
                            </div>;

                          }
                        }
                      }
                    }
                  </Request>

                ) : ((isChecked) ? (
                <div className="section info-section">
                  <nav className="columns">
                    <div className="column has-text-centered">
                      <div>
                        <div className="lds-dual-ring"></div>
                        <p className="is-size-4"></p>
                      </div>
                    </div>
                  </nav>
                </div>) : (
                  <div className="section info-section">
                    <nav className="columns">
                      <div className="column has-text-centered">
                        <div>
                          <p className="heading is-size-4">Enter valid VAT number</p>
                          <p className="is-size-4"></p>
                        </div>
                      </div>
                    </nav>
                  </div>
                )

                  )}

                </div>
              </div>
            </section>

            )
          }
  }

  export default VatCheck
