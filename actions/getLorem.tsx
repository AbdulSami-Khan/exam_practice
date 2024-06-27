"use server"

import prisma from "@/lib/db"


export const getLorem = async ()=>{
  return await prisma.lorem.findMany()
}