import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];

const countersSlice = createSlice( {
    name: 'counters',
    initialState,
    reducers: {
        addCounter: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare() {
                return {
                    payload: {
                        id: nanoid(),
                        value: 0,
                    }
                }
            },            
        },
        removeCounter(state, action) {
            const index = state.findIndex(counter => counter.id === action.payload);
            if (index !== -1) {
                state.splice(index,1);
            }
        },
        increment(state, action) {
            const counter = state.find(counter => counter.id === action.payload);
            if ( counter ) {
                counter.value += 1;
            }
        },
        decrement(state, action) {
            const counter = state.find(counter => counter.id === action.payload);
            if ( counter) {
                counter.value -= 1;
            }
        },
    },
})

export const { addCounter, removeCounter, increment, decrement } = countersSlice.actions;
export default countersSlice.reducer;