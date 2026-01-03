import React, { useState } from 'react';

interface FormState {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  currentPass: string;
  newPass: string;
  confirmPass: string;
}

// 1. MOVE THIS OUTSIDE THE MAIN COMPONENT
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
}) => (
  <div className="w-full flex flex-col gap-1">
    <input
      type={type}
      placeholder={label}
      value={value}
      onChange={(e) => onChange(field, e.target.value)}
      className={`w-full bg-transparent border p-4 outline-none transition-colors 
        ${error 
          ? 'border-red-600 placeholder-red-600 text-red-600' 
          : 'border-[#280F0B66] focus:border-[#280F0B] placeholder-[#280F0B66] text-[#280F0B]'
        }`}
    />
    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
  </div>
);

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
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.newPass !== formData.confirmPass) {
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
      {/* Primary Details */}
      <section className="mb-10">
        {/* Responsive Header to match your previous design requirements */}
        <h2 className="font-manrope font-bold text-[20px] md:text-[24px] leading-[100%] tracking-[-0.5px] text-[#280F0B] mb-6">
          Primary Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <InputField 
            label="First name" 
            field="firstName" 
            value={formData.firstName} 
            error={errors.firstName} 
            onChange={handleInputChange} 
          />
          <InputField 
            label="Last name" 
            field="lastName" 
            value={formData.lastName} 
            error={errors.lastName} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField 
            label="Username" 
            field="username" 
            value={formData.username} 
            error={errors.username} 
            onChange={handleInputChange} 
          />
          <InputField 
            label="Email Address" 
            field="email" 
            type="email" 
            value={formData.email} 
            error={errors.email} 
            onChange={handleInputChange} 
          />
        </div>
      </section>

      {/* Change Password */}
      <section className="mb-10">
        <h2 className="font-manrope font-bold text-[20px] md:text-[24px] leading-[100%] tracking-[-0.5px] text-[#280F0B] mb-6">
          Change Password
        </h2>
        <div className="flex flex-col gap-4">
          <InputField 
            label="Current password" 
            field="currentPass" 
            type="password" 
            value={formData.currentPass} 
            error={errors.currentPass} 
            onChange={handleInputChange} 
          />
          <InputField 
            label="New password" 
            field="newPass" 
            type="password" 
            value={formData.newPass} 
            error={errors.newPass} 
            onChange={handleInputChange} 
          />
          <InputField 
            label="Confirm new password" 
            field="confirmPass" 
            type="password" 
            value={formData.confirmPass} 
            error={errors.confirmPass} 
            onChange={handleInputChange} 
          />
        </div>
      </section>

      <button 
        type="submit"
        className="bg-[#B68D73] text-white px-12 py-3 font-medium tracking-[0.1em] hover:bg-[#7F3E2F] transition-colors uppercase text-sm w-full md:w-auto"
      >
        Save Changes
      </button>
    </form>
  );
};

export default AccountDetails;