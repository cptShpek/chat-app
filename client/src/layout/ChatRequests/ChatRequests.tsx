import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { SearchUserInput } from "./SearchUserInput";
import { ChatRequest, User } from "../../interfaces";
import { MakeChatRequest } from "./MakeСhatRequest";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
  open: boolean;
  user: User;
  requestedUser: User | null;
  chatRequests: ChatRequest[];
  onClose: () => void;
  onSearch: (email: string) => void;
  onChatRequestSubmit: () => void;
  onChatRequestStatusSubmit: (input: { _id: string; status: boolean }) => void;
}

export const ChatRequestsDialog: React.FC<Props> = ({
  open,
  user,
  requestedUser,
  chatRequests,
  onClose,
  onSearch,
  onChatRequestSubmit,
  onChatRequestStatusSubmit,
}) => {
  const incomingRequests = useMemo(
    () => chatRequests.filter((cr) => cr.to === user.email),
    [chatRequests, user]
  );
  const outgoingRequests = useMemo(
    () => chatRequests.filter((cr) => cr.from === user.email),
    [chatRequests, user]
  );
  const handleSearchUserSubmit = useCallback(
    (email: string) => onSearch(email),
    [onSearch]
  );

  const handleChatRequestSubmit = useCallback(
    () => onChatRequestSubmit(),
    [onChatRequestSubmit]
  );

  const handleChatRequestAccept = useCallback(
    (_id: string) => onChatRequestStatusSubmit({ _id, status: true }),
    [onChatRequestStatusSubmit]
  );

  const handleChatRequestReject = useCallback(
    (_id: string) => onChatRequestStatusSubmit({ _id, status: false }),
    [onChatRequestStatusSubmit]
  );

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>Chat Requests</DialogTitle>
      <DialogContent>
        {!requestedUser && (
          <SearchUserInput onSubmit={handleSearchUserSubmit} />
        )}
        {requestedUser && (
          <MakeChatRequest
            user={requestedUser}
            onSubmit={handleChatRequestSubmit}
          />
        )}
        <Divider />
        <Box sx={{ padding: "5px 0" }}>
          <Typography variant="h6">Incoming Requests</Typography>
          {incomingRequests.length > 0 && (
            <List>
              {incomingRequests.map((v, i) => (
                <ListItem
                  key={i}
                  secondaryAction={
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "70px",
                      }}
                    >
                      <IconButton
                        edge="end"
                        color="primary"
                        onClick={() => handleChatRequestAccept(v._id)}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={() => handleChatRequestReject(v._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  {v.from}
                </ListItem>
              ))}
            </List>
          )}
          {incomingRequests.length === 0 && (
            <Typography variant="body2">No incoming chat requests</Typography>
          )}
        </Box>
        <Divider />
        <Box sx={{ padding: "5px 0" }}>
          <Typography variant="h6">Your Requests</Typography>
          {outgoingRequests.length > 0 && (
            <List>
              {outgoingRequests.map((v, i) => (
                <ListItem
                  key={i}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => handleChatRequestReject(v._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  {v.to}
                </ListItem>
              ))}
            </List>
          )}
          {outgoingRequests.length === 0 && (
            <Typography variant="body2">No outgoing chat requests</Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
