import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';

import WebForm from './form';
//var webForm = new Form();

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    //console.log();
    // this.callApi()
    //   .then(res => this.setState({
    //     response: res.express
    //   }))
    //   .catch(err => console.log(err));
  }

  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };

  render() {
    return (
      <div>
        <div className="App" >
          <header className="App-header" >
            <img src={
              logo
            }
              className="App-logo"
              alt="logo" />
            <h1 className="App-title" > Welcome to React </h1> </header> <p className="App-intro" ></p>

        </div>
        <WebForm />
      </div>

    );
  }
}

export default App;