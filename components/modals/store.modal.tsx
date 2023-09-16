"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import useStoreModal from "@/hooks/use-store-modal";

import Modal from "@/components/ui/modal";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  group: z.enum(["public", "private"], { required_error: "Please select a group" }),
});

const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      group: "public",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", values);
      console.log(response.data);
      toast.success("Store created");
      window.location.assign(`/${response.data.id}`); // redirect to store page with no cache
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Name Store" description="Description Modal" isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
      <div className="py-2 space-y-4 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name" disabled={loading} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Description" disabled={loading} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage>{form.formState.errors.description?.message}</FormMessage>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="pt-6 space-x-2 flex items-center justify-end">
          <Button disabled={loading} variant={`outline`} onClick={storeModal.onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
