export default userReducer
function userReducer(state = [], action) {
    
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


