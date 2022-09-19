import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// CREATE
const name = 'account';
const initialState = {
    status: 'idle',
    balance: 0,
    error: null
};

const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const reducers = {
    resetActionState(state) {
        state.status = 'idle'
    }
}
const slice = createSlice({ name, initialState, reducers, extraReducers });


// EXPORT
export const accountActions = { ...slice.actions, ...extraActions };
export const accountReducer = slice.reducer;

const SS_KEY_BALANCE = 'balance',
    SS_KEY_TOTAL_WITHDRAWN = 'withdrawn_today',
    STARTING_BALANCE = 4321.98,
    MAX_WITHDRAWAL = 300;

function createExtraActions() {
    return {
        getBalance: getBalance(),
        deposit: deposit(),
        withdraw: withdraw(),
    };

    function getBalance() {
        return createAsyncThunk(
            `${name}/getBalance`,
            async () => await new Promise((resolve) => {
                setTimeout(() => {
                    let currentBalance = sessionStorage.getItem(SS_KEY_BALANCE) || STARTING_BALANCE;
                    sessionStorage.setItem(SS_KEY_BALANCE, currentBalance)
                    resolve({
                        balance: parseFloat(currentBalance)
                    })
                }, 1500);
            })
        );
    }

    function deposit() {
        return createAsyncThunk(
            `${name}/deposit`,
            async ({ amount }) => await new Promise((resolve) => {
                setTimeout(() => {
                    let currentBalance = parseFloat(sessionStorage.getItem(SS_KEY_BALANCE)) || STARTING_BALANCE
                    let newBalance = currentBalance + amount
                    sessionStorage.setItem(SS_KEY_BALANCE, newBalance)
                    resolve({
                        balance: newBalance
                    })
                }, 1500);
            })
        );
    }

    function withdraw() {
        return createAsyncThunk(
            `${name}/withdraw`,
            async ({ amount }, { rejectWithValue }) => await new Promise((resolve, reject) => {
                setTimeout(() => {
                    let balance = parseFloat(sessionStorage.getItem(SS_KEY_BALANCE)) || STARTING_BALANCE;
                    let withdrawnToday = parseFloat(sessionStorage.getItem(SS_KEY_TOTAL_WITHDRAWN)) || 0;
                    if (withdrawnToday + amount > MAX_WITHDRAWAL) {
                        reject(rejectWithValue({error: 'Requested amount exceeds daily withdrawal limit.'}))
                    } else if (amount > balance) {
                        reject(rejectWithValue({error: 'Requested amount is greater than account balance.'}))
                    } else {
                        let newAmount = balance - amount
                        let newDailyAmount = withdrawnToday + amount
                        sessionStorage.setItem(SS_KEY_BALANCE, newAmount)
                        sessionStorage.setItem(SS_KEY_TOTAL_WITHDRAWN, newDailyAmount)
                        resolve({
                            balance: newAmount
                        })
                    }
                }, 1500);
            })
        );
    }
}

function createExtraReducers() {
    return {
        ...deposit(),
        ...getBalance(),
        ...withdraw(),
    }

    function deposit() {
        const { pending, fulfilled, rejected } = extraActions.deposit;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                state.balance = action.payload.balance;
                state.status = 'deposited';
            },
            [rejected]: (state, action) => {
                state.error = action.payload.error;
            }
        };
    }

    function getBalance() {
        const { pending, fulfilled, rejected } = extraActions.getBalance;
        return {
            [pending]: (state) => {
                state.status = 'loading';
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                state.balance = action.payload.balance;
                state.status = 'idle';
            },
            [rejected]: (state, action) => {
                state.error = action.payload.error;
                state.status = 'idle';
            }
        };
    }

    function withdraw() {
        const { pending, fulfilled, rejected } = extraActions.withdraw;
        return {
            [pending]: (state) => {
                state.status = 'loading';
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                state.balance = action.payload.balance;
                state.status = 'withdrawn';
            },
            [rejected]: (state, action) => {
                state.error = action.payload.error;
                state.status = 'error';
            }
        };
    }
}
