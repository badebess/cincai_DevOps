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
    
    deleteScedule: async (employeId,id) => {
      try {
        const employeeRef = doc(db, "employee", ${employeId});
        const employeeSnap = await getDoc(employeeRef);

        if (employeeSnap.exists()) {
          const employeeData = employeeSnap.data();
          const updateSchedule= employeeData.schedule;
          updateSchedule.splice(id,1);
          await updateDoc(employeeRef,{
            schedule: updateSchedule
            
          });
        }
        alert ("Successfully deleted schedule");
      } catch (e) {
        throw new Error(e);
      }
    },

    updateScedulebyId: async (employeId,id,data) => {
      try {
        const employeeRef = doc(db, "employee", ${employeId});
        const employeeSnap = await getDoc(employeeRef);

        if (employeeSnap.exists()) {
          const employeeData = employeeSnap.data();
          const updateSchedule= employeeData.schedule.map((item,index) => {
            let idx = index.toString();
            if (idx === id){
              return { ...item, desc: data};
            }
            return item;
          });
          await updateDoc(employeeRef,{
            schedule: updateSchedule
            
          });
        }
        alert ("Successfully update schedule");
      } catch (e) {
        throw new Error(e);
      }
    },
  };