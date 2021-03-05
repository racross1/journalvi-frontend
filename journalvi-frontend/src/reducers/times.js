export default timeReducer
let initDate = new Date()

function timeReducer (state = {currentMonth: initDate}, action) {
    

    switch (action.type) {
        case 'CHANGE_MONTH':
            return {
                ...state,
                currentMonth: action.currentMonth
            }
        default: 
            return state
    }
}