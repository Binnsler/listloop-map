import axios from 'axios';
const api_key = 'AIzaSyDifMaQemLMSdWxfvg45BPlIK499IST8BM';

function findRestaurants(data, dispatch){
  dispatch({
    type: 'FORM_DATA',
    payload: data
  })
}

export function submitWithCoordinates(data){
  return function(dispatch){
    const splitCoord = data.address.value.split(', ');
    const restaurantData = {
      lat: parseInt(splitCoord[0]),
      lng: parseInt(splitCoord[1]),
      radius: data.radius.value,
      minPriceLevel: data.min.value,
      maxPriceLevel: data.max.value,
      openNow: data.open
    }
    findRestaurants(restaurantData, dispatch)
  }
}

export function submitWithAddress(data){
  return function(dispatch){
    var splitAddress = data.address.value.replace(/\s/g, "+");
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${splitAddress}&key=${api_key}`)
      .then(response => {
        const googleData = response.data.results[0].geometry.location
        const restaurantData = {
          lat: googleData.lat,
          lng: googleData.lng,
          radius: data.radius.value,
          minPriceLevel: data.min.value,
          maxPriceLevel: data.max.value,
          openNow: data.open
        }
        findRestaurants(restaurantData, dispatch)
      })
  }
}

export function saveRestaurants(restaurants){
  return function(dispatch){
    dispatch({
      type: 'SAVE_RESTAURANTS',
      payload: restaurants
    })
  }
}
