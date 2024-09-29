"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Flex, Rate } from "antd";
import Loading from "../loaders/loading";
import { useCreateReview } from "@/api/review";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const formSchema = z.object({
  review: z.string().min(2).max(500),
});

interface IProps {
  type: "Doctor" | "Hospital";
  doctorId: string;
}

const ReviewModal: FC<IProps> = ({ type, doctorId }) => {
  const { mutateAsync, isPending } = useCreateReview(doctorId);
  const [value, setValue] = useState<number>(0);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      review: "",
    },
  });
  const handleChange = (rating: number) => {
    setValue(rating);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      rating: value,
      review: values.review,
      doctorId,
    };
    try {
      const res: AxiosResponse = await mutateAsync(data);
      if (res.data?.success) {
        toast.success(res.data?.message);
        form.reset();
        setValue(0);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Review now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Review {type}</DialogTitle>
          <DialogDescription>
            You can rate us and share your thougts on the service.
          </DialogDescription>
        </DialogHeader>

        <Flex gap="middle" vertical>
          <Rate
            tooltips={desc}
            onChange={(value) => handleChange(value)}
            value={value}
            allowHalf
          />
          {value ? <span>{desc[value - 1]}</span> : null}
        </Flex>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Review a doctor" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-5 w-full">
              <Button type="submit" className={"w-full"}>
                Confirm
                {isPending && (
                  <div className="ml-2">
                    <Loading />
                  </div>
                )}
              </Button>
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

export default ReviewModal;
