import './App.css';
import UrlInput from './components/UrlInput.js'
import Grid from '@mui/material/Grid';

function App() {
  return (
    <Grid 
      className="App"
      container
      spacing={2}
      direction="column"
      alignItems="center"
    >
      <UrlInput />
    </Grid>
  );
}

export default App;
