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

const SIGN_UP_FORM_SCHEMA = z
  .object({
    email: z.string().email(),
    password: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof SIGN_UP_FORM_SCHEMA>;

export type SignUpFormProps = Readonly<{
  onSubmit: (values: SignUpFormValues) => void;
}>;

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const form = useForm({
    resolver: zodResolver(SIGN_UP_FORM_SCHEMA),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Enter your email and password to create your account
        </CardDescription>
        <CardAction>
          <NavLink to="/auth/sign-in">
            <Button variant="link">Sign in</Button>
          </NavLink>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmit)}>
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
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
        <Button form="sign-up-form" type="submit" className="w-full">
          Create account
        </Button>
      </CardFooter>
    </Card>
  );
}
