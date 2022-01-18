import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export class FirebaseCnn {
    constructor() { }

    init = () => {
        const firebaseConfig = {
            apiKey: process.env.API_KEY || "AIzaSyDs1syJw90-lcmWdeF6yofajvaKMhk1iY0",
            authDomain: process.env.AUTH_DOMAIN || "blind-people-image-storage.firebaseapp.com",
            projectId: process.env.PROJECT_ID || "blind-people-image-storage",
            storageBucket: process.env.STORAGE_BUCKET || "blind-people-image-storage.appspot.com",
            messagingSenderId: process.env.MESSAGING_SENDER_ID || "951998931962",
            appId: process.env.APP_ID || "1:951998931962:web:ff1c42da54540b8dc57a43"
        };
        const app = initializeApp(firebaseConfig);
        return app;
    }

    uploadImage = (file) => {
        return new Promise(
            (resolve, reject) => {
                const storage = getStorage();
                const storageRef = ref(storage, file.name);
                uploadBytes(storageRef, file)
                    .then(
                        snap => {
                            getDownloadURL(snap.ref)
                                .then(
                                    (url) => {
                                        resolve(url);
                                    }
                                )
                                .catch(
                                    (error) => {
                                        reject('Upload failed', error);
                                    }
                                )
                        }
                    )
                    .catch(
                        error => {
                            reject(error);
                        }
                    )
            }
        )
    }

}