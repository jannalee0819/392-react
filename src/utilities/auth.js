import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useState, useEffect } from "react";
import { createUserProfile } from './profile';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    return auth.onAuthStateChanged((user) => {
      if (user) {
        createUserProfile(user)
          .then(() => {
            setUser(user);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error handling user profile:", error);
            setUser(user);
            setLoading(false);
          });
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

  const signIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await createUserProfile(result.user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const signOutUser = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return { user, loading, signIn, signOut: signOutUser };
};