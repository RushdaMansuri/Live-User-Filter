const result = document.getElementById('result');
const filter = document.getElementById('filter');
const listItems = [];

getData();

filter.addEventListener('input', (e) => filterData(e.target.value));

async function getData() {
  try {
    const res = await fetch('https://randomuser.me/api?results=50');
    const { results } = await res.json();

    // Clear results
    result.innerHTML = '';

    results.forEach(user => {
      const li = document.createElement('li');
      listItems.push(li);

      li.innerHTML = `
        <img src="${user.picture.large}" alt="${user.name.first}">
        <div class="user-info">
          <h4>${user.name.first} ${user.name.last}</h4>
          <p>${user.location.city}, ${user.location.country}</p>
        </div>
      `;

      result.appendChild(li);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function filterData(searchTerm) {
  listItems.forEach(item => {
    const itemText = item.innerText.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();

    if (itemText.includes(searchTermLower)) {
      item.classList.remove('hide');
    } else {
      item.classList.add('hide');
    }
  });
}
