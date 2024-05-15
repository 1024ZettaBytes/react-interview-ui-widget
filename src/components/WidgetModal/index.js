import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, TextField } from '@mui/material'
import {
  fetchWidgetById,
  saveWidget,
  updateWidget,
} from '../../lib/apiConnect'

export default function WidgetModal({
  title,
  onSave,
  onCancel,
  selectedName,
}) {
  const [widgetData, setWidgetData] = useState(null)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    const data = {
      name : event?.target?.name?.value,
      description: event?.target?.description?.value,
      price: event?.target?.price?.value,
    }

    if (widgetData) 
      await updateWidget(data)
    else 
      await saveWidget(data)
    

    // we should handle response errors and show some toast or similar so the user can try again
    onSave()
  }

  useEffect(() => {
    if (selectedName) {
      fetchWidgetById(selectedName)
        .then((widget) => {
          setWidgetData(widget)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [selectedName])

  return (
    <div>
      <Dialog
        open
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {
            // setting key to box container so the defaultvalues will be rendered when data fetch finishes
          }
          <Box
            component="form"
            onSubmit={onSubmitHandler}
            key={widgetData?.name || "nKey"}
          >
            <TextField
              name="name"
              disabled={widgetData !== null}
              sx={{ marginTop: 2 }}
              autoComplete="off"
              required
              label={"Name"}
              defaultValue={widgetData?.name || ""}
              inputProps={{ minLength: 3, maxLength: 100 }}
              fullWidth={true}
            />
            <TextField
              name="description"
              sx={{ marginTop: 2 }}
              autoComplete="off"
              required
              label={"Description"}
              defaultValue={widgetData?.description || ""}
              inputProps={{ minLength: 5, maxLength: 1000 }}
              fullWidth={true}
            />
            <TextField
              name="price"
              sx={{ marginTop: 2 }}
              autoComplete="off"
              required
              label={"Price"}
              type="number"
              defaultValue={widgetData?.price || 0}
              inputProps={{ min: 1, max: 20000, step: "any" }}
              fullWidth={true}
            />
            <Box sx={{ mb: 2 }}>
              <Button
                sx={{ mt: 1, mr: 1 }}
                variant="outlined"
                onClick={onCancel}
              >
                {selectedName ? "Close" : "Cancel"}
              </Button>

              <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="contained">
                {selectedName ? "Save changes" : "Save"}
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  )
}
