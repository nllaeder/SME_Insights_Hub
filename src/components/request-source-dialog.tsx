"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import React from "react"

export function RequestSourceDialog() {
  const { toast } = useToast()
  const formRef = React.useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
        title: "Request Submitted",
        description: "Thank you for your feedback! We'll look into adding this data source.",
    })
    formRef.current?.reset()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Request a New Data Source</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} ref={formRef}>
          <DialogHeader>
            <DialogTitle>Request a New Data Source</DialogTitle>
            <DialogDescription>
              Don&apos;t see your service listed? Let us know what you&apos;re looking for.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="source-name" className="text-right">
                Name
              </Label>
              <Input
                id="source-name"
                placeholder="e.g., Salesforce"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="source-homepage" className="text-right">
                Homepage
              </Label>
              <Input
                id="source-homepage"
                placeholder="e.g., https://salesforce.com"
                className="col-span-3"
                type="url"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Submit Request</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
