import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// CREATE
const name = 'auth';
const initialState = {
    token: null,
    user: {},
    error: null
};
const reducers = {};
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// EXPORT
export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;


function createExtraActions() {
    return {
        login: login()
    };    

    function login() {
        return createAsyncThunk(
            `auth/login`,
            async ({ pin }, { rejectWithValue }) => await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (pin === '1234') {
                        resolve({
                            token: 'MY-SUPER-SECRET-JWT-TOKEN',
                            user: {
                                id: 1,
                                name: 'Dylan Spurgin'
                            },
                        })
                    } else {
                        reject(rejectWithValue({error: 'Invalid PIN'}))
                    }
                }, 500);
            })
        );
    }
}

function createExtraReducers() {
    return {
        ...login()
    };

    function login() {
        var { pending, fulfilled, rejected } = extraActions.login;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                // React Router DOM will navigate as needed based on state
            },
            [rejected]: (state, action) => {
                state.error = action.payload.error;
            }
        };
    }
}
