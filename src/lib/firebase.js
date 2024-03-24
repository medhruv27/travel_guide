// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyD0-9GEPSWf2gFBjLK6uYu6Q-ldycbvAKM',
	authDomain: 'travel-guide-805ac.firebaseapp.com',
	projectId: 'travel-guide-805ac',
	storageBucket: 'travel-guide-805ac.appspot.com',
	messagingSenderId: '1017704717934',
	appId: '1:1017704717934:web:0f54ae0fcfb8391b14d07f',
	measurementId: 'G-R591X5MTRJ'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
