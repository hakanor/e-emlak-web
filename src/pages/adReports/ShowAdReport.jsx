import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FirebaseService from '../../FirebaseService';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './showAdReport.css';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ShowAdReport = () => {
  const { id } = useParams();
  const [reportData, setReportData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const report = await FirebaseService.get('adReports', id);
        setReportData(report);
      } catch (error) {
        console.log('Error fetching report data:', error);
      }
    };

    fetchReportData();
  }, [id]);

  if (!reportData) {
    return <div>Loading...</div>;
  }

  const handleDeleteReport = async () => {
    const confirmed = window.confirm('Rapor kaydını silmek istediğinize emin misiniz?');

    if (confirmed) {
      try {
        // Rapor kaydını silme işlemleri burada gerçekleştirilebilir
        await FirebaseService.delete('adReports', reportData.id);
        console.log('Rapor kaydı silindi');
        toast.success('Rapor kaydı başarıyla silindi.');
      } catch (error) {
        console.log('Error deleting report:', error);
        toast.error('Rapor kaydı silinirken bir hata oluştu.');
      }
    }
  };

  const toggleStatus = async () => {
    try {
      const updatedStatus = !reportData.status; // Toggle the status
      
      // Raporun durumunu güncelle
      const updatedReport = await FirebaseService.update('adReports', id, {
        status: updatedStatus
      });
      
      // Güncellenmiş raporu state'e yerleştir
      setReportData(updatedReport);
  
      console.log('Rapor durumu güncellendi');
      toast.success('Rapor durumu başarıyla güncellendi.');
    } catch (error) {
      console.log('Error updating report status:', error);
      toast.error('Rapor durumu güncellenirken bir hata oluştu.');
    }
  };

  const navigateToUser = () => {
    const userId = reportData.userId;
  
    // İlgili üyeye yönlendirme işlemi
    navigate(`/users/${userId}`);
  };

  const navigateToAd = () => {
    const adId = reportData.adId;
  
    // İlgili üyeye yönlendirme işlemi
    navigate(`/ads/${adId}`);
  };

  return (
    <div className="edit">
      <Sidebar />
      <div className="editContainer">
        <Navbar />
        <div className="top">
          <h1>İlan Rapor Detayları</h1>
        </div>
        <div className="bottom">
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
<TableContainer>
  <Table>
    <TableBody>
      <TableRow>
        <TableCell>Rapor ID'si:</TableCell>
        <TableCell>{reportData?.id ?? "no data"}</TableCell>
      </TableRow>
      
<TableRow>
  <TableCell>İlgili İlan ID'si:</TableCell>
  <TableCell>
    {reportData?.adId ? (
      <Link to={`/ads/${reportData.adId}`}>{reportData.adId}</Link>
    ) : (
      "no data"
    )}
  </TableCell>
</TableRow>
      <TableRow>
        <TableCell>Tarih:</TableCell>
        <TableCell>{reportData?.date?.toDate().toLocaleString() ?? "no data"}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Rapor Kategorisi:</TableCell>
        <TableCell>{reportData?.reportCategory ?? "no data"}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Açıklama:</TableCell>
        <TableCell>{reportData?.description ?? "no data"}</TableCell>
      </TableRow>
<TableRow>
  <TableCell>Raporlanan User ID'si:</TableCell>
  <TableCell>
    {reportData?.userId ? (
      <Link to={`/users/${reportData.userId}`}>{reportData.userId}</Link>
    ) : (
      "no data"
    )}
  </TableCell>
</TableRow>
<TableRow>
  <TableCell>Raporlayan User ID'si:</TableCell>
  <TableCell>
    {reportData?.reporterId ? (
      <Link to={`/users/${reportData.reporterId}`}>{reportData.reporterId}</Link>
    ) : (
      "no data"
    )}
  </TableCell>
</TableRow>
<TableRow>
  <TableCell>Durum:</TableCell>
  <TableCell>
  <span
      style={{
        color: reportData?.status ? 'green' : 'red',
        fontWeight: 'bold'
      }}
    >
      {reportData?.status ? 'Aktif' : 'Pasif'}
    </span>
  </TableCell>
</TableRow>
    </TableBody>
  </Table>
</TableContainer>
        </div>
        <div className="buttons" style={{ textAlign: 'center', paddingRight: '20px' }}>
            <Button variant="contained" sx={{backgroundColor:"#049FFF", marginRight: '10px'}} onClick={handleDeleteReport}>
              Rapor Kaydını Sil
            </Button>
            <Button variant="contained" sx={{backgroundColor:"#049FFF", marginRight: '10px'}} onClick={toggleStatus}>
              Aktif/Pasif Duruma Getir
            </Button>
            <Button variant="contained" sx={{backgroundColor:"#049FFF", marginRight: '10px'}} onClick={navigateToUser}>
              İlgili İlana Git
            </Button>
            <Button variant="contained" sx={{backgroundColor:"#049FFF", marginRight: '10px'}} onClick={navigateToAd}>
              İlgili Üyeye Git
            </Button>
          </div>
      </div>
    </div>
  );
};

export default ShowAdReport;
