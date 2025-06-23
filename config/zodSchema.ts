import { z } from "zod";

export const formSchema = z.object({
  username: z.string()
    .regex(/^[A-Za-z\s]+$/, { message: "Invalid User Name" })
    .min(3, { message: "Username must be at least 3 characters." })
    .max(20, { message: "Username must not exceed 20 characters." }),

  emailid: z.string()
    .email({ message: "Invalid email address." }),

  mobile: z.string()
    .regex(/^[6-9]\d{9}$/, { message: "Invalid Indian mobile number" }),

  gender: z.enum(["male", "female", "other"], {
    message: "Please select your gender"
  }),

  dob: z.string()
    .min(1, { message: "Date of birth is required" }),

  department: z.enum(["cardiology", "dermatology", "neurology", "pediatrics", "general"], {
    message: "Please select a department"
  }),

  doctor: z.string()
    .min(1, { message: "Please select a doctor" }),

  symptoms: z.array(z.string())
    .min(1, { message: "Select at least one symptom" }),

  appointmentDate: z.string()
    .min(1, { message: "Appointment date is required" }),

  timeSlot: z.string()
    .min(1, { message: "Please select a time slot" }),

  hasInsurance: z.enum(["yes", "no"], {
    message: "Please specify if you have insurance"
  }),

  insuranceCompany: z.string().optional(),
  policyNumber: z.string().optional(),
  message: z.string().optional()
}).refine((data) => {
  if (data.hasInsurance === "yes") {
    return data.insuranceCompany?.trim() && data.policyNumber?.trim();
  }
  return true;
}, {
  message: "Insurance company and policy number are required",
  path: ["insuranceCompany"]
});
