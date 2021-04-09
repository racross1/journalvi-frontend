export const addEntry = entry => {
    return {
        type: 'ADD_ENTRY',
        entry
    }
}

export const populateEntries = entries => {
    return {
        type: 'POPULATE_ENTRIES',
        entries
    }
}

export function deleteEntry (entryId) {
    return (dispatch) => {
        let token = sessionStorage.getItem('token')
        dispatch({ type: 'START_DELETING_ENTRY' });
        fetch(`http://127.0.0.1:3000/entries/${entryId}`, {
            method: "DELETE",
            headers: {
                Authorization: `bearer ${token}`,           
            },
        })
        .then(resp => resp.json())
        .then(() => dispatch({ type: 'DELETE_ENTRY', entryId }));
        
      };
}

export function fetchEntries(){

    return (dispatch) => {
        let token = sessionStorage.getItem('token')
        dispatch({ type: 'START_ADDING_ENTRIES_REQUEST' });
        fetch('http://127.0.0.1:3000/entries', {
        method: "GET",
        headers: {
          Authorization: `bearer ${token}`,
        }
        })
        .then(resp => resp.json())
        .then(entries => dispatch({ type: 'ADD_ENTRIES', entries }));
        
      };
    } 

