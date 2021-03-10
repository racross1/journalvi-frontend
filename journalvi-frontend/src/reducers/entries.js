export default entryReducer
function entryReducer(state = { entries: [], requesting: false }, action) {
    let index
    let entry

    switch (action.type) {
        case 'START_ADDING_ENTRIES_REQUEST':
            return {
                ...state,
                entries: [...state.entries],
                requesting: true
            }

        case 'ADD_ENTRIES':
            return {
                ...state,
            entries: action.entries,
            requesting: false
            }

        case 'ADD_ENTRY':
            return {
                ...state, 
                entries: [...state.entries, action.entry]
            }


        default: 
            return state
    }

}