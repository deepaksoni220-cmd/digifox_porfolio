import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import type { GeneratedWebsiteData } from "./aiBuilderService";

const firebaseConfig = {
  projectId: "digifox-builder-db",
  appId: "1:63784108856:web:b2d7e54f816c4e1c7ff7cd",
  storageBucket: "digifox-builder-db.firebasestorage.app",
  apiKey: "AIzaSyC2OMUeAAB8rUzIkjqfF-9RJWDgvD1gEDU",
  authDomain: "digifox-builder-db.firebaseapp.com",
  messagingSenderId: "63784108856",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Save generated website to database
export const publishWebsite = async (subdomain: string, data: GeneratedWebsiteData, logoUrl?: string) => {
  const siteRef = doc(db, "publishedSites", subdomain.toLowerCase());
  await setDoc(siteRef, {
    data,
    logoUrl: logoUrl || null,
    publishedAt: new Date().toISOString(),
  });
};

// Retrieve website from database
export const getPublishedWebsite = async (subdomain: string) => {
  const siteRef = doc(db, "publishedSites", subdomain.toLowerCase());
  const snap = await getDoc(siteRef);
  if (snap.exists()) {
    return snap.data();
  }
  return null;
};
