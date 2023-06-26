import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig_dev = {
  apiKey: 'AIzaSyDqwMTdToAsmP-WbUPL_HiPwckVjs7OkPc',
  authDomain: 'kakebo-dev.firebaseapp.com',
  projectId: 'kakebo-dev',
  storageBucket: 'kakebo-dev.appspot.com',
  messagingSenderId: '1082952931599',
  appId: '1:1082952931599:web:f19d56efc7a86789cb867a',
};
// Initialize Firebase
let firebaseApp;
switch (process.env.NEXT_PUBLIC_STAGE) {
  case 'dev':
    firebaseApp = initializeApp(firebaseConfig_dev);
    break;
}

export const auth = getAuth(firebaseApp);
