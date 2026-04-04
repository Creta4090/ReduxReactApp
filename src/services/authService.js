// Login function using dummyjson API
export const loginUser = async (credentials) => {
  try {
    // Validate username and password are not empty
    if (!credentials.username || credentials.username.trim() === '') {
      throw new Error('Username is required');
    }

    if (!credentials.password || credentials.password.trim() === '') {
      throw new Error('Password is required');
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Fetch users from dummyjson API
    const response = await fetch('https://dummyjson.com/users');
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await response.json();
    const users = data.users || [];

    // Find user with matching username and password
    const user = users.find(
      (u) => u.username === credentials.username && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid username or password');
    }

    // Generate a mock JWT token
    const token = 'jwt_token_' + user.id + '_' + Date.now();

    // Return user data and token
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    };
  } catch (err) {
    throw new Error(err.message || 'Login failed. Please try again.');
  }
};