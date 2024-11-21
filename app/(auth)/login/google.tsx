import React, { Dispatch, FC, SetStateAction } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { request } from "../../../react-query/config";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

const googleAuth = (code: string) =>
  request.get(`/auth/google/oauth?code=${code}`);

interface IProps {
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  setRole: Dispatch<SetStateAction<string>>;
  router: any;
}
const Googles: FC<IProps> = ({ setIsAuth, setRole, router }) => {
  const responseGoogle = async (authResult: any) => {
    try {
      if (authResult["code"]) {
        console.log(authResult.code);
        const res = await googleAuth(authResult.code);
        setIsAuth(res.data?.success);
        setRole(res?.data?.user?.role);

        router.push("/");
      } else {
        console.log(authResult);
        throw new Error(authResult);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <Button
      onClick={googleLogin}
      className="w-full mt-4 bg-black hover:bg-gray-700"
    >
      <FcGoogle /> <span className="ml-2">Sign in with Google</span>
    </Button>
  );
};

export default Googles;
