import { useRef } from "react";

const Transfer = ({ listsUsers, setObjUser, objUser, movements }) => {
  const inputLogin = useRef();
  const inputSum = useRef();
  const addDateNow = new Date().toISOString();

  const moneyTransfer = async (e) => {
    e.preventDefault();

    const loginValue = inputLogin.current.value.toUpperCase();
    const amount = +inputSum.current.value;

    if (
      !loginValue ||
      objUser.login.toUpperCase() === loginValue ||
      amount <= 0 ||
      amount > movements
    ) {
      alert("Please enter the correct data.");
      return;
    }

    const findLogin = listsUsers.find(
      (lg) => lg.login.toUpperCase() === loginValue
    );

    if (!findLogin) {
      alert("No user with this login found");
      return;
    }

    try {
      //  Обновление получателя (полный объект)
      const updatedRecipient = {
        ...findLogin,
        movements: [...findLogin.movements, amount],
        movementsDates: [...findLogin.movementsDates, addDateNow],
      };

      const responseRecipient = await fetch(
        `https://68336dae464b499636ff6c5a.mockapi.io/my/users/user/${findLogin.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRecipient),
        }
      );

      if (!responseRecipient.ok) {
        throw new Error("ошибка при обновлении пользователя");
      }

      // Обновление отправителя (полный объект)
      const updatedSender = {
        ...objUser,
        movements: [...objUser.movements, -amount],
        movementsDates: [...objUser.movementsDates, addDateNow],
      };

      const responseSender = await fetch(
        `https://68336dae464b499636ff6c5a.mockapi.io/my/users/user/${objUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSender),
        }
      );

      if (!responseSender.ok) {
        throw new Error("ошибка при обновлении отправителя ");
      }

      const updatedSenderData = await responseSender.json();

      // Очистка и обновление состояния
      inputLogin.current.value = "";
      inputSum.current.value = "";
      setObjUser(updatedSenderData);
    } catch (error) {
      console.error("Ошибка переводда:", error);
      alert("An error occurred during the transfer.");
    }
  };

  return (
    <div className="operation operation--transfer">
      <h2>Penny transfer</h2>
      <form className="form form--transfer" onSubmit={moneyTransfer}>
        <input
          maxLength={2}
          ref={inputLogin}
          type="text"
          className="form__input form__input--to"
        />
        <input
          ref={inputSum}
          type="number"
          className="form__input form__input--amount"
        />
        <button type="submit" className="form__btn form__btn--transfer">
          &rarr;
        </button>
        <label className="form__label">User login</label>
        <label className="form__label">sum</label>
      </form>
    </div>
  );
};

export default Transfer;
