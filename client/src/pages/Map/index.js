import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index.js';


class GoogleMapElement extends React.Component {

  constructor(props){
    super(props);
    this.state = {restaurants: ''}
  }

  render(){
    return(
      <div>
        <div className="col-1-3">
          {this.renderRestaurantData()}
        </div>
        <div id="map" className="col-2-3">MAP</div>
      </div>
    );
  }


  renderRestaurantData(){
    if(this.state.restaurants !== ''){
      return(
        <div>
          <h1>Restaurant Data</h1>
          <div className="restaurant-container">
            <ul className="restaurant-data">
              {this.state.restaurants.map(this.renderRestaurant.bind(this))}
            </ul>
          </div>
        </div>
      );
    }
  };

  renderRestaurant(restaurantData, key){
    console.log(restaurantData)
    return (
      <li key={key}>
        <h3>{restaurantData.name}</h3>
        <p>Rating: {restaurantData.rating}</p>
        <p>Price Level: {restaurantData.price_level}/5</p>
      </li>
    );
  }

  setResults(results){
    this.setState({restaurants: results})
  }

  componentDidMount(){
      var map;
      var infowindow;

      var location = {lat: this.props.data.lat, lng: this.props.data.lng};

      map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 12
      });

      var that = this;

      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: location,
        radius: this.props.data.radius,
        type: ['restaurant']
      }, callback);


      function callback(results, status) {
        that.setResults(results)
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }
  }
};

function mapStateToProps(state){
  return {data: state.form.data}
}

export default connect(mapStateToProps, actions)(GoogleMapElement)
