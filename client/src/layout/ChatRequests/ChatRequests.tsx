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

interface Props {
  open: boolean;
  user: User;
  requestedUser: User | null;
  chatRequests: ChatRequest[];
  onClose: () => void;
  onSearch: (email: string) => void;
  onChatRequestSubmit: () => void;
}

export const ChatRequestsDialog: React.FC<Props> = ({
  open,
  user,
  requestedUser,
  chatRequests,
  onClose,
  onSearch,
  onChatRequestSubmit,
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
              {incomingRequests.map((v) => (
                <ListItem
                  secondaryAction={
                    <IconButton edge="end">
                      <DeleteIcon />
                    </IconButton>
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
              {outgoingRequests.map((v) => (
                <ListItem
                  secondaryAction={
                    <IconButton edge="end">
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
