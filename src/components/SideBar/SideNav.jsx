import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography
} from "@mui/material";
import FilterList from "@mui/icons-material/FilterList";
import React from "react";
import BookPagination from "../Book/BookPagination";

const SideNav = () => {
  return (
    <Stack direction='row' spacing={1} mr={2}>
      <Stack direction='column'>
        <Typography>BOOKS</Typography>
        <List>
          <ListItem>
            <ListItemIcon children={<FilterList />} />
            <ListItemText>Filter</ListItemText>
          </ListItem>
        </List>
      </Stack>
      <Divider variant='middle' orientation='vertical' flexItem />
    </Stack>
  );
};

export default SideNav;
