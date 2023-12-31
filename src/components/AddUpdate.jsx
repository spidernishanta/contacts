import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Modal from "./Modal"
import { Formik, Field, Form } from "formik";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const Validation=Yup.object().shape({
    Firstname: Yup.string(),
    Surname: Yup.string(),
    Company: Yup.string(),
    Phone: Yup.number().required(""),
    Email: Yup.string(),
})

const AddUpdate = ({isOpen, onClose, isUpdate, contact}) => {
    const addContact=async (contact)=>{
        try {
            const contactsRef=collection(db, "contacts");
            await addDoc(contactsRef, contact);
            onClose();
            toast.success(contact.Firstname+" "+contact.Surname+" saved");
        } catch (error) {
        }
    }

    const updateContact=async (contact, id)=>{
        try {
            const contactsRef=doc(db, "contacts", id);
            await updateDoc(contactsRef, contact);
            onClose();
            toast.success(contact.Firstname+" "+contact.Surname+" saved");
        } catch (error) {
        }
    }

  return (
    <div>
        <Modal isOpen={isOpen} onClose={onClose}>
            <Formik
            validationSchema={Validation}
            initialValues={
                isUpdate? 
                {
                Firstname: contact.Firstname,
                Surname: contact.Surname,
                Company: contact.Company,
                Phone: contact.Phone,
                Email: contact.Email,
                }
                :
                {
                Firstname: "",
                Surname: "",
                Company: "",
                Phone: "",
                Email: "",
            }}
            onSubmit={(values)=>{                
                isUpdate?
                updateContact(values, contact.id)
                :
                addContact(values);
            }}
            >
                <Form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="Firstname">First name</label>
                        <Field name="Firstname" className="border h-10"/>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="Surname">Surname</label>
                        <Field name="Surname" className="border h-10"/>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="Company">Company</label>
                        <Field name="Company" className="border h-10"/>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="Phone">Phone</label>
                        <Field name="Phone" className="border h-10"/>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="Email">Email</label>
                        <Field name="Email" className="border h-10"/>
                    </div>

                    <button type="submit" className="bg-sky-500 px-3 py-1.5 self-center rounded-lg">Save</button>
                </Form>
            </Formik>
        </Modal>
    </div>
  )
}

export default AddUpdate