export default function(state = {data: {}}, action){
  switch(action.type){
    case 'FORM_DATA':
      console.log('form data reducer')
      console.log(action.payload)
      return {...state, data: action.payload}
  }

  return state;
}
