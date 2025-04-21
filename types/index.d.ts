export type WorkspaceProps = {
    data: {
        subscription: {
            plan: "FREE" | "PRO"
        } | null
        WorkSpace: {
            id: string
            name: string
            type: "PUBLIC" | "PERSONAL"
        }[]
        members: {
            WorkSpace: {
                id: string
                name: string
                type: "PUBLIC" | "PERSONAL"
            }
        }[]
    }
}