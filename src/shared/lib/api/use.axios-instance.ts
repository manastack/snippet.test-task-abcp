import axios, { AxiosInstance } from 'axios'

export const axiosInstance: AxiosInstance = axios.create({
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
})

export const useAxiosInstance = (): AxiosInstance => axiosInstance
