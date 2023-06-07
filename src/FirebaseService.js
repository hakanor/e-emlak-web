import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, where ,query, writeBatch} from 'firebase/firestore';
import { db } from './firebase';

// Define a service object
const FirebaseService = {};

// Fetch all documents from a collection
FirebaseService.getAll = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data = [];
  querySnapshot.forEach((doc) => {
    const item = {
      id: doc.id,
      ...doc.data()
    };
    data.push(item);
  });
  return data;
};

FirebaseService.getAllWhere = async (collectionName, field ,value ) => {
  console.log(`Fetching documents from ${collectionName} where ${field} ${value}`);
  const querySnapshot = await getDocs(collection(db, collectionName));
  console.log(`Found ${querySnapshot.size} documents`);
  const data = [];
  querySnapshot.forEach((doc) => {
    const item = {
      id: doc.id,
      ...doc.data()
    };
    console.log(typeof(item.uid));
    data.push(item);


  });
  console.log(`Returning ${data.length} documents`);

  const filteredData = data.filter((item) => item[field] === value).map((item) => ({
    ...item,
    documentId: item.id,
    status: item.status ? 'true' : 'false'
  }));
  console.log(`Returning ${filteredData.length} documents`);
  return filteredData;
};

// Fetch a single document from a collection by ID
FirebaseService.get = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    const data = {
      id: docSnapshot.id,
      ...docSnapshot.data()
    };
    return data;
  } else {
    throw new Error('Document not found');
  }
};

// Add a new document to a collection
FirebaseService.add = async (collectionName, data) => {
  const docRef = await addDoc(collection(db, collectionName), data);
  const newDocSnapshot = await getDoc(docRef);
  const newDoc = {
    id: newDocSnapshot.id,
    ...newDocSnapshot.data()
  };
  return newDoc;
};

// Update a document in a collection by ID
FirebaseService.update = async (collectionName, id, data) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
  const updatedDocSnapshot = await getDoc(docRef);
  const updatedDoc = {
    id: updatedDocSnapshot.id,
    ...updatedDocSnapshot.data()
  };
  return updatedDoc;
};

// Delete a document from a collection by ID
FirebaseService.delete = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  const deletedDocSnapshot = await getDoc(docRef);
  await deleteDoc(docRef);
  const deletedDoc = {
    id: deletedDocSnapshot.id,
    ...deletedDocSnapshot.data()
  };
  return deletedDoc;
};

// Export the service object
export default FirebaseService;