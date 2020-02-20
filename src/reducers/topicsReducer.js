export default function topicsManager(state={
    topics: [],
    selectedTopic: {},
    topicPosts: [],
    heading: ''
},action){
    switch(action.type){
        case 'POPULATE_TOPICS':
            return {...state, topics: action.payload}
        case 'GENERATE_TOPIC_POSTS':
            return {...state, topicPosts: action.payload.reverse()}
        case 'SET_CHOSEN_TOPIC':
            return {...state, selectedTopic: action.payload}
        case 'SET_HEADING':
            return {...state, heading: action.payload}
        case 'NEW_POST':
            return {...state, topicPosts: [action.payload, ...state.topicPosts]}
        default: 
            return state
    }
}