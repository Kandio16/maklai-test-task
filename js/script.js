const submit = document.getElementById("submit");
const resultHeading = document.getElementById("result-heading");

const result = document.getElementById("result");
const fromInput = document.getElementById("fromInput");
const toInput = document.getElementById("toInput");

const apiUrl = "https://fakerapi.it/api/v1/persons";

function getPeople(e) {
  e.preventDefault();
  const startDate = fromInput.value;
  const endDate = toInput.value;

  const fullUrl = `${apiUrl}?$&_birthday_start=${startDate}&_birthday_end=${endDate}`;

  result.innerHTML = "";
  resultHeading.innerHTML = "";

  if (startDate && endDate) {
    try {
      if (new Date(endDate) < new Date(startDate)) {
        throw new Error("End date cannot be earlier than the start date");
      }

      fetch(fullUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((response) => {
          const { data } = response;
          console.log(data);

          if (data.meals === null) {
            resultHeading.innerHTML = `Data is invalid`;
            result.innerHTML = "";
          } else {
            result.innerHTML = data
              .map(
                (person) =>
                  `
                <div class="item">
                  <h3 class="title">${person.firstname} ${person.lastname}</h3>
                  <div class="info">
                    <span><i class="fa fa-envelope"></i>${person.email}</span>
                    <span><i class="fa fa-phone"></i>${person.phone}</span>
                    <span><i class="fa fa-birthday-cake"></i>${person.birthday}</span>
                    <span><i class="fa fa-female"></i>${person.gender}</span>
                    <span><i class="fas fa-globe"></i>${person.website}</span>
                  </div>
                </div>
                `
              )
              .join("");
          }
        })
        .catch((error) => {
          resultHeading.innerHTML = `An error occurred while fetching data`;
        });
    } catch (error) {
      resultHeading.innerHTML = `${error.message}`;
    }
  } else {
    resultHeading.innerHTML = `Please enter your start and end date`;
  }
}

// Event Listeners
submit.addEventListener("submit", getPeople);
