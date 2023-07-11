/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  Box,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Grid,
  Button,
  InputLabel,
  FormControl,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { USA_STATES } from '../utils/constants';
import {
  ApplicationType,
  DependentType,
  StateEnum,
  VehicleType,
} from '../utils/types';

import { useApplication } from '../hooks/useApplication';

import { DependentList } from '../components/DependentList';
import { VehicleList } from '../components/VehicleList';

export default function Home() {
  const { application, save, submit } = useApplication();

  const [vehicles, setVehicles] = useState<{
    [key: string]: VehicleType;
  }>({});

  const [dependents, setDependents] = useState<{
    [key: string]: DependentType;
  }>({});

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: new Date('2000-01-01T00:00:00'),
      street: '',
      city: '',
      state: StateEnum.AK,
      zipCode: '',
      vehicles: [] as VehicleType[],
      dependents: [] as DependentType[],
    },
    validationSchema: yup.object({
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      dateOfBirth: yup.date().required('Date of birth is required'),
      street: yup.string().required('Street is required'),
      city: yup.string().required('City is required'),
      state: yup.string().required('State is required'),
      zipCode: yup.string().required('Zip code is required').length(5),
      vehicles: yup
        .array()
        .test({
          message: 'At least 1 vehicle is required',
          test: (arr) => arr && arr.length > 0,
        })
        .test({
          message: 'No more than 3 vehicles available',
          test: (arr) => arr && arr.length > 0,
        }),
      dependents: yup.array().optional(),
    }),
    onSubmit: async (values) => {
      const payload: ApplicationType = {
        id: application?.id,
        insurer: {
          id: application?.insurer?.id,
          firstName: values.firstName,
          lastName: values.lastName,
          dateOfBirth: values.dateOfBirth,
          street: values.street,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
          vehicles: values.vehicles,
          dependents: values.dependents,
        },
      };
      await submit(payload);
      formik.resetForm();
      setVehicles({});
      setDependents({});
    },
  });

  useEffect(() => {
    if (application?.insurer) {
      formik.setValues({
        firstName: application.insurer.firstName,
        lastName: application.insurer.lastName,
        dateOfBirth: new Date(application.insurer.dateOfBirth),
        street: application.insurer.street,
        city: application.insurer.city,
        state: application.insurer.state,
        zipCode: application.insurer.zipCode,
        vehicles: [],
        dependents: [],
      });

      setDependents(
        application.insurer.dependents
          .map((dependent) => ({
            ...dependent,
            dateOfBirth: new Date(dependent.dateOfBirth),
          }))
          .reduce(
            (d, dependent) =>
              dependent.id
                ? {
                    ...d,
                    [dependent.id]: dependent,
                  }
                : d,
            {}
          )
      );

      setVehicles(
        application.insurer.vehicles.reduce(
          (v, vehicle) => (vehicle.id ? { ...v, [vehicle.id]: vehicle } : v),
          {}
        )
      );
    }
  }, [application]);

  useEffect(() => {
    const vehicleArr = Object.keys(vehicles).reduce(
      (prev: VehicleType[], id: string) => [...prev, vehicles[id]],
      []
    );
    formik.setFieldValue('vehicles', vehicleArr);
  }, [vehicles]);

  useEffect(() => {
    const dependentArr = Object.keys(dependents).reduce(
      (prev: DependentType[], id: string) => [...prev, dependents[id]],
      []
    );
    formik.setFieldValue('dependents', dependentArr);
  }, [dependents]);

  const handleVehiclesChange = (id: string, vehicle: VehicleType | null) => {
    if (vehicle) {
      setVehicles({ ...vehicles, [id]: vehicle });
    } else {
      const updated = { ...vehicles };
      delete updated[id];
      setVehicles(updated);
    }
  };

  const handleDependentsChange = (
    id: string,
    dependent: DependentType | null
  ) => {
    if (dependent) {
      setDependents({ ...dependents, [id]: dependent });
    } else {
      const updated = { ...dependents };
      delete updated[id];
      setDependents(updated);
    }
  };

  const handleSaveClick = async () => {
    const { values } = formik;
    const payload: ApplicationType = {
      id: application?.id,
      insurer: {
        id: application?.insurer?.id,
        firstName: values.firstName,
        lastName: values.lastName,
        dateOfBirth: values.dateOfBirth,
        street: values.street,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
        vehicles: values.vehicles,
        dependents: values.dependents,
      },
    };
    await save(payload);
  };

  return (
    <>
      <Head>
        <title>Hugo Insurance Challenge</title>
      </Head>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Box sx={{ width: '100%', p: 2, textAlign: 'center' }}>
          <Typography variant="h2">Get Your Free Quote Today!</Typography>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Grid
              container
              sx={{
                display: 'flex',
                gap: 2,
                maxWidth: '500px',
              }}
            >
              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}
              >
                <TextField
                  id="insurer-first-name"
                  label="First name"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
                <TextField
                  id="insurer-last-name"
                  name="lastName"
                  label="Last name"
                  required
                  fullWidth
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}
              >
                <TextField
                  id="insurer-street"
                  name="street"
                  label="Street"
                  required
                  fullWidth
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  error={formik.touched.street && Boolean(formik.errors.street)}
                  helperText={formik.touched.street && formik.errors.street}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}
              >
                <TextField
                  id="insurer-city"
                  name="city"
                  label="City"
                  required
                  fullWidth
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel id="insurer-state">State</InputLabel>
                  <Select
                    id="insurer-state"
                    name="state"
                    label="State"
                    labelId="insurer-state"
                    required
                    fullWidth
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                  >
                    {USA_STATES.map((state) => (
                      <MenuItem key={state.value} value={state.value}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  id="insurer-zip-code"
                  name="zipCode"
                  label="Zip Code"
                  required
                  fullWidth
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.zipCode && Boolean(formik.errors.zipCode)
                  }
                  helperText={formik.touched.zipCode && formik.errors.zipCode}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <DatePicker
                  label="Date of birth"
                  sx={{ width: '100%' }}
                  value={formik.values.dateOfBirth}
                  onChange={(value) =>
                    formik.setFieldValue('dateOfBirth', value)
                  }
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12}>
                <VehicleList
                  vehicles={vehicles}
                  onChange={handleVehiclesChange}
                />
              </Grid>
              <Grid item xs={12}>
                <DependentList
                  dependents={dependents}
                  onChange={handleDependentsChange}
                />
              </Grid>
            </Grid>

            <Grid
              container
              sx={{
                display: 'flex',
                my: 4,
              }}
            >
              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}
              >
                <Button
                  variant="outlined"
                  onClick={handleSaveClick}
                  disabled={!formik.dirty}
                >
                  Save
                </Button>

                <Button
                  variant="contained"
                  type="submit"
                  disabled={!formik.isValid || !formik.dirty}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Container>
    </>
  );
}
