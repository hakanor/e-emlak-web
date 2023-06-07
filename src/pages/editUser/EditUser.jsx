import "./editUser.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'react-router-dom';
import FirebaseService from '../../FirebaseService';

const EditUser = () => {
  const [data, setData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setData(userData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [id]);

  const removePhoto = async () => {
    try {
      await FirebaseService.update("users", id, { imageUrl: "https://firebasestorage.googleapis.com/v0/b/e-emlak-94aba.appspot.com/o/avatar.jpg?alt=media&token=0ee27972-fd95-4f7d-bd64-e019049e8ab5" });
  
      setData((prevData) => ({
        ...prevData,
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/e-emlak-94aba.appspot.com/o/avatar.jpg?alt=media&token=0ee27972-fd95-4f7d-bd64-e019049e8ab5",
      }));
  
      toast.success("Fotoğraf başarıyla kaldırıldı ve güncellendi.");
    } catch (err) {
      console.log(err);
      toast.error(`Fotoğraf kaldırılırken bir hata oluştu: ${err}`);
    }
  };

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    
    try {
      const updatedData = {
        ...data,
        aboutMe: `Merhaba, Benim adım ${data.name}. e-Emlak uygulamasını kullandığım için çok mutluyum!`,
      };
      
      await FirebaseService.update("users", id, updatedData);
      
      toast.success("Kullanıcı başarıyla güncellendi.");
    } catch (err) {
      console.log(err);
      toast.error(`Kullanıcı güncellenirken bir hata oluştu: ${err}`);
    }
  };

  return (
    <div className="edit">
      <Sidebar />
      <div className="editContainer">
        <Navbar />
        <div className="top">
          <h1>Kullanıcıyı Düzenle</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                data.imageUrl ||
                "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            <div className="removePhoto">
                <button className="removePhotoButtone" onClick={removePhoto}>
                Fotoğrafı Kaldır
                </button>
            </div>
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
            <form onSubmit={handleEdit}>
              <div className="formInput">
                <label htmlFor="aboutMe">Hakkımda:</label>
                <input
                  id="aboutMe"
                  type="text"
                  placeholder="Hakkımda girin"
                  value={data.aboutMe || ''}
                  onChange={handleInput}
                />
              </div>

              <div className="formInput">
                <label htmlFor="city">Şehir:</label>
                <input
                  id="city"
                  type="text"
                  placeholder="Şehir girin"
                  value={data.city || ''}
                  onChange={handleInput}
                />
              </div>
              
              <div className="formInput">
                <label htmlFor="name">Ad:</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Adı girin"
                  value={data.name || ''}
                  onChange={handleInput}
                />
              </div>

              <div className="formInput">
                <label htmlFor="surname">Soyad:</label>
                <input
                  id="surname"
                  type="text"
                  placeholder="Soyadı girin"
                  value={data.surname || ''}
                  onChange={handleInput}
                />
              </div>

              <div className="formInput">
                <label htmlFor="phoneNumber">Telefon Numarası:</label>
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="Telefon numarasını girin"
                  value={data.phoneNumber || ''}
                  onChange={handleInput}
                />
              </div>
              
              <button className="sendButton" type="submit">
                Düzenle
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
