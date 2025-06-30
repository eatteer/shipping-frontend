import { useAuth } from "@/contexts/auth/use-auth";
import { useLoader } from "@/contexts/loader/use-loader";
import { getApplicationError } from "@/lib/get-application-error";
import { SignInForm } from "@/pages/sign-in/sign-in-form";
import { signIn } from "@/services/sign-in";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

export function SignIn() {
  const auth = useAuth();
  const loader = useLoader();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const expired = searchParams.get("expired");

      if (expired === "true") {
        toast.warning("Your session has expired. Please sign in again");
      }
    }, 0);
  }, [searchParams]);

  const mutation = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: signIn,
    onMutate: () => {
      loader.show();
    },
    onSuccess: ({ token }, { email }) => {
      auth.login({ token, email });
      navigate("/");
    },
    onError: (error) => {
      const { message } = getApplicationError(error);
      toast.error(message);
    },
    onSettled: () => {
      loader.hide();
    },
  });

  return (
    <main className="min-h-screen w-full flex justify-center items-center">
      <SignInForm
        onSubmit={(values) => {
          mutation.mutate(values);
        }}
      />
    </main>
  );
}
