import { Box, Button, styled, FormControl as Form } from "@material-ui/core";

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

export const LextaticoBoxError = styled(Box)({
    padding: "10px",
    color: "#ff3333",
    border: "1px solid #ff3333",
    marginBottom: "15px",
    width: "100%",
    textAlign: "center"
});

export const LextaticoForm = styled(Form)({
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#424242",
    borderRadius: "5px",
    width: "400px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
});

export const LextaticoButton = styled(Button)(({ theme }) => ({
    width: "100%",
    background: theme.palette.primary.main,
    color: theme.palette.text.light,
    height: 48,
    "&:hover": {
        backgroundColor: theme.palette.primary.light,
    }
}));

export const LextaticoHr = styled("hr")(({ theme }) => ({
    margin: "20px",
    border: "none",
    borderBottom: `1px solid ${theme.palette.divider}`,
    width: "100%"
}));
