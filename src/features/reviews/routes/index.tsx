import React from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Reviews } from './Reviews';
import { ReviewsProvider } from '../providers';

export const ReviewsRoutes = () => (
  <Routes>
    <Route
      path="customers"
      element={(
        <ReviewsProvider>
          <Reviews />
        </ReviewsProvider>
      )}
    />
    <Route
      path="vendors"
      element={(
        <ReviewsProvider>
          <Reviews />
        </ReviewsProvider>
      )}
    />
    <Route path="*" element={<Navigate to="customers" />} />
  </Routes>
);
