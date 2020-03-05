export const addConversations = convosArr => {
    return{type: 'USER_CONVOS', payload: convosArr }
}

export const updateNotif = (convoId, lastMessage) => {
    return { type: 'UPDATED', payload: {convoId, lastMessage}}
}

export const clearConvos = () => {
    return {type: 'CLEAR_CONVOS'}
}