import React, { useContext, useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min"
import { Paper } from '@material-ui/core';
import AnalyzerFormStepper from '../analyzerFormStepper';
import terminalTokenService from '../../../services/terminalTokenService';
import analyzerService from "../../../services/analyzerService";
import { CircularLoading } from '../../../common/components/loading';
import ServiceContext from '../../../contexts/services';

const Create = (props) => {
    const { setTitleName, setSnackBar } = useContext(ServiceContext);

    useEffect(() => {
        setTitleName("Analisadores");
    }, [setTitleName]);

    const theme = useTheme();

    const [loading, setLoading] = useState(true);

    const [analyzer, setAnalyzer] = useState({
        name: "",
        terminalTokens: [],
        nonTerminalTokens: [{
            isStart: true,
            name: "start",
            nonTerminalTokenRules: [],
            sequence: 0
        }]
    });

    const steps = [
        "Selecione os tokens",
        "Monte as regras de produção",
        "Defina um nome"
    ]

    const handleFinish = async (selectedTerminalTokens, selectedNonTerminalTokens) => {
        try {
            setLoading(true);

            analyzer.terminalTokens = selectedTerminalTokens.filter(f => f.checked === true);

            analyzer.nonTerminalTokens = selectedNonTerminalTokens;

            setAnalyzer(prev => ({ ...prev, analyzer }));

            await analyzerService.postAnalyzer(analyzer);

            props.history.push("/");
        } catch (error) {
            if (error.response.status >= 500)
                setSnackBar((prev) => ({ ...prev, open: true, severity: "error", message: error.response.data.errors.map(({ message }) => `${message}\n`) }));
            // else {
            //     error.response.data.errors.forEach(({ property, message }) => {
            //         if (property !== "")
            //             formUser[property].error = message;
            //         else {
            //             formUser.errors.push(message)
            //         }
            //     });

            //     setFormUser((prev) => ({ ...prev, formUser }));
            // }
        } finally {
            setLoading(false);
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
            setLoading(true);

            const { result } = await terminalTokenService.getTerminalTokens();

            setAnalyzer(prev => {
                const terminalTokens = result.data.map(val => {
                    return { ...val, checked: false }
                })

                return ({ ...prev, terminalTokens});
            });

            setLoading(false);
        })();
    }, [setAnalyzer]);

    return (
        <Paper style={{ padding: theme.spacing(4) }} >
            {loading ?
                <CircularLoading height={theme.spacing(6)} /> :
                <AnalyzerFormStepper steps={steps} analyzer={analyzer} handleChangeName={handleChangeName} handleFinish={handleFinish} />}
        </Paper>
    )
}

export default withRouter(Create);
