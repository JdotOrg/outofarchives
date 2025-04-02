"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SignInForm } from "@/components/auth/sign-in-form"
import { SignUpForm } from "@/components/auth/sign-up-form"
import { useAuth } from "@/contexts/auth-context"
import { ShoppingBag, User } from "lucide-react"

interface CheckoutPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onContinueAsGuest: () => void
}

export function CheckoutPopup({ open, onOpenChange, onContinueAsGuest }: CheckoutPopupProps) {
  const [activeTab, setActiveTab] = useState<string>("signin")
  const { user } = useAuth()
  const router = useRouter()

  // Use useEffect to handle the user already being logged in
  useEffect(() => {
    if (open && user) {
      // Only proceed to guest checkout if the popup is open and user exists
      onOpenChange(false)
      onContinueAsGuest()
    }
  }, [open, user, onOpenChange, onContinueAsGuest])

  const handleContinueAsGuest = () => {
    onOpenChange(false)
    onContinueAsGuest()
  }

  const handleAuthSuccess = () => {
    onOpenChange(false)
    onContinueAsGuest()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-center text-xl font-bold">Checkout Options</DialogTitle>
          <DialogDescription className="text-center text-sm">
            Sign in for a faster checkout experience
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 p-6">
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <User className="h-4 w-4 mr-2 text-orange-600" />
              <h3 className="font-medium text-sm">Sign in or create an account</h3>
            </div>
            <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <SignInForm onSuccess={handleAuthSuccess} />
              </TabsContent>
              <TabsContent value="signup">
                <SignUpForm onSuccess={handleAuthSuccess} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button
            onClick={handleContinueAsGuest}
            className="w-full bg-orange-600 hover:bg-orange-700 flex items-center justify-center"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue as Guest
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

