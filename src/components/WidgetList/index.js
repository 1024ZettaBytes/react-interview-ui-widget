import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import WidgetDisplay from '../WidgetDisplay'
import { fetchAllWidgets } from '../../lib/apiConnect'
import { Alert, Button, CircularProgress } from '@mui/material'
import WidgetModal from '../WidgetModal'

const WidgetList = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [fetchError, setFetchError] = useState(null)
  const [widgets, setWidgets] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedWidget, setSelectedWidget] = useState(null)

  const fetchData = async () => {
    setIsLoading(true)
    fetchAllWidgets()
      .then((widgetsData) => {
        setWidgets(widgetsData)
        setIsLoading(false)
      })
      .catch((error) => {
        setFetchError("Error fetching widgets")
        setIsLoading(false)
        console.error(error)
      })
  }

  const onDataChanged = async () => {
    setModalIsOpen(false)
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderWidgets = () => {
    if (widgets.length === 0)
      return (
        <Typography sx={{ textAlign: "center" }} variant="h5">
          You have no widgets
        </Typography>
      )
    return widgets.map((current, index) => (
      <WidgetDisplay
        key={index}
        widget={current}
        onViewDetails={() => {
          setSelectedWidget(current)
          setModalIsOpen(true)
        }}
        onDelete={onDataChanged}
      />
    ))
  }
  return (
    <Stack
      spacing={4}
      sx={{ margin: "auto", maxWidth: 900, paddingTop: "4em", width: "100%" }}
    >
      <Typography sx={{ textAlign: "center" }} variant="h3">
        List of widgets:
      </Typography>
      <Grid
        container
        justifyContent="center"
        spacing={4}
        sx={{ paddingRight: 4, width: "100%" }}
      >
        {isLoading && <CircularProgress />}
        {fetchError && <Alert severity="error">{fetchError}</Alert>}
        {!isLoading && !fetchError && renderWidgets()}
        {!isLoading && (
          <>
            <Grid item lg={12} />
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  setModalIsOpen(true)
                }}
              >
                Add new
              </Button>
            </Grid>
          </>
        )}
      </Grid>
      {modalIsOpen && (
        <WidgetModal
          title={selectedWidget ? "Edit widget" : "Add new widget"}
          onSave={async () => {
            // we should refresh widgets list, simpler way will be refreshing page
            // or calling fetchAllWidgets() function again. I preffer to use
            // SWR to keep tracked data in real time
            onDataChanged()
          }}
          selectedName={selectedWidget?.name}
          onCancel={() => {
            if (selectedWidget) setSelectedWidget(null)
            setModalIsOpen(false)
          }}
        />
      )}
    </Stack>
  )
}

export default WidgetList
