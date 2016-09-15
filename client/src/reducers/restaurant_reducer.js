export default function(state = {restaurants: {}}, action){
  switch(action.type){
    case 'SAVE_RESTAURANTS':
      console.log('restaurant reducer')
      console.log(action.payload)
      return {...state, data: action.payload}
  }

  return state;
}
