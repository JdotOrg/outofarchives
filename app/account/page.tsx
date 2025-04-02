"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { User, History, Heart, LogOut, Trash2, AlertTriangle, MapPin, Plus, Edit } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function AccountPage() {
  const { user, signOut, deleteAccount, resetPassword, addAddress, removeAddress, updateAddress } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [resetEmail, setResetEmail] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)
  const [showAddressDialog, setShowAddressDialog] = useState(false)
  const [editingAddress, setEditingAddress] = useState<any>(null)
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    city: "Dubai",
    postalCode: "",
  })

  useEffect(() => {
    if (!user) {
      router.push("/")
      return
    }

    setFirstName(user.firstName)
    setLastName(user.lastName)
    setEmail(user.email)
    setResetEmail(user.email)
  }, [user, router])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    try {
      // In a real app, this would be an API call to update the user profile
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirm password must match.",
        variant: "destructive",
      })
      return
    }

    setIsChangingPassword(true)

    try {
      // In a real app, this would be an API call to change the password
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")

      toast({
        title: "Password changed",
        description: "Your password has been changed successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsResettingPassword(true)

    try {
      await resetPassword(resetEmail)

      toast({
        title: "Password reset email sent",
        description: "Check your email for instructions to reset your password.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send password reset email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsResettingPassword(false)
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeletingAccount(true)
    try {
      await deleteAccount()

      toast({
        title: "Account deleted",
        description: "Your account has been deleted successfully.",
      })

      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeletingAccount(false)
    }
  }

  const handleSignOut = () => {
    signOut()
    router.push("/")
  }

  const handleAddressDialog = (address?: any) => {
    if (address) {
      // Edit existing address
      setEditingAddress(address)
      setNewAddress({
        name: address.name,
        address: address.address,
        city: address.city,
        postalCode: address.postalCode,
      })
    } else {
      // Add new address
      setEditingAddress(null)
      setNewAddress({
        name: "",
        address: "",
        city: "Dubai",
        postalCode: "",
      })
    }
    setShowAddressDialog(true)
  }

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingAddress) {
        // Update existing address
        const success = await updateAddress({
          id: editingAddress.id,
          name: newAddress.name,
          address: newAddress.address,
          city: newAddress.city,
          country: "United Arab Emirates",
          postalCode: newAddress.postalCode,
        })

        if (success) {
          toast({
            title: "Address updated",
            description: "Your address has been updated successfully.",
          })
        }
      } else {
        // Add new address
        const success = await addAddress({
          name: newAddress.name,
          address: newAddress.address,
          city: newAddress.city,
          country: "United Arab Emirates",
          postalCode: newAddress.postalCode,
        })

        if (success) {
          toast({
            title: "Address added",
            description: "Your new address has been added successfully.",
          })
        }
      }

      // Reset form and close dialog
      setShowAddressDialog(false)
      setEditingAddress(null)
      setNewAddress({
        name: "",
        address: "",
        city: "Dubai",
        postalCode: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save address. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteAddress = async (addressId: string) => {
    try {
      const success = await removeAddress(addressId)

      if (success) {
        toast({
          title: "Address removed",
          description: "The address has been removed successfully.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove address. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>My Account</CardTitle>
                <CardDescription>Manage your account settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <Button variant="ghost" className="justify-start rounded-none h-12 px-4" asChild>
                    <a href="#profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </a>
                  </Button>
                  <Button variant="ghost" className="justify-start rounded-none h-12 px-4" asChild>
                    <Link href="/account/orders" className="flex items-center">
                      <History className="mr-2 h-4 w-4" />
                      Orders
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start rounded-none h-12 px-4" asChild>
                    <Link href="/wishlist" className="flex items-center">
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start rounded-none h-12 px-4" asChild>
                    <a href="#addresses" className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      Addresses
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start rounded-none h-12 px-4 text-red-600"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-3/4">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <Button type="submit" className="bg-orange-600 hover:bg-orange-700" disabled={isUpdating}>
                        {isUpdating ? "Saving..." : "Save Changes"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleChangePassword} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>

                      <Button type="submit" className="bg-orange-600 hover:bg-orange-700" disabled={isChangingPassword}>
                        {isChangingPassword ? "Changing Password..." : "Change Password"}
                      </Button>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link" className="px-0">
                          Forgot Password?
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Reset Password</DialogTitle>
                          <DialogDescription>
                            Enter your email address and we'll send you a link to reset your password.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleResetPassword}>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="resetEmail">Email</Label>
                              <Input
                                id="resetEmail"
                                type="email"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" disabled={isResettingPassword}>
                              {isResettingPassword ? "Sending..." : "Send Reset Link"}
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-600 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Delete Account
                    </CardTitle>
                    <CardDescription>Permanently delete your account and all associated data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Once you delete your account, there is no going back. This action cannot be undone.
                    </p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" disabled={isDeletingAccount}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          {isDeletingAccount ? "Deleting Account..." : "Delete Account"}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove all your
                            data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                            Delete Account
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="addresses" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Saved Addresses</CardTitle>
                        <CardDescription>Manage your shipping addresses</CardDescription>
                      </div>
                      <Button onClick={() => handleAddressDialog()}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Address
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {user.addresses.length === 0 ? (
                      <div className="text-center py-8">
                        <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No addresses yet</h3>
                        <p className="text-muted-foreground mb-4">Add shipping addresses for faster checkout.</p>
                        <Button onClick={() => handleAddressDialog()}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Address
                        </Button>
                      </div>
                    ) : (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {user.addresses.map((address) => (
                          <Card key={address.id} className="relative">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-medium">{address.name}</h3>
                                <div className="flex gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-orange-600"
                                    onClick={() => handleAddressDialog(address)}
                                  >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit address</span>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-red-600"
                                    onClick={() => handleDeleteAddress(address.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete address</span>
                                  </Button>
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                <p>{address.address}</p>
                                <p>
                                  {address.city}, {address.postalCode}
                                </p>
                                <p>{address.country}</p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveAddress} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="addressName">Address Name</Label>
              <Input
                id="addressName"
                placeholder="Home, Work, etc."
                value={newAddress.name}
                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Street address, apartment, etc."
                value={newAddress.address}
                onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select value={newAddress.city} onValueChange={(value) => setNewAddress({ ...newAddress, city: value })}>
                <SelectTrigger id="city">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dubai">Dubai</SelectItem>
                  <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                  <SelectItem value="Sharjah">Sharjah</SelectItem>
                  <SelectItem value="Ajman">Ajman</SelectItem>
                  <SelectItem value="Ras Al Khaimah">Ras Al Khaimah</SelectItem>
                  <SelectItem value="Fujairah">Fujairah</SelectItem>
                  <SelectItem value="Umm Al Quwain">Umm Al Quwain</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={newAddress.postalCode}
                onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowAddressDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingAddress ? "Update Address" : "Save Address"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

