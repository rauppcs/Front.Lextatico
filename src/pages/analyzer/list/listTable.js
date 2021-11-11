import { Button, Checkbox, IconButton, lighten, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Tooltip, Typography, useTheme } from "@material-ui/core";
import { useState } from "react";
import { Delete as DeleteIcon, Send as TestIcon, Edit as EditIcon, AddCircle } from "@material-ui/icons";
import clsx from "clsx";
import PropTypes from 'prop-types';
import { withRouter, Link } from "react-router-dom";

const ListTable = ({ rows = [], page, size, count, handleChangePage, handleChangeRowsPerPage, handleClickDelete, pagination = false, ...props }) => {
    const theme = useTheme();

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const headCells = [
        { id: "name", numeric: false, disablePadding: true, label: "Nome" },
        { id: "empty", numeric: false, disablePadding: true, label: "" }
    ];

    function EnhancedTableHead(props) {
        const {
            classes,
            onSelectAllClick,
            order,
            orderBy,
            numSelected,
            rowCount,
            onRequestSort
        } = props;

        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{ "aria-label": "select all desserts" }}
                        />
                    </TableCell>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? "right" : "left"}
                            padding={headCell.disablePadding ? "none" : "normal"}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : "asc"}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === "desc" ? "sorted descending" : "sorted ascending"}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        classes: PropTypes.object.isRequired,
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(["asc", "desc"]).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired
    };

    const useToolbarStyles = makeStyles((theme) => ({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1)
        },
        highlight:
            theme.palette.type === "light"
                ? {
                    color: theme.palette.text.primary,
                    backgroundColor: lighten(theme.palette.secondary.light, 0.85)
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.light
                },
        title: {
            flex: "1 1 100%"
        }
    }));

    const EnhancedTableToolbar = (props) => {
        const classes = useToolbarStyles();



        const { numSelected } = props;

        return (
            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: numSelected > 0
                })}
            >
                {numSelected > 0 ? (
                    <Typography
                        className={classes.title}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        className={classes.title}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Analisadores
                    </Typography>
                )}

                {numSelected > 0 ? (
                    <Tooltip title={<Typography>Deletar</Typography>} arrow placement="bottom">
                        <IconButton onClick={() => handleClickDelete(selected)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) :
                    <Tooltip title={<Typography>Criar novo</Typography>} arrow placement="bottom">
                        <Button
                            component={Link}
                            to="analisadores/cadastrar"
                            variant="contained"
                            color="primary"
                            startIcon={<AddCircle />}
                        >
                            Criar
                        </Button>
                    </Tooltip>
                }
            </Toolbar>
        );
    };

    EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired
    };

    const useStyles = makeStyles((theme) => ({
        visuallyHidden: {
            border: 0,
            clip: "rect(0 0 0 0)",
            height: 1,
            margin: -1,
            overflow: "hidden",
            padding: 0,
            position: "absolute",
            top: 20,
            width: 1
        }
    }));

    const useStylesButton = makeStyles((theme) => ({
        actionButton: {
            borderRadius: "50%",
            minWidth: 0,
            padding: theme.spacing(1)
        }
    }))

    const classes = useStyles();
    const classesActionButton = useStylesButton();
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [selected, setSelected] = useState([]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    return (
        <div className={classes.root}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    // size={dense ? "small" : "medium"}
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {rows.length === 0 ?
                            <TableRow>
                                <TableCell colSpan={headCells.length + 1} align="center">
                                    Não há resultados
                                </TableCell>
                            </TableRow> :
                            stableSort(rows, getComparator(order, orderBy))
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            style={{ cursor: "pointer" }}
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ "aria-labelledby": labelId }} />
                                            </TableCell>
                                            <TableCell component="td" id={labelId} scope="row" padding="none">{row.name}</TableCell>
                                            <TableCell style={{ display: "flex", justifyContent: "flex-end" }} >
                                                <Tooltip arrow title={<Typography>Testar</Typography>}>
                                                    <Button className={classesActionButton.actionButton} component={Link} to={`analisadores/testar/${row.id}`} style={{ marginRight: theme.spacing(1) }} variant="outlined" color={"primary"}>
                                                        <TestIcon />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip arrow title={<Typography>Editar</Typography>}>
                                                    <Button className={classesActionButton.actionButton} component={Link} to={`analisadores/editar/${row.id}`} variant="outlined" color="primary" aria-label="editar">
                                                        <EditIcon />
                                                    </Button>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                    </TableBody>
                </Table>
            </TableContainer>
            {pagination && <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={count}
                rowsPerPage={size}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />}

        </div>
    );
}

ListTable.propTypes = {
    rows: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
    pagination: PropTypes.bool
};

export default withRouter(ListTable);
