"use client"
// Import necessary dependencies
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a new instance of QueryClient
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false
    }
  }
});

// Define the RootLayout component
export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </QueryClientProvider>
  );
}
