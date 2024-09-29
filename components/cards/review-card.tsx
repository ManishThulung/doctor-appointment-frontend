import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rate } from "antd";
import moment from "moment";

const ReviewCard = ({ review }: { review: any }) => {
  return (
    <article className="w-full md:w-[49%] border rounded-sm p-4">
      <div className="flex items-center mb-4 gap-2">
        <Avatar>
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${review?.User?.avatar?.filename}`}
          />
          <AvatarFallback>{review?.User?.name}</AvatarFallback>
        </Avatar>
        <div className="font-medium">
          <p>
            {review?.User?.name}
            <time
              dateTime="2014-08-16 19:00"
              className="block text-sm text-gray-500"
            >
              Joined on {moment(review?.User?.createdAt).format("MMMM Do YYYY")}
            </time>
          </p>
        </div>
      </div>
      <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
        <Rate allowHalf defaultValue={review.rating} disabled />
      </div>
      <footer className="mb-5 text-sm text-gray-500">
        <p>
          Reviewed on
          <time dateTime="2017-03-03 19:00">
            {moment(review?.createdAt).format("MMMM Do YYYY, h:mm A")}
          </time>
        </p>
      </footer>
      <p className="mb-2 text-gray-800">{review?.review}</p>
    </article>
  );
};

export default ReviewCard;
