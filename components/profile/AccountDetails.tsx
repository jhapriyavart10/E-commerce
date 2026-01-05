'use client';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FormState {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  currentPass: string;
  newPass: string;
  confirmPass: string;
}

const InputField = ({ 
  label, 
  field, 
  type = "text", 
  value, 
  error, 
  onChange 
}: { 
  label: string, 
  field: keyof FormState, 
  type?: string, 
  value: string, 
  error?: string, 
  onChange: (field: keyof FormState, value: string) => void 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  return (
    // min-h-[82px] ensures the layout stays stable even when the 20px error text appears
    <div className="w-full flex flex-col gap-1 min-h-[82px]">
      <div className="relative w-full">
        <input
          type={isPasswordField ? (showPassword ? "text" : "password") : type}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          // Added placeholder:text-[#280F0B80] for the specific color requirement
          className={`w-full bg-transparent border p-4 pr-12 outline-none transition-all duration-300
            placeholder:text-[#280F0B80]
            ${error ? 'border-red-500' : 'border-[#280F0B33] focus:border-[#280F0B]'} 
            text-[#280F0B] font-manrope`}
        />
        
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#280F0B] opacity-50 hover:opacity-100 transition-opacity"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {/* Error message is absolute positioned to avoid pushing the layout down */}
      <div className="h-5 relative">
        {error && <span className="text-red-500 text-[10px] absolute top-0 left-0 animate-in fade-in slide-in-from-top-1">{error}</span>}
      </div>
    </div>
  );
};

const AccountDetails = () => {
  const [formData, setFormData] = useState<FormState>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    currentPass: '',
    newPass: '',
    confirmPass: '',
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = () => {
    const newErrors: Partial<FormState> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if any field is empty (Mandatory check)
    (Object.keys(formData) as Array<keyof FormState>).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1).replace(/Pass/g, ' password')} is required`;
      }
    });

    // Specific logic checks (only if fields aren't empty)
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Check if passwords match
    if (formData.newPass && formData.confirmPass && formData.newPass !== formData.confirmPass) {
      newErrors.confirmPass = 'Passwords do not match';
    }

    if (formData.newPass && formData.newPass.length < 8) {
      newErrors.newPass = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for that specific field as the user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert('Changes saved successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <section className="mb-6">
        <h2 className="font-manrope font-bold text-[20px] md:text-[24px] leading-[100%] tracking-[-0.5px] text-[#280F0B] mb-6">
          Primary Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <InputField label="First name" field="firstName" value={formData.firstName} error={errors.firstName} onChange={handleInputChange} />
          <InputField label="Last name" field="lastName" value={formData.lastName} error={errors.lastName} onChange={handleInputChange} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <InputField label="Username" field="username" value={formData.username} error={errors.username} onChange={handleInputChange} />
          <InputField label="Email Address" field="email" type="email" value={formData.email} error={errors.email} onChange={handleInputChange} />
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-manrope font-bold text-[20px] md:text-[24px] leading-[100%] tracking-[-0.5px] text-[#280F0B] mb-6">
          Change Password
        </h2>
        <div className="flex flex-col">
          <InputField label="Current password" field="currentPass" type="password" value={formData.currentPass} error={errors.currentPass} onChange={handleInputChange} />
          <InputField label="New password" field="newPass" type="password" value={formData.newPass} error={errors.newPass} onChange={handleInputChange} />
          <InputField label="Confirm new password" field="confirmPass" type="password" value={formData.confirmPass} error={errors.confirmPass} onChange={handleInputChange} />
        </div>
      </section>

      <button 
        type="submit"
        className="bg-[#B68D73] text-white px-12 py-3 font-medium tracking-[0.1em] hover:bg-[#7F3E2F] transition-all uppercase text-sm w-full md:w-auto mt-4"
      >
        Save Changes
      </button>
    </form>
  );
};

export default AccountDetails;