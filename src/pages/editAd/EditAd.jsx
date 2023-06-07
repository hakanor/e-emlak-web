import "./editAd.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FirebaseService from "../../FirebaseService";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const EditAd = () => {
    const [adData, setAdData] = useState({});

    const { id } = useParams();

    useEffect(() => {
        const fetchAdData = async () => {
            try {
                const docRef = doc(db, "ads", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const adData = docSnap.data();
                    console.log(adData);
                    setAdData(adData);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAdData();
    }, [id]);

    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setAdData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleEdit = async (e) => {
        e.preventDefault();

        try {
            const updatedData = {
                ...adData,
                // Burada güncellenecek alanları ve değerlerini belirtin
            };

            await FirebaseService.update("ads", id, updatedData);

            toast.success("İlan başarıyla güncellendi.");
        } catch (err) {
            console.log(err);
            toast.error(`İlan güncellenirken bir hata oluştu: ${err}`);
        }
    };

    return (
        <div className="edit">
            <Sidebar />
            <div className="editContainer">
                <Navbar />
                <div className="top">
                    <h1>İlanı Düzenle</h1>
                </div>
                <div className="bottom">
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
                            {adData.estateType && (
                                <div>

                                    <div className="formInput">
                                        <label htmlFor="title">Başlık:</label>
                                        <input
                                            id="title"
                                            type="text"
                                            placeholder="Başlık girin"
                                            value={adData.title || ''}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div className="formInput">
                                        <label htmlFor="description">Açıklama:</label>
                                        <textarea
                                            id="description"
                                            placeholder="Açıklama girin"
                                            value={adData.description || ''}
                                            onChange={handleInput}
                                        ></textarea>
                                    </div>

                                    <div className="formInput">
                                        <label htmlFor="price">Fiyat:</label>
                                        <input
                                            id="price"
                                            type="text"
                                            placeholder="Fiyat girin"
                                            value={adData.price || ''}
                                            onChange={handleInput}
                                        ></input>
                                    </div>



                                    <div className="formInput">
                                        <label htmlFor="uid">Kullanıcı ID:</label>
                                        <input
                                            id="uid"
                                            type="text"
                                            placeholder="Kullanıcı ID girin"
                                            value={adData.uid || ''}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div className="formInput">
                                        <label htmlFor="location">Konum:</label>
                                        <input
                                            id="location"
                                            type="text"
                                            placeholder="Konum girin"
                                            value={adData.location || ''}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div className="formInput">
                                        <label htmlFor="latitude">Enlem:</label>
                                        <input
                                            id="latitude"
                                            type="number"
                                            placeholder="Enlem girin"
                                            value={adData.latitude || ''}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div className="formInput">
                                        <label htmlFor="longitude">Boylam:</label>
                                        <input
                                            id="longitude"
                                            type="number"
                                            placeholder="Boylam girin"
                                            value={adData.longitude || ''}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div className="formInput">
                                        <label htmlFor="squareMeter">Metrekare:</label>
                                        <input
                                            id="squareMeter"
                                            type="text"
                                            placeholder="Metrekare girin"
                                            value={adData.squareMeter || ''}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    {adData.estateType.split('/')[0] === 'Konut' && (
                                        <div>


                                            <div className="formInput">
                                                <label htmlFor="squareMeterNet">Net Metrekare:</label>
                                                <input
                                                    id="squareMeterNet"
                                                    type="text"
                                                    placeholder="Net metrekare girin"
                                                    value={adData.squareMeterNet || ''}
                                                    onChange={handleInput}
                                                />
                                            </div>




                                            <div className="formInput">
                                                <label htmlFor="numberOfRooms">Oda Sayısı:</label>
                                                <input
                                                    id="numberOfRooms"
                                                    type="number"
                                                    placeholder="Oda sayısı girin"
                                                    value={adData.numberOfRooms || ''}
                                                    onChange={handleInput}
                                                />
                                            </div>

                                            <div className="formInput">
                                                <label htmlFor="numberOfBathrooms">Banyo Sayısı:</label>
                                                <input
                                                    id="numberOfBathrooms"
                                                    type="number"
                                                    placeholder="Banyo sayısı girin"
                                                    value={adData.numberOfBathrooms || ''}
                                                    onChange={handleInput}
                                                />
                                            </div>

                                            <div className="formInput">
                                                <label htmlFor="ageOfBuilding">Bina Yaşı:</label>
                                                <input
                                                    id="ageOfBuilding"
                                                    type="number"
                                                    placeholder="Bina yaşı girin"
                                                    value={adData.ageOfBuilding || ''}
                                                    onChange={handleInput}
                                                />
                                            </div>

                                            <div className="formInput">
                                                <label htmlFor="floorNumber">Kat Numarası:</label>
                                                <input
                                                    id="floorNumber"
                                                    type="number"
                                                    placeholder="Kat numarası girin"
                                                    value={adData.floorNumber || ''}
                                                    onChange={handleInput}
                                                />
                                            </div>

                                            <div className="formInput">
                                                <label htmlFor="numberOfFloors">Bina Kat Numarası:</label>
                                                <input
                                                    id="numberOfFloors"
                                                    type="number"
                                                    placeholder="Bina kat numarası girin"
                                                    value={adData.numberOfFloors || ''}
                                                    onChange={handleInput}
                                                />
                                            </div>
                                            <div className="formInput">
                                                <label htmlFor="heating">Isıtma:</label>
                                                <input
                                                    id="heating"
                                                    type="text"
                                                    placeholder="Isıtma girin"
                                                    value={adData.heating || ''}
                                                    onChange={handleInput}
                                                />
                                            </div>

                                        </div>
                                    )}

                                    {adData.estateType.split('/')[0] === 'Arsa' && (
                                        <div>



                                            <div className="formInput">
                                                <label htmlFor="pricePerSquareMeter">Metrekare Fiyatı:</label>
                                                <input
                                                    id="pricePerSquareMeter"
                                                    type="text"
                                                    placeholder="Metrekare fiyatı girin"
                                                    value={adData.pricePerSquareMeter || ''}
                                                    onChange={handleInput}
                                                />
                                            </div>

                                            <div className="formInput">
                                                <label htmlFor="blockNumber">Ada Numarası:</label>
                                                <input
                                                    id="blockNumber"
                                                    type="text"
                                                    placeholder="Ada Numarası  girin"
                                                    value={adData.blockNumber || ''}
                                                    onChange={handleInput}
                                                />
                                            </div>

                                            <div className="formInput">
                                                <label htmlFor="parcelNumber">Parsel Numarası:</label>
                                                <input
                                                    id="parcelNumber"
                                                    type="text"
                                                    placeholder="Parsel Numarası  girin"
                                                    value={adData.parcelNumber || ''}
                                                    onChange={handleInput}
                                                />
                                            </div>



                                        </div>
                                    )}

                                    {adData.estateType.split('/')[0] === 'İş Yeri' && (
                                        <div>
                                            <div className="formInput">
                                                <label htmlFor="ageOfBuilding">Bina Yaşı:</label>
                                                <input
                                                    id="ageOfBuilding"
                                                    type="number"
                                                    placeholder="Bina yaşı girin"
                                                    value={adData.ageOfBuilding || ''}
                                                    onChange={handleInput}
                                                />
                                            </div>

                                            <div className="formInput">
                                                <label htmlFor="numberOfFloors">Kat Sayısı:</label>
                                                <input
                                                    id="numberOfFloors"
                                                    type="number"
                                                    placeholder="Kat sayısı girin"
                                                    value={adData.numberOfFloors || ''}
                                                    onChange={handleInput}
                                                />
                                            </div>

                                            <div className="formInput">
                                                <label htmlFor="heating">Isıtma:</label>
                                                <input
                                                    id="heating"
                                                    type="text"
                                                    placeholder="Isıtma girin"
                                                    value={adData.heating || ''}
                                                    onChange={handleInput}
                                                />
                                            </div>


                                        </div>
                                    )}

                                </div>
                            )}

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

export default EditAd;