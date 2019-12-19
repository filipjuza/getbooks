import { combineReducers } from 'redux';

function kittens(state = [], action) {
    switch (action.type) {
        // TODO: Implement reducers
        case 'ADD_KITTEN': {
            return [...state, { _id: action.id, name: action.name, slug: action.slug }];
        }
        case 'ADD_HOBBY': {
            return state.map(kitten =>
                kitten._id === action.kittenId
                    ? {
                          ...kitten,
                          hobbies: [...kitten.hobbies, action.hobby]
                      }
                    : kitten
            );
        }
        default: {
            return state;
        }
    }
}

export default combineReducers({
    kittens
});
