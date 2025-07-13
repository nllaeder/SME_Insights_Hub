"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  updateProfile,
  type User 
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<any>;
  signUpWithEmail: (name: string, email: string, pass: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function createUserDocument(user: User, additionalData: { displayName: string }) {
    if (!user) return;
  
    const userRef = doc(db, `users/${user.uid}`);
    const snapshot = await getDoc(userRef);
  
    if (!snapshot.exists()) {
      const { email, uid } = user;
      const { displayName } = additionalData;
      const createdAt = new Date();
  
      try {
        await setDoc(userRef, {
          uid,
          displayName,
          email,
          createdAt,
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUpWithEmail = async (name: string, email: string, pass: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const firebaseUser = userCredential.user;
    
    // Update Firebase Auth profile
    await updateProfile(firebaseUser, { displayName: name });
    
    // Create user document in Firestore
    await createUserDocument(firebaseUser, { displayName: name });

    // Refresh user state to get updated profile
    setUser({ ...firebaseUser, displayName: name });
    return userCredential;
  };

  const signInWithEmail = (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    
    // Create user document if they are a new user
    await createUserDocument(userCredential.user, { displayName: userCredential.user.displayName || 'Google User' });
    
    return userCredential;
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    router.push('/');
  };

  const value = {
    user,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
