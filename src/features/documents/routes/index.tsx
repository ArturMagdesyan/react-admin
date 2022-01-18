import { Route, Routes } from 'react-router-dom';
import { Documents } from './Documents';
import { DocumentsProvider } from '../providers';

export const DocumentsRoutes = () => (
  <Routes>
    <Route path="" element={<DocumentsProvider><Documents /></DocumentsProvider>} />
  </Routes>
);
