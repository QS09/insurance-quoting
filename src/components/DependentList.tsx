import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';

import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { DependentType } from '../utils/types';

import { DependentDialog } from '../components/DependentDialog';

type OwnProps = {
  dependents: { [key: string]: DependentType };
  onChange: (id: string, dependent: DependentType | null) => void;
};
export const DependentList: React.FC<OwnProps> = ({ dependents, onChange }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogCancel = () => {
    setSelectedId(null);
    setOpenDialog(false);
  };

  const handleDialogSave = (dependent: DependentType) => {
    onChange(selectedId ? selectedId : uuidv4(), dependent);
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
        <DependentDialog
          open={openDialog}
          dependent={selectedId ? dependents[selectedId] : null}
          onCancel={handleDialogCancel}
          onSave={handleDialogSave}
        />
        <Button variant="outlined" onClick={() => setOpenDialog(true)}>
          Add Dependents
        </Button>
      </Box>
      <Box sx={{ width: '100%' }}>
        <List sx={{ width: '100%' }}>
          {Object.keys(dependents).map((id) => (
            <Box key={id}>
              <ListItem sx={{ width: '100%' }}>
                <ListItemText
                  primary={`${dependents[id].firstName} ${dependents[id].lastName}`}
                  secondary={
                    <>
                      <Typography variant="body2" component="span">
                        {dependents[id].dateOfBirth.toDateString()}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{ ml: 2, textTransform: 'capitalize' }}
                      >
                        {dependents[id].relationship}
                      </Typography>
                    </>
                  }
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
