// AuthPage.tsx

"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { SignupForm } from "@/components/signup-form"
import { Button } from "@/components/ui/button"

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login")

  const switchToLogin = () => setMode("login")

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
      <div className="w-full max-w-md space-y-4">
        {mode === "login" ? (
          <LoginForm />
        ) : (
          <SignupForm onSuccess={switchToLogin} />
        )}

        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() =>
              setMode(mode === "login" ? "signup" : "login")
            }
          >
            {mode === "login"
              ? "Don’t have an account? Sign up"
              : "Already have an account? Login"}
          </Button>
        </div>
      </div>
    </div>
  )
}
