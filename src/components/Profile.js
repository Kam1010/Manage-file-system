import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {saveAs} from 'file-saver';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core';

const Profile = () => {
  const { register, handleSubmit } = useForm();
  const [images, setImages] = useState([]);


  // Fetch images data from your API endpoint
  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:8001/files');
      setImages(response.data); // Assuming the API returns an array of image data
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('file', data.file[0]);

    try {
      await axios.post('http://localhost:8001/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Refresh images after successful upload
      fetchImages();
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // console.log(images?.data[0]);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:8001/files/${id}`);
      // Refresh images after successful delete
      fetchImages();
      console.log('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleDownload = async () => {
    const filename = `${images.data.originalname}`; // Replace with the actual filename
    console.log("images>>>", images);
    try {
      const response = await axios.get(`http://localhost:3001/files/download/${filename}`, {
        responseType: 'blob',
      });

      // Create a link element to trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image', error);
    }
  };

  return (
    <div>
      <h2>Profile Page</h2>
      {/* Display user information */}
      <p>User information goes here...</p>

      {/* File upload form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Upload Image:
          <input type="file" {...register('file')} />
        </label>
        <button type="submit">Submit</button>
      </form>

      {/* Display images in a Material-UI table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
              {/* <TableCell>Download</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {images?.data?.map((image) => {
              return (
                <TableRow key={image._id}>
                  <TableCell>
                    <p>{image.originalname}</p>
                  </TableCell>
                  <TableCell>
                    <img
                      src={`http://localhost:8001/files/${image.uniqueCode}`}
                      alt={`Image ${image.uniqueCode}`}
                      style={{ width: '50px', height: '50px' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDelete(image._id)}>Delete</Button>
                  </TableCell>
                  {/* <TableCell>
                    <Button onClick={() => handleDownload(image.originalname)}>Download</Button>
                  </TableCell> */}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Profile;
