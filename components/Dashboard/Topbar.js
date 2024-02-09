import Add_product_modal from "./Add_product_modal"
import { useState } from "react"

export default function Topbar(){
    const [active, setActive] = useState(0) //if active = 1, modal shown

    return(
        <div className="flex flex-row justify-end border border-gray-500 w-full mt-10">
            <button type="button" onClick={() => {setActive(1)}} className={`text-sm font-semibold px-2 py-1.5 border border-gray-400 font-figtree`}>Add Product</button>
            {active === 1 && <Add_product_modal setActive={setActive}/>}
        </div>
    )
}