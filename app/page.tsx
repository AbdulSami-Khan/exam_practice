"use client";

import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createLorem } from "@/actions/createLorem";
import { useRouter } from "next/navigation";
import { formSchema } from "@/schemas/formSchema";
import { getLorem } from "@/actions/getLorem";
import { deleteLorem } from "@/actions/deleteLorem";



const Home = () => {
  const router = useRouter() 
  const [ loremInfo ,setloremInfo] = useState<any>()

  useEffect(() => {
    getLorem()
      .then((data) => {
        setloremInfo(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = useCallback(
    (userId: string) => {
      deleteLorem(userId).then(() => {
        router.refresh();
      });
    },
    [loremInfo]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createLorem(values).then(()=>{
      router.back()
    })
  }

  return (
    <div className="flex flex-col flex-grow border border-black bg-yellow-200 gap-6 px-24 py-14">
      <div className=" grid grid-cols-3  gap-20 ">
        <div className="flex flex-col text-center shadow-sm shadow-black bg-green-200 p-5 rounded-lg border border-black ">
          <p className="text-lg ">lorem ipsum</p>
          <h1 className="text-5xl font-bold">03</h1>
        </div>
        <div className="text-center bg-pink-200 p-5 shadow-sm shadow-black border rounded-lg border-black ">
          <p className="text-lg">lorem ipsum</p>
          <h1 className="text-5xl font-bold">11</h1>
        </div>
        <div className="text-center bg-orange-200 p-5 border shadow-sm shadow-black rounded-lg border-black ">
          <p className="text-lg">lorem ipsum</p>
          <h1 className="text-5xl font-bold">52</h1>
        </div>
      </div>
      <div className="flex gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 gap-4 flex flex-grow justify-between items-end">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-grow">
                  <FormControl>
                    <Input className="" placeholder="Enter something here...." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>

      <div className="flex flex-col gap-4">
        {loremInfo?.map((loremInfo: any)=>{
          return(
            <div key={loremInfo.id} className="flex justify-between shadow-sm shadow-black items-center bg-slate-50 p-4 rounded-lg border border-black px-8">
            <div className="">
              <h1 className="text-lg font-semibold">
                Name : {loremInfo.name}
              </h1>
              <Button
                size={"lg"}
                className="mt-3 px-16 rounded-full bg-[#6D000B]"
              >
                {" "}
                Click Me{" "}
              </Button>
            </div>
            <div>
              <MdDelete size={40} onClick={()=>{handleDelete(loremInfo.id)}} />
            </div>
          </div>
          )
        })}
      </div>
    </div>
  );
};

export default Home;
