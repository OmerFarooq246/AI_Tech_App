import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import Product_view from './product_view'
import Topbar from './Topbar'

export default function Dashboard(){
    const [products, setProducts] = useState([])

    async function get_products(){
        try{
            const res = await axios.get("/api/get_products")
            console.log("product res: ", res.data)
            setProducts(res.data)
        }
        catch(error){
            console.log(error)
        }
    }

    async function get_reviews(){
        try{
            const res = await axios.get("/api/get_reviews")
            console.log("reviews res: ", res.data)
            setProducts(res.data)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        get_products()
    }, [])

    return(
        <div className='w-full px-10'>
            {/* <h1>Hello World</h1> */}
            <Topbar />
            {products.length > 0  && products.map((product, index) => {
                return <Product_view product={product} />
            })}
        </div>
    )
}