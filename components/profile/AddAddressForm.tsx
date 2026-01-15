import React, { useState } from 'react';

const AddAddressForm = ({ onCancel, onSave }: { onCancel: () => void, onSave: (address: any) => void }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: 'Australia',
    address1: '',
    address2: '',
    city: '',
    state: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [warning, setWarning] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};
    
    // Validate all required fields (excluding address2 and phone which were marked optional)
    const requiredFields = ['firstName', 'lastName', 'country', 'address1', 'city', 'state'];
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setWarning('Please fill in all required details before saving.');
      return;
    }

    setWarning('');
    // Save to local storage so it can be retrieved during checkout
    const savedAddresses = JSON.parse(localStorage.getItem('user_addresses') || '[]');
    const updatedAddresses = [...savedAddresses, { ...formData, id: Date.now() }];
    localStorage.getItem('user_addresses');
    localStorage.setItem('user_addresses', JSON.stringify(updatedAddresses));
    
    onSave(formData);
  };

  // Helper function to apply your specific styling logic
  const getInputClass = (fieldName: string) => `
    w-full bg-transparent border p-4 outline-none transition-colors 
    ${errors[fieldName] 
      ? 'border-red-600 placeholder-red-600' 
      : 'border-[#280F0B66] focus:border-[#280F0B] placeholder-[#280F0B80]'
    }
  `;

  return (
    <div className="w-full max-w-2xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
      <div className="flex justify-between items-baseline mb-8 border-b border-[#280F0B]/10 pb-4">
        <h2 className="text-3xl font-bold font-manrope text-[#280F0B]">Shipping address</h2>
      </div>

      {warning && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 text-sm font-bold tracking-widest">
          {warning}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="firstName" placeholder="First name" className={getInputClass('firstName')} onChange={handleChange} />
          <input name="lastName" placeholder="Last name" className={getInputClass('lastName')} onChange={handleChange} />
        </div>

        <select name="country" className={getInputClass('country')} onChange={handleChange} value={formData.country}>
          <option value="Australia">Australia</option>
        </select>

        <div className="space-y-2">
          <input name="address1" placeholder="House number and street name" className={getInputClass('address1')} onChange={handleChange} />
          <input name="address2" placeholder="Apartment, suite, unit, etc. (optional)" className={getInputClass('address2')} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="city" placeholder="Town / City" className={getInputClass('city')} onChange={handleChange} />
          <select name="state" className={getInputClass('state')} onChange={handleChange}>
            <option value="">Choose a state</option>
            <option value="NSW">New South Wales</option>
            <option value="VIC">Victoria</option>
            <option value="SA">South Australia</option>
            <option value="WA">Western Australia</option>
            <option value="QLD">Queensland</option>
            <option value="TAS">Tasmania</option>
          </select>
        </div>
        <input name="postcode" placeholder="Postcode" className={getInputClass('postcode')} onChange={handleChange} />
        <input name="phone" placeholder="Phone (optional)" className={getInputClass('phone')} onChange={handleChange} />

        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <button type="submit" className="bg-[#7F3E2F] text-[#FCF3E5] px-12 py-5 font-bold tracking-[1.12px] hover:brightness-110 transition-all uppercase text-sm">
            SAVE ADDRESS
          </button>
          <button type="button" onClick={onCancel} className="text-[#280F0B] px-12 py-5 font-bold tracking-[1.12px] uppercase text-sm hover:underline">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;