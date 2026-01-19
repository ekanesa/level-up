"use client"

import { useRef, useTransition } from "react"
import { useRouter } from "next/navigation"
import { updateInquiryStatus } from "./action"

export default function StatusDropdown({
  id,
  status,
}: {
  id: number
  status: string
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await updateInquiryStatus(formData)
        startTransition(() => router.refresh()) // ✅ langsung refresh data
      }}
      className="inline"
    >
      <input type="hidden" name="id" value={id} />

      <select
        name="status"
        defaultValue={status}
        disabled={isPending}
        onChange={() => formRef.current?.requestSubmit()}
        className="rounded-md border px-2 py-1 text-xs bg-background disabled:opacity-60"
      >
        <option value="new">New</option>
        <option value="read">Read</option>
        <option value="followed">Followed Up</option>
        <option value="done">Done</option>
      </select>
    </form>
  )
}
