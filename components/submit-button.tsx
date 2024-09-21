import Loading from "./loaders/loading";
import { Button } from "./ui/button";

interface ButtonProps {
  isPending: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({ isPending, className, children }: ButtonProps) => {
  return (
    <>
      {/* <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button> */}

      <Button type="submit" className={className ?? "w-full"}>
        {children}
        {isPending && (
          <div className="ml-2">
            <Loading />
          </div>
        )}
      </Button>
    </>
  );
};

export default SubmitButton;
