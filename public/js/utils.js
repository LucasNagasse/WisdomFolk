function createDOMElement(element, parent) {
  let htmlElement = document.createElement(element.tagName);
  for (const attribute in element) {
    if (attribute === "children") {
      for (const child of element[attribute])
        createDOMElement(child, htmlElement);
    } else if (attribute.startsWith("on")) {
      htmlElement.addEventListener(attribute.substring(2), element[attribute]);
    } else {
      htmlElement[attribute] = element[attribute];
    }
  }
  return parent.appendChild(htmlElement);
}
function appendNewWarning(element, warning) {
  const span = document.createElement("span");
  span.classList.add("warning");
  span.innerText = warning;
  element.appendChild(span);
}
function appendWarning(element, warning) {
  const span = element.lastElementChild;
  if (!span.classList.contains("warning")) appendNewWarning(element, warning);
  else span.innerText = warning;
}
async function submitForm(event, callback) {
  event.preventDefault();

  const loadingImg = document.createElement("img");
  loadingImg.classList.add("loading");
  loadingImg.src = "/imgs/loading.gif";
  event.target.appendChild(loadingImg);

  const response = await callback(
    Array.from(event.target.querySelectorAll(".inputs input")).reduce(
      (obj, element) => {
        if (element.value !== "") obj[element.name] = element.value;
        return obj;
      },
      {}
    )
  );

  loadingImg.remove();

  return response;
}
async function login(data) {
  return await fetch("/api/user/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });
}
async function signup(data) {
  return await fetch("/api/user/signup", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
  });
}
async function createFolk(data) {
  return await fetch("/api/folk/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      fkOwner: sessionStorage.getItem("idUser"),
      fkFolk: data.fkFolk,
    }),
  });
}
async function setSession(data) {
  if (data.length === 1) {
    for (const k in data[0]) {
      sessionStorage.setItem(k + "User", data[0][k]);
    }
    window.location.assign("/");
  } else throw data;
}
async function submitLogin(event) {
  const response = await submitForm(event, login);

  if (response.ok) {
    const data = await response.json();
    setSession(data);
  } else if (response.status === 403) {
    appendWarning(event.target, "Login inválido.");
  } else {
    appendWarning(event.target, "Erro ao realizar o login.");
    throw await response.text();
  }

  return response;
}
async function submitSignup(event) {
  const response = await submitForm(event, signup);

  if (response.ok) {
    const response2 = await login({
      email: event.target.email.value,
      password: event.target.password.value,
    });

    if (response2.ok) {
      const data = await response2.json();
      setSession(data);
    } else throw await response2.text();
  } else {
    const responseText = await response.text();
    if (responseText.startsWith("Duplicate entry")) {
      if (responseText.includes("'User.name'")) {
        appendWarning(event.target, "Já existe um usuário com este nome.");
      } else if (responseText.includes("'User.email'")) {
        appendWarning(event.target, "Já existe um usuário com este email.");
      }
    } else {
      appendWarning(event.target, "Erro ao realizar o cadastro.");
      throw responseText;
    }
  }

  return response;
}
async function submitCreateFolk(event) {
  const response = await submitForm(event, createFolk);

  if (response.ok) {
    const data = await response.json();
    window.location.assign("");
  } else {
    const responseText = await response.text();
    if (responseText.includes("Duplicate entry")) {
      appendWarning(event.target, "Já existe um grupo com este nome.");
    } else {
      appendWarning(event.target, "Erro ao realizar o cadastro.");
      throw responseText;
    }
  }

  return response;
}
function populateHeader(headerNav) {
  let headerNavButtons = [];

  if (!sessionStorage.idUser) {
    headerNavButtons.push({
      tagName: "a",
      href: "/signup",
      textContent: "Cadastro",
    });
    headerNavButtons.push({
      tagName: "a",
      href: "/login",
      textContent: "Login",
    });
  } else {
    headerNavButtons.push({
      tagName: "a",
      href: "/dashboard",
      textContent: "Dashboard",
    });
    headerNavButtons.push({
      tagName: "button",
      className: "button-create-folk",
      textContent: "Criar grupo",
      onclick: (event) => {
        createDOMElement(
          {
            tagName: "dialog",
            children: [
              {
                tagName: "button",
                className: "exit",
                textContent: "X",
                onclick: (event) => {
                  event.target.parentElement.remove();
                },
              },
              {
                tagName: "form",
                autocomplete: "on",
                onsubmit: submitCreateFolk,
                children: [
                  {
                    tagName: "h1",
                    textContent: "Criar grupo",
                  },
                  {
                    tagName: "div",
                    className: "inputs",
                    children: [
                      {
                        tagName: "input",
                        name: "name",
                        type: "text",
                        placeholder: "Nome",
                        required: true,
                        autofocus: true,
                      },
                      {
                        tagName: "input",
                        name: "fkFolk",
                        type: "number",
                        placeholder: "Id do grupo maior",
                      },
                    ],
                  },
                  {
                    tagName: "button",
                    type: "submit",
                    textContent: "Criar",
                  },
                ],
              },
            ],
          },
          document.body
        )
          .querySelector("input[autofocus]")
          .focus();
      },
    });
    headerNavButtons.push({
      tagName: "button",
      className: "logout",
      textContent: "Sair",
      onclick: (event) => {
        sessionStorage.clear();
        window.location.assign("/");
      },
    });
  }
  for (let element of headerNavButtons) {
    let li = document.createElement("li");

    createDOMElement(element, li);

    headerNav.appendChild(li);
  }
}
async function plotCharts(charts) {
  const mainLabels = [
    ["Matemática", "História", "Biologia"],
    ["Matemática", "História", "Biologia"],
    ["Matemática", "História", "Biologia"],
  ];
  const mainLabel = [
    "Quantidade de usuários por grupo",
    "Quantidade de posts por grupo",
    "Quantidade de subgrupos por grupo",
  ];
  const mainData = [
    [13, 15, 11],
    [45, 58, 35],
    [2, 1, 3],
  ];

  const selects = ["usersPerFolk", "postsPerFolk", "folksPerFolk"];

  for (let i = 0; i < 3; i++) {
    let result = await fetch(`/api/chart/${selects[i]}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.ok) {

      const data = await result.json();
      for (const j in data) {
        mainLabels[i][j] = data[j].name;
        mainData[i][j] = data[j].count;
      }

      const chart = document.createElement("div");

      chart.classList.add("chart");

      const canvas = document.createElement("canvas");

      chart.appendChild(canvas);
      charts.appendChild(chart);
      new Chart(canvas, {
        type: "bar",
        data: {
          labels: mainLabels[i],
          datasets: [
            {
              label: mainLabel[i],
              data: mainData[i],
              backgroundColor: "#e53b3b",
              borderColor: "#e53b3b",
            },
          ],
        },
        options: {
          scales: {
            y: {
              grid: {
                display: true,
                color: "white",
                lineWidth: 0.5,
              },
              ticks: {
                color: "white",
                font: {
                  size: 18,
                },
                stepSize: 1,
                beginAtZero: true,
              },
            },
            x: {
              ticks: {
                color: "white",
                font: {
                  size: 14,
                },
                stepSize: 1,
                beginAtZero: true,
              },
            },
          },
        },
      });
    }
  }
}
