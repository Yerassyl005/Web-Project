import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxHeight: '80vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
};

const BookModal = ({ open, handleClose, book }) => {
  if (!book) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="book-modal-title"
      aria-describedby="book-modal-description"
    >
      <Box sx={style}>
        <Typography id="book-modal-title" variant="h5" component="h2" gutterBottom>
          {book.title}
        </Typography>
        <iframe
          src={book.oldLatynUrl}
          style={{ width: '100%', height: '70vh', border: 'none' }}
          title={book.title}
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BookModal; 