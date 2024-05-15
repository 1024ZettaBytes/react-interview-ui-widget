import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import { deleteWidgetById } from '../../lib/apiConnect'

const DisplayWidget = ({ widget, onViewDetails, onDelete }) => {
  const { description, name, price } = widget;

  const onDeleteConfirm = async () => {
    await deleteWidgetById(name);
    // we should handle API erros
    onDelete();
  };
  return (
    <Grid item xs={6}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography component="div" gutterBottom variant="h4">
              {name}
            </Typography>
            <Grid container spacing={1}>
              <Grid item>
                <Button
                  color="secondary"
                  onClick={() => {
                    onViewDetails();
                  }}
                  variant="contained"
                >
                  View Detail
                </Button>
              </Grid>

              <Grid item>
                <Button
                  onClick={
                    // we shouls ask the user to confirm the delete action (we could use a modal or similar)
                    onDeleteConfirm
                  }
                  color="error"
                  variant="contained"
                >
                  Delete
                </Button>
              </Grid>
            </Grid>

            <Typography component="div" gutterBottom variant="h5">
              ${price}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {description}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DisplayWidget;
