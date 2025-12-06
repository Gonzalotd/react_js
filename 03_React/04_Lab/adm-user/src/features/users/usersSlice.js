import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRandomUser = createAsyncThunk(
    'users/fetchRandomUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://randomuser.me/api/');
            if (!response.ok) {
                throw new Error('Error al obtener el usuario');
            }
            const data = await response.json();
            const user = data.results[0];

            return {
                id: user.login.uuid,
                firstName: user.name.first,
                lastName: user.name.last,
                picture: user.picture.thumbnail
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        error: null,
        selectedUserId: null,
    },
    reducers: {
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
            if (state.selectedUserId === action.payload) {
                state.selectedUserId = null;
            }
        },
        selectUser: (state, action) => {
            state.selectedUserId = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRandomUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRandomUser.fulfilled, (state, action) => {
                state.loading = false;
                const userExists = state.users.some(user => user.id === action.payload.id);
                if (!userExists) {
                    state.users.push(action.payload);
                } else {
                    state.error = 'El usuario existe en la lista.';
                }
            })
            .addCase(fetchRandomUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'No pudimos obtener al usuario';
            })
    }
});

export const { removeUser, selectUser, clearError } = usersSlice.actions;
export default usersSlice.reducer;