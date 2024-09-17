// src/components/CustomFormControl.js
import PropTypes from 'prop-types'; // Import PropTypes
import { Form } from 'react-bootstrap';

const CustomFormControl = ({ 
  type = 'text', 
  placeholder = '', 
  name, 
  value, 
  onChange, 
  onBlur, 
  isInvalid = false, 
  errorMessage = '', 
  ...props 
}) => (
  <Form.Group controlId={`form${name.charAt(0).toUpperCase() + name.slice(1)}`}>
    <Form.Control
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      isInvalid={isInvalid}
      {...props}
    />
    <Form.Control.Feedback type="invalid">
      {errorMessage}
    </Form.Control.Feedback>
  </Form.Group>
);

// PropTypes validation
CustomFormControl.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'number']).isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string
};

export default CustomFormControl;
