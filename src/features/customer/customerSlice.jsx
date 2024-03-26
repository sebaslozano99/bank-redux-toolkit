import { createSlice } from "@reduxjs/toolkit";

const initialStateCustomer = {
    fullName: "",
    nationalId: "",
}


const customerSlice = createSlice({
    name: "customer",
    initialState: initialStateCustomer,
    reducers: {
        createCustomer: {
            prepare(fullName, nationalId){
                return {
                    payload: { fullName, nationalId }
                }
            },
            reducer(state, action){
            state.fullName = action.payload.fullName;
            state.nationalId = action.payload.nationalId;
            }
        },
        updateCustomer(state, action){
            state.fullName = action.payload;
        }
    }

})


export default customerSlice.reducer;

export const { createCustomer, updateCustomer } = customerSlice.actions;