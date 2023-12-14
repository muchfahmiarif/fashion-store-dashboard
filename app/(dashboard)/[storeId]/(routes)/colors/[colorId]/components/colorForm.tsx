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
import { Color, Size } from "@prisma/client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AlertModal from "@/components/modals/alert.modal";
import AlertApi from "@/components/ui/alert.api";
import { useOrigin } from "@/hooks/useOrigin";
import ImageUpload from "@/components/ui/imageUpload";

interface ColorsFormProps {
  initialData: Color | null;
}

type ColorsFormValue = z.infer<typeof formSchema>;

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  value: z.string().min(4).regex(/^#/, {
    message: "Value must be a valid hex color",
  }),
});

const ColorsForm: React.FC<ColorsFormProps> = ({ initialData }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const title = initialData ? "Update colors" : "Create colors";
  const description = initialData ? "Update your colors." : "Add new colors";
  const toastMessage = initialData ? "Colors updated successfully!" : "Colors created successfully!";
  const action = initialData ? "Save changes!" : "Create";

  const form = useForm<ColorsFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (values: ColorsFormValue) => {
    console.log(values);
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, values);
      } else {
        await axios.post(`/api/${params.storeId}/colors`, values);
      }
      router.refresh();
      router.push(`/${params.storeId}/colors`);
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

      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      router.refresh();
      router.push("/");
      toast.success(toastMessage);
    } catch (error) {
      console.log(error);
      toast.error("Make sure you removed all products using this colors first.");
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
                  <FormLabel>Colors name</FormLabel>
                  <FormControl>
                    <Input placeholder="Colors name" {...field} disabled={loading} />
                  </FormControl>
                  <FormDescription>Update your colors.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hex colors</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input placeholder="Hex code colors" {...field} disabled={loading} />
                      <div className="border p-4 rounded-full" style={{ backgroundColor: field.value }} />
                    </div>
                  </FormControl>
                  <FormDescription>Update your colors.</FormDescription>
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

export default ColorsForm;
