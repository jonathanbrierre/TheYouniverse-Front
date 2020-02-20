export const getAllTopics = (topicsArr)=> {
    return {type: 'POPULATE_TOPICS', payload: topicsArr}
}

export const getPostsForTopic = (postsArray) => {
    return { type: 'GENERATE_TOPIC_POSTS', payload: postsArray}
}