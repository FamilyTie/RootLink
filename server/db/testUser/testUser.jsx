// Import necessary modules and dependencies
import User from "./db/models/User";

// Function to create test users
async function createTestUsers() {
  try {
    // Create test user data
    const testUsers = [
      { username: "user1", email: "user1@example.com", password: "password1" },
      { username: "user2", email: "user2@example.com", password: "password2" },
      // Add more test users as needed
    ];

    // Insert test users into the database
    for (const userData of testUsers) {
      await User.create(userData);
    }

    console.log("Test users created successfully");
  } catch (error) {
    console.error("Error creating test users:", error);
  }
}

// Call the function to create test users
createTestUsers();
