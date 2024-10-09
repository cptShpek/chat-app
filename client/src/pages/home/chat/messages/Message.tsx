import React, { useMemo } from "react";
import { Message as MessageInterface } from "../../../../interfaces";
import { Box, Paper, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import styled from "@emotion/styled";
import { useDateString } from "../../../../hooks";

interface Props {
  message: MessageInterface;
  email: string;
}

const StyledPaper = styled(Paper)({
  width: "45%",
  height: "45px",
  display: "flex",
  gap: "15px",
  alignItems: "center",
  padding: "5px 10px",
  "&.to": {
    background: "#FBFDFE",
  },
});

const StyledBox = styled(Box)({
  display: "flex",
  flexGrow: 2,
  alignItems: "flex-start",
});

export const Message: React.FC<Props> = ({ message, email }) => {
  const from = useMemo(() => message.fromEmail === email, [message, email]);
  const dateString = useDateString(message.createdAt);

  return (
    <StyledPaper className={from ? "from" : "to"}>
      {!from && <AccountCircleOutlinedIcon />}
      <StyledBox>
        <Typography variant="body1" align="left" sx={{ flexGrow: 2 }}>
          {message.text}
        </Typography>
        <Typography variant="body3" align="left">
          {dateString}
        </Typography>
      </StyledBox>
    </StyledPaper>
  );
};
