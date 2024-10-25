import {
    querySnapshot,
    addDoc,
    collection,
    getDocs,
    query,
    deleteDoc,
    doc,
    getFirestore,
    getDoc,
    updateDoc,
    deleteField,
    arrayUnion,
  } from "firebase/firestore";
  import { db } from "../configs/firebase";
  
  export const APISchedule = {
    
    addSchedule: async (employeId,data) => {
      const employeeRef = doc(db, "employee", `${employeId}`);
      try {
          await updateDoc(employeeRef,{
            schedule: arrayUnion({desc : `${data}`})
            
          });
          alert ("Successfully add schedule");
        }
    catch (e) {
        throw new Error(e);
      }
    },
  };