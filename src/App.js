import React from 'react';
import List from './components/list';
import Docs from './components/Docs';


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
      display: false,
      page: 0
    };
  }

  handleIdChange = (e) => {
    this.setState({id: e.target.value});
    
  }
  handleRedirectChange = async (e) => {
    await this.setState({redirect: e.target.value});
    await this.setState({createLink: "http://app.okrana.icu/link"})
    await this.setState({getLink: "http://app.okrana.icu/link/" + this.state.id});
    this.setState({display: false});
  }

  handleCheckIdChange = (e) => {
    this.setState({checkId: e.target.value});
    this.setState({display: false});
  }
  
  createLink = () => {
    this.setState({display: true});
    this.setCreateLink();
    this.makeCreateCall();
  }

  checkForDisplay = () => {
    if (this.state.display === true) {
      return <div><br /><h5>{this.state.getLink}</h5><button className="btn btn-primary" onClick={this.copyLink}>Copy</button></div>;
    }
  }

  copyLink = () => {
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = this.state.getLink;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  setCreateLink = () => {
    /*this.setState({createLink: "https://app.okrana.icu/create/" + this.state.id + "/" + this.state.redirect});
    this.setState({getLink: "https://app.okrana.icu/link/" + this.state.id});*/
  }

  makeCreateCall = () => {
    let xhr = new XMLHttpRequest();

    xhr.open('POST', this.state.createLink);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ "id": this.state.id, "redirect": this.state.redirect }));
  }

  checkLink = () => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        let json = xhr.response;

        let data = JSON.parse(json);
        let clicks = [];
        console.log(data);
        if (data) {
            for (let i = 0; i < data.length; i++) {
              clicks.push(data[i].dateTime);
            }
          

        }
        this.setState({clicks: clicks});
        this.setState({display: true});

        //this.setState({linkStats: xhr.response});
      }
    }

    let url = 'http://app.okrana.icu/stats/' + this.state.checkId;

    xhr.open('GET', url);
    xhr.send();
  }

  setPage0 = () => {
    this.setState({page: 0});
  }
  setPage1 = () => {
    this.setState({page: 1});
  }

  render() {

    let createBtnStyle = () => {
      if (this.state.id === null) {
        return "btn btn-info disabled";
      } else {
        return "btn btn-info";
      }
    };
    if (this.state.page === 0) {
      return (
        <div>
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
              
              <ul className="navbar-nav">
                <li className="nav-item active"><a className="nav-link" onClick={this.setPage0}>Home</a></li>
                <li className="nav-item"><a className="nav-link" onClick={this.setPage1}>Info</a></li>
              </ul>
            
          </nav>
          <div className="jumbotron text-center">
            <h1>EZLinktracking.com</h1>
            <p>Easy - Free - Link Tracking</p>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <h1>Create a Link</h1>
                <span><p>ID(test123):<input id="idInput" type="text" className="form-control" onChange={this.handleIdChange}></input></p></span>
                <span>Redirect URL(www.google.com):<input id="redirectInput" type="text" className="form-control" onChange={this.handleRedirectChange}></input></span>
                < br/>
                <button id="createBtn" className={createBtnStyle()} onClick={this.createLink}>Create</button>
  
                <div>{ this.checkForDisplay() }</div>
              </div>
  
              <div className="col-lg-4">
                <h1>Check a link</h1>
                <span><p>Link ID:<input type="text" className="form-control" onChange={this.handleCheckIdChange}></input></p></span>
  
                <button id="checkBtn" className="btn btn-success" onClick={this.checkLink}>Check</button>
                < br/>
                < br/>
                
                <List clicks={this.state.clicks} />
              </div>
              <div className="col-lg-4">
                <div>
                
                </div>
              </div>
            </div>
            </div>
        </div>
        );
    } else if (this.state.page === 1) {
      return (
        <div>
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
              
              <ul className="navbar-nav">
                <li className="nav-item"><a className="nav-link" onClick={this.setPage0}>Home</a></li>
                <li className="nav-item active"><a className="nav-link" onClick={this.setPage1}>Info</a></li>
              </ul>
            
          </nav>
          <Docs />
        </div>
      );
    }
      
  }
}

export default App;
