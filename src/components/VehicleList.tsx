import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { VehicleType } from '../utils/types';

import { VehicleDialog } from '../components/VehicleDialog';

type OwnProps = {
  vehicles: { [key: string]: VehicleType };
  onChange: (id: string, vehicle: VehicleType | null) => void;
};
export const VehicleList: React.FC<OwnProps> = ({ vehicles, onChange }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogCancel = () => {
    setSelectedId(null);
    setOpenDialog(false);
  };

  const handleDialogSave = (vehicle: VehicleType) => {
    onChange(selectedId ? selectedId : uuidv4(), vehicle);
    setSelectedId(null);
    setOpenDialog(false);
  };

  const handleEditClick = (id: string) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleDeleteClick = (id: string) => {
    onChange(id, null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 4,
      }}
    >
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <VehicleDialog
          open={openDialog}
          vehicle={selectedId ? vehicles[selectedId] : null}
          onCancel={handleDialogCancel}
          onSave={handleDialogSave}
        />
        <Button variant="outlined" onClick={() => setOpenDialog(true)} disabled={Object.keys(vehicles).length >= 3}>
          Add Vehicles
        </Button>
      </Box>
      <Box sx={{ width: '100%' }}>
        <List sx={{ width: '100%' }}>
          {Object.keys(vehicles).map((id) => (
            <Box key={id}>
              <ListItem sx={{ width: '100%' }}>
                <ListItemText
                  primary={vehicles[id].VIN}
                  secondary={`${vehicles[id].model}, ${vehicles[id].make}, ${vehicles[id].year}`}
                />
                <IconButton onClick={() => handleEditClick(id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
};
