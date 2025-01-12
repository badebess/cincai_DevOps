import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore'
import { db } from '../configs/firebase'
import axios from 'axios'

export const APISchedule = {
  addSchedule: async (employeId, {data}) => {
    try {
      const result = await axios.post(`http://localhost:3001/add-schedule/${employeId}`, data)
      return result.data
      alert('Successfully added schedule')
    } catch (e) {
      throw new Error(e)
    }
  },

  deleteSchedule: async (employeId, {data}) => {
    try {
      const result = await axios.delete(`http://localhost:3001/delete-schedule/${employeId}`, {data: data})
      return result.data
      alert('Successfully deleted schedule')
    } catch (e) {
      throw new Error(e)
    }
  },

  updateScheduleById: async (employeId, id, {data}) => {
    try {
      const response = await axios.put(`http://localhost:3001/update-schedule/${employeId}/${id}`, {
        data: data  // Pastikan data berisi objek dengan properti 'desc'
      });
      alert('Successfully updated schedule')
    } catch (e) {
      throw new Error(e)
    }
  },
}
