import { render, screen, fireEvent } from '@testing-library/react';
import PostJob from './index';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
  ToastContainer: () => <div />,
}));

describe('PostJob', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  test('renders the Post Job form correctly', () => {
    render(<PostJob />);

    expect(screen.getByText(/Post a Job/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Job Title:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Job Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Job Requirements:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tags/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Info:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Post Job/i })).toBeInTheDocument();
  });

  test('displays an error message when no job description is uploaded', () => {
    render(<PostJob />);

    fireEvent.click(screen.getByRole('button', { name: /Post Job/i }));
    // eslint-disable-next-line testing-library/no-debugging-utils
    console.log(screen.debug());
    expect(screen.getByText(/please upload a job description file/i)).toBeInTheDocument();
  });

  test('shows an error for file size exceeding 16KB', async () => {
    render(<PostJob />);

    // Create a mock file larger than 16KB
    const largeFile = new File(['a'.repeat(17000)], 'large.txt', { type: 'text/plain' });
    const fileInput = screen.getByLabelText(/Job Description/i);
    
    await fireEvent.change(fileInput, { target: { files: [largeFile] } });

    expect(await screen.findByText(/File size must be 16KB or less/i)).toBeInTheDocument();
  });

  test('shows an error for invalid file type', async () => {
    render(<PostJob />);

    // Create a mock file with an invalid type
    const invalidFile = new File(['dummy content'], 'dummy.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText(/Job Description/i);
    
    await fireEvent.change(fileInput, { target: { files: [invalidFile] } });

    expect(await screen.findByText(/Only .txt files are allowed/i)).toBeInTheDocument();
  });

  test('uploads a valid file and displays its content', async () => {
    render(<PostJob />);

    const validFileContent = 'This is a job description.';
    const validFile = new File([validFileContent], 'description.txt', { type: 'text/plain' });
    const fileInput = screen.getByLabelText(/Job Description/i);
    
    await fireEvent.change(fileInput, { target: { files: [validFile] } });

    expect(screen.getByText(/Uploaded Description:/i)).toBeInTheDocument();
    expect(screen.getByText(validFileContent)).toBeInTheDocument();
  });

  test('successfully submits the form when all fields are filled', async () => {
    render(<PostJob />);

    // Upload a valid file
    const validFileContent = 'This is a job description.';
    const validFile = new File([validFileContent], 'description.txt', { type: 'text/plain' });
    const fileInput = screen.getByLabelText(/Job Description/i);
    
    await fireEvent.change(fileInput, { target: { files: [validFile] } });

    // Fill out the other fields
    fireEvent.change(screen.getByLabelText(/Job Title:/i), { target: { value: 'Software Engineer' } });
    fireEvent.change(screen.getByLabelText(/Job Requirements:/i), { target: { value: 'React, Node.js' } });
    fireEvent.change(screen.getByLabelText(/Tags/i), { target: { value: 'React, JavaScript' } });
    fireEvent.change(screen.getByLabelText(/Company Name:/i), { target: { value: 'Tech Company' } });
    fireEvent.change(screen.getByLabelText(/Contact Info:/i), { target: { value: 'contact@techcompany.com' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Post Job/i }));

    expect(await screen.findByText(/Job posted successfully!/i)).toBeInTheDocument();
    expect(screen.queryByText(/please upload a job description file/i)).not.toBeInTheDocument(); // Ensure error message is cleared
  });
});
