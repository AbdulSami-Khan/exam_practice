"use server"
import prisma from "@/lib/db"
import { formSchema } from "@/schemas/formSchema";
import { z } from "zod";

export const createLorem = async (values : z.infer<typeof formSchema>) => {

    const validatedValuse = formSchema.safeParse(values);

    if(!validatedValuse.success){
        return{err : "Invalid Values"};
    }

    const lorem = await prisma.lorem.create({
        data: {
            name: validatedValuse.data?.name,
            isCompleted : false
        }
    })

}