import React from 'react';
import TronWeb from 'tronweb';
import Utils from '../utils';
import Swal from 'sweetalert2';

const FOUNDATION_ADDRESS = 'TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg';
////////////////////////////////////////////////////////////////////////////////////
const contractAddress = 'TKD928iuZbHS85D8KG9t8CRpjP7QsZDcuZ';   /// Add your contract address here
////////////////////////////////////////////////////////////////////////////////////

class Blockchain extends React.Component {

    constructor(props) {
        super(props);
        this.onResumeProcess = this.onResumeProcess.bind(this);
        this.onGetResume = this.onGetResume.bind(this);
        this.resumeID = React.createRef();
        this.score = React.createRef();
        this.resumeIDStored = React.createRef();

        this.state = {

              tronWeb: {
                  installed: false,
                  loggedIn: false
              }
            }

    }

    async componentDidMount() {

        this.setState({loading:true})
        await new Promise(resolve => {
            const tronWebState = {
                installed: !!window.tronWeb,
                loggedIn: window.tronWeb && window.tronWeb.ready
            };

            if(tronWebState.installed) {
                this.setState({
                    tronWeb:
                    tronWebState
                });

                return resolve();
            }

            let tries = 0;

            const timer = setInterval(() => {
                if(tries >= 10) {
                    const TRONGRID_API = 'https://api.trongrid.io';

                    window.tronWeb = new TronWeb(
                        TRONGRID_API,
                        TRONGRID_API,
                        TRONGRID_API
                    );

                    this.setState({
                        tronWeb: {
                            installed: false,
                            loggedIn: false
                        }
                    });

                    clearInterval(timer);
                    return resolve();
                }

                tronWebState.installed = !!window.tronWeb;
                tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

                if(!tronWebState.installed)
                    return tries++;

                this.setState({
                    tronWeb: tronWebState
                });

                resolve();
            }, 100);
        });

        if(!this.state.tronWeb.loggedIn) {
            // Set default address (foundation address) used for contract calls
            // Directly overwrites the address object as TronLink disabled the
            // function call
            window.tronWeb.defaultAddress = {
                hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
                base58: FOUNDATION_ADDRESS
            };

            window.tronWeb.on('addressChanged', () => {
                if(this.state.tronWeb.loggedIn)
                    return;

                this.setState({
                    tronWeb: {
                        installed: true,
                        loggedIn: true
                    }
                });
            });
        }

        await Utils.setTronWeb(window.tronWeb, contractAddress);
    }
  
    onResumeProcess() {
        Utils.contract.processResumes(this.resumeID.current.value, this.score.current.value*100, new Date().getTime()).send({
            shouldPollResponse: true,
            callValue: 0
        }).then(res => Swal({
            title: 'Resume Processing Succeeded',
            type: 'success'
        })).catch(err => Swal({
            title: 'Resume Processing Failed',
            type: 'error'
        }))
    }

    async onGetResume() {
        const resume = await Utils.contract.getResume(this.resumeIDStored.current.value).call();
        console.log(resume)
    }

    render() {
        if(!this.state.tronWeb.installed)
            return (<div className="topnav">
            </div>
            )


        if(!this.state.tronWeb.loggedIn)
            return (<div className="topnav">
            </div>);

        return (
              <div className='row'>
                <div className='col-lg-12 text-center' >
                  <hr/>

                      <div className="topnav">
                      </div>
                  <hr style={{color: 'white', backgroundColor: 'white', height: 0.5}}/>

                  <h1 className="topnav" style={{color : 'red' }}>MJT Dapp</h1>
                  <hr style={{color: 'white', backgroundColor: 'white', height: 0.5}}/>
                  <br/>
                  <br/>

                  <label>
                    ResumeID:
                    <br/>
                     <input type="number" ref={this.resumeID}  />
                  </label>
                  <br/>

                   <label>
                    Resume Total Score:
                    <br/>
                    <input type="number" ref={this.score}  />
                  </label>
                 
                  <br/>
                  <br/>

      <button className="btn btn-primary" onClick={(event) => {event.preventDefault()
                                                        this.onResumeProcess()}  }>Process Resume </button>

      <br/>
      <br/>
                <label>
                    ResumeID:
                    <br/>
                     <input type="number" ref={this.resumeIDStored} />
                  </label>
                  <br/>
                  <br/>
                  <button className="btn btn-primary" onClick={(event) => {event.preventDefault()
                                                        this.onGetResume()}  }>Get Resume </button>

                </div>
                
              </div>
        );
    }
}

export default Blockchain;
