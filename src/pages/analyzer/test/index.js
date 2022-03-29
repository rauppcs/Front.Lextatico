import React, { useContext, useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Box, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { useParams, withRouter } from 'react-router-dom';
import analyzerService from "../../../services/analyzerService";
import ServiceContext from '../../../contexts/services';

const Test = (props) => {
    const { setTitleName, setSnackBar } = useContext(ServiceContext);

    useEffect(() => {
        setTitleName("Analisadores");
    }, [setTitleName]);

    const theme = useTheme();

    const { id } = useParams();

    const [content, setContent] = useState("");

    const [contentError, setContentError] = useState([]);

    const [loading, setLoading] = useState(false);

    const handleChangeContent = async (e) => {
        setContent(e.target.value);

        setContentError([]);
    }

    const handleClickTest = async () => {
        try {
            setLoading(true);

            await analyzerService.postTestAnalyzer(id, content);

            setContentError([]);

            setSnackBar((prev) => ({ ...prev, open: true, severity: "success", message: "Analisador executou com sucesso." }));
        } catch (error) {
            if (error.response.status >= 500) {
                setSnackBar((prev) => ({ ...prev, open: true, severity: "error", message: error.response.data.errors.map(({ message }) => `${message}\n`) }));

                return;
            }

            setSnackBar((prev) => ({ ...prev, open: true, severity: "error", message: "Analisador executou com falha." }));

            setContentError(error.response.data.errors);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Paper style={{ padding: theme.spacing(4) }} >
            <Grid container spacing={2}>
                <Grid item md={6} sm={12} xs={12} >
                    <TextField
                        color="success"
                        type="text"
                        label="Conteudo"
                        multiline
                        minRows={5}
                        fullWidth
                        value={content}
                        disabled={loading}
                        onChange={handleChangeContent}
                        variant="outlined" />
                </Grid>
                <Grid item md={6} sm={12} xs={12} >
                    {contentError.map(val => {
                        return (
                            <Typography color="error">* {val.message}</Typography>
                        )
                    })}
                </Grid>
            </Grid>
            <Box style={{ display: "flex", justifyContent: "end", marginTop: theme.spacing(2) }}>
                <Button onClick={handleClickTest} disabled={loading} variant="contained" color="primary" >{loading ? <CircularProgress size={25} color="white" /> : "Testar"}</Button>
            </Box>
        </Paper>

    )
}

export default withRouter(Test);
