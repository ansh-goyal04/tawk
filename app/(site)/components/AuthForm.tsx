"use client";

import {signIn} from "next-auth/react";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import axios from "axios";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import SideBg from "./sideBg";
import { useCallback, useState } from "react";

type Variant = "LOGIN" | "REGISTER";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  name: z.string().optional(), // Used only in REGISTER mode
});

export function AuthCard() {
  // Use a single instance of useForm
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" ,name:""},
  });

  const { toast } = useToast()
  
 function DestructiveToast({variant,desc,title}:{
  variant:'default'|'destructive',
  desc:String,
  title?:string
 }) {

  return (
    
      toast({
          variant: variant,
          title: title? title:"Uh oh! Something went wrong.",
          description: desc,
          // action: <ToastAction altText="Try again">Try again</ToastAction>,
        })   
  )
}

  const {register,handleSubmit}=useForm<FieldValues>({
    defaultValues:{
      name:"",
      email:"",
      password:""
    }
  })
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [loading, setLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    if (variant === "LOGIN") {
      // Handle login
      console.log("Login data:", data);
      signIn("credentials",{
        ...data,
        redirect:false
      })
      .then((callback)=>{
        if(callback?.error){
          DestructiveToast({variant:"destructive",desc:"Please verify your login crdentials"})
        }
        if(callback?.ok && !callback.error){
          DestructiveToast({variant:"default",desc:"Login sucessfull",title:"Welcome back"})
        }
      })
      .finally(()=> setLoading(false))
    } 
    else {
      // Handle registration
      console.log("Register data:", data);
      axios
        .post("/api/register", data)
        .then((res) => console.log("Register successful", res))
        .catch(()=> DestructiveToast({variant:"destructive",desc:"Please check your credentials"}))      
        .finally(() => setLoading(false));
    }
  };

  const SocialLogin=() =>{
    setLoading(true);
    signIn("google",{
      redirect:false
    })
    .then((callback)=>{
      if(callback?.error){
        DestructiveToast({variant:"destructive",desc:"Please verify your login crdentials"})
      }
      if(callback?.ok && !callback.error){
        DestructiveToast({variant:"default",desc:"Login sucessfull",title:"Welcome back"})
      }
    })
    .finally(()=> setLoading(false))
  }
  return (
    <div className="flex h-screen">
      {/* Left: Sign-in/Register Form */}
      <div className="sm:w-1/2 sm:flex items-center justify-center p-8 mx-auto">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {variant === "LOGIN" ? "Welcome Back" : "Create an Account"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={()=> SocialLogin()}>
                {/* Apple Icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                  <path
                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                    fill="currentColor"
                  />
                </svg>
                Login with Apple
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2"onClick={()=> SocialLogin()}>
                {/* Google Icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Login with Google
              </Button>
            </div>
            <div className="relative text-center mt-6 text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
            <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              {variant === "REGISTER" && (
                <div className="grid gap-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John Doe" {...register("name")} />
                  </FormControl>
                </div>
              )}
              <div className="grid gap-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="example@gmail.com" {...register("email")} />
                </FormControl>
              </div>
              <div className="grid gap-1">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...register("password")} />
                </FormControl>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {variant === "LOGIN" ? "Login" : "Register"}
              </Button>
              <div className="relative text-center mt-6 text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  {variant === "LOGIN" ? "New to Tawk? " : "Already have an account? "}
                  <button type="button" className="underline font-bold" onClick={toggleVariant}>
                    {variant === "LOGIN" ? "Create an account" : "Login"}
                  </button>
                </span>
              </div>
            </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      {/* Right: Side Background for larger screens */}
      <div className="sm:w-1/2 hidden sm:block">
        <SideBg />
      </div>
    </div>
  );
}


//  function DestructiveToast() {

//   return (
    
//       toast({
//           variant: "destructive",
//           title: "Uh oh! Something went wrong.",
//           description: "Please check your credentials",
//           action: <ToastAction altText="Try again">Try again</ToastAction>,
//         })   
//   )
// }
