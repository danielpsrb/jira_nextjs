import Link from "next/link";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const passwordStrength = {
    weak: /^(?=.*[a-z]).{6,}$/, // Setidaknya 6 karakter dan huruf kecil
    medium: /^(?=.*[a-z])(?=.*\d).{8,}$/, // Setidaknya 8 karakter, huruf kecil, dan angka
    strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,#]).{12,}$/, // Setidaknya 12 karakter, huruf besar, huruf kecil, angka, dan simbol spesial
};

const formSchema = z.object({
    name: z.string().trim().min(3, "Name is required and must be at least 3 characters"),
    email: z.string().email("Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const SignUpCard = () => {
    const [passwordStrengthLabel, setPasswordStrengthLabel] = useState(""); // State untuk menyimpan label kekuatan password
    const [passwordEntered, setPasswordEntered] = useState(false); // State untuk mengecek apakah password sudah dimasukkan
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const handlePasswordChange = (password: string) => {
        setPasswordEntered(!!password); // Set state jika password sudah dimasukkan
        if (passwordStrength.strong.test(password)) {
            setPasswordStrengthLabel("Strong");
        } else if (passwordStrength.medium.test(password)) {
            setPasswordStrengthLabel("Medium");
        } else if (passwordStrength.weak.test(password)) {
            setPasswordStrengthLabel("Weak");
        } else {
            setPasswordStrengthLabel("Too Weak");
        }
    };

    const submitSignup = (values: z.infer<typeof formSchema>) => {
        console.log({ values });
    };

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">
                    Create an account
                </CardTitle>
                <CardDescription>
                    By creating account, you agree to our {" "}
                    <Link href="/terms">
                        <span className="text-blue-800">Terms of Service</span>
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy">
                        <span className="text-blue-800">Privacy Policy.</span>
                    </Link>
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitSignup)} className="space-y-4">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Enter your name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="Enter email address"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Enter password"
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handlePasswordChange(e.target.value); // Cek kekuatan password saat user mengetik
                                            }}
                                        />
                                    </FormControl>
                                    {/* Tampilkan password strength hanya ketika password sudah dimasukkan */}
                                    {passwordEntered && (
                                        <p className={`text-sm ${passwordStrengthLabel === 'Strong' ? 'text-green-600' : passwordStrengthLabel === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                                            Your Password is {passwordStrengthLabel}
                                        </p>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="confirmPassword"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Confirm password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={form.formState.isSubmitting}
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                        >
                            Sign Up
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button
                    disabled={false}
                    variant="secondary"
                    size="lg"
                    className="w-full"
                >
                    <FcGoogle className="mr-2 size-5" />
                    Sign Up with Google
                </Button>
                <Button
                    disabled={false}
                    variant="secondary"
                    size="lg"
                    className="w-full"
                >
                    <FaGithub className="mr-2 size-5" />
                    Sign Up with Github
                </Button>
            </CardContent>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7 flex items-center justify-center">
                <p>
                    Already have an account?{" "}
                </p>
                <Link href="/sign-in">
                    <span className="text-blue-800">&nbsp;Login here</span>
                </Link>
            </CardContent>
        </Card>
    );
};
