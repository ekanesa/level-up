"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CheckCircle, XCircle, Clock, ChevronDown, Loader2 } from "lucide-react"
import { updateStatusAction } from "@/app/admin/(protected)/applicants/actions"

interface ApplicantStatusDropdownProps {
  applicationId: number
  currentStatus: string
}

export function ApplicantStatusDropdown({ applicationId, currentStatus }: ApplicantStatusDropdownProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusChange = async (status: "pending" | "approved" | "rejected") => {
    if (status === currentStatus) return

    setIsUpdating(true)
    const result = await updateStatusAction(applicationId, status)

    if (result?.error) {
      alert(result.error)
    } else {
      router.refresh()
    }
    setIsUpdating(false)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isUpdating}>
          {isUpdating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Status
              <ChevronDown className="ml-1 h-3 w-3" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleStatusChange("pending")} className="cursor-pointer">
          <Clock className="mr-2 h-4 w-4 text-amber-500" />
          Pending
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("approved")} className="cursor-pointer text-green-600">
          <CheckCircle className="mr-2 h-4 w-4" />
          Approve
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("rejected")} className="cursor-pointer text-destructive">
          <XCircle className="mr-2 h-4 w-4" />
          Reject
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
