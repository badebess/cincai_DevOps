import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../configs/firebase";
import { message } from "antd";

export const APIEmployees = {
  getEmployees: async () => {
    try {
      const result = await getDocs(collection(db, "employee"));
      const employees = result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return employees;
    } catch (error) {
      message.error("login failed. your email or password is wrong!");
    }
  },
  getEmployeeById: async (id) => {
    try {
      const docRef = doc(db, "employee", `${id}`);
      const docSnap = await getDoc(docRef);
      const result = docSnap.data();
      return result;
    } catch (error) {
      throw new Error (error);
    }
  },
  addEmployee: async (employee) => {
    try {
      const employeeRef = await addDoc(collection(db, "employee"), employee);
      return employeeRef;
    } catch (e) {
      throw new Error(e);
    }
  },
  deleteEmployee: async (id) => {
    try {
      const employeeRef = doc(db, "employee", id);
      await deleteDoc(employeeRef);
      alert ("Successfully deleted employee");
    } catch (e) {
      throw new Error(e);
    }
  },
  updateEmployee: async (id, data) => {
    try {
      const docRef = doc(db, "employee", id);
      await updateDoc(docRef, data).then(() => {
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};
