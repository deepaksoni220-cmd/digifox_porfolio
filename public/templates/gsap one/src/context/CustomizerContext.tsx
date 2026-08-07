import React, { createContext, useContext, useState, useEffect } from 'react';
import { BRAND_NAME } from '../constants';

interface CustomizerData {
  brandName: string;
  logoUrl: string | null;
  phone: string;
  email: string;
  address: string;
}

const CustomizerContext = createContext<CustomizerData>({
  brandName: BRAND_NAME,
  logoUrl: null,
  phone: '',
  email: '',
  address: ''
});

export const CustomizerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brandName, setBrandName] = useState(BRAND_NAME);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Read query params for initial sync values if any
    const params = new URLSearchParams(window.location.search);
    const initialBrandName = params.get('brandName') || params.get('title');
    if (initialBrandName) setBrandName(initialBrandName);

    const handleMessage = (event: MessageEvent) => {
      const msg = event.data;
      if (msg) {
        if (msg.type === 'SYNC_DATA' && msg.data) {
          const sync = msg.data;
          if (sync.hero?.title) setBrandName(sync.hero.title);
          if (sync.contactDetails?.brandName) setBrandName(sync.contactDetails.brandName);
          if (sync.logoUrl) setLogoUrl(sync.logoUrl);
          if (sync.contactDetails?.logoUrl) setLogoUrl(sync.contactDetails.logoUrl);
          if (sync.contactDetails?.phone) setPhone(sync.contactDetails.phone);
          if (sync.contactDetails?.email) setEmail(sync.contactDetails.email);
          if (sync.contactDetails?.address) setAddress(sync.contactDetails.address);
        } else if (msg.type === 'UPDATE_FIELD') {
          const { field, value } = msg;
          if (field === 'brandName') setBrandName(value);
          if (field === 'logo') setLogoUrl(value);
          if (field === 'phone') setPhone(value);
          if (field === 'email') setEmail(value);
          if (field === 'address') setAddress(value);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <CustomizerContext.Provider value={{ brandName, logoUrl, phone, email, address }}>
      {children}
    </CustomizerContext.Provider>
  );
};

export const useCustomizer = () => useContext(CustomizerContext);
