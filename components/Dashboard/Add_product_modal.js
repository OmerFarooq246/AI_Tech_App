import { Profiler, useState } from "react"

export default function Add_product_modal({setActive}){
    const [product, setProduct] = useState({title: "", brand: "", category: "", price: "", description: ""})
    const [error, setError] = useState({title: "", brand: "", category: "", price: "", description: ""})

    function handleChange(event){
        const {id, value} = event.target
        setProduct((prevProduct) => {return {...prevProduct, [id]: value}})
    }

    function giveError(){
        // if (product.title === ""){(prevError) => {return {...prevError, [title]: "- title is empty"}}}
        // else{(prevError) => {return {...prevError, [title]: ""}}}
        // if (product.brand === ""){(prevError) => {return {...prevError, [brand]: "- brand is empty"}}}
        // else{(prevError) => {return {...prevError, [title]: ""}}}
        // if (product.category === ""){(prevError) => {return {...prevError, [category]: "- category is empty"}}}
        // else{(prevError) => {return {...prevError, [title]: ""}}}
        // if (product.price === ""){(prevError) => {return {...prevError, [price]: "- price is empty"}}}
        // else{(prevError) => {return {...prevError, [title]: ""}}}
        // if (product.description === ""){(prevError) => {return {...prevError, [description]: "- description is empty"}}}
        // else{(prevError) => {return {...prevError, [title]: ""}}}

        //checking if any field empty, if empty set error for that field
        Object.entries(product).map(([key, value]) => {
            if(value === ""){
                setError((prevError) => {return {...prevError, [key]: `- ${key} is empty -`}})
            }
            else{
                setError((prevError) => {return {...prevError, [key]: ""}})
            }
        })

        // product.map((att) => {console.log(att)})
        // if (product.title === ""){error.title = "- title is empty"}
        // if (product.brand === ""){error.brand = "- brand is empty"}
        // if (product.category === ""){error.category = "- category is empty"}
        // if (product.price === ""){error.price = "- price is empty"}
        // if (product.description === ""){error.description = "- description is empty"}
    }

    function handleSubmit(event){
        event.preventDefault()
        giveError()
        if(product.title !== "" && 
           product.brand !== "" && 
           product.category !== "" && 
           product.price !== "" &&
           product.description !== ""
        ){
            console.log("good to go")
        }
    }

    return(
        <div className="w-full h-full backdrop-blur bg-black/50 fixed inset-0 flex justify-center items-center">
            <div className="border border-gray-300 w-1/3 bg-white h-fit p-7">
                <h1 className="font-extrabold font-figtree text-3xl text-center mb-5">Add Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="title" className="font-figtree font-semibold mb-1">Title</label>
                        <input value={product.title} onChange={handleChange} type="text" id="title" className="focus:outline-none focus:drop-shadow text-sm px-2 py-1 border border-gray-400 font-figtree"/>
                        {error.title !== "" && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.title}</p>}
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="brand" className="font-figtree font-semibold mb-1">Brand</label>
                        <input value={product.brand} onChange={handleChange} type="text" id="brand" className="focus:outline-none focus:drop-shadow text-sm px-2 py-1 border border-gray-400 font-figtree"/>
                        {error.brand !== "" && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.brand}</p>}
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="category" className="font-figtree font-semibold mb-1">Category</label>
                        <input value={product.category} onChange={handleChange} type="text" id="category" className="focus:outline-none focus:drop-shadow text-sm px-2 py-1 border border-gray-400 font-figtree"/>
                        {error.category !== "" && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.category}</p>}
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="price" className="font-figtree font-semibold mb-1">Price</label>
                        <input value={product.price} onChange={handleChange} type="text" id="price" className="focus:outline-none focus:drop-shadow text-sm px-2 py-1 border border-gray-400 font-figtree"/>
                        {error.price !== "" && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.price}</p>}
                    </div>
                    <div className="flex flex-col mb-7">
                        <label htmlFor="description" className="font-figtree font-semibold mb-1">Description</label>
                        <textarea value={product.description} onChange={handleChange} id="description" rows="3" className="font-figtree resize-none focus:outline-none focus:drop-shadow text-sm px-2 py-1 border border-gray-400"></textarea>
                        {error.description !== "" && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.description}</p>}
                    </div>
                    <div className="w-full flex space-x-2 mb-1">
                        <button type="submit" className={`hover:border-none hover:text-white hover:bg-black w-1/2 text-sm font-semibold px-2 py-1.5 border border-gray-400 font-figtree`}>Add Product</button>
                        <button type="button" onClick={() => {setActive(0)}} className={`hover:border-none hover:text-white hover:bg-black w-1/2 text-sm font-semibold px-2 py-1.5 border border-gray-400 font-figtree`}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}