import { Card, CardMedia, Box, Stack, Typography, Button } from "@mui/material";
import React from "react";
import library from "../../assets/library.jpg";
import { useTheme } from "@emotion/react";

const HeroCard = () => {
  const theme = useTheme();
  return (
    <Card
      width='100%'
      sx={{
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        minWidth: "100%"
      }}>
      <CardMedia
        sx={{ position: "relative" }}
        component='img'
        src={library}
        width='100%'
        height={345}
      />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
        <Stack
          sx={{ backdropFilter: "blur(5px)" }}
          direction='column'
          spacing={2}
          m={5}
          p={5}>
          <Typography
            color='white'
            variant='h5'
            sx={{ fontWeight: 900, lineHeight: "100%" }}>
            A book is a gift you can open again and again.
          </Typography>
          <Typography color='white'>~Garrison keillor</Typography>
          <Stack direction='row' spacing={2}>
            <Button variant='contained' color='primary'>
              become an author
            </Button>
            <Button variant='contained' color='secondary'>
              Create a reader account
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
};

export default HeroCard;
