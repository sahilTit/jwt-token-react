import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import CustomFormControl from "../components/Inputs";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const MyForm = ({ fieldConfig, onSubmit }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const initialFormData = {};
    Object.keys(fieldConfig).forEach((field) => {
      initialFormData[field] = "";
    });
    return initialFormData;
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: fieldConfig[name].validation,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    Object.keys(fieldConfig).forEach((field) => {
      const { type, validation } = fieldConfig[field];
      const value = formData[field];

      if (
        (type !== "select" && !value) ||
        (type === "select" && value === "")
      ) {
        newErrors[field] = validation;
      }

      if (
        type === "number" &&
        value !== "" &&
        (parseFloat(value) < 0 || isNaN(value))
      ) {
        newErrors[field] = "Value should not be negative";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      if (onSubmit) {
        try {
          const headers = {
            "Content-Type": "application/json",
          };
          const response = await axios.post(
            "http://localhost:5000/api/login",
            JSON.stringify(formData),
            { headers: headers, withCredentials: true }
          );
          console.log(response.data.access_token)
          const token  = response.data.access_token;
          if (token) {
            localStorage.setItem("authToken", token);
            console.log("Token saved:", token);
            navigate('/dashboard')
          }
          onSubmit(formData);
        } catch (error) {
          console.log("Login failed. Please check your credentials.", error);
        }
      }
    }
  };



  return (
    <Container className="">
      <h1 className="my-4">JWT Login Form</h1>
      <Form onSubmit={handleSubmit}>
        {Object.keys(fieldConfig).map((field) => (
          <Row className="mb-3" key={field}>
            <Col>
              <Form.Group
                controlId={`form${field.charAt(0).toUpperCase() + field.slice(1)
                  }`}
              >
                <Form.Label>{fieldConfig[field].label}</Form.Label>
                {fieldConfig[field].type === "select" ? (
                  <Form.Select
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors[field]}
                  >
                    {fieldConfig[field].options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                ) : (
                  <CustomFormControl
                    type={fieldConfig[field].type}
                    placeholder={fieldConfig[field].placeholder}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors[field]}
                    errorMessage={errors[field]}
                  />
                )}
                <Form.Control.Feedback type="invalid">
                  {errors[field]}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        ))}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

MyForm.propTypes = {
  fieldConfig: PropTypes.objectOf(
    PropTypes.shape({
      type: PropTypes.oneOf(["text", "email", "number", "select", "password"])
        .isRequired,
      placeholder: PropTypes.string,
      label: PropTypes.string.isRequired,
      validation: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default MyForm;
