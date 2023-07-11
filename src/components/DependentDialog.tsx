/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { DependentType, RelationshipEnum } from '../utils/types';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type OwnProps = {
  open: boolean;
  dependent: DependentType | null;
  onCancel: () => void;
  onSave: (dependent: DependentType) => void;
};

const RELATIONSHIPS = ['spouse', 'sibling', 'parent', 'friend', 'other'];

export const DependentDialog: React.FC<OwnProps> = ({
  open,
  dependent,
  onCancel,
  onSave,
}) => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      relationship: RelationshipEnum.SPOUSE,
      dateOfBirth: new Date("2000-01-01T00:00:00"),
    },
    validationSchema: yup.object({
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      relationship: yup.string().required('Relationship is required'),
      dateOfBirth: yup.date().required('Date of birth is required'),
    }),
    onSubmit: async (values) => {
      onSave({ id: dependent?.id, ...values });
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (dependent) {
      formik.setValues({
        firstName: dependent.firstName,
        lastName: dependent.lastName,
        relationship: dependent.relationship,
        dateOfBirth: dependent.dateOfBirth,
      });
    }
  }, [dependent]);

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Your Dependent Information</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ my: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First name"
                required
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last name"
                required
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </FormControl>
            <FormControl fullWidth>
              <DatePicker
                label="Date of birth"
                sx={{ width: '100%' }}
                value={formik.values.dateOfBirth}
                onChange={(value) => formik.setFieldValue('dateOfBirth', value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="dependent-relationship">Relationship</InputLabel>
              <Select
                fullWidth
                id="relationship"
                label="Relationship"
                labelId="dependent-relationship"
                name="relationship"
                variant="outlined"
                required
                value={formik.values.relationship}
                error={
                  formik.touched.relationship &&
                  Boolean(formik.errors.relationship)
                }
                onChange={formik.handleChange}
              >
                {RELATIONSHIPS.map((relationship) => (
                  <MenuItem key={relationship} value={relationship}>
                    <Typography
                      variant="body2"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {relationship}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={onCancel}>
              Close
            </Button>
            <Button
              variant="contained"
              disabled={!formik.isValid || !formik.dirty}
              type="submit"
            >
              Save
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};
