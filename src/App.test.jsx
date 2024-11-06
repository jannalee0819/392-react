import {describe, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import App from './App';
import {useAuthState, useDbData} from './utilities/firebase';

const mockSchedule = {
  "title": "CS Courses for 1850-1851",
  "courses": {
  }
};

vi.mock('./utilities/firebase');

beforeEach(() => {
  useDbData.mockReturnValue([mockSchedule, null]);
  useAuthState.mockReturnValue([null]);
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('launching', () => {
  it('should show the current year', () => {
    render(<App />);
    screen.getByText(/1850/);
  });
});
