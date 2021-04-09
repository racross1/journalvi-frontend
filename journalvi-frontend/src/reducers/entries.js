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


        case 'START_DELETING_ENTRY':
            return {
                ...state,
                entries: [...state.entries],
                requesting: true
            }

        case 'DELETE_ENTRY':
        //similar to how fetch was done, use dispatch to async delete on the backend and then delete entry from redux store.
            return {
                ...state,
                entries: state.entries.filter(entry => entry.id !== action.entryId),
                requesting: false 
            }

    
 


        default: 
            return state
    }

}