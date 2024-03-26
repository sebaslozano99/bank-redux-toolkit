import { createSlice } from "@reduxjs/toolkit"

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
}



const accountSlice = createSlice({
    name: "account",
    initialState: initialStateAccount,
    reducers: {
        convertingCurrency(state) {
            state.isLoading = true;
        },
        deposit(state, action){
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw(state, action){
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare(loanAmount, loanPurpose){
                return {
                    payload: {loanAmount, loanPurpose}
                }
            },
            reducer(state, action){
            if(state.loan > 0) return;
            state.loan = action.payload.loanAmount;
            state.loanPurpose = action.payload.loanPurpose;
            state.balance += action.payload.loanAmount;
        }},
        payLoan(state){
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        }
    }
})


export default accountSlice.reducer;

export const { withdraw, requestLoan, payLoan, convertingCurrency } = accountSlice.actions;



//OLD WAY OF DOING IT 

// function accountReducer(state = initialStateAccount, action){
//     switch(action.type){
//         case "account/convertingCurrency":
//             return {
//                 ...state,
//                 isLoading: true,
//             }
//         case "account/deposit":
//             return {
//                 ...state,
//                 isLoading: false,
//                 balance: state.balance + action.payload,
//             }
//         case "account/withdraw":
//             return {
//                 ...state,
//                 balance: state.balance - action.payload,
//             }
//         case "account/requestLoan":
//             return {
//                 ...state,
//                 balance: !state.loan > 0 ? state.balance + action.payload.loanAmount : 0,
//                 loan: !state.loan > 0 ? action.payload.loanAmount : 0,
//                 loanPurpose: !state.loan > 0 ? action.payload.loanPurpose : "",
//             }
//         case "account/payLoan":
//             return {
//                 ...state,
//                 balance: state.balance - state.loan,
//                 loan: 0,
//                 loanPurpose: "",
//             }
//         default: return state;
//     }
// }


export function deposit(amount,currency){
    if(currency === "USD") return {type: "account/deposit", payload: amount};
    return async function(dispatch){
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await res.json();

        dispatch({type: "account/deposit", payload: data.rates.USD})
    }
}


// function withdraw(amount){
//     return {type: "account/withdraw", payload: amount}
// }


// function requestLoan(loanAmount, loanPurpose){
//     return {type: "account/requestLoan", payload: {loanAmount, loanPurpose}}
// }


// function payLoan(){
//     return {type: "account/payLoan"}
// }


// function convertingCurrency(){
//     return {type: "account/convertingCurrency"}
// }