import React, { Fragment, useEffect } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControlLabel, makeStyles, TextField, Tooltip, Typography, useTheme, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { groupBy } from '../../utils/array';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { translateTokenType } from '../../utils/i18n';

const useStylesFormStepper = makeStyles((theme) => ({
    root: {
        // width: '100%',
    },
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

const AnalyzerTerminalTokens = ({ selectedTerminalTokens, handleSelectedTerminalToken }) => {
    const classes = useStyles();

    const theme = useTheme();

    const terminalTokensGrouped = groupBy(selectedTerminalTokens, "tokenTypeString");

    const terminalTokensArrayGrouped = Object.entries(terminalTokensGrouped);

    return (
        <Fragment>
            {terminalTokensArrayGrouped?.map((val, i) => {
                return (
                    <Accordion style={{ backgroundColor: theme.palette.background.default }}>
                        <AccordionSummary
                            key={i}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel-${i}-content`}
                            id={`panel-${i}-header`}>
                            <Typography className={classes.heading}>{translateTokenType(val[0])}</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ flexWrap: "wrap" }}>
                            {val[1].map((terminalToken) => {
                                return (
                                    <Tooltip placement="top" arrow title={<Typography>{terminalToken.resume}</Typography>}>
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

const AnalyzerNonTerminalTokens = () => {
    return "asd";
}

const AnalyzerFormStepper = ({ steps, analyzer, terminalTokens, handleChangeName, handleFinish }) => {
    const classes = useStylesFormStepper();

    const theme = useTheme();

    const [activeStep, setActiveStep] = useState(0);

    const [selectedTerminalTokens, setSelectedTerminalTokens] = useState(terminalTokens.map(val => {
        var checked = analyzer.terminalTokens.find(f => f.id === val.id);

        return { ...val, checked: checked !== undefined }
    }));

    const handleNext = () => {
        if (activeStep === steps.length - 1)
            return handleFinish(selectedTerminalTokens);

        if (activeStep !== steps.length - 1)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSelectedTerminalToken = (terminalToken) => {
        setSelectedTerminalTokens((prev) => prev.map(val => {
            if (terminalToken.id === val.id)
                val.checked = !val.checked;

            return val;
        }))
    }

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <AnalyzerTerminalTokens selectedTerminalTokens={selectedTerminalTokens} handleSelectedTerminalToken={handleSelectedTerminalToken} />
                );
            case 1:
                return (
                    <AnalyzerNonTerminalTokens />
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
                <Button variant='contained' disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                    Anterior
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Salvar' : 'Próximo'}
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
