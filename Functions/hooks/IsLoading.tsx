import { useState } from "react";

export function useLoading(initialState: boolean) {
    const [loading, setLoading] = useState<boolean>(initialState);

    return [loading, setLoading] as const;
}
