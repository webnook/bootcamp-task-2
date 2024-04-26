const transActionBtn = document.querySelector(".transaction-btn");
const table = document.querySelector(".table-body");
const main = document.querySelector(".main");
const showTable = document.querySelector(".show-table");
const input = document.querySelector("input");
const sortPriceBtn = document.querySelector(".price-sort");
const sortDateBtn = document.querySelector(".date-sort");

const app = axios.create({
  baseURL: "http://localhost:3000/transactions",
});

function getData(data) {
  let transactions = "";
  data.forEach((t) => {
    transactions += `
          <tr>
              <td>${t.id}</td>
              <td class=${
                t.type === "برداشت از حساب" ? "decrement" : "increment"
              }>${t.type}</td>
              <td class="price">${t.price.toLocaleString()}</td>
              <td>${t.refId}</td>
              <td class="table-flex">
              <span>${new Date(t.date).toLocaleDateString("fa", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}</span>
              <span>ساعت&nbsp;${new Date(t.date).toLocaleTimeString("fa", {
                hour: "2-digit",
                minute: "2-digit",
              })}</span>
              </td>
            </tr>
          `;
    table.innerHTML = transactions;
  });
}

const loadTransactionsBtn = () => {
  main.classList.add("hidden");
  app.get().then(({ data }) => {
    showTable.classList.remove("hidden");
    getData(data);
  });
};
const searchByRefId = (e) => {
  const value = e.target.value;
  app.get(`?refId_like=${value}`).then(({ data }) => {
    getData(data);
  });
};
const sortByPrice = () => {
  sortPriceBtn.classList.toggle("sorted");
  if (sortPriceBtn.classList.contains("sorted")) {
    app.get("?_sort=price").then(({ data }) => {
      getData(data);
    });
  } else {
    app.get("?_sort=price&_order=desc").then(({ data }) => {
      getData(data);
    });
  }
};
const sortByDate = () => {
  sortDateBtn.classList.toggle("sorted");
  if (sortDateBtn.classList.contains("sorted")) {
    app.get("?_sort=date").then(({ data }) => {
      getData(data);
    });
  } else {
    app.get("?_sort=date&_order=desc").then(({ data }) => {
      getData(data);
    });
  }
};

transActionBtn.addEventListener("click", loadTransactionsBtn);
input.addEventListener("input", searchByRefId);
sortPriceBtn.addEventListener("click", sortByPrice);
sortDateBtn.addEventListener("click", sortByDate);
