import { createStyles, Grid, makeStyles, TextField } from "@material-ui/core";
import { useFormik, Field, FormikProvider, FieldArray, Form } from "formik";
import React from "react";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      padding: "4%",
    },
  })
);

export const Form1 = () => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      name: "",
      numbers: [],
    },
    onSubmit: (values) => {
      console.log(`values`, values);
    },
  });

  return (
    <div className={classes.container}>
      <FormikProvider value={formik}>
        <Form>
          <Grid container spacing={2}>
            <Grid item md={3}>
              {"Nombre:"}
            </Grid>
            <Grid item md={9}>
              <Field component={TextField} name={"name"} variant="outlined" />
            </Grid>
            <Grid item md={12}>
              <FieldArray
                name="numbers"
                render={(props: any) => (arrayHelpers: any) => {
                  {
                    formik.values.numbers &&
                    formik.values.numbers.length > 0 ? (
                      formik.values.numbers.map((number, index) => {
                        <div key={index}>
                          <Grid item md={3}>
                            number
                          </Grid>
                          <Grid item md={7}>
                            <Field
                              component={TextField}
                              name={`numbers.${index}`}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item md={2}>
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                            >
                              +
                            </button>
                          </Grid>
                        </div>;
                      })
                    ) : (
                      <div>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                        >
                          {/* show this when user has removed all friends from the list */}
                          Add a friend
                        </button>
                      </div>
                    );
                  }
                }}
              />
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </div>
  );
};
