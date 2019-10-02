import React from 'react';
import List from './list.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      redirect: "",
      createLink: "",
      getLink: "",
      checkId: "",
      clicks: [],
    };
  }

  handleIdChange = (e) => {
    this.setState({id: e.target.value});
  }
  handleRedirectChange = (e) => {
    this.setState({redirect: e.target.value});
  }

  handleCheckIdChange = (e) => {
    this.setState({checkId: e.target.value});
  }
  
  createLink = () => {
    this.setCreateLink();
    this.makeCreateCall();
  }

  setCreateLink = () => {
    this.setState({createLink: "https://app.okrana.icu/create/" + this.state.id + "/" + this.state.redirect});
    this.setState({getLink: "https://app.okrana.icu/link/" + this.state.id});
  }

  makeCreateCall = () => {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', this.state.createLink);
    xhr.send();
  }

  checkLink = () => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        let json = xhr.response;

        let data = JSON.parse(json);
        let clicks = [];
        if (data[0]) {
          if (data[0].newClicks) {
            for (let i = 0; i < data[0].newClicks.length; i++) {
              clicks.push(data[0].newClicks[i].time);
            }
            
          }
        }
        this.setState({clicks: clicks});
        

        //this.setState({linkStats: xhr.response});
      }
    }

    let url = "https://app.okrana.icu/stats/" + this.state.checkId;

    xhr.open('GET', url);
    xhr.send();
  }

  render() {
      return (
      <div className="App">
        <h1>Create a Link</h1>
        <span><p>ID(test123):<input id="idInput" onChange={this.handleIdChange}></input></p></span>
        <span>Redirect URL(www.google.com):<input id="redirectInput" onChange={this.handleRedirectChange}></input></span>
        < br/>
        <button id="createBtn" onClick={this.createLink}>Create</button>

        <p>{ this.state.getLink }</p>

        < br/>
        < br/>
        < br/>

        <h1>Check an existing link</h1>
        <p>Link ID:</p><input onChange={this.handleCheckIdChange}></input>
        < br/>
        <button id="checkBtn" onClick={this.checkLink}>Check</button>
        < br/>
        < br/>
        
        <List clicks={this.state.clicks} />
      </div>
      );
  }
}

export default App;
