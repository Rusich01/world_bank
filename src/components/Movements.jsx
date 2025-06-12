const Movements = ({ objUser }) => {
  // Об'єднуємо суми та дати в один масив
  const sortedMovements = objUser.movements
    .map((userSum, index) => ({
      amount: userSum,
      date: new Date(objUser.movementsDates[index]),
    }))
    .sort((a, b) => b.date - a.date); // Сортуємо за датою спаданням

  return (
    <ul className="movements">
      {sortedMovements.map((movement, index) => {
        const formattedDate = movement.date.toLocaleDateString("uk-UA", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <li key={index} className="movements__row">
            <div
              className={`movements__type movements__type--${
                movement.amount > 0 ? "deposit" : "withdrawal"
              }`}
            >
              {movement.amount > 0 ? "enrollment" : "sending"}
            </div>
            <div className="movements__date">{formattedDate}</div>
            <div className="movements__value">{movement.amount} ₴</div>
          </li>
        );
      })}
    </ul>
  );
};

export default Movements;
