import React, { useState, useEffect } from "react";
import "./showUser.css";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/table/Table";
import FirebaseService from '../../FirebaseService';
import { adColumns } from "../../datatablesource";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase";
import { sendPasswordResetEmail,deleteUser } from "firebase/auth";

const ShowUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [adData, setAdData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const collectionName = "users";
        const result = await FirebaseService.get(collectionName, id);
        setUserData(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();

    const fetchAdData = async () => {
      try {
        const collectionName = "ads";
        const field = "uid";
        const statement = "=="
        const value = id;
        const result = await FirebaseService.getAllWhere(collectionName, field, value);
        console.log(`Fetched ${result.length} ad documents`);
        const transformedData = result.map((doc) => ({
          ...doc,
          documentId: (
            <a href={`/ads/${doc.documentId}`} className="linkCell">
              {doc.documentId}
            </a>
          ),
        }));
        setAdData(transformedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdData();

  }, [id]);

  const handleEditUser = () => {
    const editUserUrl = `/users/edit/${id}`;
    navigate(editUserUrl);
  };

  const handleDeleteUser = () => {
    const confirmDelete = window.confirm("Kullanıcı kaydı silinecektir. Emin misiniz?");
    if (confirmDelete) {
      // Kullanıcıyı silmek için gereken işlemleri gerçekleştirin
      deleteUser();
    }
  };

  const deleteUser = async () => {
    try {
      // Kullanıcıyı Firebase Authentication'dan sil
      const collectionName = "users";
      await FirebaseService.delete(collectionName, id);
      toast.success("Kullanıcı başarıyla silindi.");
    } catch (error) {
      toast.error("Kullanıcı silinirken bir hata oluştu: " + error.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      const email = userData.email;
      await sendPasswordResetEmail(auth, email);
      toast.success("Şifre sıfırlama bağlantısı gönderildi!");
    } catch (error) {
      toast.error("Şifre sıfırlama bağlantısı gönderilirken bir hata oluştu: " + error.message);
    }
  };

  const handleBanUser = async () => {
    try {
      const collectionName = "users";
      const id = userData.id;
      const disableStatus = userData.disabled;
      const updatedData = { disabled: !disableStatus };
      await FirebaseService.update(collectionName, id, updatedData);
      toast.success("Kullanıcı yasaklama işlemi başarılı..");
      setUserData(prevUserData => ({
        ...prevUserData,
        disabled: !disableStatus // Kullanıcının yasaklama durumunu güncelle
      }));
    } catch (error) {
      toast.success("Kullanıcı engellenirken bir hata oluştu:", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Kullanıcı Bilgisi</h1>
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
            <div className="item">
              <img
                src={userData.imageUrl}
                alt="No image"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{userData.name} {userData.surname}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{userData.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{userData.phoneNumber}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{userData.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">uid:</span>
                  <span className="itemValue">{userData.uid}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Ban durumu:</span>
                  <span className={`itemValue ${userData.disabled ? 'red' : 'green'}`}>
                    {userData.disabled ? 'Yasaklı' : 'Aktif'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="buttonContainer">
              <button className="button" onClick={handleEditUser}>Kullanıcıyı Düzenle</button>
            </div>
            <div className="buttonContainer">
              <button className="button" onClick={handleDeleteUser}>Kullanıcıyı Sil</button>
            </div>
            <div className="buttonContainer">
              <button className="button" onClick={handleResetPassword}>Şifre Sıfırlama</button>
            </div>
            <div className="buttonContainer">
              <button className="button" onClick={handleBanUser}>Kullanıcıyı Yasakla</button>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Son İlanları</h1>
          <List data={adData} columns={adColumns} />
        </div>
      </div>
    </div>
  );
};

export default ShowUser;
