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

