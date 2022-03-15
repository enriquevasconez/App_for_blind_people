import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export class FirebaseCnn {
    constructor() { }

    init = () => {
        const firebaseConfig = {
            apiKey: process.env.REACT_APP_API_KEY,
            authDomain: process.env.REACT_APP_AUTH_DOMAIN,
            projectId: process.env.REACT_APP_PROJECT_ID,
            storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
            appId: process.env.REACT_APP_APP_ID
        };
        const app = initializeApp(firebaseConfig);
        return app;
    }

    uploadImage = (file) => {
        return new Promise(
            (resolve, reject) => {
                const storage = getStorage();
                const storageRef = ref(storage, `${generateId()}${file.name}`);
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

function dec2hex(dec) {
    return dec.toString(16).padStart(2, "0")
}

function generateId(len) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}