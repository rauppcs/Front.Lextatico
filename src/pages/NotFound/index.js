import { motion } from "framer-motion"
import { Link as RouterLink } from "react-router-dom"
import { styled } from "@material-ui/core/styles"
import { Box, Button, Typography, Container, withStyles } from "@material-ui/core"
import { MotionContainer, varBounceIn } from "../../common/components/animate"
import Img404 from "../../assets/illustration_404.svg"
import { Fragment } from "react"
import Helmet from "react-helmet"

// ----------------------------------------------------------------------

const BoxNotFound = styled(Box)(({ theme }) => ({
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(5)
}));

// ----------------------------------------------------------------------

const NotFound = ({ theme }) => {
    return (
        <Fragment>
            <Helmet title={`${process.env.REACT_APP_TITLE} | Notfound`} />
            <BoxNotFound>
                <Container>
                    <MotionContainer initial="initial" open>
                        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                            <motion.div variants={varBounceIn}>
                                <Typography variant="h3" paragraph>
                                    Desculpe, página não encontrada!
                                </Typography>
                            </motion.div>

                            <motion.div variants={varBounceIn}>
                                <Box
                                    component="img"
                                    src={Img404}
                                    sx={{ height: 260, mx: 'auto', my: 'auto' }}
                                />
                            </motion.div>

                            <Button style={{ marginTop: "20px", color: theme.palette.text.light, backgroundColor: theme.palette.primary.main }} to="/" size="large" variant="contained" component={RouterLink}>
                                Ir para Home
                            </Button>
                        </Box>
                    </MotionContainer>
                </Container>
            </BoxNotFound>
        </Fragment>

    );
}

export default withStyles({}, { withTheme: true })(NotFound);
