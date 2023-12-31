import { deleteDoc, doc } from "firebase/firestore"
import { HiOutlineUserCircle } from "react-icons/hi"
import { IoMdTrash } from "react-icons/io"
import { RiEditCircleLine } from "react-icons/ri"
import { db } from "../config/firebase"
import AddUpdate from "./AddUpdate"
import useDisclose from "../hooks/useDisclose"
import { toast } from "react-toastify"

const ContactCard = ({contact}) => {
  const {isOpen, onClose, onOpen}=useDisclose();
  const deleteContact=async (id)=>{
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("1 contact deleted");
    } catch (error) {
    }
  }
  return (
    <>
    <div key={contact.id} className="bg-yellow flex justify-between items-center p-2 rounded-lg">
              <div className="flex gap-1">
              <HiOutlineUserCircle className="text-5xl text-orange"/>
              <div className="">
                <h2 className="text-xl">
                  {contact.Firstname} {contact.Surname}
                </h2>
                <p className="text-sm">{contact.Phone}</p>
              </div>
              </div>
              
              <div className="flex text-4xl">
              <RiEditCircleLine onClick={onOpen} className="cursor-pointer"/>
              <IoMdTrash onClick={()=>deleteContact(contact.id)} className="text-orange cursor-pointer"/>
              </div>
            </div>
            <AddUpdate contact={contact} isOpen={isOpen} onClose={onClose} isUpdate/>
    </>
  )
}

export default ContactCard