import React from "react";
import { useDispatch } from "react-redux";
import { updateCompoundFormula, updateCompoundQuantity, removeCompound } from "./calculatorSlice";
import pt_data from "../../pt_table.json";

function Compound(props) {

    const dispatch = useDispatch()

    let mass = get_mass(props.compound.formula)

    return(
        <div className="outerCompound">
        <div className="compound">
            <input
                value = {props.compound.formula.toString()}
                

                onChange = {(e) => {

                    dispatch(updateCompoundFormula({id: props.compound.id, formula: e.target.value}))

                }}
                placeholder = "formula"
            />
            <input
                value = {props.compound.quantity}

                onChange = {(e) => {
                    dispatch(updateCompoundQuantity({id: props.compound.id, quantity: e.target.value}))
                }}
                placeholder = "quantity"
            />
            <div>
                {"error" in mass ?
                    <div>
                        {mass.error}
                    </div>
                    :
                    <div>
                        {mass.mass} &plusmn; {mass.variance} g/mol
                    </div>
                }
            </div>
            <button
            onClick={() => {
                dispatch(removeCompound(props.compound.id))
            }}
            >
                -
            </button>
        </div>
        </div>
    )
}

export const get_mass = (formula) => {
        
    let mass = 0
    let variance = 0

    for (let i = 0; i < formula.length; i++) {
        let symbol = formula[i];
        let num = 0
        let atom = null

        if (symbol === "(") {
            let idx = -1
            for(let j = formula.length - 1; j >= 0; j--){
                if (formula[j] === ")" && idx === -1){
                    console.log("agg")
                    idx = j
                }
            }
            if (idx !== -1) {
                console.log(formula.slice(i+1,idx))
                atom = get_mass(formula.slice(i+1,idx))
                console.log(atom)
                i = idx
            } else {
                return {error: "Expected \")\""}
            }
        } else {
            if (!(/[A-Z]/.test(formula[i]))){
                if (formula[i] === ")"){
                    return {error: "Expected \"(\""}
                }
                return {error: "Symbol \"" + formula[i] + "\" not found"}
            }
            if (i !== formula.length - 1 && /[a-z]/.test(formula[i + 1])){
                symbol = symbol + formula[i + 1]
                i++
            }
            let element = pt_data.find(e => e.symbol === symbol)
            console.log(element)
            if (element !== undefined && element !== null) {
                atom = {
                    mass: element["weight"],
                    variance: element["weight_variance"]
                }
            } else {
                return {error: "Symbol \"" + symbol + "\" not found"}
            }
        }
        
        while (i !== formula.length - 1 && /[0-9]/.test(formula[i + 1])){
            num *= 10
            num += parseInt(formula[i + 1])
            i++
        }

        if (num < 1) {
            num = 1
        }

        if("error" in atom) {
            return atom
        } else {
            mass += atom.mass * num
            variance += atom.variance * num
        }
    }

    return({mass: mass, variance: variance})
};

export default Compound;