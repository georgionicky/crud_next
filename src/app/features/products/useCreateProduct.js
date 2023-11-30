import { axiosInstance } from "@/app/lib/axios";
import { useMutation } from 'react-query'

export const useCreateProduct = ({onSuccess,onError}) => {
    return useMutation({
        mutationFn: async (body) => {
          const productsResponse = await axiosInstance.post("/product", body)
    
          return productsResponse
        },
        onSuccess,
        onError
      })

}