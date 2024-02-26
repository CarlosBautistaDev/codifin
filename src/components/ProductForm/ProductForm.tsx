import React, { useContext, useState } from "react";
import { Formik, Form, ErrorMessage, Field, FieldProps } from "formik";
import ProductContext, { Product } from "../../context/ProductContext";
import { TextField, Button, Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import { v4 as uuidv4 } from "uuid";

interface ProductError {
  name?: string;
  price?: string;
  image?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  container: {
    backgroundColor: "#d0d0d0",
    padding: theme.spacing(4),
    borderRadius: "25px",
    maxWidth: "600px",
    color: "#393939",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  fileInput: {
    display: "none",
  },
  fileLabel: {
    padding: theme.spacing(1),
    backgroundColor: "darkgray",
    color: "black",
    borderRadius: "5px",
    cursor: "pointer",
  },
  submitButton: {
    margin: theme.spacing(2),
    backgroundColor: "gray", 
    color: "white", 
    "&:hover": {
      backgroundColor: "darkgray", 
    },
  },
  imagePreview: {
    maxWidth: "200px",
    height: "auto",
  },
}));

const validateValues = (values: Product): ProductError => {
  const errors: ProductError = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length < 2) {
    errors.name = "Too Short!";
  } else if (values.name.length > 50) {
    errors.name = "Too Long!";
  }

  if (!values.price || values.price < 1) {
    errors.price = "Too low!";
  }

  if (!values.image) {
    errors.image = "A file is required";
  }

  return errors;
};

const ProductForm: React.FC = () => {
  const classes = useStyles();
  const context = useContext(ProductContext);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  if (!context) {
    throw new Error("ProductForm must be used within a ProductProvider");
  }

  const { setProducts } = context;

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: File | null,
      shouldValidate?: boolean
    ) => void
  ) => {
    if (event.currentTarget.files && event.currentTarget.files.length > 0) {
      setFieldValue("image", event.currentTarget.files[0]);
      setImagePreview(URL.createObjectURL(event.currentTarget.files[0]));
    } else {
      setFieldValue("image", null);
      setImagePreview(null);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h1>New Product</h1>
        <Formik
          initialValues={{ id: "0", name: "", price: 0, image: null }}
          validate={validateValues}
          onSubmit={(values: Product, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            if (values.image) {
              setProducts((prevProducts: Product[]) => {
                const newProduct = { ...values, id: uuidv4() as string }; 
                const newProducts = [...prevProducts, newProduct];
                return newProducts;
              });
              console.log(values);
              setTimeout(() => {
                resetForm();
                setSubmitting(false);
                setImagePreview(null);
                setSubmitSuccess(true);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
                setTimeout(() => setSubmitSuccess(false), 3000);
              }, 2000);
            } else {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className={classes.form}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Field name="name">
                    {({ field, meta }: FieldProps) => (
                      <TextField
                        {...field}
                        type="text"
                        label="Name"
                        color="primary"
                        variant="outlined"
                        error={meta.touched && !!meta.error}
                        helperText={meta.touched ? meta.error : ""}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="name" component="div" />
                </Grid>
                <Grid item xs={6}>
                  <Field name="price">
                    {({ field, meta }: FieldProps) => (
                      <TextField
                        {...field}
                        type="number"
                        label="Price ($)"
                        color="primary"
                        variant="outlined"
                        error={meta.touched && !!meta.error}
                        helperText={meta.touched ? meta.error : ""}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="price" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="file" className={classes.fileLabel}>
                    Choose file
                    <input
                      ref={fileInputRef}
                      id="file"
                      name="file"
                      type="file"
                      className={classes.fileInput}
                      onChange={(event) =>
                        handleImageChange(event, setFieldValue)
                      }
                    />
                  </label>
                  <ErrorMessage name="image" component="div" />
                </Grid>
                <Grid item xs={12}>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className={classes.imagePreview}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={classes.submitButton}
                  >
                    {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
                  </Button>
                </Grid>
              </Grid>
              {submitSuccess && (
                <Alert severity="success">Product successfully added!</Alert>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProductForm;
