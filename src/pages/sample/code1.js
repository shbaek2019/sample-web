import { Button, TextField } from "@mui/material";
import { useState } from "react";

const Code1 = () => {
  const [num, setNum] = useState(0);

  const change = (p) => {
    console.log(p);
    const result = num + p;
    setNum(result);
  };

  return (
    <>
      <Button variant="contained" onClick={() => change(1)}>
        증가
      </Button>
      <TextField value={num} />
      <Button variant="contained" onClick={() => change(-1)}>
        감소
      </Button>
    </>
  );
};

export default Code1;
