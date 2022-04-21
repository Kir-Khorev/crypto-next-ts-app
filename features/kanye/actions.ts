import {  createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';

// This action is what we will call using the dispatch in order to trigger the API call.
export const getKanyeQuote = createAsyncThunk('kanye/kanyeQuote', async () => {
    const response = await axios.get('https://api.kanye.rest/');

    return response.data;
});