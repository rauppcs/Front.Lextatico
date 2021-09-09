import { createTheme } from '@material-ui/core/styles'

export const globalTheme = createTheme({
    typography: {
        fontFamily: [
            '"Roboto"', 'sans-serif'
        ]
    },
    palette: {
        text: {
            light: "#fff"
        },
        type: 'dark'
    },
    // overrides: {
    //     MuiTooltip: {
    //         tooltip: {
    //             fontSize: "20px"
    //         }
    //     }
    // }
});
