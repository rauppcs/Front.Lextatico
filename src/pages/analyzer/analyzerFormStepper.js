import React, { Fragment, useRef } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, CircularProgress, FormControlLabel, makeStyles, TextField, Tooltip, Typography, useTheme, Grid, Divider, IconButton, MenuItem, ListItem, List, Dialog, DialogTitle, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';
import { groupBy } from '../../utils/array';
import { ExpandMore, AddCircle, Remove, RemoveCircle, NetworkLockedSharp } from "@material-ui/icons"
import { translateTokenType } from '../../utils/i18n';
import { TimelineSeparator } from '@material-ui/lab';
import { Guid } from 'js-guid';
import MenuPopover from '../../common/components/menuPopover';

const useStylesFormStepper = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const AnalyzerTerminalTokens = ({ selectedTerminalTokens, setSelectedTerminalTokens }) => {
    const classes = useStyles();

    const theme = useTheme();

    const terminalTokensGrouped = groupBy(selectedTerminalTokens, "tokenTypeString");

    const terminalTokensArrayGrouped = Object.entries(terminalTokensGrouped);

    const handleSelectedTerminalToken = (terminalToken) => {
        setSelectedTerminalTokens((prev) => prev.map(val => {
            if (terminalToken.id === val.id)
                val.checked = !val.checked;

            return val;
        }))
    }

    return (
        <Fragment>
            {terminalTokensArrayGrouped?.map((val, i) => {
                return (
                    <Accordion key={i} style={{ backgroundColor: theme.palette.background.default }}>
                        <AccordionSummary
                            key={i}
                            expandIcon={<ExpandMore />}
                            aria-controls={`panel-${i}-content`}
                            id={`panel-${i}-header`}>
                            <Typography className={classes.heading}>{translateTokenType(val[0])}</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ flexWrap: "wrap" }}>
                            {val[1].map((terminalToken, indexTerminalToken) => {
                                return (
                                    <Tooltip key={indexTerminalToken} enterTouchDelay={0} placement="top" arrow title={<Typography>{terminalToken.resume}</Typography>}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={terminalToken.checked}
                                                    onChange={() => handleSelectedTerminalToken(terminalToken)}
                                                    name={`check-analyzer-${terminalToken.name}`}
                                                />
                                            }
                                            label={terminalToken.name}
                                        />
                                    </Tooltip>
                                )
                            })}
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </Fragment>
    );
}

const AnalyzerNonTerminalTokens = ({ selectedTerminalTokens, selectedNonTerminalTokens, setSelectedNonTerminalTokens }) => {
    const handleClickRemoveNonTerminalToken = (indexNonTerminalToken) => {
        const newSelectedNonTerminalTokens = selectedNonTerminalTokens.map(val => val);

        const nonTerminalTokenId = newSelectedNonTerminalTokens[indexNonTerminalToken].id;

        for (const indexNonTerminalToken in newSelectedNonTerminalTokens) {
            const nonTerminalToken = newSelectedNonTerminalTokens[indexNonTerminalToken];

            for (const indexNonTerminalTokenRule in nonTerminalToken.nonTerminalTokenRules) {
                const nonTerminalTokenRule = nonTerminalToken.nonTerminalTokenRules[indexNonTerminalTokenRule];

                for (const indexNonTerminalTokenRuleClause in nonTerminalTokenRule.nonTerminalTokenRuleClauses) {
                    const nonTerminalTokenRuleClause = nonTerminalTokenRule.nonTerminalTokenRuleClauses[indexNonTerminalTokenRuleClause];

                    if (nonTerminalTokenRuleClause.nonTerminalTokenId === nonTerminalTokenId)
                        newSelectedNonTerminalTokens[indexNonTerminalToken].nonTerminalTokenRules[indexNonTerminalTokenRule].nonTerminalTokenRuleClauses.splice(indexNonTerminalTokenRuleClause, 1);
                }

                const length =
                    newSelectedNonTerminalTokens[indexNonTerminalToken]
                        .nonTerminalTokenRules[indexNonTerminalTokenRule]
                        .nonTerminalTokenRuleClauses.length;

                if (length === 0)
                    newSelectedNonTerminalTokens[indexNonTerminalToken]
                        .nonTerminalTokenRules
                        .splice(indexNonTerminalTokenRule, 1);
            }
        }

        newSelectedNonTerminalTokens.splice(indexNonTerminalToken, 1);

        setSelectedNonTerminalTokens(newSelectedNonTerminalTokens);
    }

    const handleClickRemoveNonTerminalTokenRuleClause = (indexNonTerminalToken, indexNonTerminalTokenRule, indexNonTerminalTokenRuleClause) => {
        const newSelectedNonTerminalTokens = selectedNonTerminalTokens.map(val => val);

        newSelectedNonTerminalTokens[indexNonTerminalToken]
            .nonTerminalTokenRules[indexNonTerminalTokenRule]
            .nonTerminalTokenRuleClauses
            .splice(indexNonTerminalTokenRuleClause, 1);

        const length =
            newSelectedNonTerminalTokens[indexNonTerminalToken]
                .nonTerminalTokenRules[indexNonTerminalTokenRule]
                .nonTerminalTokenRuleClauses.length;

        if (length === 0)
            newSelectedNonTerminalTokens[indexNonTerminalToken]
                .nonTerminalTokenRules
                .splice(indexNonTerminalTokenRule, 1);

        setSelectedNonTerminalTokens(newSelectedNonTerminalTokens);
    }

    const handleChangeName = (indexNonTerminalToken, newName) => {
        const newSelectedNonTerminalTokens = selectedNonTerminalTokens.map(val => val);

        newSelectedNonTerminalTokens[indexNonTerminalToken].name = newName;

        const nonTerminalTokenId = newSelectedNonTerminalTokens[indexNonTerminalToken].id;

        // for (const nonTerminalToken of newSelectedNonTerminalTokens) {
        //     for (const nonTerminalTokenRule of nonTerminalToken.nonTerminalTokenRules) {
        //         for (const nonTerminalTokenRuleClause of nonTerminalTokenRule.nonTerminalTokenRuleClauses) {
        //             if (nonTerminalTokenRuleClause.nonTerminalTokenId === nonTerminalTokenId)
        //                 setSelectedNonTerminalTokens
        //                 nonTerminalTokenRuleClause.nonTerminalToken.name = newName;
        //         }
        //     }
        // }

        setSelectedNonTerminalTokens(newSelectedNonTerminalTokens);
    }

    const useStylesAddButton = makeStyles((theme) => ({
        actionButton: {
            color: theme.palette.success.main,
            "&:hover": {
                color: theme.palette.success.dark
            },
            borderRadius: "50%",
            minWidth: 0,
            padding: theme.spacing(1)
        }
    }))

    const classesAddButton = useStylesAddButton();

    const theme = useTheme();

    const handleClickAddNonTerminalToken = () => {
        const newSelectedNonTerminalTokens = selectedNonTerminalTokens.map(val => val);

        newSelectedNonTerminalTokens[newSelectedNonTerminalTokens.length] = {
            id: Guid.newGuid().toString(),
            isStart: false,
            name: "",
            nonTerminalTokenRules: [],
            sequence: newSelectedNonTerminalTokens.length
        }

        setSelectedNonTerminalTokens(newSelectedNonTerminalTokens);
    }

    return (
        <Fragment>
            {selectedNonTerminalTokens.map((val, indexNonTerminalToken) => {
                return (
                    <Grid key={indexNonTerminalToken} style={{ marginTop: theme.spacing(1) }} container key={indexNonTerminalToken}>
                        <AnalyzerNonTerminalTokenItem selectedTerminalTokens={selectedTerminalTokens} selectedNonTerminalTokens={selectedNonTerminalTokens} setSelectedNonTerminalTokens={setSelectedNonTerminalTokens} item={val} indexNonTerminalToken={indexNonTerminalToken} handleChangeName={handleChangeName} handleClickRemoveNonTerminalToken={handleClickRemoveNonTerminalToken} handleClickRemoveNonTerminalTokenRuleClause={handleClickRemoveNonTerminalTokenRuleClause} />
                    </Grid>
                )
            })}

            <IconButton style={{ marginTop: theme.spacing(1) }} onClick={handleClickAddNonTerminalToken} className={classesAddButton.actionButton} variant="contained">
                <AddCircle />
            </IconButton>
        </Fragment>
    )
}

const AnalyzerNonTerminalTokenItem = ({ item, selectedTerminalTokens, selectedNonTerminalTokens, setSelectedNonTerminalTokens, indexNonTerminalToken, handleChangeName, handleClickRemoveNonTerminalToken, handleClickRemoveNonTerminalTokenRuleClause }) => {
    const useStylesRemoveButton = makeStyles((theme) => ({
        button: {
            position: "absolute",
            top: -18,
            right: -18,
            color: theme.palette.error.main,
            borderRadius: "50%",
            minWidth: 0,
            padding: 5
        }
    }));

    const handleSelect = (selected, indexNonTerminalToken, indexNonTerminalTokenRule) => {
        setSelectedIndexNonTerminalToken(indexNonTerminalToken);

        setSelectedIndexNonTerminalTokenRule(indexNonTerminalTokenRule);

        setSelectedTokenType(selected.type);

        if (selected.type === 0) {
            setListValue(selectedTerminalTokens.filter(val => val.checked == true));
        } else if (selected.type === 1) {
            setListValue(selectedNonTerminalTokens);
        }

        setOpenDialog(true);
    }

    const theme = useTheme();

    const [active, setActive] = useState(false);

    const [listValue, setListValue] = useState([]);

    const [selectedTokenType, setSelectedTokenType] = useState();

    const [selectedIndexNonTerminalToken, setSelectedIndexNonTerminalToken] = useState(0);

    const [selectedIndexNonTerminalTokenRule, setSelectedIndexNonTerminalTokenRule] = useState(0);

    const [openDialog, setOpenDialog] = useState(false);

    const onClose = (value) => {
        if (!value)
            return setOpenDialog(false);

        const newSelectedNonTerminalTokens = selectedNonTerminalTokens.map(val => val);

        const { id: nonTerminalTokenId, name: nonTerminalTokenName } = newSelectedNonTerminalTokens[selectedIndexNonTerminalToken];

        const indexNonTerminalTokenRule = selectedIndexNonTerminalTokenRule >= 0 ?
            selectedIndexNonTerminalTokenRule :
            newSelectedNonTerminalTokens[selectedIndexNonTerminalToken].nonTerminalTokenRules.length;

        if (selectedIndexNonTerminalTokenRule < 0)
            newSelectedNonTerminalTokens[selectedIndexNonTerminalToken]
                .nonTerminalTokenRules[indexNonTerminalTokenRule] =
            {
                id: Guid.newGuid().toString(),
                name: `${nonTerminalTokenName}_${indexNonTerminalTokenRule}`,
                sequence: indexNonTerminalTokenRule,
                nonTerminalTokenId,
                nonTerminalTokenRuleClauses: []
            };

        const indexNonTerminalTokenRuleClause = selectedIndexNonTerminalTokenRule >= 0 ?
            newSelectedNonTerminalTokens[selectedIndexNonTerminalToken]
                .nonTerminalTokenRules[indexNonTerminalTokenRule]
                .nonTerminalTokenRuleClauses.length : 0;

        if (selectedTokenType === 0) {
            newSelectedNonTerminalTokens[selectedIndexNonTerminalToken]
                .nonTerminalTokenRules[indexNonTerminalTokenRule]
                .nonTerminalTokenRuleClauses[indexNonTerminalTokenRuleClause] =
            {
                id: Guid.newGuid().toString(),
                name: `${nonTerminalTokenName}_${indexNonTerminalTokenRule}_${indexNonTerminalTokenRuleClause}`,
                sequence: indexNonTerminalTokenRuleClause,
                isTerminalToken: true,
                terminalTokenId: value.id,
                nonTerminalTokenRuleId: newSelectedNonTerminalTokens[selectedIndexNonTerminalToken]
                    .nonTerminalTokenRules[indexNonTerminalTokenRule].id
            }

        } else if (selectedTokenType === 1) {
            newSelectedNonTerminalTokens[selectedIndexNonTerminalToken]
                .nonTerminalTokenRules[indexNonTerminalTokenRule]
                .nonTerminalTokenRuleClauses[indexNonTerminalTokenRuleClause] =
            {
                id: Guid.newGuid().toString(),
                name: `${nonTerminalTokenName}_${indexNonTerminalTokenRule}_${indexNonTerminalTokenRuleClause}`,
                sequence: indexNonTerminalTokenRuleClause,
                isTerminalToken: false,
                nonTerminalTokenId: value.id,
                nonTerminalTokenRuleId: newSelectedNonTerminalTokens[selectedIndexNonTerminalToken]
                    .nonTerminalTokenRules[indexNonTerminalTokenRule].id
            }
        }

        setSelectedNonTerminalTokens(newSelectedNonTerminalTokens);

        setOpenDialog(false);
    }

    const classesRemoveButton = useStylesRemoveButton();

    return (
        <Fragment>
            <Grid style={{ display: "flex", alignItems: "center", }} item md={2}>
                {item.isStart ?
                    <Typography>{item.name}</Typography> :
                    (
                        <Box style={{ position: "relative" }}>
                            <TextField size="small" onChange={(e) => handleChangeName(indexNonTerminalToken, e.target.value)} onMouseOver={() => setActive(true)} onMouseOut={() => setActive(false)} variant={"outlined"} value={item.name} />
                            <IconButton onClick={() => handleClickRemoveNonTerminalToken(indexNonTerminalToken)} onMouseOver={() => setActive(true)} onMouseOut={() => setActive(false)} style={{ display: !active ? "none" : "" }} className={classesRemoveButton.button} aria-label="remove">
                                <RemoveCircle />
                            </IconButton>
                        </Box>
                    )}
            </Grid>

            <Grid style={{ display: "flex", alignItems: "center" }}>
                <Typography style={{ marginInline: 10 }} variant="h5" component={"span"}>:</Typography>
            </Grid>

            <Grid style={{ display: "flex", alignItems: "center" }} item md={9}>
                {item.nonTerminalTokenRules.map((nonTerminalTokenRule, indexNonTerminalTokenRule) => {
                    return (
                        <Box key={indexNonTerminalTokenRule} style={{ display: "inline-flex" }}>
                            {nonTerminalTokenRule.nonTerminalTokenRuleClauses
                                .sort((a, b) => a.sequence - b.sequence)
                                .map((nonTerminalTokenRuleClause, indexNonTerminalTokenRuleClause) => {
                                    return (
                                        <AnalyzerNonTerminalTokenRuleItem
                                            selectedTerminalTokens={selectedTerminalTokens}
                                            selectedNonTerminalTokens={selectedNonTerminalTokens}
                                            indexNonTerminalToken={indexNonTerminalToken}
                                            indexNonTerminalTokenRule={indexNonTerminalTokenRule}
                                            indexNonTerminalTokenRuleClause={indexNonTerminalTokenRuleClause}
                                            nonTerminalTokenRuleClause={nonTerminalTokenRuleClause}
                                            handleClickRemoveNonTerminalTokenRuleClause={handleClickRemoveNonTerminalTokenRuleClause} />
                                    )
                                })}
                            <AnalyzerAddPopover handleSelect={handleSelect} indexNonTerminalToken={indexNonTerminalToken} indexNonTerminalTokenRule={indexNonTerminalTokenRule} />
                            <Divider style={{ backgroundColor: theme.palette.text.primary, height: "auto" }} light variant="middle" orientation="vertical" />
                        </Box>)
                })}
                <AnalyzerAddPopover handleSelect={handleSelect} indexNonTerminalToken={indexNonTerminalToken} indexNonTerminalTokenRule={-1} />
            </Grid>
            <AnalyzerAddDialog listValue={listValue} onClose={onClose} open={openDialog} />
        </Fragment>
    )
}

const AnalyzerNonTerminalTokenRuleItem = ({ selectedTerminalTokens, selectedNonTerminalTokens, indexNonTerminalToken, indexNonTerminalTokenRule, indexNonTerminalTokenRuleClause, nonTerminalTokenRuleClause, handleClickRemoveNonTerminalTokenRuleClause }) => {
    const theme = useTheme();

    const useStylesRemoveButton = makeStyles((theme) => ({
        button: {
            position: "absolute",
            top: -18,
            right: -18,
            color: theme.palette.error.main,
            borderRadius: "50%",
            minWidth: 0,
            padding: 5
        }
    }));

    const [active, setActive] = useState(false);

    const classesRemoveButton = useStylesRemoveButton();

    const terminalToken = selectedTerminalTokens.find(f => f.id === nonTerminalTokenRuleClause.terminalTokenId);

    const nonTerminalToken = selectedNonTerminalTokens.find(f => f.id === nonTerminalTokenRuleClause.nonTerminalTokenId);

    return (
        <Tooltip placement="top" arrow title={nonTerminalTokenRuleClause.isTerminalToken ? <Typography>{terminalToken.resume}</Typography> : ""}>
            <Box onMouseOver={() => setActive(true)} onMouseOut={() => setActive(false)} bgcolor={nonTerminalTokenRuleClause.isTerminalToken ? "primary.dark" : "primary.light"} p={1} marginX={1} style={{ display: "flex", alignItems: "center", position: "relative", borderRadius: 5 }}>
                {nonTerminalTokenRuleClause.isTerminalToken ?
                    terminalToken.viewName :
                    nonTerminalToken.name}
                <IconButton onClick={() => handleClickRemoveNonTerminalTokenRuleClause(indexNonTerminalToken, indexNonTerminalTokenRule, indexNonTerminalTokenRuleClause)} onMouseOver={() => setActive(true)} onMouseOut={() => setActive(false)} style={{ display: !active ? "none" : "" }} className={classesRemoveButton.button} variant='contained' aria-label="remove">
                    <RemoveCircle />
                </IconButton>
            </Box >
        </Tooltip>

    )
}

const AnalyzerAddPopover = ({ handleSelect, indexNonTerminalToken, indexNonTerminalTokenRule }) => {
    const useStylesAddButton = makeStyles((theme) => ({
        actionButton: {
            color: theme.palette.success.main,
            "&:hover": {
                color: theme.palette.success.dark
            },
            borderRadius: "50%",
            minWidth: 0,
            padding: theme.spacing(1)
        }
    }));

    const options = [
        {
            type: 0,
            label: 'Token terminal'
        },
        {
            type: 1,
            label: 'Token não-terminal',
        },
    ];

    const anchorRef = useRef(null);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classesAddButton = useStylesAddButton();

    return (
        <>
            <IconButton
                ref={anchorRef}
                onClick={handleOpen}
                className={classesAddButton.actionButton}>
                <AddCircle />
            </IconButton>

            <MenuPopover
                open={open}
                onClose={handleClose}
                anchorEl={anchorRef.current}
                sx={{ width: 20 }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                <List>
                    {options.map((option) => (
                        <ListItem
                            key={option.label}
                            button
                            style={{ width: "100%" }}
                            onClick={() => handleClose() & handleSelect(option, indexNonTerminalToken, indexNonTerminalTokenRule)}
                        >
                            {option.label}
                        </ListItem>
                    ))}
                </List>

            </MenuPopover>
        </>
    )
}

const AnalyzerAddDialog = ({ listValue, onClose, open, tokenType }) => {
    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Selecione uma opção</DialogTitle>
            <List>
                {listValue.map((value) => (
                    <Tooltip title={value.resume ? <Typography>{value.resume}</Typography> : ""} interactive={true} arrow placement="top">
                        <ListItem button onClick={() => handleListItemClick(value)} key={value}>
                            <ListItemText primary={value.name} />
                        </ListItem>
                    </Tooltip>

                ))}
            </List>
        </Dialog>
    );
}

const AnalyzerFormStepper = ({ loading, steps, analyzer, handleChangeName, handleFinish }) => {
    const classes = useStylesFormStepper();

    const theme = useTheme();

    const [activeStep, setActiveStep] = useState(0);

    const [selectedNonTerminalTokens, setSelectedNonTerminalTokens] = useState(analyzer.nonTerminalTokens)

    const [selectedTerminalTokens, setSelectedTerminalTokens] = useState(analyzer.terminalTokens);

    const handleNext = () => {
        if (activeStep === steps.length - 1)
            return handleFinish(selectedTerminalTokens, selectedNonTerminalTokens);

        if (activeStep !== steps.length - 1)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <AnalyzerTerminalTokens selectedTerminalTokens={selectedTerminalTokens} setSelectedTerminalTokens={setSelectedTerminalTokens} />
                );
            case 1:
                return (
                    <AnalyzerNonTerminalTokens selectedTerminalTokens={selectedTerminalTokens} selectedNonTerminalTokens={selectedNonTerminalTokens} setSelectedNonTerminalTokens={setSelectedNonTerminalTokens} />
                );
            case 2:
                return (
                    <TextField
                        fullWidth
                        required
                        label={"Nome"}
                        variant="outlined"
                        value={analyzer.name}
                        onChange={handleChangeName} />
                )
            default:
                return "";
        }
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};

                    const labelProps = {};

                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {getStepContent(activeStep)}
            <Box style={{ display: "flex", marginTop: theme.spacing(2), justifyContent: "flex-end" }}>
                <Button variant='contained' disabled={activeStep === 0 || loading} onClick={handleBack} className={classes.button}>
                    Anterior
                </Button>
                <Button variant="contained" disabled={loading} color="primary" onClick={handleNext}>
                    {loading ? <CircularProgress color='inherit' size={20} /> : activeStep === steps.length - 1 ? 'Salvar' : 'Próximo'}
                </Button>
            </Box>
        </div>
    );
}

AnalyzerFormStepper.prototype = {
    steps: PropTypes.array.isRequired,
    analyzer: PropTypes.object.isRequired,
    terminalTokens: PropTypes.array.isRequired
}

export default AnalyzerFormStepper;
