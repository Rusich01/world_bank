import { useRef, useState } from "react";

const Replenishment = ({ objUser, setObjUser }) => {
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addMoney = async (e) => {
    e.preventDefault();
    const addDateNow = new Date().toISOString();
    const amount = +inputRef.current.value;

    if (isNaN(amount) || amount <= 0) {
      setError("Enter the correct amount..");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://68336dae464b499636ff6c5a.mockapi.io/my/users/user/${objUser.id}`
      );
      if (!response.ok) throw new Error("Problems with data retrieval.");

      const data = await response.json();
      const updatedMovements = [...data.movements, amount];

      const updateResponse = await fetch(
        `https://68336dae464b499636ff6c5a.mockapi.io/my/users/user/${objUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            movements: updatedMovements,
            movementsDates: [...(data.movementsDates || []), addDateNow],
          }),
        }
      );
      if (!updateResponse.ok) throw new Error("Error while updating data.");

      const updatedData = await updateResponse.json();
      setObjUser(updatedData);
      inputRef.current.value = "";
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="operation operation--loan">
      <h2>Replenishment of funds</h2>
      <form className="form form--loan" onSubmit={addMoney}>
        <input
          ref={inputRef}
          type="number"
          className="form__input form__input--loan-amount"
          disabled={loading}
        />
        <button
          type="submit"
          className="form__btn form__btn--loan"
          disabled={loading}
        >
          {loading ? "..." : "→"}
        </button>
        <label className="form__label form__label--loan">sum</label>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Replenishment;
