import { useEffect, useState } from "react";
import { supabase } from "./../src/pages/api/supabaseCient";

export default function UserLinks({ user_id }) {
  const [links, setLinks] = useState([]);
  const [link, setLink] = useState("");

  useEffect(async () => {
    await loadList();
    subscribeToInserts();
  }, []);

  const loadList = async () => {
    let { data, error } = await supabase.from("links").select("*");

    setLinks(data);
  };

  const subscribeToInserts = () => {
    supabase.from("links").on("INSERT", loadList).subscribe();
  };

  const addLink = async () => {
    try {
      const { data, error } = await supabase
        .from("links")
        .insert([{ name: link, user_id }]);

      if (error) throw error;

      alert(JSON.stringify(data));
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setLink(e.target.value)}
        value={link}
      ></input>
      <button onClick={addLink}>Add</button>
      <ul>
        {links.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
