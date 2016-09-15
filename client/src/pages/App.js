import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class App extends React.Component {
  render(){
    return (
      <div>
        <Header/>
        <div className="main-body">
          {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
