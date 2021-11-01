import React, { useContext, useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import AnalyzerFormStepper from '../analyzerFormStepper';
import terminalTokenService from '../../../services/terminalTokenService';
import analyzerService from "../../../services/analyzerService";
import { CircularLoading } from '../../../common/components/loading';
import { MyContext } from '../../../App';
import { useParams, useLocation, withRouter } from 'react-router-dom';

const Edit = (props) => {
    const { setTitleName, setSnackBar } = useContext(MyContext);

    useEffect(() => {
        setTitleName("Analisadores");
    }, [setTitleName]);

    const theme = useTheme();

    const { id } = useParams();

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

            await analyzerService.putAnalyzer(id, analyzer);

            props.history.push("/");
        } catch (error) {
            if (error.response.status >= 500)
                setSnackBar((prev) => ({ ...prev, open: true, severity: "error", message: error.response.data.errors.map(({ message }) => `${message}\n`) }));

            // TODO: AQUI CRIAR VARIAVEL COM PROP/ERRO PARA ENVIAR PARA DENTRO DO ANALYZERFORMSTEPPER
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
            try {
                setLoading(true);

                const { result: terminalTokens } = await terminalTokenService.getTerminalTokens();

                const { result: analyzer } = await analyzerService.getAnalyzer(id)

                setTerminalTokens(terminalTokens.data);

                setAnalyzer(analyzer.data);
            } catch (error) {
                if (error.response.status >= 500)
                    setSnackBar((prev) => ({ ...prev, open: true, severity: "error", message: error.response.data.errors.map(({ message }) => `${message}\n`) }));

                // TODO: AQUI CRIAR VARIAVEL COM PROP/ERRO PARA ENVIAR PARA DENTRO DO ANALYZERFORMSTEPPER
            } finally {
                setLoading(false);
            }
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

export default withRouter(Edit);
