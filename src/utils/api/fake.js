import JWT from "expo-jwt";

const JWT_SECRET = "dogs_cute";

const users = [
  {
    id: "123456",
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    birthday: new Date(1990, 5, 15),
    email: "johndoe@example.com",
    password: "password123",
    confirm: "password123",
  },
  {
    id: "789012",
    firstName: "Jane",
    lastName: "Smith",
    gender: "Female",
    birthday: new Date(1985, 8, 25),
    email: "janesmith@example.com",
    password: "example123",
    confirm: "example123",
  },
  {
    id: "345678",
    firstName: "Michael",
    lastName: "Johnson",
    gender: "Male",
    birthday: new Date(1983, 10, 7),
    email: "michaeljohnson@example.com",
    password: "test123",
    confirm: "test123",
  },
  {
    id: "901234",
    firstName: "Emily",
    lastName: "Brown",
    gender: "Female",
    birthday: new Date(1992, 3, 30),
    email: "emilybrown@example.com",
    password: "welcome123",
    confirm: "welcome123",
  },
  {
    id: "567890",
    firstName: "David",
    lastName: "Williams",
    gender: "Male",
    birthday: new Date(1988, 7, 12),
    email: "davidwilliams@example.com",
    password: "pass123",
    confirm: "pass123",
  },
  {
    id: "234567",
    firstName: "Sarah",
    lastName: "Davis",
    gender: "Female",
    birthday: new Date(1995, 1, 18),
    email: "sarahdavis@example.com",
    password: "secure123",
    confirm: "secure123",
  },
  {
    id: "890123",
    firstName: "Christopher",
    lastName: "Jones",
    gender: "Male",
    birthday: new Date(1980, 11, 9),
    email: "christopherjones@example.com",
    password: "hello123",
    confirm: "hello123",
  },
  {
    id: "456789",
    firstName: "Amanda",
    lastName: "Wilson",
    gender: "Female",
    birthday: new Date(1987, 4, 22),
    email: "amandawilson@example.com",
    password: "world123",
    confirm: "world123",
  },
];

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
