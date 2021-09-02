import { Box, Button, styled, FormControl as Form, TextField } from "@material-ui/core";

export const LextaticoImg = styled("img")({
    borderRadius: "5px",
    margin: "15px",
    width: "150px"
});

export const LextaticoBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh"
});

export const LextaticoForm = styled(Form)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    width: "400px",
    padding: "20px",
    flexDirection: "column",
    alignItems: "center"
}));

export const LextaticoTextField = styled(TextField)({
    width: "100%",
    marginBottom: "15px"
});

export const LextaticoButton = styled(Button)(({ theme }) => ({
    width: "100%",
    background: theme.palette.primary.main,
    color: theme.palette.text.light,
    marginBottom: theme.spacing(2),
    height: 48,
    "&:hover": {
        backgroundColor: theme.palette.primary.light,
    }
}));

export const LextaticoHr = styled("hr")(({ theme }) => ({
    marginBottom: theme.spacing(2),
    border: "none",
    borderBottom: `1px solid ${theme.palette.divider}`,
    width: "100%"
}));
