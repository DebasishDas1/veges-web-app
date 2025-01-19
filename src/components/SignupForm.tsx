"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidator, userValidatorType } from "@/zod/user-validator";
import { toast } from "sonner";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userValidatorType>({
    resolver: zodResolver(userValidator),
  });

  const onSubmit = async ({ email, password }: userValidatorType) => {
    toast.error(`Email: ${email}, Password: ${password}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 w-[300px]">
      <div className="grid gap-2">
        <div className="grid gap-1 py-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            className={cn({
              "focus-visible:ring-red-500": errors.email,
            })}
            placeholder="you@example.com"
          />
          {errors?.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="grid gap-1 py-2">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            type="password"
            className={cn({
              "focus-visible:ring-red-500": errors.password,
            })}
            placeholder="Password"
          />
          {errors?.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit">Sign up</Button>
      </div>
    </form>
  );
};

export default SignupForm;
