"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { signIn } from "next-auth/react"

export default function Header() {
    return (
    <header className="flex justify-between items-center p-6 border-b bg-white">
      <div className="text-2xl font-bold text-gray-800">GeekFolio</div>

<Button 
  size="lg" 
  className="bg-white text-black border hover:border-4 transition-all duration-300 rounded-full"
  onClick={() => signIn("google", { callbackUrl: "/uploads" })}
>         
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" className="mr-2">           
    <path fill="#EA4335" d="M24 9.5c3.9 0 6.7 1.7 8.3 3.2l5.9-5.9C34.2 3.7 29.8 1.5 24 1.5 14.9 1.5 7.1 6.8 3.3 14.1l6.9 5.3C12.6 12.7 17.9 9.5 24 9.5z"/>           
    <path fill="#4285F4" d="M46.5 24c0-1.7-.2-3.4-.7-5H24v9.5h12.7c-.5 3-2.1 5.5-4.6 7.2l7.2 5.6C44.5 36.1 46.5 30.3 46.5 24z"/>           
    <path fill="#FBBC05" d="M10.3 28.3c-1.3-3.4-1.3-7.1 0-10.5L3.4 12.5C-1.2 18 0 25.4 3.4 31l6.9-5.3z"/>           
    <path fill="#34A853" d="M24 46.5c6.5 0 12.1-2.2 16.1-6L34 34.8c-2 1.4-4.5 2.3-10 2.3-6.1 0-11.4-3.2-13.1-7.9L3.3 33.9C7.1 41.2 14.9 46.5 24 46.5z"/>           
    <path fill="none" d="M0 0h48v48H0z"/>         
  </svg>         
  Sign in 
  <ChevronRight className="ml-2 h-4 w-4" />       
</Button>

    </header>
  )
}

