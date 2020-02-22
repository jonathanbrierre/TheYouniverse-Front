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
            let updatedPosts = state.topicPosts.map(post => ( action.payload.id === post.id ? {...post, content: action.payload.content} : post))

            return {...state, topicPosts: updatedPosts}
        case 'DELETE_POST':
            let filteredPosts = state.topicPosts.filter(post => post.id !== action.payload)
            return {...state, topicPosts: filteredPosts}
        
        case 'UNMOUNT':
            return{...state, topicPosts:[]}

        case 'ADD_LIKE':
            let likedPost = state.topicPosts.find(post => post.id === action.payload.postId)
            let newPostObj = {...likedPost}
            newPostObj.likes = [...newPostObj.likes, action.payload.likeObj ]
            let newTopicPosts = state.topicPosts.map(post=> {
                if(post.id === newPostObj.id){
                    return newPostObj
                }
                return post
            })
            return{...state, topicPosts: newTopicPosts}

        case 'UNLIKE':
            let unlikedPost = state.topicPosts.find(post => post.id === action.payload.postId)
            let novelPostObj = {...unlikedPost}
            novelPostObj.likes = novelPostObj.likes.filter(like=>like.id !== action.payload.likeId)
            let novelTopicPosts = state.topicPosts.map(post=> {
                if(post.id === novelPostObj.id){
                    return novelPostObj
                }
                return post
            })
            return {...state, topicPosts: novelTopicPosts}
        default: 
            return state
    }
}