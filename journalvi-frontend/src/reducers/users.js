export default userReducer
function userReducer(state = [], action) {
    // let userData
    
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                userData: action.user
            }
        case 'CLEAR_USER':
            return {
                ...state,
                userData: []
            }
        default: 
            return state
    }
}



// export default (state = [], action) => {
//     let index;
//     let quote;
  
//     switch (action.type) {
//       case 'ADD_QUOTE':
//         return state.concat(action.quote);
  
//       case 'REMOVE_QUOTE':
//       return state.filter(quote => quote.id !== action.quoteId);
  
//       case 'UPVOTE_QUOTE':
//         index = state.findIndex(quote => quote.id === action.quoteId);
//         quote = state[index];
//         return [
//                  ...state.slice(0, index),
//                  Object.assign({}, quote, { votes: quote.votes += 1 }),
//                  ...state.slice(index + 1)
//                ];
  
//       case 'DOWNVOTE_QUOTE':
//         index = state.findIndex(quote => quote.id === action.quoteId);
//         quote = state[index];
//         if (quote.votes > 0) {
//                    return [
//                      ...state.slice(0, index),
//                      Object.assign({}, quote, { votes: quote.votes -= 1 }),
//                      ...state.slice(index + 1)
//                    ];
//                  }
//                  return state;
  
//                default:
//                  return state;
//              }
//            }
  