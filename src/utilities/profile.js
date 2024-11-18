import { getDatabase, ref, get, set } from 'firebase/database';

export const getUserProfile = async (uid) => {
  if (!uid) return null;
  const db = getDatabase();
  const userRef = ref(db, `users/${uid}`);
  const snapshot = await get(userRef);
  return snapshot.val();
};

export const createUserProfile = async (user) => {
  if (!user) return null;
  
  const db = getDatabase();
  const userRef = ref(db, `users/${user.uid}`);
  
  // Check if user already exists
  const snapshot = await get(userRef);
  if (!snapshot.exists()) {
    // Create new user profile with default values
    const newProfile = {
      email: user.email,
      name: user.displayName,
      isAdmin: false,  
    };
    
    try {
      await set(userRef, newProfile);
      return { ...newProfile, id: user.uid };
    } catch (error) {
      console.error("Error creating user profile:", error);
      throw error;
    }
  }
  
  return snapshot.val();
};

export const isAdmin = async (uid) => {
  const profile = await getUserProfile(uid);
  return profile?.isAdmin === true;
};