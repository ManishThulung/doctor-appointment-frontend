import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rate } from "antd";
const ReviewCard = () => {
  return (
    <article className="w-full md:w-[49%] border rounded-sm p-4">
      <div className="flex items-center mb-4 gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>user</AvatarFallback>
        </Avatar>
        <div className="font-medium">
          <p>
            Jese Leos
            <time
              dateTime="2014-08-16 19:00"
              className="block text-sm text-gray-500"
            >
              Joined on August 2014
            </time>
          </p>
        </div>
      </div>
      <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
        <Rate allowHalf defaultValue={4} disabled />
      </div>
      <footer className="mb-5 text-sm text-gray-500">
        <p>
          Reviewed on
          <time dateTime="2017-03-03 19:00"> March 3, 2017</time>
        </p>
      </footer>
      <p className="mb-2 text-gray-500">
        This is my third Invicta Pro Diver. They are just fantastic value for
        money. This one arrived yesterday and the first thing I did was set the
        time, popped on an identical strap from another Invicta and went in the
        shower with it to test the waterproofing.... No problems.
      </p>
      <p className="mb-3 text-gray-500">
        It is obviously not the same build quality as those very expensive
        watches. But that is like comparing a Citroën to a Ferrari. This watch
        was well under £100! An absolute bargain.
      </p>
    </article>
  );
};

export default ReviewCard;
