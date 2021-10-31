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
    borderRadius: "5px",
    width: "400px",
    backgroundColor: theme.palette.background.paper,
}));

export const LextaticoFormContentLeft = styled(Form)({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "flex-start",
    height: "100%",
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
    marginBottom: theme.spacing(2),
    height: 48
}));

export const LextaticoBackButton = styled(Button)(({ theme }) => ({
    cursor: "pointer",
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
    marginBottom: theme.spacing(2),
    border: "none",
    borderBottom: `1px solid ${theme.palette.divider}`,
    width: "100%"
}));
