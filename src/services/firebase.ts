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
export const publishWebsite = async (
  subdomain: string, 
  data: GeneratedWebsiteData | null, 
  logoUrl?: string, 
  templateUrl?: string,
  templateCategory?: string,
  websiteType?: string,
  businessCategory?: string
) => {
  const cleanSub = subdomain.toLowerCase().trim();
  
  // Strip undefined values which cause "invalid nested entity" in Firestore
  const cleanData = data ? JSON.parse(JSON.stringify(data)) : null;

  const sitePayload = {
    type: templateUrl ? 'html_template' : 'ai_generated',
    data: cleanData,
    templateUrl: templateUrl || null,
    logoUrl: logoUrl || null,
    templateCategory: templateCategory || null,
    websiteType: websiteType || null,
    businessCategory: businessCategory || null,
    publishedAt: new Date().toISOString(),
  };

  // 1. Save local backup instantly
  try {
    localStorage.setItem(`published_site_${cleanSub}`, JSON.stringify(sitePayload));
    localStorage.setItem('last_published_site', JSON.stringify({ subdomain: cleanSub, ...sitePayload }));
  } catch (e) {
    console.warn("Could not save to localStorage backup", e);
  }

  // 2. Persist to Firestore
  try {
    const siteRef = doc(db, "publishedSites", cleanSub);
    await setDoc(siteRef, sitePayload);
  } catch (err) {
    console.error("Firestore publish error:", err);
    // Don't throw if local backup succeeded
  }
};

// Retrieve website from database
export const getPublishedWebsite = async (subdomain: string) => {
  const cleanSub = subdomain.toLowerCase().trim();

  // 1. Try Firebase Firestore
  try {
    const siteRef = doc(db, "publishedSites", cleanSub);
    const snap = await getDoc(siteRef);
    if (snap.exists()) {
      return snap.data();
    }
  } catch (err) {
    console.warn("Firestore fetch error, attempting local storage fallback:", err);
  }

  // 2. Fallback to LocalStorage
  try {
    const local = localStorage.getItem(`published_site_${cleanSub}`);
    if (local) {
      return JSON.parse(local);
    }
    const last = localStorage.getItem('last_published_site');
    if (last) {
      const parsed = JSON.parse(last);
      if (parsed.subdomain === cleanSub) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Error reading local backup:", e);
  }

  return null;
};
