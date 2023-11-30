import { axiosInstance } from "@/app/lib/axios";
import { useMutation } from 'react-query'

export const useEditProduct = ({onSuccess,onError}) => {
    return useMutation({
        mutationFn: async (body) => {
          const productsResponse = await axiosInstance.put("/product", body)
    
          return productsResponse
        },
        onSuccess,
        onError
      })
}