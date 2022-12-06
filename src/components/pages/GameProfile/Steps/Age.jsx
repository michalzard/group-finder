import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Sova from "../../../../assets/valorant/sova.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAge } from "../../../../redux/slices/profileCreation";

function FourthStep({ game, nextStep }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ageValidationSchema = yup.object().shape({
    age: yup.number().min(16).max(90).required(),
  });
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        age: 18,
      },
      validationSchema: ageValidationSchema,
      onSubmit: (values, actions) => {
        dispatch(setAge(values.age));
        navigate(`/creation/${game}/${nextStep}`);
        actions.resetForm();
      },
    });
  return (
    <section className="age-step">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${Sova})` }}
      />
      <form onSubmit={handleSubmit} className="age-info">
        <Typography variant="h5">Confirm your age</Typography>
        <TextField
          placeholder="Enter your age"
          type="number"
          name="age"
          InputLabelProps={{
            shrink: true,
          }}
          value={values.age}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.age)}
          helperText={touched.age && errors.age ? errors.age : ""}
        />
        <Button type="submit" variant="outlined" color="secondary">
          Continue
        </Button>
      </form>
    </section>
  );
}

export default FourthStep;
