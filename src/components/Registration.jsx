import { useRef, useState } from "react";

const Registration = ({ listsUsers, setRegWindow }) => {
  const formRegistration = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const newDataObj = listsUsers.filter((element) => element.login.length >= 3); // Пустые объекты для юзеров

  const getInfoRegistration = (e) => {
    e.preventDefault();

    const formDataRegistration = new FormData(formRegistration.current);
    const registrationData = {}; // -  Данные с формы

    console.log(registrationData);
    //  через цикл добавил данные в форму
    formDataRegistration.forEach((value, key) => {
      registrationData[key] = value.trim();
    });

    // Проверка наличия необходимых данных
    if (
      !registrationData.name ||
      !registrationData.lastName ||
      !registrationData.email ||
      !registrationData.password
    ) {
      alert("Please fill out all fields.");
      return;
    }

    //  Создание и добавление в объект логин для нового юзера
    registrationData.login = `${registrationData.name[0]}${registrationData.lastName[0]}`;

    // Добавление нового пользователя в объект

    const addUserGlobalObj = async () => {
      try {
        const response = await fetch(
          `https://68336dae464b499636ff6c5a.mockapi.io/my/users/user/${newDataObj[0].id}`
        );
        const data = await response.json();
        if (!response.ok) throw new Error("Problems with data retrieval.");

        const addUserResponse = await fetch(
          `https://68336dae464b499636ff6c5a.mockapi.io/my/users/user/${newDataObj[0].id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data, ...registrationData }),
          }
        );
        if (!addUserResponse.ok)
          throw new Error("Problems with data retrieval.");

        if (addUserResponse.ok) {
          alert(`
Thank you for registering`);
          setTimeout(() => {
            setRegWindow(true);
          }, 1000);
        }
      } catch (error) {
        console.error(error);
      }
    };
    addUserGlobalObj();
  };
  return (
    <div className="container">
      <form
        className="registration entrance__form"
        ref={formRegistration}
        onSubmit={getInfoRegistration}
      >
        <label className="label__registration"> Registration</label>

        <label>Name</label>
        <input
          type="text"
          name="name"
          required
          //placeholder="name"
        />

        <label>LastName</label>
        <input
          type="text"
          name="lastName"
          required
          // placeholder="lastName"пше
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          required
          // placeholder="email"
        />

        <label>password</label>
        <div className="container_input">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            maxLength={4}
            required
            // placeholder="max length 4"
          />
          <span className="eyes" onClick={() => setShowPassword((pr) => !pr)}>
            👁️
          </span>
        </div>

        <button className="btn" type="submit">
          Send
        </button>
        <span className="cancel" onClick={() => setRegWindow(true)}>
          &times;
        </span>
      </form>
    </div>
  );
};

export default Registration;
