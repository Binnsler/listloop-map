import React from 'react';
import Home from '../index.js';

class UserForm extends React.Component {
  render(){
    return (
      <form className="user-form" onSubmit={this.validateForm.bind(this)}>
        <div className="form-group">
          <input id="address" type="text" placeholder="Address or lat, long" onKeyUp={this.validateAddress.bind(this)}/>
          <button className="location-btn" onClick={this.props.location}><img src="client/src/images/location.jpg"/></button>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Radius in meters (0-50000)" onKeyUp={this.validateRadius.bind(this)}/>
        </div>
        {this.renderRadiusErrors()}
        <div className="form-group">
            <input type="text" placeholder="Min Price" onKeyUp={this.validateMinPrice.bind(this)}/>
        </div>
        {this.renderMinErrors()}
        <div className="form-group">
            <input type="text" placeholder="Max Price" onKeyUp={this.validateMaxPrice.bind(this)}/>
        </div>
        {this.renderMaxErrors()}
        <div className="form-group float-left">
          <label className="grey-text">Open Now:</label>
          <input type="checkbox" onClick={this.clickOpen.bind(this)}/>
        </div>
        {this.renderFormErrors()}
        <button type="submit" className="blue-button">Submit</button>
      </form>
    );
  }

  validateAddress(e){
    this.props.address(e)
  }

  validateRadius(e){
    this.props.radius(e)
  }
  renderRadiusErrors(){
    if(this.props.formData.radius.error == null){
      return;
    }
    return (
      <div><p className="error">{this.props.formData.radius.error}</p></div>
    )
  }

  validateMinPrice(e){
    this.props.min(e)
  }
  renderMinErrors(){
    if(this.props.formData.min.error == null){
      return;
    }
    return (
      <div><p className="error">{this.props.formData.min.error}</p></div>
    )
  }

  validateMaxPrice(e){
    this.props.max(e)
  }
  renderMaxErrors(){
    if(this.props.formData.max.error == null){
      return;
    }
    return (
      <div><p className="error">{this.props.formData.max.error}</p></div>
    )
  }

  clickOpen(e){
    this.props.open(e)
  }

  validateForm(e){
    e.preventDefault()
    this.props.submit(e)
  }
  renderFormErrors(){
    if(this.props.formData.submissionError == null){
      return;
    }
    return (
      <div><p className="error">{this.props.formData.submissionError}</p></div>
    )
  }
};

export default UserForm;
