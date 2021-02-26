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

