import { Show } from "@clerk/nextjs";
import { ReactNode, Suspense } from "react";

export function SignedInStatus({children, status}: {children: ReactNode, status: string}) {
    return <Suspense>
        <Show when={status}>
            {children}
        </Show>
    </Suspense>
}