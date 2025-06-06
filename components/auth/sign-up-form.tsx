"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface SignUpFormProps {
  onSuccess?: () => void
  redirectUrl?: string
}

export function SignUpForm({ onSuccess, redirectUrl }: SignUpFormProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signUp, googleAuth } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault()
    setIsLoading(true)

    try {
      const success = await signUp(email, password, firstName, lastName)

      if (success) {
        toast({
          title: "Account created",
          description: "Your account has been created successfully.",
        })

        if (onSuccess) {
          onSuccess()
        }

        if (redirectUrl) {
          router.push(redirectUrl)
        }
      } else {
        toast({
          title: "Sign up failed",
          description: "An error occurred while creating your account. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault()
    setIsLoading(true)

    try {
      const success = await googleAuth()

      if (success) {
        toast({
          title: "Account created",
          description: "Your account has been created successfully with Google.",
        })

        if (onSuccess) {
          onSuccess()
        }

        if (redirectUrl) {
          router.push(redirectUrl)
        }
      } else {
        toast({
          title: "Sign up failed",
          description: "Google authentication failed. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 py-2 pb-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="hello@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" required />
          <Label htmlFor="terms" className="text-sm font-normal">
            I agree to the{" "}
            <Link href="/terms" className="text-orange-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-orange-600 hover:underline">
              Privacy Policy
            </Link>
          </Label>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <Button variant="outline" type="button" className="w-full" onClick={handleGoogleSignUp} disabled={isLoading}>
                <div className="w-4 h-4 mr-2 relative">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
          >
            <g>
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </g>
          </svg>
        </div>
        Google
      </Button>
    </div>
  )
}

