import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {users: []};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div>
        <div id='search-box'>
          <form onSubmit={this.handleSubmit} id='search-form' method='get' target='_top'>
            <textarea value={this.state.value} onChange={this.handleChange} />
            <button id='search-button' type='submit'>
              <span>Search</span>
            </button>
          </form>
        </div>
        <div>
          {this.renderList(this.state.users)}
        </div>
      </div>
    );
  }

  renderList(list) {


    if (!list) {
      return '';
    } else {
      return (
        list.map((item) => 
          <li>
            <div><strong>action: </strong>{item.action}</div>
            <div><strong>srcaddr: </strong>{item.srcaddr}</div>
            <div><strong>dstaddr: </strong>{item.dstaddr}</div>
            <div><strong>dstport: </strong>{item.dstport}</div>
            <div><strong>interfaceID: </strong>{item.interfaceID}</div>
            <div><strong>securityGroup: </strong>{item.securityGroup}</div>
            <div><strong>dstHostname: </strong>{item.dstHostname}</div>
            <div><strong>hourCreated: </strong>{item.hourCreated}</div>
            <div><strong>bytes: </strong>{item.bytes}</div>
            <div><strong>packets: </strong>{item.packets}</div>
            <div><strong>numConnections: </strong>{item.numConnections}</div>
            <div><strong>region: </strong>{item.region}</div>
            <div><strong>vpc: </strong>{item.vpc}</div>
            <div><strong>availabilityZone: </strong>{item.availabilityZone}</div>
          </li>
        )
      );
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // this.state.value is the input value
    fetch('/users/process_get?' + this.state.value
    ).then(res => res.json())
      .then(users => this.setState({ users }));
    event.preventDefault();
  }
}

export default App;