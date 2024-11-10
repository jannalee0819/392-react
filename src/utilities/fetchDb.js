import { getDatabase, ref, get } from 'firebase/database';
import { app } from './firebase'; // Assuming you have this configured

const fetchAll = async () => {
  try {
    const db = getDatabase(app);
    const dbRef = ref(db);
    const snapshot = await get(dbRef);
    if (!snapshot.exists()) {
      return null;
    }
    
    return snapshot.val();
  } catch (error) {
    throw new Error(`Firebase fetch error: ${error.message}`);
  }
};

export default fetchAll;