"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface OTPInputProps {
    length?: number
    onComplete: (otp: string) => void
    disabled?: boolean
}

export function OTPInput({ length = 6, onComplete, disabled = false }: OTPInputProps) {
    const [values, setValues] = useState<string[]>(Array(length).fill(""))
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {
        // Focus first input on mount
        inputRefs.current[0]?.focus()
    }, [])

    const handleChange = (index: number, value: string) => {
        // Only allow digits
        if (value && !/^\d$/.test(value)) return

        const newValues = [...values]
        newValues[index] = value
        setValues(newValues)

        // Move to next input if value entered
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus()
        }

        // Check if complete
        if (newValues.every(v => v !== "")) {
            onComplete(newValues.join(""))
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (!values[index] && index > 0) {
                // Move to previous input on backspace if current is empty
                inputRefs.current[index - 1]?.focus()
                const newValues = [...values]
                newValues[index - 1] = ""
                setValues(newValues)
            } else {
                const newValues = [...values]
                newValues[index] = ""
                setValues(newValues)
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus()
        } else if (e.key === "ArrowRight" && index < length - 1) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text").slice(0, length)
        if (!/^\d+$/.test(pastedData)) return

        const newValues = [...values]
        pastedData.split("").forEach((char, i) => {
            if (i < length) {
                newValues[i] = char
            }
        })
        setValues(newValues)

        // Focus last filled input or next empty one
        const lastFilledIndex = Math.min(pastedData.length, length) - 1
        inputRefs.current[lastFilledIndex]?.focus()

        if (newValues.every(v => v !== "")) {
            onComplete(newValues.join(""))
        }
    }

    return (
        <div className="flex gap-3 justify-center">
            {values.map((value, index) => (
                <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    disabled={disabled}
                    className={cn(
                        "w-12 h-14 text-center text-2xl font-semibold rounded-xl border-2",
                        "bg-white/80 backdrop-blur-sm transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        value ? "border-blue-500 bg-blue-50" : "border-gray-300",
                        "hover:border-blue-400"
                    )}
                />
            ))}
        </div>
    )
}
