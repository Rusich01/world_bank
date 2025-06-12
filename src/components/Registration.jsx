import { useRef, useState } from "react";
import ModalReadMee from "../modalWind/ModalReadMee";
// import PATH from "../data/PATH";

const Registration = ({ listsUsers, setObjUser }) => {
  const articleForm = useRef(); // Ссылка на форму
  const [readMee, setReadMee] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();

    const formData = new FormData(articleForm.current);
    const formObj = {};

    formData.forEach((value, key) => {
      formObj[key] = value.trim();
    });

    if (!formObj.login || !formObj.password) {
      alert("Будьласка, заповніть всі поля.");
      return;
    }

    const search = listsUsers.find(
      (us) =>
        us.password === formObj.password &&
        us.login.toLowerCase() === formObj.login.toLowerCase()
    );
    articleForm.current.reset();
    if (search === undefined) {
      alert("Такого користувача не знайдено ");
      return;
    }
    setObjUser(search);
  };

  return (
    <div>
      <div>{readMee && <ModalReadMee users={listsUsers} />}</div>
      {/* <PATH /> */}
      <button className="read_mee" onClick={() => setReadMee((pr) => !pr)}>
        Read me !!!
      </button>
      <h1 className="header">Universal World Bank</h1>
      <div className="container">
        <form
          ref={articleForm}
          onSubmit={submitForm}
          className="registration_form"
        >
          <div className="Login margin-bottom">
            <label className="text_label" htmlFor="Login">
              Login
            </label>
            <input
              name="login"
              type="text"
              id="login"
              maxLength={2}
              // placeholder="Login"
            />
          </div>

          <div className="password margin-bottom">
            <label className="text_label" htmlFor="password">
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              maxLength={4}
              // placeholder="Password"
            />
          </div>

          <button type="submit" className="btn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
