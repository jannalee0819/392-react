import { getDatabase, ref, get, update } from 'firebase/database';
import { app } from './firebase'; // Assuming you have this configured

const db = getDatabase(app);

const fetchAll = async () => {
  try {
    
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

const updateCourse = async (courseId, updates) => {
    try {
      const updates_formatted = {};
      Object.keys(updates).forEach(key => {
        updates_formatted[`/courses/${courseId}/${key}`] = updates[key];
      });
      
      await update(ref(db), updates_formatted);
      return true;
    } catch (error) {
      throw new Error(`Firebase update error: ${error.message}`);
    }
  };
  
  export { fetchAll, updateCourse };