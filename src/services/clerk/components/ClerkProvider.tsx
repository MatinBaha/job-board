"use client"

import { clientEnv } from "@/data/env/client";
import { useIsDarkMode } from "@/hooks/useIsDarkMode";
import { ClerkProvider as OriginalClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ReactNode, Suspense } from "react";

export function ClerkProvider({
    children,
}: {children: ReactNode}) {
    const isDarkMode = useIsDarkMode()
  return (
    <Suspense fallback={<p>Loading...</p>}>
        <OriginalClerkProvider
        appearance={isDarkMode ? {baseTheme: dark} : undefined}
        publishableKey={clientEnv.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        signInUrl={clientEnv.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
        signUpUrl={clientEnv.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
        signInFallbackRedirectUrl={clientEnv.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL}
        signUpFallbackRedirectUrl={clientEnv.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL}
        >
      {children}
    </OriginalClerkProvider>
    </Suspense>
  )
}