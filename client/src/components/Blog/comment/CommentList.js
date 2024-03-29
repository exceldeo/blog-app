import { fetchComments } from "../../../redux/actions/commentActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import MainCard from "../../../ui-component/cards/MainCard";
import { Card, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Box,
  Divider,
} from "@mui/material";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import { createComment } from "../../../redux/actions/commentActions";

const CommentList = ({ idPost }) => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comments);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchComments({ id: idPost }));
  }, [dispatch, idPost]);

  return (
    <div
      style={{
        marginTop: "20px",
      }}>
      {comments && comments.results.length !== 0
        ? comments.results.map((comment) => (
            <Card
              key={comment.id}
              sx={{
                mb: 2,
                p: 2,
              }}
              variant="outlined">
              <Typography variant="h4" p={1}>
                {comment.author}
              </Typography>
              <Divider />
              <Typography variant="h6" p={1}>
                {comment.content}
              </Typography>
            </Card>
          ))
        : null}
      {token && (
        <MainCard>
          <Formik
            initialValues={{
              content: "",
            }}
            validationSchema={Yup.object().shape({
              content: Yup.string().required("Content is required"),
            })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              try {
                dispatch(
                  createComment({
                    content: values.content,
                    post: idPost,
                  })
                ).then(() => {
                  dispatch(fetchComments({ id: idPost }));
                });
                setStatus({ success: true });
                setSubmitting(false);
              } catch (err) {
                console.error(err);
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }}>
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-content">
                    Comment
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-content"
                    type="text"
                    value={values.content}
                    name="content"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Content"
                    inputProps={{}}
                    multiline
                    rows={4}
                  />
                </FormControl>

                <Box sx={{ mt: 2 }}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary">
                      Comment
                    </Button>
                  </AnimateButton>
                </Box>
              </form>
            )}
          </Formik>
        </MainCard>
      )}
    </div>
  );
};

export default CommentList;
