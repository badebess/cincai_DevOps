import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../configs/firebase'
import { message } from 'antd'
import axios from 'axios'

export const APIEmployees = {
  getEmployees: async () => {
    try {
      const result = await axios.get("http://localhost:3001/get-data/employee")
      return result
    } catch (error) {
      message.error('Login failed. Your email or password is wrong!')
    }
  },
  getEmployeeById: async (id) => {
    try {
      const result = await axios.get(`http://localhost:3001/get-data/employee/${id}`)
      return result.data
    } catch (error) {
      throw new Error(error)
    }
  },
  addEmployee: async (employee) => {
    try {
      const result = await axios.post(`http://localhost:3001/add-data`, employee)
      return result.data
      alert('Successfully add employee')
    } catch (e) {
      throw new Error(e)
    }
  },
  deleteEmployee: async (id) => {
    try {
      const result = await axios.delete(`http://localhost:3001/delete-employee/${id}`)
      alert('Successfully deleted employee')
      return result.data
    } catch (e) {
      throw new Error(e)
    }
  },
  updateEmployee: async (id, data) => {
    try {
      const result = await axios.put(`http://localhost:3001/update-employee/${id}`, data)
      alert('Successfully deleted employee')
      return result.data
    } catch (error) {
      throw new Error(error)
    }
  },
}
