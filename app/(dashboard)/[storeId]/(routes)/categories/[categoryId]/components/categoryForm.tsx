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
import { Billboard, Category } from "@prisma/client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AlertModal from "@/components/modals/alert.modal";
import AlertApi from "@/components/ui/alert.api";
import { useOrigin } from "@/hooks/useOrigin";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[];
}

type CategoryFormValue = z.infer<typeof formSchema>;

const formSchema = z.object({
  name: z.string().nonempty({ message: "Label is required" }),
  billboardId: z.string().nonempty({ message: "Image URL is required" }),
});

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, billboards }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const title = initialData ? "Update category" : "Create category";
  const description = initialData ? "Update your category." : "Add new category";
  const toastMessage = initialData ? "Category updated successfully!" : "Category created successfully!";
  const action = initialData ? "Save changes!" : "Create";

  const form = useForm<CategoryFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  });

  const onSubmit = async (values: CategoryFormValue) => {
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
              name={`name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input placeholder="Category name" {...field} disabled={loading} />
                  </FormControl>
                  <FormDescription>Update your name category.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`billboardId`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={`Select a billboard`} defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {billboards.map((billboard) => (
                          <SelectItem key={billboard.id} value={billboard.id}>
                            {billboard.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription>Update your name category.</FormDescription>
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

export default CategoryForm;
