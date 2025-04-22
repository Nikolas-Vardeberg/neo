"use server"

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const verifyAccessToWorkspace = async (workspace: string) => {
    try {
        const user = await currentUser();
        if (!user) {
            return { status: 403 }
        }

        const isUserInWorkspace = await client.workSpace.findUnique({
            where: {
                id: workspace,
                OR: [
                    {
                        User: {
                            clerkid: user.id
                        }
                    },
                    {
                        members: {
                            every: {
                                User: {
                                    clerkid: user.id,
                                }
                            }
                        }
                    }
                ]
            }
        })

        return {
            status: 200,
            data: { workspace: isUserInWorkspace }
        }
    } catch (error) {
        return {
            status: 403,
            data: { workspace: null }
        }
    }
}

export const getWorkspaceFolders = async (workspaceId: string) => {
    try {
        const isFolders = await client.folder.findMany({
            where: {
                workspaceId,
            },
            include: {
                _count: {
                    select: {
                        videos: true,
                    }
                }
            }
        })

        if (isFolders && isFolders.length > 0) {
            return { status: 200, data: isFolders }
        }

        return { status: 403, data: []}
    } catch (error) {
        return { status: 403, data: []}
    }
}

export const getAllUserVideos = async (workspaceId: string) => {
    try {
        const user = await currentUser();
       
        if (!user) {
            return { status: 403 }
        }
       
        const videos = await client.video.findMany({
            where: {
                OR: [{ workspaceId }, { folderId: workspaceId }],
            },
            select: {
                id: true,
                title: true,
                createdAt: true,
                processing: true,
                Folder: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                User: {
                    select: {
                        firstname: true,
                        lastname: true,
                        image: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    
        if (videos && videos.length > 0) {
            return { status: 200, data: videos }
        }

        return { status: 404 }
    } catch (error) {
        return { status: 400 }
    }
}

export const getWorkSpaces = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            return { status: 403 }
        }

        const workspaces = await client.user.findUnique({
            where: {
                clerkid: user.id,
            },
            select: {
                subscription: {
                    select: {
                        plan: true,
                    },
                },
                WorkSpace: {
                    select: {
                        id: true,
                        name: true,
                        type: true
                    },
                },
                members: {
                    select: {
                        WorkSpace: {
                            select: {
                                id: true,
                                name: true,
                                type: true
                            }
                        }
                    }
                }
            }
        })

        if (workspaces) {
            return { status: 200, data: workspaces }
        }
    } catch (error) {
        return { status: 400 } 
    }
}

export const createWorkspace = async (name: string) => {
    try {
        const user = await currentUser();
        
        if (!user) {
            return { status: 403 } 
        }

        const authorized = await client.user.findUnique({
            where: {
                clerkid: user.id,
            },
            select: {
                subscription: {
                    select: {
                        plan: true,
                    }
                }
            }
        })

        if (authorized?.subscription?.plan === "PRO") {
            const workspace = await client.user.update({
                where: {
                    clerkid: user.id,
                },
                data: {
                    WorkSpace: {
                        create: {
                            name,
                            type: "PUBLIC"
                        }
                    }
                }
            })

            if (workspace) {
                return { status: 201, data: workspace }
            }
        }

        return {
            status: 401,
            data: "You are not authorized to create a workspace"
        }
    } catch (error) {
        return { status: 400 }
    }
}

export const renameFolders = async (folderId: string, name: string) => {
    try {
        const folder = await client.folder.update({
            where: {
                id: folderId,
            },
            data: {
                name
            }
        })

        if (folder) {
            return { status: 200, data: "Folder Renamed"}
        }

        return { status: 400, data: "Folder does not exist" }
    } catch (error) {
        return { status: 500, data: "Oops! something went wrong"}
    }
}

export const createFolder = async (workspaceId: string) => {
    try {
        const isNewFolder = await client.workSpace.update({
            where: {
                id: workspaceId
            },
            data: {
                folders: {
                    create: { name: "Untitled "},
                }
            }
        })

        if (isNewFolder) {
            return { status: 200, message: "New Folder Created"}
        }
    } catch (error) {
        return { status: 500, message: "Opps something went wrong"}
    }
}

export const getFolderInfo = async (folderId: string) => {
    try {
        const folder = await client.folder.findUnique({
            where: {
                id: folderId,
            },
            select: {
                name: true,
                _count: {
                    select: {
                        videos: true
                    }
                }
            }
        })

        if (folder) {
            return { status: 200, data: folder }
        }

        return { status: 400, data: null }
    } catch (error) {
        return { status: 500, data: null }
    }
}

export const moveVideoLocation = async (videoId: string, workspaceId: string, folderId: string) => {
    try {
        const location = await client.video.update({
            where: {
                id: videoId
            },
            data: {
                folderId: folderId || null,
                workspaceId,
            }
        })

        if (location) {
            return { status: 200, data: "folder changed succesfully" }
        }

        return { status: 404, message: "workspace/folder not found" }
    } catch (error) {
        return { status: 500, message: "Something went wrong while moving the video" }
    }
}