const ModalReadMee = ({ users }) => {
  const user = users.filter((item) => item.login.length <= 2);
  return (
    <div className="modal_window">
      <ul>
        {user.map((us) => (
          <li
            key={us.lastName}
          >{`Login: "${us.login.toUpperCase()}"  password: ${us.password}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default ModalReadMee;
