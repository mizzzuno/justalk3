import Header from "./components/Header";
import BasicPie from "./components/PieChart";
import RecordingButton from "./components/RecordingButton";
import BorderContainer from "./components/BorderContainer";
import Typography from "@mui/material/Typography";
import './stylesheet/Body.css'

const App = () => {

  return (
    <>
      <body>
        <BorderContainer>
          <Typography variant="h6">
            <Header />
            <BasicPie />
            <RecordingButton />
          </Typography>
        </BorderContainer>
      </body>
    </>
  );
};

export default App;