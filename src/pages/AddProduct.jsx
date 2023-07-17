import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {
  getFirestore,
  collection,
  addDoc,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AdminNavbar from './AdminNavbar';

const storage = getStorage();
const firestore = getFirestore();

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleInputChange1 = (event) => {
    setName(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setPrice(event.target.value);
  };

  const handleInputChange3 = (event) => {
    setDetails(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    const imageURL = URL.createObjectURL(file);
    setImageUrl(imageURL);
  };

  const handleUploadImage = async () => {
    if (image) {
      try {
        setLoading(true);
        const storageRef = ref(storage, `images/${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(snapshot.ref);
        setImageUrl(downloadURL);
        console.log('Image uploaded successfully' + imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setUploading(true);
      await addDoc(collection(firestore, 'products'), {
        name: name,
        price: price,
        details: details,
        image: imageUrl,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
    <AdminNavbar/>
    <div className="card m-2 p-3">
      
      <h3 className="mb-3">Add Product</h3>
      <div className="form-group">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Selected"
            className="img-thumbnail mb-3"
            style={{ maxWidth: '200px' }}
          />
        )}
        <label>Image:</label>
        <input type="file" className="form-control-file" onChange={handleImageChange} />
        <button className="btn btn-primary my-3" onClick={handleUploadImage} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" className="form-control" value={name} onChange={handleInputChange1} />
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input type="text" className="form-control" value={price} onChange={handleInputChange2} />
      </div>
      <div className="form-group">
        <label>Details:</label>
        <input type="text" className="form-control" value={details} onChange={handleInputChange3} />
      </div>
      <button className="btn btn-primary" onClick={handleSubmit} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Data'}
      </button>
    </div></>
  );
};

export default AddProduct;
