"use client"

import { useToast } from "@/hooks/use-toast"

export default function DestructiveToast() {
  const { toast } = useToast()

  return (
    
      toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please check your credentials",
          // action: <ToastAction altText="Try again">Try again</ToastAction>,
        }) 
  )
}
