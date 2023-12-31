import Navbar from "./components/Navbar";
import {FiSearch} from "react-icons/fi";
import {AiFillPlusCircle} from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddUpdate from "./components/AddUpdate";
import useDisclose from "./hooks/useDisclose";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./components/NotFound";


const App = () =>{
  const [contact, setContact]=useState([]);
  const {isOpen, onClose, onOpen}=useDisclose();
  useEffect(()=>{
    const getContacts=async()=>{
      try{
        const contactsRef=collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot)=>{
          const contactsList=snapshot.docs.map((doc)=>{
            return{
              id: doc.id,
              ...doc.data(),
            }
          });
          setContact(contactsList);
          return contactsList;
        });
        
      }catch(error){
      }
    };
    getContacts();
  }, []);

  const filterContacts=(e)=>{
    const value=e.target.value;
    const contactsRef=collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot)=>{
          const contactsList=snapshot.docs.map((doc)=>{
            return{
              id: doc.id,
              ...doc.data(),
            }
          });
          setContact(contactsList);

          const filteredContacts=contactsList.filter(contact=> contact.Firstname.toLowerCase().includes(value.toLowerCase())
          || contact.Surname.toLowerCase().includes(value.toLowerCase())
          );
          setContact(filteredContacts);
          return contactsList;
        });
  }
  return (
    <>
    <div className="mx-auto px-4">
      <Navbar/>
      <div className="flex relative items-center gap-2">
        <FiSearch className="text-white text-3xl absolute ml-5"/>
        <input onChange={filterContacts}type="text" className="text-white flex-grow bg-transparent border border-white rounded-md h-10 pl-16"></input>
        <AiFillPlusCircle
        className="text-5xl text-white cursor-pointer" onClick={onOpen}/>
      </div>
      <div className="flex flex-col gap-3">
        {
          contact.length <=0 ?
          <NotFound/>
          :
          contact.map((contact)=>(
            <ContactCard key={contact.id} contact={contact}/>
          ))
        }
      </div>
    </div>
    <AddUpdate contact={contact} isUpdate={false} isOpen={isOpen} onClose={onClose}/>
    <ToastContainer
    position="bottom-center"
    />
    </>
  );
};

export default App;