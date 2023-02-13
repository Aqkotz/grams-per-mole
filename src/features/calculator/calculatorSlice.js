import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    compounds: [
        {
            id: 0,
            formula: "",
            quantity: 1,
        }
    ]
}

export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        addCompound: (state) => {

            let id = 0
            if (state.compounds.length > 0) {
                id = state.compounds[state.compounds.length - 1].id + 1
            }
            state.compounds.push({
                id: id,
                formula: "",
                quantity: 1,
            });
        },
        removeCompound: (state, action) => {
            let i = state.compounds.findIndex((compound)=> compound.id === action.payload)
            state.compounds.splice(i, 1);
        },
        updateCompoundFormula: (state, action) => {
            let i = state.compounds.findIndex((compound)=> compound.id === action.payload.id)
            state.compounds[i].formula = action.payload.formula;
        },
        updateCompoundQuantity: (state, action) => {

            let i = state.compounds.findIndex((compound)=> compound.id === action.payload.id)
            if (action.payload.quantity === ""){
                console.log("geos")
                state.compounds[i].quantity = 0
            } else {
                state.compounds[i].quantity = parseInt(action.payload.quantity);
            }
        }
    },
})

export const { addCompound, removeCompound, updateCompoundFormula, updateCompoundQuantity } = calculatorSlice.actions;

export default calculatorSlice.reducer;