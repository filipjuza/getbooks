const API_URL = process.env.REACT_APP_API_URL;

export const addKitten = (id, name, slug) => ({
    type: 'ADD_KITTEN',
    id,
    name,
    slug
});

export const addHobby = (id, hobby) => ({
    type: 'ADD_HOBBY',
    kittenId: id,
    hobby
});

export const fetchKittens = () =>
    async function(dispatch) {
        const response = await fetch(`${API_URL}/category`);
        const data = await response.json();

        data.forEach(category => {
            dispatch(addKitten(category._id, category.name, category.slug));
        });
    };

export const postKitten = name =>
    async function(dispatch) {
        const response = await fetch(`${API_URL}/kittens`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                name
            })
        });
        const data = await response.json();

        dispatch(addKitten(data._id, data.name, data.hobbies));
    };

export const postHobby = (kittenId, hobby) =>
    async function(dispatch) {
        const response = await fetch(`${API_URL}/kittens/${kittenId}/hobbies`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                hobby
            })
        });
        const data = await response.json();

        dispatch(addHobby(data._id, hobby));
    };
