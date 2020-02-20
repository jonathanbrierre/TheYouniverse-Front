export const getAllTopics = (topicsArr)=> {
    return {type: 'POPULATE_TOPICS', payload: topicsArr}
}

export const getPostsForTopic = (postsArray) => {
    return { type: 'GENERATE_TOPIC_POSTS', payload: postsArray}
}

export const createPost = newPostObj => {
    return {type: 'NEW_POST', payload: newPostObj}
}


export const setHeading = (cappedSlug) => {
    return { type: 'SET_HEADING', payload: cappedSlug}
}

export const setTopic = topicObj => {
    let {id, name, slug} = topicObj
    return { type: 'SET_CHOSEN_TOPIC', payload: {id, name, slug}}
}