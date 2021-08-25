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

export const LextaticoBoxError = styled(Box)({
    padding: "10px",
    color: "#ff3333",
    border: "1px solid #ff3333",
    marginBottom: "15px",
    width: "100%",
    textAlign: "center"
});

export const LextaticoForm = styled(Form)({
    borderRadius: "5px",
    width: "400px",
    backgroundColor: "#424242",
});

export const LextaticoFormContentLeft = styled(Form)({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "20px"
});

export const LextaticoFormContentCenter = styled(Form)({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px"
});

export const LextaticoTextField = styled(TextField)({
    width: "100%",
    marginBottom: "15px"
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

export const LextaticoBackButton = styled(Button)(({ theme }) => ({
    borderRadius: "100%",
    height: "60px"
   
}));

export const LextaticoLinks = styled("div")(({ theme }) => ({
    display: "inline-flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    "& span": {
        margin: "0px 5px 5px 0px"
    }
}));

export const LextaticoHr = styled("hr")(({ theme }) => ({
    margin: "20px",
    border: "none",
    borderBottom: `1px solid ${theme.palette.divider}`,
    width: "100%"
}));
