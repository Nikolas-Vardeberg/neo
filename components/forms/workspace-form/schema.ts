import { z } from "zod";

export const workspaceSchmea = z.object({
    name: z.string().min(1, { message: "Workspace name cannot be empty"}),
})