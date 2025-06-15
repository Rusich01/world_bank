import { useRef, useState } from "react";
import ModalReadMee from "../modalWind/ModalReadMee";
import Registration from "./Registration";
// import PATH from "../data/PATH";

const Entrance = ({ listsUsers, setObjUser }) => {
  const articleForm = useRef(); // Ссылка на форму
  const [readMee, setReadMee] = useState(false);
  const [regWindow, setRegWindow] = useState(true);

  const submitForm = (e) => {
    e.preventDefault();

    const formData = new FormData(articleForm.current);
    const formObj = {};

    formData.forEach((value, key) => {
      formObj[key] = value.trim();
    });

    if (!formObj.login || !formObj.password) {
      alert("Please fill in all fields..");
      return;
    }

    const search = listsUsers.find(
      (us) =>
        us.password === formObj.password &&
        us.login.toLowerCase() === formObj.login.toLowerCase()
    );
    articleForm.current.reset();
    if (search === undefined) {
      alert("No such user found");
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
      {regWindow && (
        <div className="container">
          <form
            ref={articleForm}
            onSubmit={submitForm}
            className="entrance__form"
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

          {/* <div className="container margin__top"> */}
          <button
            className="btn_reg margin__top"
            onClick={() => setRegWindow((pr) => !pr)}
          >
            new user registration
          </button>
          {/* </div> */}
        </div>
      )}

      {!regWindow && <Registration listsUsers={listsUsers} setRegWindow={setRegWindow} />}
    </div>
  );
};

export default Entrance;
