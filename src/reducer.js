import { users } from "./mock";

export const reduder = (state, action) => {
    switch (action.type) {
        // hendling multiple inputes
        case 'GET_INPUT-VALUE':
            return { ...state, [action.payload.inputName]: action.payload.value };

        // delete
        case 'ON_DELETE':
            let filteredData = state.data.filter((value) => value.id !== action.payload.ids);
            return { ...state, data: filteredData };
        // search
        case 'ON_SEARCH':
            let searchedData = users.filter((value) => `${value[state.search]}`.toLowerCase().includes(action.payload.toLowerCase()));
            return { ...state, data: searchedData }
        //  dearch by category
        case 'ON_SELECT':
            return { ...state, search: action.payload }
        //  create new user
        case 'ON_CREATE':
            let newUser = [...state.data, {
                id: state.data.length + 1,
                name: state.name,
                status: state.status
            }]
            return { ...state, data: newUser }
        // updete
        case 'ON_UPDATE':
            return {
                ...state,
                select: action.payload.allData.id,
                name: action.payload.allData.name,
                status: action.payload.allData.status,
            };
        // save
        case 'ON_SAVE':
            let updetedUser = state.data.map((value) => value.id === state.select ? { ...value, name: state.name, status: state.status } : value);
            return {...state, data: updetedUser, select: null}
        // defoult
        default: return state
    }
}
