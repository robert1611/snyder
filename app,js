import { app, database } from './firebase-config.js';
import { ref, set, get } from "firebase/database";

// Test function to write data
async function testConnection() {
  try {
    const testRef = ref(database, 'test');
    await set(testRef, {
      message: "Connection successful!",
      timestamp: Date.now()
    });
    console.log("Data written successfully");
    
    // Read the data back
    const snapshot = await get(testRef);
    console.log("Data read:", snapshot.val());
  } catch (error) {
    console.error("Error testing connection:", error);
  }
}

// Run the test
testConnection();