// components/AccountDetails.tsx
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
    
    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password Matching Validation
    if (formData.newPass !== formData.confirmPass) {
      newErrors.confirmPass = 'Passwords do not match';
    }

    // Minimum length for new password
    if (formData.newPass && formData.newPass.length < 8) {
      newErrors.newPass = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing again
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Submitted Successfully', formData);
      alert('Changes saved successfully!');
    }
  };

  const InputField = ({ label, field, type = "text" }: { label: string, field: keyof FormState, type?: string }) => (
    <div className="w-full flex flex-col gap-1">
      <input
        type={type}
        placeholder={label}
        value={formData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className={`w-full bg-transparent border ${errors[field] ? 'border-red-500' : 'border-[#3D1F16]/30'} px-4 py-3 text-[#3D1F16] placeholder-[#3D1F16]/50 focus:outline-none focus:border-[#3D1F16] transition-colors`}
      />
      {errors[field] && <span className="text-red-500 text-xs mt-1">{errors[field]}</span>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl animate-in fade-in duration-500">
      {/* Primary Details */}
      <section className="mb-10">
        <h2 className="text-2xl font-manrope text-[#280F0B] mb-6">Primary Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <InputField label="First name" field="firstName" />
          <InputField label="Last name" field="lastName" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Username" field="username" />
          <InputField label="Email Address" field="email" type="email" />
        </div>
      </section>

      {/* Change Password */}
      <section className="mb-10">
        <h2 className="text-2xl font-manrope text-[#280F0B] mb-6">Change Password</h2>
        <div className="flex flex-col gap-4">
          <InputField label="Current password" field="currentPass" type="password" />
          <InputField label="New password" field="newPass" type="password" />
          <InputField label="Confirm new password" field="confirmPass" type="password" />
        </div>
      </section>

      <button 
        type="submit"
        className="bg-[#B68D73] text-white px-12 py-3 font-medium tracking-widest hover:bg-[#7F3E2F] transition-colors uppercase text-sm w-full md:w-auto"
      >
        Save Changes
      </button>
    </form>
  );
};

export default AccountDetails;