import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const SIGN_IN_FORM_SCHEMA = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export type SignInFormValues = z.infer<typeof SIGN_IN_FORM_SCHEMA>;

export type SignInFormProps = Readonly<{
  onSubmit: (values: SignInFormValues) => void;
}>;

export function SignInForm({ onSubmit }: SignInFormProps) {
  const form = useForm({
    resolver: zodResolver(SIGN_IN_FORM_SCHEMA),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <NavLink to="/auth/sign-up">
            <Button variant="link">Sign up</Button>
          </NavLink>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="sign-in-form"
            onSubmit={form.handleSubmit((values) => onSubmit(values))}
          >
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button form="sign-in-form" type="submit" className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
