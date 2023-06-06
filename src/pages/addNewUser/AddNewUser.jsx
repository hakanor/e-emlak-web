import "./addNewUser.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  doc,
  setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNewUser = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const uid = res.user.uid;
      const name = `${uid}.jpeg`;

      const storageRef = ref(storage, `profile_images/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPerc(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const userData = {
              ...data,
              uid,
              imageUrl: downloadURL,
              aboutMe: `Merhaba, Benim adım ${data.name}. e-Emlak uygulamasını kullandığım için çok mutluyum!`,
            };

            setDoc(doc(db, "users", uid), {
              ...userData,
            });
            
            toast.success("Kullanıcı başarıyla oluşturuldu.");
            setData({});
          });
        }
      );
    } catch (err) {
      if (err.code === "auth/weak-password") {
        toast.error("Şifre yetersiz güçlüktedir.");
      } else if (err.code === "auth/invalid-password") {
        toast.error("Geçersiz şifre formatı.");
      } else {
        console.log(err);
        toast.error(`Kullanıcı oluşturulurken bir hata oluştu: ${err}`);
      }
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Yeni Kullanıcı Ekle</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter name"
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label htmlFor="surname">Surname:</label>
                <input
                  id="surname"
                  type="text"
                  placeholder="Enter surname"
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label htmlFor="password">Password:</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="Enter phone number"
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label htmlFor="city">City:</label>
                <input
                  id="city"
                  type="text"
                  placeholder="Enter city"
                  onChange={handleInput}
                />
              </div>
              <button disabled={per !== null && per < 100} className="sendButton" type="submit" style={{ backgroundColor: '#049FFF' }} >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewUser;
