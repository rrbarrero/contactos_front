import './App.css';
import Routes from './components/routes/Routes';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "./store/reducers";
import { appActions, spinnerActions } from './store/actions';
import { useEffect } from 'react';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    }
  }),
);

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  dispatch(spinnerActions.toggleState(false));
  const spinnerState = useSelector((state: RootState) => state.Spinner);

  const handleClose = () => {
    dispatch(spinnerActions.toggleState(false));
  };


  return (
    <div className="App">
      <Backdrop className={classes.backdrop} open={spinnerState} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Routes />
    </div>
  );
}

export default App;
