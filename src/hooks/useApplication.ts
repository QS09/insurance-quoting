import { useContext } from 'react';
import { ApplicationContext } from '../contexts/applicationContext';

export const useApplication = () => useContext(ApplicationContext);
