import { useSession } from "next-auth/client";
import Image from "next/image";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import { db, storage, ref, uploadString, getDownloadURL } from "../firebase";
import { collection, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';

function InputBox() {
  const [session] = useSession();
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const sendPost = async (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;

    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        message: inputRef.current.value,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: serverTimestamp()
      });

      // docRef.path = posts/#docid
      const storageRef = ref(storage, docRef.path);
      const uploadTask = await uploadString(storageRef, imageToPost, 'data_url');

      removeImage();

      await getDownloadURL(uploadTask.ref).then(async (downloadURL) => {
        await setDoc(doc(db, 'posts', docRef.id), { postImage: downloadURL }, { merge: true });
      });

    } catch (e) {
      console.error('Error adding document: ' + e);
    }

    inputRef.current.value = '';
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    }
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image className="rounded-full" src={session.user.image} width={40} height={40} layout="fixed" />
        <form className="flex flex-1">
          <input ref={inputRef} type="text" className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none" placeholder={`What is on your mind, ${session.user.name}?`} />
          <button hidden type="submit" onClick={sendPost}>Submit</button>
        </form>

        {imageToPost && (
          <div onClick={removeImage} className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer">
            <img src={imageToPost} alt="" className="h-10 object-contain" />
            <p className="text-xs text-red-500 text-center"></p>
          </div>
        )}
      </div>

      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>

        <div onClick={() => filePickerRef.current.click()} className="inputIcon">
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input type="file" hidden onChange={addImageToPost} ref={filePickerRef} />
        </div>

        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  )
}

export default InputBox;