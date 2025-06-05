"use client";
import React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "./ui/form";
import { Button } from "./ui/button";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import authStore from "@/store/auth.store";

const authFormSchema = (type: FormType) => {
  return z.object({
    username:
      type === "sign-up"
        ? z
            .string()
            .min(3, "Username must be at least 3 characters long")
            .max(15, "Username must be less than 20 characters")
        : z.string().optional(),
    email: z
      .string()
      .email("Please enter a valid email address")
      .min(1, "Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(15, "Password must be less than 50 characters"),
  });
};

export default function AuthForm({ type }: { type: FormType }) {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const { signUp, logIn } = authStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    // This ensures validation happens on change and submit
    mode: "all",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Trigger validation manually to show all errors
    const isValid = await form.trigger();
    if (!isValid) {
      return; // Stop submission if validation fails
    }

    if (type == "sign-in") {
      console.log("sign-in", values);

      await logIn(values);
      router.push("/message");
    } else {
      console.log("sign-up", values);

      await signUp(
        values as { username: string; email: string; password: string }
      );
      router.push("/message");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center px-6 text-black bg-white dark:text-white dark:bg-black">
      <div className="relative group">
        {/* gradient border glow */}
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-orange-400 to-red-400 opacity-50 blur-lg group-hover:opacity-60 transition-all duration-500" />

        <div className="relative lg:min-w-[566px] px-8 py-6 rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-lg">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl font-bold">
              {type == "sign-in" ? (
                <div className="flex items-center gap-2">
                  <span className="animated-warm-gradient-text hover:brightness-110 transition-all duration-300 cursor-pointer">
                    Welcome
                  </span>
                  <span className="text-black dark:text-white">
                    Back to Blaze 🔥
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="animated-warm-gradient-text hover:brightness-110 transition-all duration-300 cursor-pointer">
                    Create
                  </span>
                  <span className="text-black dark:text-white">
                    an Account 🔥
                  </span>
                </div>
              )}
            </h1>
            <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              {type == "sign-in"
                ? "Your messages are waiting. Log in to see them!"
                : "Sign up today, your messages are just a click away."}
            </span>
          </div>
          <div>
            <Form {...form}>
              <form
                className="w-full space-y-6 mt-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {type == "sign-up" && (
                  <FormField
                    control={form.control}
                    label="Username"
                    name="username"
                    type="text"
                    placeholder="your name"
                  />
                )}

                <FormField
                  control={form.control}
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Your email address"
                />

                <FormField
                  control={form.control}
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-400 to-red-400 text-white text-lg font-semibold cursor-pointer py-2 active:scale-105 duration-300 transition-all hover:shadow-lg hover:shadow-orange-400/30"
                  disabled={
                    !form.formState.isValid || form.formState.isSubmitting
                  }
                >
                  {form.formState.isSubmitting
                    ? "Processing..."
                    : type == "sign-in"
                    ? "Sign in"
                    : "Create an account"}
                </Button>
              </form>
            </Form>
            <p className="text-center text-gray-600 dark:text-slate-100/90 text-lg mt-5">
              {type == "sign-in"
                ? "No account yet?"
                : "Already have an account?"}
              <Link
                href={type != "sign-in" ? "/sign-in" : "/sign-up"}
                className="ml-1"
              >
                <span className="text-gray-800 dark:text-white font-semibold hover:underline hover:text-orange-400 transition-colors">
                  {type != "sign-in" ? "Sign in" : "Sign up"}
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
