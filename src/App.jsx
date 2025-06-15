import "./App.css";
import { useEffect, useState } from "react";
import Index from "./components/Index";
import Entrance from "./components/Entrance";

function App() {
  const [listsUsers, setListsUsers] = useState([]); // список пользователей
  const [objUser, setObjUser] = useState({}); // Данные пользователя

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(
          "https://68336dae464b499636ff6c5a.mockapi.io/my/users/user/"
        );

        if (!response.ok) {
          throw new Error("Ошибка при обновлении пользователя");
        }

        const data = await response.json();
        setListsUsers(data);
      } catch (error) {
        console.error("Произошла ошибка:", error);
      }
    };

    getUsers();
  }, [objUser]);

  return (
    <div className="wrapper">
      {!Object.keys(objUser).length > 0 && (
        <Entrance listsUsers={listsUsers} setObjUser={setObjUser} />
      )}
      {Object.keys(objUser).length > 0 && (
        <Index
          objUser={objUser}
          setObjUser={setObjUser}
          listsUsers={listsUsers}
        />
      )}
    </div>
  );
}

export default App;
