import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index.js';

import UserForm from './components/UserForm';
import GoogleMapElement from '../Map/index.js';

class Home extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      address: {value: null, error: null},
      radius: {value: null, error: null},
      min: {value: null, error: null},
      max: {value: null, error: null},
      open: false,
      submissionError: null
    };
  }

  render(){
    return (
      <div>
        <UserForm
          submit={this.submitClick.bind(this)}
          location={this.locationClick.bind(this)}
          address={this.valAddress.bind(this)}
          radius={this.valRadius.bind(this)}
          min={this.valMin.bind(this)}
          max={this.valMax.bind(this)}
          open={this.clickOpen.bind(this)}
          formData={this.state}
          />
        {this.renderGoogleMap()}
      </div>
    );
  };

  renderGoogleMap(){
    if(this.props.data.lat){
      return(
        <GoogleMapElement formData={this.props.data}/>
      );
    }
    else {
      return(<div></div>)
    }
  }

  valAddress(event){
    var address = event.target.value;

    if(address === ''){
      this.setState({address: {value: null, error: null}});
      return;
    }
    this.setState({address: {value:address, error: null}})
  }

  valRadius(event){
    var radius = parseInt(event.target.value);

    if(isNaN(radius)){
      this.setState({radius: {value: null, error: 'Radius must be a number'}});
      console.log('Radius must be a number')
      return;
    }
    if(radius < 0 || radius > 50000){
      this.setState({radius: {value: null, error: 'Radius must be between 0 and 50000'}});
      console.log('Radius must be between 0 and 50000')
      return;
    }
    else {
      this.setState({radius: {value: radius, error: null}})
    }
  };

  valMin(event){

    var min = parseInt(event.target.value);

    if(isNaN(min)){
      this.setState({min: {value: null, error: 'Min must be a number'}})
      console.log('Min must be a number');
      return;
    }
    if(min < 0){
      this.setState({min: {value: null, error: 'Min must be greater than 0'}})
      console.log('Min must be greater than 0')
      return;
    }
    else{
      this.setState({min: {value: min, error: null}})
    }
  };

  valMax(event){
    var max = parseInt(event.target.value);

    if(isNaN(max)){
      this.setState({max: {value: null, error: 'Max must be a number'}})
      console.log('Max must be a number');
      return;
    }
    if(max < 0){
      this.setState({value: null, error: 'Max must be greater than 0'})
      console.log('Max must be greater than 0');
      return;
    }
    else{
      this.setState({max: {value: max, error: null}})
    }
  };

  clickOpen(event){
    this.setState({open: event.target.checked})
  };

  locationClick(event){
    var that = this;
    event.preventDefault();
    console.log('clicking on location');
    navigator.geolocation.getCurrentPosition(function(position) {
      var coordinates = `${position.coords.latitude}, ${position.coords.longitude}`;
      document.getElementById('address').value = coordinates;
      that.setState({address: {value: coordinates}});
    });
  };

  submitClick(event){
    if(this.state.address.value == null){
      this.setState({submissionError: 'Please an address or lat/long'});
      console.log('Please enter an address or lat/long');
      return;
    }
    if(this.state.min.value > this.state.max.value){
      this.setState({submissionError: 'Max must be greater than min'});
      console.log('Max must be greater than min')
      return;
    }
    if(this.state.min.error != null || this.state.max.error != null){
      this.setState({submissionError: 'Please fix the form errors'});
      console.log('Please fix the form errors');
      return;
    }
    if(this.state.radius.value == null){
      this.setState({submissionError: 'Please enter a radius'});
      console.log('Please enter a radius');
      return;
    }
    else{

      var address = this.state.address.value;

      if(address.search(/[a-zA-Z]+/i) === -1){
        var splitCoord = address.split(', ');
        if(splitCoord[0] === address){
          this.setState({submissionError: 'Incorrect lat/long pattern'});
          return;
        }
        else{
          this.props.submitWithCoordinates(this.state)
        }
      }
      else{
        this.props.submitWithAddress(this.state)
      }

      this.setState({submissionError: null});
    };

  };
};

function mapStateToProps(state){
  return {data: state.form.data}
}

export default connect(mapStateToProps, actions)(Home)
