"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SignInForm } from "@/components/auth/sign-in-form"
import { SignUpForm } from "@/components/auth/sign-up-form"

interface SignInDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultTab?: string
  redirectUrl?: string
}

export function SignInDialog({ open, onOpenChange, defaultTab = "signin", redirectUrl }: SignInDialogProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultTab)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {activeTab === "signin" ? "Welcome Back" : "Create Account"}
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue={defaultTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <SignInForm onSuccess={() => onOpenChange(false)} redirectUrl={redirectUrl} />
          </TabsContent>
          <TabsContent value="signup">
            <SignUpForm onSuccess={() => onOpenChange(false)} redirectUrl={redirectUrl} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

