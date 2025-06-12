import React from "react";

const PATH = () => {
  const NewObjectData = async () => {
    const responseRecipient = await fetch(
      `https://68336dae464b499636ff6c5a.mockapi.io/my/users/user/2`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          // {
          //   email: "parker@us.ss",
          //   name: "Peter",
          //   lastName: "Parker",
          //   login: "PP",
          //   password: "1111",
          //   movements: [241, 736, 340, -350, -20, 500, 300],
          //   movementsDates: [
          //     "2019-11-18T21:31:17.178Z",
          //     "2019-12-23T07:42:02.383Z",
          //     "2020-01-28T09:15:04.904Z",
          //     "2020-04-01T10:17:24.185Z",
          //     "2020-05-08T14:11:59.604Z",
          //     "2023-01-31T23:36:17.929Z",
          //     "2023-02-02T10:51:36.790Z",
          //   ],
          // }
          {
            email: "stark@us.ss",
            name: "Tony",
            lastName: "Stark",
            login: "TS",
            password: "2222",
            movements: [200, 830, 5340],
            movementsDates: [
              "2019-11-01T13:15:33.035Z",
              "2019-11-30T09:48:16.867Z",
              "2019-12-25T06:04:23.907Z",
            ],
          }
          // {
          //   email: "roger@us.ss",
          //   name: "Steve",
          //   lastName: "Roger",
          //   login: "SR",
          //   password: "3333",
          //   movements: [200, 430, 340, -800, -10, 700, 3000, -360],
          //   movementsDates: [
          //     "2019-11-01T13:15:33.035Z",
          //     "2019-11-30T09:48:16.867Z",
          //     "2019-12-25T06:04:23.907Z",
          //     "2020-01-25T14:18:46.235Z",
          //     "2020-02-05T16:33:06.386Z",
          //     "2020-04-10T14:43:26.374Z",
          //     "2020-06-25T18:49:59.371Z",
          //     "2020-07-26T12:01:20.894Z",
          //   ],
          // },
        ),
      }
    );
    responseRecipient();
  };

  return (
    <div>
      PATH
      <button onClick={NewObjectData}>CLICK</button>
    </div>
  );
};

export default PATH;
