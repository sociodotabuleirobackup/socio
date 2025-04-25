jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('Routes rendering', () => {
  it('should render all routes', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
    expect(screen.getByTestId('profile-page')).toBeInTheDocument();
    expect(screen.getByTestId('terms-page')).toBeInTheDocument();
    expect(screen.getByTestId('admin-panel-page')).toBeInTheDocument();
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    expect(screen.getByTestId('register-page')).toBeInTheDocument();
    expect(screen.getByTestId('reset-password-page')).toBeInTheDocument();
    expect(screen.getByTestId('crowdfunding-page')).toBeInTheDocument();
    expect(screen.getByTestId('marketplace-page')).toBeInTheDocument();
    expect(screen.getByTestId('product-details-page')).toBeInTheDocument();
    expect(screen.getByTestId('store-dashboard-page')).toBeInTheDocument();
  });
});