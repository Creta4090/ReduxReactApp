// Utility to fetch and display sample users from dummyjson API
export const getSampleUsers = async () => {
  try {
    const response = await fetch('https://dummyjson.com/users');
    const data = await response.json();
    const users = data.users || [];
    
    // Get first 4 users with their credentials
    const sampleUsers = users.slice(0, 4).map(user => ({
      username: user.username,
      password: user.password,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    }));
    
    return sampleUsers;
  } catch (error) {
    console.error('Failed to fetch sample users:', error);
    return [];
  }
};

// Log sample users to console
export const logSampleUsers = async () => {
  const users = await getSampleUsers();
  console.log('📋 Sample Login Credentials:');
  console.table(users);
  return users;
};