// "use client"
import { axiosInstance } from '@/app/lib/axios'; // Import axiosInstance
import { useQuery } from 'react-query';


export const useFetchProducts = () => {
    // ^ Menyimpan data dari response GET products


   // ! DENGAN react-query
   return useQuery({
    queryFn: async () => {
        const productsResponse = await axiosInstance.get("/product")
        return productsResponse['data'][0]["payload"]

    }
})


    // ! TANPA react-query
    // const [products, setProducts] = useState([])
    // const [loading, setLoading] = useState(false)
    // const fetchProducts = async () => {
    //     try {
    //         const productsResponse = await axiosInstance.get("/product")
    //         setProducts(productsResponse['data'][0]["payload"])
    //         setLoading(false)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(()=>{
    //     fetchProducts()
    // },[])
 
}



