export default entryReducer
function entryReducer(state = [], action) {
    let index
    let entry

    switch (action.type) {
        case 'POPULATE_ENTRIES':
            return action.entries
        case 'ADD_ENTRY':
            //this is how it's done in quotes lab, but is it best practices?
            // approach in map state to props lab:
            // return {
            //     ...state,
            //     users: [...state.users, action.user]
            //   }
            return state.concat(action.entry)

        case 'CURRENT_ENTRY':
            index = state.findIndex(entry => entry.id === action.entryId)
            entry = state[index]
            return entry

        default: 
            return state
    }

}