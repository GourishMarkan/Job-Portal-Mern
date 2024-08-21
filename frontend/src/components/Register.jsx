import React from "react";
import { useState } from "react";
import { Form } from "react-router-dom";
const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: 0,
    address: "",
    firstNiche: "",
    secondNiche: "",
    thirdNiche: "",
    role: "",
    coverLetter: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          required
        />
      </Form>
    </div>
  );
};

export default Register;
