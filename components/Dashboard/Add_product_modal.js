import axios from "axios"
import { Profiler, useState } from "react"

export default function Add_product_modal({setActive}){
    const [product, setProduct] = useState({title: "", brand: "", category: "", price: "", description: "", imageURLHighRes: ""})
    const [error, setError] = useState({title: "", brand: "", category: "", price: "", description: "", image: ""})

    function handleChange(event){
        const {id, value} = event.target
        setProduct((prevProduct) => {return {...prevProduct, [id]: value}})
    }

    function giveError(fileInput){
        //checking if any field empty, if empty set error for that field
        Object.entries(product).map(([key, value]) => {
            if(value === ""){
                setError((prevError) => {return {...prevError, [key]: `- ${key} is empty -`}})
            }
            else{
                setError((prevError) => {return {...prevError, [key]: ""}})
            }
        })
        // checking if file uploaded or not
        if (fileInput.files.length === 0){
            setError((prevError) => {return {...prevError, ["image"]: "- image not uploaded -"}})
        }
        else{
            setError((prevError) => {return {...prevError, ["image"]: ""}})
        }
    }

    async function image_upload(fileInput){
        console.log("in image_upload function")
        const formData = new FormData()
        formData.append('image', fileInput.files[0])
        try{
            const res = await axios.post("/api/upload_image", formData, {
                headers: {"Content-Type": "multipart/form-data"}
            })
        }
        catch(error){
            console.log("error in uploading image: ")
            console.log(error)
        }
    }

    //setting path of the image of product
    function setImgPath(fileInput){
        let path = "./public/product_images/" + fileInput.files[0].name
        console.log("path: ",path)
        setProduct((prevProduct) => {return {...prevProduct, ["imageURLHighRes"]: path}})
    }

    async function handleSubmit(event){
        event.preventDefault()
        const fileInput = document.getElementById("image")
        giveError(fileInput)

        if(product.title !== "" && 
           product.brand !== "" && 
           product.category !== "" && 
           product.price !== "" &&
           product.description !== "" && 
           fileInput.files.length > 0
        ){
            setImgPath(fileInput)
            try{
                const res = await axios.post("/api/add_product", {product:product})
                // console.log("res in add_product: ", res)
                if (res.status === 200){
                    image_upload(fileInput)
                }
            }
            catch(error){
                console.log("error in uploading image: ")
                console.log(error)
            }
        }
    }

    return(
        <div className="w-full h-full backdrop-blur bg-black/50 fixed inset-0 flex justify-center items-center">
            <div className="border border-gray-300 w-2/5 bg-white h-fit p-7">
                <h1 className="font-extrabold font-figtree text-3xl text-center mb-5">Add Product</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="flex flex-col mb-3">
                        <label htmlFor="title" className="font-figtree font-semibold mb-1">Title</label>
                        <input value={product.title} onChange={handleChange} type="text" id="title" className="focus:outline-none focus:drop-shadow text-sm px-2 py-1 border border-gray-400 font-figtree"/>
                        {error.title !== "" && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.title}</p>}
                    </div>
                    <div className="flex flex-row w-full space-x-1.5">
                        <div className="flex flex-col mb-3 w-1/3">
                            <label htmlFor="brand" className="w-full font-figtree font-semibold mb-1">Brand</label>
                            <input value={product.brand} onChange={handleChange} type="text" id="brand" className="w-full focus:outline-none focus:drop-shadow text-sm px-2 py-1 border border-gray-400 font-figtree"/>
                            {error.brand !== "" && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.brand}</p>}
                        </div>
                        <div className="flex flex-col mb-3 w-1/3">
                            <label htmlFor="category" className="w-full font-figtree font-semibold mb-1">Category</label>
                            <input value={product.category} onChange={handleChange} type="text" id="category" className="w-full focus:outline-none focus:drop-shadow text-sm px-2 py-1 border border-gray-400 font-figtree"/>
                            {error.category !== "" && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.category}</p>}
                        </div>
                        <div className="flex flex-col mb-3 w-1/3">
                            <label htmlFor="price" className="w-full font-figtree font-semibold mb-1">Price</label>
                            <input value={product.price} onChange={handleChange} type="text" id="price" className="w-full focus:outline-none focus:drop-shadow text-sm px-2 py-1 border border-gray-400 font-figtree"/>
                            {error.price !== "" && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.price}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="description" className="font-figtree font-semibold mb-1">Description</label>
                        <textarea value={product.description} onChange={handleChange} id="description" rows="2" className="font-figtree resize-none focus:outline-none focus:drop-shadow text-sm px-2 py-1 border border-gray-400"></textarea>
                        {error.description !== "" && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.description}</p>}
                    </div>
                    <div className="flex flex-col mb-7">
                        <label htmlFor="image" className="font-figtree font-semibold mb-1">Image</label>
                        <label for="image" className="font-figtree file_btn text-sm active:outline-none active:drop-shadow border border-gray-400 px-2 py-1 cursor-pointer text-center">Choose File</label>
                        <input type="file" id="image" name="image" accept=".jpg, .png" className="text-sm focus:outline-none focus:drop-shadow hidden" />
                        {error.image !== "" && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.image}</p>}                       
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