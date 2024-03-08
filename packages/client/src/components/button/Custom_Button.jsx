import { Button, CircularProgress } from "@mui/material";

function Custom_Button(props) {
  const {
    children,
    loading
  } = props;
  return (
    <>
      <div>
        <Button
          sx={{
            width: '100%',
            py: 2

          }}
          disabled={loading}
          variant="outlined"
          color="inherit"
          {...props}
        >
          {loading ? <CircularProgress color="inherit" size={24} /> : children}
        </Button>
      </div>
    </>
  );
}
export default Custom_Button;

