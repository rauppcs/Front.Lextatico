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

    const [formAnalyzer, setFormAnalyzer] = useState({
        errors: [],
        warnings: [],
        name: {
            value: "",
            error: ""
        },
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

            formAnalyzer.terminalTokens = selectedTerminalTokens.filter(f => f.checked === true);

            formAnalyzer.nonTerminalTokens = selectedNonTerminalTokens;

            setFormAnalyzer(prev => ({ ...prev, formAnalyzer }));

            const analyzer = {
                name: formAnalyzer.name.value,
                terminalTokens: formAnalyzer.terminalTokens,
                nonTerminalTokens: formAnalyzer.nonTerminalTokens
            }

            await analyzerService.putAnalyzer(id, analyzer);

            props.history.push("/");
        } catch (error) {
            if (error.response.status >= 500)
                setSnackBar((prev) => ({ ...prev, open: true, severity: "error", message: error.response.data.errors.map(({ message }) => `${message}\n`) }));
            else {
                error.response.data.errors.forEach(({ property, message }) => {
                    if (property !== "")
                        formAnalyzer[property].error = message;
                    else {
                        formAnalyzer.errors.push(message)
                    }
                });

                setFormAnalyzer((prev) => ({ ...prev, formAnalyzer }));
            }
        } finally {
            setLoadingFinish(false);
        }
    }

    const handleChangeName = newName => {
        setFormAnalyzer(prev => {
            return {
                ...prev, name: { value: newName.target.value, error: "" }
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

                setFormAnalyzer(prev => {
                    return {
                        ...prev,
                        name: {
                            value: analyzerResult.data.name,
                            error: ""
                        },
                        terminalTokens: analyzerResult.data.terminalTokens,
                        nonTerminalTokens: analyzerResult.data.nonTerminalTokens
                    }
                });
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
                <AnalyzerFormStepper history={props.history} loading={loadingFinish} steps={steps} formAnalyzer={formAnalyzer} handleChangeName={handleChangeName} handleFinish={handleFinish} />}
        </Paper>
    )
}

export default withRouter(Edit);
