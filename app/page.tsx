"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import Header from "./header";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be at most 100 characters"),
  jobTitle: z
    .string()
    .min(2, "Job title must be at least 2 characters")
    .max(100, "Job title must be at most 100 characters"),
  mobileNumber: z
    .string()
    .min(4, "Mobile number is required")
    .regex(/^[\+]?[1-9][\d\s\-\(\)]{3,15}$/, "Please enter a valid mobile number"),
  officePhone: z
    .string()
    .regex(/^[\+]?[1-9][\d\s\-\(\)]{3,15}$/, "Please enter a valid office phone number")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .email("Please enter a valid email address"),
  website: z
    .string()
    .refine((val) => val === "" || val === "https://" || z.string().url().safeParse(val).success, {
      message: "Please enter a valid website URL"
    })
    .optional()
    .or(z.literal("")),
  officeAddress: z
    .string()
    .min(10, "Office address must be at least 10 characters")
    .max(200, "Office address must be at most 200 characters"),
  country: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country must be at most 50 characters"),
  industry: z
    .string()
    .min(2, "Industry must be at least 2 characters")
    .max(50, "Industry must be at most 50 characters"),
  sourceEvent: z
    .string()
    .min(2, "Source/Event must be at least 2 characters")
    .max(100, "Source/Event must be at most 100 characters"),
  followUpDate: z
    .string()
    .optional()
    .or(z.literal("")),
  followUp: z.boolean(),
  comment: z
    .string()
    .max(500, "Comment must be at most 500 characters")
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      companyName: "",
      jobTitle: "",
      mobileNumber: "+251",
      officePhone: "+251",
      email: "",
      website: "https://",
      officeAddress: "",
      country: "Ethiopia",
      industry: "",
      sourceEvent: "",
      followUpDate: "",
      followUp: false,
      comment: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error === "Email already registered") {
          form.setError("email", {
            type: "manual",
            message: "This email is already registered",
          });
          toast.error("Email already registered", {
            description: "Please use a different email address.",
          });
          return;
        }
        
        if (result.details) {
          // Handle validation errors from the server
          result.details.forEach((error: any) => {
            form.setError(error.path[0] as keyof FormData, {
              type: "manual",
              message: error.message,
            });
          });
        }
        
        throw new Error(result.error || "Registration failed");
      }

      // Reset form after successful submission
      form.reset();
      
      toast.success("Registration successful!", {
        description: "Thank you for registering. We'll be in touch soon.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto rounded-sm">
          <CardHeader>
            <CardTitle>Registration Form</CardTitle>
            <CardDescription>
              Please fill out all required fields to complete your registration.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Full Name <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input className="rounded-md"
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Company Name <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input className="rounded-md"
                            placeholder="Enter your company name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Job Title <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input className="rounded-md"
                            placeholder="Enter your job title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Industry <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input className="rounded-md"
                            placeholder="Enter your industry"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Mobile Number <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <PhoneInput
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Enter your mobile number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="officePhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Office Phone Number</FormLabel>
                        <FormControl>
                          <PhoneInput
                            value={field.value || ""}
                            onChange={field.onChange}
                            placeholder="Enter office phone number"
                          />
                        </FormControl>
                        <FormDescription>Optional</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input className="rounded-md"
                            type="email"
                            placeholder="Enter your email address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input className="rounded-md"
                            type="url"
                            placeholder="https://www.example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Optional</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Country <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input className="rounded-md"
                            placeholder="Enter your country"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sourceEvent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Source / Event <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input className="rounded-md"
                            placeholder="How did you hear about us?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="followUpDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Follow-up Date</FormLabel>
                        <FormControl>
                          <Input className="rounded-md"
                            type="date"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Optional preferred follow-up date</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="officeAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Office Address <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your office address"
                          className="resize-none rounded-md"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="followUp"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox className="rounded-md"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I would like to receive follow-up communications
                        </FormLabel>
                        <FormDescription>
                          We ll send you updates about our services and special offers.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Comments</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter any additional comments or questions..."
                          className="resize-none rounded-md"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Optional: Share any specific requirements or questions you have.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full rounded-md" 
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Submitting..." : "Submit Registration"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
