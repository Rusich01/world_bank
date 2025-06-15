import { useEffect, useState } from "react";
import Movements from "./Movements";
import Replenishment from "./Replenishment";
import Transfer from "./Transfer";

const Index = ({ objUser, setObjUser, listsUsers }) => {
  const [movements, setMovements] = useState(0);
  useEffect(() => {
    const sum = objUser.movements.reduce((acc, item) => acc + item, 0);
    setMovements(sum);
  }, [objUser, listsUsers]);

  return (
    <div>
      <div className="index_header">
        <p>{`Welcome ${objUser.name} ${objUser.lastName}`}</p>
        <button onClick={() => setObjUser({})} className="btn_out">
          Out
        </button>
      </div>
      <div className="balance">
        <div>
          <p className="balance__label"></p>
        </div>
        <p className="balance__value">{`Your account: ${movements} $`}</p>
      </div>
      <div className="app">
        <Movements objUser={objUser} />
        <Transfer
          listsUsers={listsUsers}
          objUser={objUser}
          setObjUser={setObjUser}
          movements={movements}
        />
        <Replenishment objUser={objUser} setObjUser={setObjUser} />
      </div>
      <p className="description">
        Technologies used: Js, Css, Json, Jsx, React ' useEffect, useRef,
        useState '
      </p>
    </div>
  );
};

export default Index;
