import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

// Styled component for the input element
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// Component for uploading files
export default function InputFileUpload({handleFile}) {

    const handleFileChange = (event) => {
        handleFile(event.target.files);
        toast.success('File uploaded successfully');
    };
    
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={handleFileChange}
      />
    </Button>
  );
}

// Validation with PropTypes
InputFileUpload.propTypes = {
    handleFile: PropTypes.func.isRequired, // handleFile is required and must be a function
};
