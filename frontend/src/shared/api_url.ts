import axios from 'axios';
import { API_BASE } from '@shared/config/env';

export const http = axios.create({ baseURL: API_BASE });
