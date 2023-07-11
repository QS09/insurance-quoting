import React, { createContext, useState, useEffect } from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ApplicationType } from '../utils/types';
import axios from 'axios';

const API_HOST = 'http://localhost:5000';

const initialApplication: ApplicationType = {
  insurer: null,
};

type ApplicationContextType = {
  initializing: boolean;
  application: ApplicationType | null;
  submit: (application: ApplicationType) => void;
  save: (application: ApplicationType) => void;
};

const initialState: ApplicationContextType = {
  initializing: false,
  application: initialApplication,
  submit: () => {},
  save: () => {},
};

type ProviderProps = {
  children: React.ReactNode;
};

export const ApplicationContext =
  createContext<ApplicationContextType>(initialState);

const ApplicationProvider: React.FC<ProviderProps> = ({ children }) => {
  const [initializing, setInitializing] = useState(false);
  const [application, setApplication] =
    useState<ApplicationType>(initialApplication);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setInitializing(true);
        const resume = globalThis.localStorage.getItem('resume');
        if (resume) {
          const { data } = await axios.get(`${API_HOST}/api/${resume}`);
          setApplication(data.application);
        }
      } catch (err) {
        console.log('Fetching saved application failed!');
      } finally {
        setInitializing(false);
      }
    };
    fetchApplication();
  }, []);

  const submit = async (application: ApplicationType) => {
    const { data } = await axios.post(`${API_HOST}/api/submit`, application);
    setApplication(data.application);
    globalThis.localStorage.removeItem('resume');
    alert(`Your quote price is ${data.price}!`);
  };

  const save = async (application: ApplicationType) => {
    const { data } = await axios.post(`${API_HOST}/api/save`, application);
    globalThis.localStorage.setItem('resume', data.resume);
    setApplication(data.application);
    alert('Application saved!');
  };

  return initializing ? (
    <LoadingSpinner />
  ) : (
    <ApplicationContext.Provider
      value={{ initializing, application, submit, save }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationProvider;
