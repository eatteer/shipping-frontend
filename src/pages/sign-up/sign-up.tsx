import { getApplicationError } from "@/lib/get-application-error";
import { SignUpForm } from "@/pages/sign-up/sign-up-form";
import { signUp } from "@/services/sign-up";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useLoader } from "@/contexts/loader/use-loader";

export function SignUp() {
  const loader = useLoader();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signUp,
    onMutate: () => {
      loader.show();
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/auth/sign-in");
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
      <SignUpForm
        onSubmit={(values) => {
          mutation.mutate(values);
        }}
      />
    </main>
  );
}
