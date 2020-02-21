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
            return {...state, topicPosts: [...state.topicPosts, ...action.payload]}

        case 'SET_CHOSEN_TOPIC':
            return {...state, selectedTopic: action.payload}
        case 'SET_HEADING':

            return {...state, heading: action.payload}
        case 'NEW_POST':

            return {...state, topicPosts: [action.payload, ...state.topicPosts]}
        case 'UPDATE_POST':
            console.log('triggered')
            console.log(action.payload)
            let updatedPosts = state.topicPosts.map(post => ( action.payload.id === post.id ? {...post, content: action.payload.content} : post))

            return {...state, topicPosts: updatedPosts}
        case 'DELETE_POST':
            let filteredPosts = state.topicPosts.filter(post => post.id !== action.payload)
            return {...state, topicPosts: filteredPosts}
        
        case 'UNMOUNT':

            return{...state, topicPosts:[]}

        default: 
            return state
    }
}