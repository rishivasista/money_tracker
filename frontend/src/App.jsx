import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
const App = () => {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    getTransactions().then((data) => {
      setTransactions(data);
      // console.log(transactions)
    });
  }, []);
  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + "/transaction";
    const data = await axios.get(url).then((response) => response.data);
    return data;
  }
  function addNewTransaction(event) {
    event.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/transaction";
    const price = name.split(" ")[0];
    axios
      .post(url, {
        price: price,
        name: name.substring(price.length + 1),
        description,
        datetime,
      })
      .then((response) => {
        window.location.reload();
        setName("");
        setDescription("");
        setDatetime("");
        // setPrice('');
        console.log("result", response.data);
      })
      .catch((error) => console.log(error));
  }
  let balance = 0;
  transactions.forEach((transaction) => {
    balance = balance + transaction.price;
  });
  balance = balance.toFixed(2);
  const fraction = balance.split(".")[1];
  balance = Number(balance.split(".")[0]);
  return (
    <main>
      <h1>
      ₹{balance}
        <span>.{fraction}</span>
      </h1>
      <form onSubmit={addNewTransaction}>
        <div className="basics">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={"amount purpose"}
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(event) => setDatetime(event.target.value)}
          />
        </div>
        <div className="description">
          <input
            type="text"
            placeholder={"description"}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 &&
          transactions.map((transaction) => (
            <div className="transaction">
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="right">
                <div
                  className={
                    "price " + (transaction.price < 0 ? "red" : "green")
                  }
                >
                  {transaction.price}
                </div>
                <div className="datetime">{transaction.datetime}</div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default App;
