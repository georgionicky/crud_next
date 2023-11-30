// "use client"
import { axiosInstance } from '@/app/lib/axios'; // Import axiosInstance
import { useMutation } from 'react-query';


export const useDeleteProducts = ({onSuccess,onError}) => {
    return useMutation({
        mutationFn: async (id) => {
          const delProductResponse = await axiosInstance.delete(`/product/${id}`)
          
          return delProductResponse
        },
        onSuccess,
        onError
      
      })
}



