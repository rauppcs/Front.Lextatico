import { Paper, useTheme } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import AlertDialog from "../../../common/components/alert";
import { CircularLoading } from "../../../common/components/Loading";
import analyzerService from "../../../services/analyzerService";
import ListTable from "./listTable";

const List = ({ history }) => {
    const theme = useTheme();

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(true);

    const [analyzers, setAnalyzers] = useState([]);

    const [analyzerIds, setAnalyzerIds] = useState([]);

    const [page, setPage] = useState(1);

    const size = 10;

    const [count, setCount] = useState(0);

    const [reload, setReload] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleClickCreate = async () => {
        history.push("/analisadores/cadastrar")
    }

    const handleClickDelete = async (analyzerIds) => {
        setAnalyzerIds(analyzerIds);

        setOpen(true);
    }

    const hancleClickConfirmation = async () => {
        try {
            setLoading(true);

            await analyzerService.deleteAnalyzers(analyzerIds);

            setAnalyzerIds([]);

            setPage(1);

            setReload(true);

            setOpen(false);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        (async function () {
            setLoading(true);

            const { result } = await analyzerService.getAnalyzers(page, size);

            setAnalyzers(result.data);

            setCount(Math.ceil(result.totalRecords / size));

            setReload(false);

            setLoading(false);
        })();
    }, [page, reload]);

    return (
        <Paper style={{ padding: theme.spacing(4) }}>
            {loading ?
                <CircularLoading height={theme.spacing(6)} /> :
                <Fragment>
                    <AlertDialog title="Exclusão" content="Você tem certeza disso?" open={open} setOpen={setOpen} hancleClickConfirmation={hancleClickConfirmation} />
                    <ListTable rows={analyzers} page={page} size={size} count={count} handleChangePage={handleChangePage} handleClickCreate={handleClickCreate} handleClickDelete={handleClickDelete} />
                    <Pagination page={page} count={count} variant="outlined" onChange={handleChangePage} style={{ display: "flex", justifyContent: "flex-end", marginTop: theme.spacing(3) }} />
                </Fragment>
            }
        </Paper>
    );
}

export default withRouter(List);
