import { createReducer } from '@reduxjs/toolkit';
import build from 'next/dist/build';
import { getKanyeQuote } from './actions';

// here we are typing the types for the state
export type KanyeState = {
    data: { quote: string };
    pending: boolean;
    error: boolean;
};

const initialState: KanyeState = {
    data: { quote: 'click that button' },
    pending: false,
    error: false,
};

export const kanyeReducer = createReducer(initialState, builder => {
    builder
        .addCase(getKanyeQuote.pending, state => {
            state.pending = true;
        })
        .addCase(getKanyeQuote.fulfilled, (state, { payload }) => {
            // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
            state.pending = false;
            state.data = payload;
        })
        .addCase(getKanyeQuote.rejected, state => {
            state.pending = false;
            state.error = true;
        })
});
