'use client';
import { useRouter } from "next/navigation";
import { formSchema } from "@/config/zodSchema";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [inputValue, setInputValue] = useState({
    username: "",
    emailid: "",
    mobile: "",
    gender: "",
    dob: "",
    department: "",
    doctor: "",
    symptoms: [] as string[],
    appointmentDate: "",
    timeSlot: "",
    hasInsurance: "",
    insuranceCompany: "",
    policyNumber: ""
  });

  const [formErrors, setFormErrors] = useState({
    username: "", emailid: "", mobile: "", gender: "", dob: "",
    department: "", doctor: "", symptoms: "",
    appointmentDate: "", timeSlot: "",
    hasInsurance: "", insuranceCompany: "", policyNumber: ""
  });

  const doctorOptions: { [key: string]: string[] } = {
    cardiology: ["Dr. A Sharma", "Dr. R Nair"],
    dermatology: ["Dr. Meera Thomas", "Dr. Kiran Patel"],
    neurology: ["Dr. S Joseph", "Dr. Rekha Menon"],
    pediatrics: ["Dr. Arjun Roy", "Dr. Latha Iyer"],
    general: ["Dr. M Faisal", "Dr. G George"]
  };

  const symptomsList = [
    "Headache", "Fever", "Cough", "Skin Rash", "Chest Pain", "Dizziness", "Fatigue"
  ];

  const timeSlots = [
    "09:00 AM - 09:30 AM", "10:00 AM - 10:30 AM",
    "11:00 AM - 11:30 AM", "01:00 PM - 01:30 PM",
    "03:00 PM - 03:30 PM", "04:00 PM - 04:30 PM"
  ];

  const handleCheckboxChange = (symptom: string) => {
    const updated = inputValue.symptoms.includes(symptom)
      ? inputValue.symptoms.filter((s) => s !== symptom)
      : [...inputValue.symptoms, symptom];
    setInputValue({ ...inputValue, symptoms: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(inputValue);
    if (!result.success) {
      const fieldErrors = result.error.format();
      alert("Please enter valid information");
      setFormErrors({
        username: fieldErrors.username?._errors[0] || "",
        emailid: fieldErrors.emailid?._errors[0] || "",
        mobile: fieldErrors.mobile?._errors[0] || "",
        gender: fieldErrors.gender?._errors[0] || "",
        dob: fieldErrors.dob?._errors[0] || "",
        department: fieldErrors.department?._errors[0] || "",
        doctor: fieldErrors.doctor?._errors[0] || "",
        symptoms: fieldErrors.symptoms?._errors[0] || "",
        appointmentDate: fieldErrors.appointmentDate?._errors[0] || "",
        timeSlot: fieldErrors.timeSlot?._errors[0] || "",
        hasInsurance: fieldErrors.hasInsurance?._errors[0] || "",
        insuranceCompany: fieldErrors.insuranceCompany?._errors[0] || "",
        policyNumber: fieldErrors.policyNumber?._errors[0] || ""
      });
    } else {
      alert("Appointment Booked Successfully!");
      router.push("/success");
    }
  };


  return (
    <div className=" bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full px-6 sm:px-20 md:px-40 lg:px-60 xl:px-80 py-10 bg-white shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-8 text-center text-black">
          Doctor Appointment Form
        </h1>

        {/* Full Name */}
        <div className="mb-6">
          <label htmlFor="fullName" className="block text-sm font-medium text-black mb-2">
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            value={inputValue.username}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            onChange={(e) => setInputValue({ ...inputValue, username: e.target.value })}
          />
          {formErrors.username && (
            <p className="text-red-600 text-sm mt-1">{formErrors.username}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
            Email ID <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={inputValue.emailid}
            placeholder="Enter email ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            onChange={(e) => setInputValue({ ...inputValue, emailid: e.target.value })}
          />
          {formErrors.emailid && (
            <p className="text-red-600 text-sm mt-1">{formErrors.emailid}</p>
          )}
        </div>

        {/* Mobile */}
        <div className="mb-6">
          <label htmlFor="mobile" className="block text-sm font-medium text-black mb-2">
            Mobile <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            id="mobile"
            value={inputValue.mobile}
            placeholder="Enter mobile number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            onChange={(e) => setInputValue({ ...inputValue, mobile: e.target.value })}
          />
          {formErrors.mobile && (
            <p className="text-red-600 text-sm mt-1">{formErrors.mobile}</p>
          )}
        </div>

        {/* Gender */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-black mb-2">
            Gender <span className="text-red-600">*</span>
          </label>
          <div className="flex gap-6 text-black">
            {["male", "female", "other"].map((genderOption) => (
              <label key={genderOption} className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value={genderOption}
                  checked={inputValue.gender === genderOption}
                  onChange={(e) =>
                    setInputValue({ ...inputValue, gender: e.target.value })
                  }
                  className="mr-2"
                />
                {genderOption.charAt(0).toUpperCase() + genderOption.slice(1)}
              </label>
            ))}
          </div>
          {formErrors.gender && (
            <p className="text-red-600 text-sm mt-1">{formErrors.gender}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="mb-6">
          <label htmlFor="dob" className="block text-sm font-medium text-black mb-2">
            Date of Birth <span className="text-red-600">*</span>
          </label>
          <input
            type="date"
            id="dob"
            value={inputValue.dob}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            onChange={(e) => setInputValue({ ...inputValue, dob: e.target.value })}
          />
          {formErrors.dob && (
            <p className="text-red-600 text-sm mt-1">{formErrors.dob}</p>
          )}
        </div>

        {/* Department Dropdown */}
        <div className="mb-6">
          <label htmlFor="department" className="block text-sm font-medium text-black mb-2">
            Department <span className="text-red-600">*</span>
          </label>
          <select
            id="department"
            value={inputValue.department}
            onChange={(e) =>
              setInputValue({
                ...inputValue,
                department: e.target.value,
                doctor: ""
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
          >
            <option value="">Select Department</option>
            {Object.keys(doctorOptions).map(dep => (
              <option key={dep} value={dep}>{dep[0].toUpperCase() + dep.slice(1)}</option>
            ))}
          </select>
          {formErrors.department && (
            <p className="text-red-600 text-sm mt-1">{formErrors.department}</p>
          )}
        </div>

        {/* Doctor Dropdown */}
        {inputValue.department && (
          <div className="mb-6">
            <label htmlFor="doctor" className="block text-sm font-medium text-black mb-2">
              Doctor <span className="text-red-600">*</span>
            </label>
            <select
              id="doctor"
              value={inputValue.doctor}
              onChange={(e) => setInputValue({ ...inputValue, doctor: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            >
              <option value="">Select Doctor</option>
              {doctorOptions[inputValue.department].map((doc) => (
                <option key={doc} value={doc}>{doc}</option>
              ))}
            </select>
            {formErrors.doctor && (
              <p className="text-red-600 text-sm mt-1">{formErrors.doctor}</p>
            )}
          </div>
        )}

        {/* Symptoms Checkboxes */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-black mb-2">
            Symptoms <span className="text-red-600">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2 text-black">
            {symptomsList.map((symptom) => (
              <label key={symptom} className="flex items-center">
                <input
                  type="checkbox"
                  value={symptom}
                  checked={inputValue.symptoms.includes(symptom)}
                  onChange={() => handleCheckboxChange(symptom)}
                  className="mr-2"
                />
                {symptom}
              </label>
            ))}
          </div>
          {formErrors.symptoms && (
            <p className="text-red-600 text-sm mt-1">{formErrors.symptoms}</p>
          )}
        </div>

         {/* Appointment Date & Time */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-black mb-2">
            Appointment Date <span className="text-red-600">*</span>
          </label>
          <input
            type="date"
            value={inputValue.appointmentDate}
            onChange={(e) => setInputValue({ ...inputValue, appointmentDate: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
          />
          {formErrors.appointmentDate && <p className="text-red-600 text-sm">{formErrors.appointmentDate}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-black mb-2">
            Time Slot <span className="text-red-600">*</span>
          </label>
          <select
            value={inputValue.timeSlot}
            onChange={(e) => setInputValue({ ...inputValue, timeSlot: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
          </select>
          {formErrors.timeSlot && <p className="text-red-600 text-sm">{formErrors.timeSlot}</p>}
        </div>

        {/* Insurance */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-black mb-2">
            Do you have insurance? <span className="text-red-600">*</span>
          </label>
          <div className="flex gap-6 text-black">
            {["yes", "no"].map((opt) => (
              <label key={opt} className="flex items-center">
                <input
                  type="radio"
                  name="hasInsurance"
                  value={opt}
                  checked={inputValue.hasInsurance === opt}
                  onChange={(e) => setInputValue({ ...inputValue, hasInsurance: e.target.value })}
                  className="mr-2"
                />
                {opt[0].toUpperCase() + opt.slice(1)}
              </label>
            ))}
          </div>
          {formErrors.hasInsurance && <p className="text-red-600 text-sm">{formErrors.hasInsurance}</p>}
        </div>

        {inputValue.hasInsurance === "yes" && (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-black mb-2">
                Insurance Company <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={inputValue.insuranceCompany}
                onChange={(e) => setInputValue({ ...inputValue, insuranceCompany: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
              />
              {formErrors.insuranceCompany && <p className="text-red-600 text-sm">{formErrors.insuranceCompany}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black mb-2">
                Policy Number <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={inputValue.policyNumber}
                onChange={(e) => setInputValue({ ...inputValue, policyNumber: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
              />
              {formErrors.policyNumber && <p className="text-red-600 text-sm">{formErrors.policyNumber}</p>}
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}
