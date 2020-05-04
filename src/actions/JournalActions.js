export const userEntries = (entries) => {
    return{
        type: 'SHOW_ENTRIES',
        payload: entries
    }
}

export const newEntry = (entry) => {
    return {
        type: 'NEW_ENTRY',
        payload: entry
    }
}

export const deleteEntry = (id) => {
    return {
        type: 'DELETE_ENTRY',
        payload: id
    }
}