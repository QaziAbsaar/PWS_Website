import { z } from "zod";

const name = z
  .string()
  .trim()
  .min(2, "Please enter your full name.")
  .max(120, "Name is too long.");

const email = z
  .string()
  .trim()
  .toLowerCase()
  .email("Please enter a valid email address.");

const message = z
  .string()
  .trim()
  .min(10, "Please write at least a short message.")
  .max(5000, "Message is too long.");

/** Hidden field — bots fill it, humans never see it. */
const honeypot = z.literal("").optional();

export const enquirySchema = z.object({
  name,
  email,
  subject: z.string().trim().min(3, "Please add a subject.").max(200),
  message,
  company: honeypot,
});

export const applicationSchema = z.object({
  interest: z.enum(["membership", "volunteering", "partnership"]),
  name,
  email,
  phone: z
    .string()
    .trim()
    .max(40, "Phone number is too long.")
    .optional()
    .or(z.literal("")),
  connection: z.enum([
    "Current student",
    "Faculty or staff member",
    "Alumni",
    "External organisation / partner",
    "Community member",
  ]),
  message,
  company: honeypot,
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type ApplicationInput = z.infer<typeof applicationSchema>;
