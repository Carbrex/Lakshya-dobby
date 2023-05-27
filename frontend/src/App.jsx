import { useEffect, useState } from 'react'
import './App.css'
import GetMyImages from './GetMyImages'
import UploadImage from './UploadImage'
import Login from './Login'

const url = "http://localhost:8080"

const initialState = {
  username: '',
  email: '',
  password: '',
  isMember: true,
};

const App = () => {
  const [values, setValues] = useState(initialState);
  const [user, setUser] = useState(null);
  const [showUpload, setShowUpload] = useState(true);
  const [showGetImages, setShowGetImages] = useState(false);

  const handleUploadClick = () => {
    setShowUpload(true);
    setShowGetImages(false);
  };

  const handleGetImagesClick = () => {
    setShowUpload(false);
    setShowGetImages(true);
  };

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('username')) {
      setUser(localStorage.getItem('username'));
    }
  }, []);

  return (
    <div>
      <header className='header'>
        <h3>Image Uploader</h3>
        {user ? <p>{user}</p> : <p>Log In</p>}
      </header>
      {
        (user && localStorage.getItem('token') && localStorage.getItem('username')) ?
          <>
            <div className='buttons'>
              <button className='btn' onClick={handleUploadClick}>Upload Images</button>
              <button className='btn' onClick={handleGetImagesClick}>Get Images</button>
            </div>
            {showUpload && <UploadImage url={url} />}
            {showGetImages && <GetMyImages url={url} />}
          </>
          :
          <Login url={url} values={values} setValues={setValues} user={user} setUser={setUser} />
      }
    </div>
  );
}

export default App
