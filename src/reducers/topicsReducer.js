export default function topicsManager(state={
    topics: [],
    topicPosts: []
},action){
    switch(action.type){
        case 'POPULATE_TOPICS':
            return {...state, topics: action.payload}
        case 'GENERATE_TOPIC_POSTS':
            return {...state, topicPosts: action.payload}
        default: 
            return state
    }
}