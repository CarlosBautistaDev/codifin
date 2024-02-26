import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: '#d0d0d0',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        margin: 'auto',
        maxWidth: '50%',
        marginTop: '100px',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '75%',
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: '30%',
        },
    },
    media: {
        height: 440,
    },
}));