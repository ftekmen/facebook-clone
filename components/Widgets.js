import { useEffect, useState } from "react";
import { SearchIcon } from '@heroicons/react/outline';
import { DotsHorizontalIcon, VideoCameraIcon } from '@heroicons/react/solid';
import Contact from "./Contact";

function Widgets() {
  let [contacts, setContacs] = useState([]);

  useEffect(() => {
    async function getContacts() {
      const res = await fetch('https://randomuser.me/api/?results=7');
      const data = await res.json();
      setContacs(data.results);
    }
    getContacts();
  }, []);

  return (
    <div className="hidden lg:flex flex-col w-60 p-2 mt-5">
      <div className="flex justify-between items-center text-gray-500 mb-5">
        <h2 className="text-xl">Contacts</h2>
        <div className="flex space-x-2">
          <VideoCameraIcon className="h-6" />
          <SearchIcon className="h-6" />
          <DotsHorizontalIcon className="h-6" />
        </div>
      </div>

      {contacts.map(contact => (
        <Contact key={contact.email} src={contact.picture.thumbnail} name={contact.name.first + ' ' + contact.name.last} />
      ))}
    </div>
  )
}

export default Widgets;
