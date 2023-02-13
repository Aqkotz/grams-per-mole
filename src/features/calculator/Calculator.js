import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCompound } from "./calculatorSlice";
import Compound, { get_mass } from "./Compound";

const total_mass = (compounds) => {

    let mass = 0
    let variance = 0

    for(let i = 0; i < compounds.length; i++){
        let compound = compounds[i]

        let atom = get_mass(compound.formula)
        if ("error" in atom){
            return {error: ""}
        }
        mass += atom.mass * compound.quantity
        variance += atom.variance * compound.quantity
    }

    return {mass: mass, variance: variance}
}

export function Calculator() {
    const compounds = useSelector(state => state.calculator.compounds);
    const dispatch = useDispatch();
    let atom = total_mass(compounds)

    return (
        <div className="calculator">
            {compounds.map((compound, i) => (
                <Compound key={compound.id} compound={compound}/>
            )
            )}
            <button
                onClick={()=>{
                    dispatch(addCompound())
                }}
            >
                +
            </button>
            {"error" in atom ?
            <div>
                {atom.error}
            </div>
            :
            <div>
                Total: {atom.mass} &plusmn; {atom.variance} g/mol
            </div>
            }
        </div>
    );
}