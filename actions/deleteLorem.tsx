"use server"

import prisma from "@/lib/db"


export const deleteLorem = async (userID: string)=>{
    await prisma.lorem.delete({
        where: { id: userID}
    })
}