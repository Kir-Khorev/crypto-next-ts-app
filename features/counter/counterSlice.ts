// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../../store";

// // declare type of our state

// export type CounterState = {
//     value: number;
// };

// const initialState: CounterState = {
//     value: 0,
// };

// export const counterSlice = createSlice({
//     name: 'counter',
//     initialState,
//     // 
//     reducers: {
//         increment: state => {
//             state.value++;
//         },
//         decrement: state => {
//             state.value--
//         },
//         // 'The increment by amount' action here, has one job and that is to take whatever value is passed to it and add that to state.value. 
//         // The PayloadAction type here is used to declare the contents of `action.payload`
//         incrementByAmount: (state, action: PayloadAction<number>) => {
//             state.value += action.payload;
//         }
//     }
// })

// // Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
// export const {
//     increment,
//     decrement,
//     incrementByAmount,
// } = counterSlice.actions;

// // calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
// export const selectCount = (state: RootState) => state.counter.value;

// // exporting the reducer here, as we need to add this to the store
// export default counterSlice.reducer;