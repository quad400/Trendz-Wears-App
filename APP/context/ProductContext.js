import { createContext, useState } from "react";

export const ProductContext = createContext()

export default function ProductProvider({ children }){

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    return (
        <ProductContext.Provider
            value={{
                products,
                setProducts,
                loading,
                setLoading,
                message,
                setMessage
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}