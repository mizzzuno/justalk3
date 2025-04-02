import { useState } from "react";
import IconMenu from "./components/IconMenu";
import IconButtons from "./components/IconButton";
import BasicPie from "./components/PieChart";
import RecordingButton from "./components/RecordingButton";
import BorderContainer from "./components/BorderContainer";
import Typography from "@mui/material/Typography";



const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <BorderContainer>
        <Typography variant="h6">
          <IconButtons onClick={toggleMenu} />
          {menuOpen && <IconMenu />}
          <h1>Justalk</h1>
          <BasicPie />
          <RecordingButton />
        </Typography>
      </BorderContainer>
    </>
  );
};

export default App;