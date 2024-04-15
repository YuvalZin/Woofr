export const fakeLogin = (email, password) => {
  for (const user of users) {
    if (user.email === email && user.password === password) {
      const token = JWT.encode({ userId: user.id }, JWT_SECRET);
      return { status: true, value: token };
    }
  }
  return null;
};

export const fakeLoginWithToken = (token) => {
  return Promise.resolve({
    status: true,
    value: {
      id: "456789",
      firstName: "Amanda",
      lastName: "Wilson",
      gender: "Female",
      birthday: new Date(1987, 4, 22).toISOString(),
      email: "amandawilson@example.com",
      password: "world123",
      confirm: "world123",
    },
  });
};

export const fakeRegister = async (newUser) => {
  users.forEach((user) => {
    if (user.email === newUser.email) {
      return { status: false, value: "email already exists" };
    }
  });

  // Add the new user to the users array
  users.push(newUser);

  const token = JWT.encode({ userId: newUser.id }, JWT_SECRET);

  // Return the newly registered user
  return { status: true, value: token };
};
