import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://bit.ly/3lDWvQ8")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const[user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate  = useNavigate();

  // const handleChange = ({ currentTarget: input }) => {
  //   setUser({ ...user, [input.name]: input.value});
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try{
  //     const url = "http://localhost:5000/api/auth/register";
  //     const {data:res} = await axios.post(url.data);
  //     navigate("/login");
  //   }catch(error){

  //   }
  // }

  const handleChange = e => {
    const {name ,value} = e.target;
    
    setUser({...user, [name]:value});
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const { username, email, password } = user;

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type" : "application/json"},
      body: JSON.stringify({
        username, email, password
      })
    });
    const data = await res.json();

    if(res.status === 500 || !data){
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration Successfull");
      console.log("Registration Successfull");

      navigate("/login");
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form method="POST">
          <Input 
            placeholder="username" 
            type="text"
            name="username"
            value={user.username}
            required
            onChange={handleChange}
          />
          <Input placeholder="email" 
            type="email"
            name="email"
            value={user.email}
            required
            onChange={handleChange}
          />
          <Input placeholder="password" 
            type="password"
            name="password"
            value={user.password}
            required
            onChange={handleChange}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit" onClick={handleClick} >CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
