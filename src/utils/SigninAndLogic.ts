import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './firebase.ts';

export const signUp = (email: string, password: string, name: string) =>
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, { displayName: name }).then(() => {});
            return userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            throw new Error(`${errorCode}: ${errorMessage}`);
        });

export const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return userCredential.user;
        })
        .catch((error) => {
            throw new Error(error);
        });
