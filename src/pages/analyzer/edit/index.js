import React, { useContext, useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import AnalyzerFormStepper from '../analyzerFormStepper';
import terminalTokenService from '../../../services/terminalTokenService';
import analyzerService from "../../../services/analyzerService";
import { CircularLoading } from '../../../common/components/loading';
import { useParams, withRouter } from 'react-router-dom';
import ServiceContext from '../../../contexts/services';

const Edit = (props) => {
    const { setTitleName, setSnackBar } = useContext(ServiceContext);

    useEffect(() => {
        setTitleName("Analisadores");
    }, [setTitleName]);

    const theme = useTheme();

    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const [loadingFinish, setLoadingFinish] = useState(false);

    const [analyzer, setAnalyzer] = useState({
        name: "",
        terminalTokens: [],
        nonTerminalTokens: []
    });

    const steps = [
        "Selecione os tokens",
        "Monte as regras de produção",
        "Defina um nome"
    ]

    const handleFinish = async (selectedTerminalTokens, selectedNonTerminalTokens) => {
        try {
            setLoadingFinish(true);

            analyzer.terminalTokens = selectedTerminalTokens.filter(f => f.checked === true);

            analyzer.nonTerminalTokens = selectedNonTerminalTokens;

            setAnalyzer(prev => ({ ...prev, analyzer }));

            await analyzerService.putAnalyzer(id, analyzer);

            props.history.push("/");
        } catch (error) {
            if (error.response.status >= 500)
                setSnackBar((prev) => ({ ...prev, open: true, severity: "error", message: error.response.data.errors.map(({ message }) => `${message}\n`) }));

            // TODO: AQUI CRIAR VARIAVEL COM PROP/ERRO PARA ENVIAR PARA DENTRO DO ANALYZERFORMSTEPPER
            // }
        } finally {
            setLoadingFinish(false);
        }
    }

    const handleChangeName = (newName, n) => {
        setAnalyzer(prev => {
            return {
                ...prev, name: newName.target.value
            }
        })
    }

    useEffect(() => {
        (async function () {
            try {
                setLoading(true);

                const { result: terminalTokensResult } = await terminalTokenService.getTerminalTokens();

                const { result: analyzerResult } = await analyzerService.getAnalyzer(id)

                analyzerResult.data.terminalTokens = terminalTokensResult.data.map(val => {
                    var checked = analyzerResult.data.terminalTokens?.find(f => f.id === val.id);

                    return { ...val, checked: checked !== undefined }
                })

                setAnalyzer(analyzerResult.data);
            } catch (error) {
                if (error.response.status >= 500)
                    setSnackBar((prev) => ({ ...prev, open: true, severity: "error", message: error.response.data.errors.map(({ message }) => `${message}\n`) }));

                // TODO: AQUI CRIAR VARIAVEL COM PROP/ERRO PARA ENVIAR PARA DENTRO DO ANALYZERFORMSTEPPER
            } finally {
                setLoading(false);
            }
        })();
    }, [id, setSnackBar]);

    return (
        <Paper style={{ padding: theme.spacing(4) }} >
            {loading ?
                <CircularLoading height={theme.spacing(6)} /> :
                <AnalyzerFormStepper loading={loadingFinish} steps={steps} analyzer={analyzer} handleChangeName={handleChangeName} handleFinish={handleFinish} />}
        </Paper>
    )
}

export default withRouter(Edit);
