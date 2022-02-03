import axios from 'axios';
import { generateToken } from '../utils/generateToken';

const X_APP_ID: string = localStorage.getItem('X-APP-ID') || generateToken();

export const api = axios.create({
  baseURL: 'https://testtask.softorium.pro/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'X-APP-ID': X_APP_ID,
  },
});
