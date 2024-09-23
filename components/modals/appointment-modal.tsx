"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { timeSlot } from "@/constants";
import { useState } from "react";
import Loading from "../loaders/loading";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { useCreateAppointment } from "@/api/appointment";
import { AxiosResponse } from "axios";

export default function AppointmenntModal({
  doctorId,
  hospitalId,
}: {
  doctorId: string;
  hospitalId: string;
}) {
  const { mutateAsync, isPending } = useCreateAppointment();
  
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfTheWeek = date.getDay();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const clickedDate = new Date(year, month - 1, day);
  const formattedClickedDate = `${clickedDate.getFullYear()}-${(
    clickedDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${clickedDate.getDate().toString().padStart(2, "0")}`;

  const [selectedBookingDate, setSelectedBookingDate] =
    useState<string>(formattedClickedDate);
  const getDay = (number: number) => {
    if (number > 6) return daysOfWeek[number - 7];
    else return daysOfWeek[number];
  };

  const [choosenWeekDay, setNewChoosenWeekDay] = useState<number>(dayOfTheWeek);
  const [clickedValue, setClickedValue] = useState<number>(0);

  const length = 7;
  const myArray = Array.from({ length }, (_, index) => index);

  const handleSubmit = async () => {
    if (!selectedBookingDate || !selectedSlot) {
      toast.error("Please select the valid date and time slot");
    }
    const data = {
      date: selectedBookingDate,
      timeSlot: selectedSlot,
      doctorId,
      hospitalId,
    };
    try {
      const res: AxiosResponse = await mutateAsync(data);
      if (res.data?.success) {
        toast.success(res.data?.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"default"}>Book an Appointment</Button>
      </DialogTrigger>

      <DialogContent>
        <>
          <DialogTitle>Book an appointment</DialogTitle>
          <DialogDescription>
            Book an appointment with a doctor
          </DialogDescription>
          <div className="flex flex-col md:flex-row">
            <div className="w-full">
              <div className="mb-3 mt-5">
                <div
                  className="horizontal-calendar"
                  style={{ borderTop: "1px solid rgb(230, 230, 230)" }}
                >
                  <h5 className="sm:pl-5 font-bold mb-2 mt-3">Select date:</h5>

                  <div className="date-list-scroll flex gap-1">
                    {myArray.map((value) => (
                      <div
                        key={value}
                        className={`date-item choosed-day flex-1 pt-2 pb-2  text-center border  border-solid border-gray-200 ${
                          clickedValue === value
                            ? "bg-red-500  text-white"
                            : "bg-white"
                        } ${
                          value >= 3
                            ? "text-[rgb(200,200,200)] "
                            : "cursor-pointer"
                        }`}
                        onClick={() => {
                          if (value < 3) {
                            const clickedDate = new Date(
                              year,
                              month - 1,
                              day + value
                            );
                            const formattedClickedDate = `${clickedDate.getFullYear()}-${(
                              clickedDate.getMonth() + 1
                            )
                              .toString()
                              .padStart(2, "0")}-${clickedDate
                              .getDate()
                              .toString()
                              .padStart(2, "0")}`;

                            if (dayOfTheWeek + value > 6)
                              setNewChoosenWeekDay(dayOfTheWeek + value - 7);
                            else setNewChoosenWeekDay(dayOfTheWeek + value);
                            setClickedValue(value);
                            setSelectedBookingDate(formattedClickedDate);
                          }
                        }}
                      >
                        <div>
                          <p className="date-item-day">
                            {getDay(dayOfTheWeek + value)}
                          </p>
                          <p className="date-item-date ">{day + value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="time-slots-wrapper">
                <div
                  className="grid grid-cols-2 gap-4 time-slots m-0 row  justify-content-center align-items-center bg-white p-2 h-[300px] overflow-auto"
                  style={{ border: "1px solid rgb(230,230,230)" }}
                >
                  {choosenWeekDay === 0
                    ? timeSlot.sunday &&
                      timeSlot.sunday.map((slot: any, id: any) => (
                        <div
                          className="slot-item "
                          key={id}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          <div
                            className={`wrapper text-center p-2 border border-solid  hover:border-[rgb(150,150,150)] hover:text-[rgb(50,50,50)] cursor-pointer ${
                              selectedSlot === slot
                                ? "border-[rgb(150,150,150)] text-[rgb(50,50,50)]"
                                : "text-[rgb(100,100,100)] border-gray-200"
                            }`}
                          >
                            {slot}
                          </div>
                        </div>
                      ))
                    : choosenWeekDay === 1
                    ? timeSlot.monday &&
                      timeSlot.monday.map((slot: any, id: any) => (
                        <div
                          className="slot-item"
                          key={id}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          <div
                            className={`wrapper text-center p-2 border border-solid  hover:border-[rgb(150,150,150)] hover:text-[rgb(50,50,50)] cursor-pointer ${
                              selectedSlot === slot
                                ? "border-[rgb(150,150,150)] text-[rgb(50,50,50)]"
                                : "text-[rgb(100,100,100)] border-gray-200"
                            }`}
                          >
                            {slot}
                          </div>
                        </div>
                      ))
                    : choosenWeekDay === 2
                    ? timeSlot.tuesday &&
                      timeSlot.tuesday.map((slot: any, id: any) => (
                        <div
                          className="slot-item"
                          key={id}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          <div
                            className={`wrapper text-center p-2 border border-solid  hover:border-[rgb(150,150,150)] hover:text-[rgb(50,50,50)] cursor-pointer ${
                              selectedSlot === slot
                                ? "border-[rgb(150,150,150)] text-[rgb(50,50,50)]"
                                : "text-[rgb(100,100,100)] border-gray-200"
                            }`}
                          >
                            {slot}
                          </div>
                        </div>
                      ))
                    : choosenWeekDay === 3
                    ? timeSlot.wednesday &&
                      timeSlot.wednesday.map((slot: any, id: any) => (
                        <div
                          className="slot-item"
                          key={id}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          <div className="wrapper text-center p-2 text-[rgb(100,100,100)]">
                            {slot}
                          </div>
                        </div>
                      ))
                    : choosenWeekDay === 4
                    ? timeSlot.thursday &&
                      timeSlot.thursday.map((slot: any, id: any) => (
                        <div
                          className="slot-item"
                          key={id}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          <div
                            className={`wrapper text-center p-2 border border-solid   hover:border-[rgb(150,150,150)] hover:text-[rgb(50,50,50)] cursor-pointer ${
                              selectedSlot === slot
                                ? "border-[rgb(150,150,150)] text-[rgb(50,50,50)]"
                                : "text-[rgb(100,100,100)] border-gray-200"
                            }`}
                          >
                            {slot}
                          </div>
                        </div>
                      ))
                    : choosenWeekDay === 5
                    ? timeSlot.friday &&
                      timeSlot.friday.map((slot: any, id: any) => (
                        <div
                          className="slot-item"
                          key={id}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          <div
                            className={`wrapper text-center p-2 border border-solid  hover:border-[rgb(150,150,150)] hover:text-[rgb(50,50,50)] cursor-pointer ${
                              selectedSlot === slot
                                ? "border-[rgb(150,150,150)] text-[rgb(50,50,50)]"
                                : "text-[rgb(100,100,100)] border-gray-200"
                            }`}
                          >
                            {slot}
                          </div>
                        </div>
                      ))
                    : choosenWeekDay === 6
                    ? timeSlot.saturday &&
                      timeSlot.saturday.map((slot: any, id: any) => (
                        <div
                          className="slot-item"
                          key={id}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          <div
                            className={`wrapper text-center p-2 border border-solid  hover:border-[rgb(150,150,150)] hover:text-[rgb(50,50,50)] cursor-pointer ${
                              selectedSlot === slot
                                ? "border-[rgb(150,150,150)]  text-[rgb(50,50,50)]"
                                : "text-[rgb(100,100,100)] border-gray-200"
                            }`}
                          >
                            {slot}
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
              <div className="pl-5 pr-5 pt-2">
                <h5 className="text-bold ">
                  {selectedBookingDate && selectedSlot ? (
                    <>
                      <p className="text-xl font-semibold mb-2">
                        Your appointment is for:
                      </p>
                      <div className="flex flex-col">
                        <span>Date: {selectedBookingDate}</span>
                        <span>TIme: {selectedSlot}</span>
                      </div>
                    </>
                  ) : (
                    <span className="text-red-500">
                      Please select the date and time for the appointment
                    </span>
                  )}
                </h5>
              </div>
            </div>
          </div>
          <div className="flex gap-5 w-full my-5">
            <Button type="submit" className={"w-full"} onClick={handleSubmit}>
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
        </>
      </DialogContent>
    </Dialog>
  );
}
