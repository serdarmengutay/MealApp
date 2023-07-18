import { createSlice } from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        IDs: []
    },
    reducers: {
        addFavorite: (state, action) => {
            state.IDs.push(action.payload.id);
        },
        removeFavorite: (state, action) => {
            state.IDs.splice(state.IDs.indexOf(action.payload.id), 1)
        }
    }
})

export const addFavorite = favoritesSlice.actions.addFavorite;
export const removeFavorite = favoritesSlice.actions.removeFavorite;
export default favoritesSlice.reducer;