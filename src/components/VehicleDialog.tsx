/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { VehicleType } from '../utils/types';
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
} from '@mui/material';

type OwnProps = {
  open: boolean;
  vehicle: VehicleType | null;
  onCancel: () => void;
  onSave: (vehicle: VehicleType) => void;
};

const VEHICLE_YEARS = [
  ...Array(new Date().getFullYear() - 1985 + 2).fill(0),
].map((i, index) => index + 1985);

export const VehicleDialog: React.FC<OwnProps> = ({
  open,
  vehicle,
  onCancel,
  onSave,
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      VIN: '',
      year: new Date().getFullYear(),
      model: '',
      make: '',
    },
    validationSchema: yup.object({
      VIN: yup.string().length(17).required('VIN is required'),
      model: yup.string().required('Model is required'),
      make: yup.string().required('Make is required'),
      year: yup.number().required('Year is required'),
    }),
    onSubmit: async (values) => {
      onSave({ id: vehicle?.id, ...values });
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (vehicle) {
      formik.setValues({
        VIN: vehicle.VIN,
        year: vehicle.year,
        model: vehicle.model,
        make: vehicle.make,
      });
    }
  }, [vehicle]);

  const handleCloseClick = () => {
    formik.resetForm();
    onCancel();
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Your Vehicle Information</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ my: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                id="VIN"
                name="VIN"
                label="VIN"
                required
                value={formik.values.VIN}
                onChange={formik.handleChange}
                error={formik.touched.VIN && Boolean(formik.errors.VIN)}
                helperText={formik.touched.VIN && formik.errors.VIN}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                fullWidth
                id="model"
                name="model"
                label="Model"
                required
                value={formik.values.model}
                onChange={formik.handleChange}
                error={formik.touched.model && Boolean(formik.errors.model)}
                helperText={formik.touched.model && formik.errors.model}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                fullWidth
                id="make"
                name="make"
                label="Make"
                required
                value={formik.values.make}
                onChange={formik.handleChange}
                error={formik.touched.make && Boolean(formik.errors.make)}
                helperText={formik.touched.make && formik.errors.make}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="vehicle-year">Year</InputLabel>
              <Select
                fullWidth
                id="year"
                label="Year"
                labelId="vehicle-year"
                name="year"
                variant="outlined"
                required
                value={formik.values.year}
                error={formik.touched.year && Boolean(formik.errors.year)}
                onChange={formik.handleChange}
              >
                {VEHICLE_YEARS.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={handleCloseClick}>
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
