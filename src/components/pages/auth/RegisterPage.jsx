import { Autocomplete, Button, createFilterOptions, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../../redux/reducers/userReducers";
import "./RegisterPage.scss";
import * as yup from "yup";
import { useFormik } from "formik";

import Countries from "../countries.json";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  useEffect(()=>{
  if(isLoggedIn) navigate("/dashboard");
  },[isLoggedIn,navigate]);

  const parseCountries=(countries)=>{
    //expected format "AF" : "Afghanistan"
    const countryCode = Object.keys(countries);
    const countryName = Object.values(countries);
    const countryArray =[];
    for(let i=0;i<countryCode.length;i++){
      countryArray.push({code:countryCode[i],label:countryName[i]});
    }
    return countryArray;
  }


  const registerValidationSchema = yup.object().shape({
    email:yup.string().email("Enter valid email").required(),
    username:yup.string().min(2).max(20).required(),
    location:yup.string().notRequired(),
    password:yup.string().required().min(5),
    confirmPassword:yup.string().required().oneOf([yup.ref("password")],"Passwords need to match"),
  });

  const {errors,values,touched,handleChange,handleBlur,handleSubmit,isSubmitting,setFieldValue} = useFormik({
    initialValues:{
      email:"",
      username:"",
      location:"",
      password:"",
      confirmPassword:"",
    },
    validationSchema:registerValidationSchema,
    onSubmit:(values,actions)=>{
      dispatch(userRegister({email:values.email,username:values.username,password:values.password}));
      actions.resetForm();
    }
  })

  return (
    <section className="Register">
      <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>Register</Typography>
        <TextField placeholder="Username" name="username" value={values.username} fullWidth onChange={handleChange} onBlur={handleBlur}
        error={Boolean(errors.username && touched.username)} helperText={touched.username ? errors.username : ""}
        />

        <TextField placeholder="Email" name="email" type="email" value={values.email} fullWidth onChange={handleChange} onBlur={handleBlur}
        error={Boolean(errors.email && touched.email)} helperText={touched.email ? errors.email : ""}
        />
       
        <Autocomplete
        id="filter-location"
        options={parseCountries(Countries).map(country=>country.label)}
        filterOptions={createFilterOptions({matchFrom:"any",limit:252})}
        renderInput={(params)=><TextField {...params} label="Select Country"/>}
        onChange={(e,value)=>{setFieldValue("location",value);}}
        />

        <TextField placeholder="Password" name="password" type="password" fullWidth  value={values.password} onChange={handleChange} onBlur={handleBlur}
        error={Boolean(errors.password && touched.password)} helperText={touched.password ? errors.password : ""}/>
        <TextField placeholder="Confirm Password" name="confirmPassword" type="password" fullWidth value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur}
        error={Boolean(errors.confirmPassword && touched.confirmPassword)} helperText={touched.confirmPassword ? errors.confirmPassword : ""} />
        <section className="form-footer">
        <Button variant="outlined" disabled={isSubmitting} type="submit">Register</Button>
        <Typography variant="subtitle2" onClick={()=>{navigate("/login")}}>
          Already have account? Login
        </Typography>
        </section>
      </form>
    </section>
  );
}

export default RegisterPage;
