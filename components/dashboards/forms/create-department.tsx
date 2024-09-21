"use client";

import { useCreateDepartment } from "@/api/dashboard/department.api";
import { FileUploader } from "@/components/file-uploader";
import CustomFormField, {
  FormFieldType,
} from "@/components/forms/molecules/custom-fields";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(30),
  description: z.string().min(2).max(100),
  image: z.any().refine((value) => value !== undefined && value !== null, {
    message: "Image is required",
  }),
});

const CreateDepartment = () => {
  const { mutateAsync, isPending } = useCreateDepartment();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let formData = new FormData();
    formData.append("image", values?.image[0]);
    formData.append("name", values.name);
    formData.append("description", values.description);

    try {
      const res: AxiosResponse = await mutateAsync(formData);
      if (res.data?.success) {
        toast.success(res.data?.message);
        setOpen(false);
        form.reset();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-6 font-semibold">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create department</DialogTitle>
          <DialogDescription>
            You can create department from here.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Dentist" {...field} />
                  </FormControl>

                  <FormMessage />
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
                    <Textarea placeholder="Description of dentist" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="image"
              label="Department image"
              renderSkeleton={(field) => (
                <FormControl>
                  <FileUploader
                    files={field.value}
                    onChange={field.onChange}
                    type="image/*"
                  />
                </FormControl>
              )}
            />
            <div className="flex gap-5 w-full">
              <SubmitButton isPending={isPending} className="w-full">
                Submit
              </SubmitButton>
              <DialogTrigger asChild>
                <Button className="w-full" variant={"destructive"}>
                  Cancel
                </Button>
              </DialogTrigger>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDepartment;
