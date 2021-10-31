import { Box, styled } from "@material-ui/core";

export const LextaticoLoadingBox = styled(Box)(({theme}) => ({
    display: "flex", 
    justifyContent: "center", 
    height: "100vh", 
    alignItems: "center",
    color: theme.palette.primary.dark
}));
