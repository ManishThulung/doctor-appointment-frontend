import Loading from "./loaders/loading";

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

      <button
        type="submit"
        className={
          className ??
          "w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none flex justify-center items-center"
        }
      >
        {children}
        {isPending && (
          <div className="ml-2">
            <Loading />
          </div>
        )}
      </button>
    </>
  );
};

export default SubmitButton;
