"use client";

import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Loader2, Trash2Icon } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Billboard, Image, Product } from "@prisma/client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AlertModal from "@/components/modals/alert.modal";
import AlertApi from "@/components/ui/alert.api";
import { useOrigin } from "@/hooks/useOrigin";
import ImageUpload from "@/components/ui/imageUpload";
import { url } from "inspector";

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
      })
    | null;
}

type ProductFormValue = z.infer<typeof formSchema>;

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  images: z
    .object({
      url: z.string(),
    })
    .array(),
  price: z.number().min(1).positive({ message: "Price must be positive" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  colorId: z.string().min(1, { message: "Color is required" }),
  sizeId: z.string().min(1, { message: "Size is required" }),
  isFeature: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Update products" : "Create products";
  const description = initialData ? "Update your products." : "Add new products";
  const toastMessage = initialData ? "Product updated successfully!" : "Product created successfully!";
  const action = initialData ? "Save changes!" : "Create";

  const form = useForm<ProductFormValue>({
    resolver: zodResolver(formSchema),
    // if type data price is "decimal" change this initial data to ↴
    // initialData ? {...initialData, price: parseFloat(String(initialData?.price))} : {name: "", images: [], price: 0, ...}
    defaultValues: initialData || {
      name: "",
      images: [],
      price: 0,
      categoryId: "",
      colorId: "",
      sizeId: "",
      isFeature: false,
      isArchived: false,
    },
  });

  const onSubmit = async (values: ProductFormValue) => {
    console.log(values);
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, values);
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, values);
      }
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
      router.refresh();
      router.push("/");
      toast.success("Billboard deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Make sure you removed all Categories using this Billboard.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData ? (
          <Button
            disabled={loading}
            variant={"destructive"}
            size={"sm"}
            onClick={() => {
              console.log("clicked");
              setOpen(true);
            }}>
            <Trash2Icon className="h-4 w-4" />
          </Button>
        ) : (
          <>
            <h1>Hello World</h1>
          </>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name={`imageUrl`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={loading}
                      onChange={(url) => {
                        field.onChange(url); // onChange from field who we get from render, we got 4 parameters (name, value, ref, onChange)
                      }}
                      onRemove={() => {
                        field.onChange(""); // onChange from field who we get from render, we got 4 parameters (name, value, ref, onChange)
                      }}
                    />
                  </FormControl>
                  <FormDescription>Upload your billboard image</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`label`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input placeholder="Billboard label" {...field} disabled={loading} />
                  </FormControl>
                  <FormDescription>Update your name billboard.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
