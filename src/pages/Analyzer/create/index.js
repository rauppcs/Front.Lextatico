import React, { useContext, useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min"
import { Paper } from '@material-ui/core';
import AnalyzerFormStepper from '../analyzerFormStepper';
import terminalTokenService from '../../../services/terminalTokenService';
import analyzerService from "../../../services/analyzerService";
import { CircularLoading } from '../../../common/components/Loading';
import { MyContext } from '../../../App';

const Create = (props) => {
    const theme = useTheme();

    const { setSnackBar } = useContext(MyContext);

    const [loading, setLoading] = useState(true);

    const [analyzer, setAnalyzer] = useState({
        name: "",
        terminalTokens: [],
        nonTerminalTokens: []
    });

    const [terminalTokens, setTerminalTokens] = useState([]);

    const steps = [
        "Selecione os tokens",
        "Monte as regras de produção",
        "Defina um nome"
    ]

    const handleFinish = async (selectedTerminalTokens) => {
        try {
            setLoading(true);

            analyzer.terminalTokens = selectedTerminalTokens.filter(f => f.checked === true);

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
            const { result } = await terminalTokenService.getTerminalTokens();

            setTerminalTokens(result.data);

            setLoading(false);
        })();
    }, []);

    return (
        <Paper style={{ padding: theme.spacing(4) }} >
            {loading ?
                <CircularLoading height={theme.spacing(6)} /> :
                <AnalyzerFormStepper steps={steps} analyzer={analyzer} terminalTokens={terminalTokens} handleChangeName={handleChangeName} handleFinish={handleFinish} />}
        </Paper>
    )
}

export default withRouter(Create);
