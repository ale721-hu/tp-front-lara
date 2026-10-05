import { useState } from "react";


export default function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setTouched((t) => ({ ...t, [name]: true }));
    if (validate) setErrors(validate({ ...values, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    if (validate) setErrors(validate(values));
  }

  function reset(nextValues = initialValues) {
    setValues(nextValues);
    setTouched({});
    setErrors({});
  }

  function canSubmit() {
    if (!validate) return true;
    const errs = validate(values);
    setErrors(errs);
    const allTouched = Object.keys(values).reduce((acc, k) => {
      acc[k] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    return Object.keys(errs).length === 0;
  }

  return { values, errors, touched, handleChange, handleBlur, reset, canSubmit };
}
