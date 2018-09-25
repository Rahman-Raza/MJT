


var initialState = {
  data: [],
  url: "/api/comments",
  pollInterval: 2000
}
export function addForm(state, action) {
  console.log("got to addDForm in reducer");
   if(state === undefined) {
    return initialState;
  }
  var newState = state;

 switch(action.type) {
    case 'add_form':
      var newForm = state.data.concat([action.comment]);
      newState = Object.assign({}, state, {data: newForm});
      break;
    case 'set_comments':
      newState = Object.assign({}, state, {data: action.data})
      break;
  }
  return newState;
}