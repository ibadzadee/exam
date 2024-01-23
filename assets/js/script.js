let url = `http://localhost:3000/data`;
const section = document.querySelector("#crud .bottom");
let search = document.querySelector("#search")
let sort = document.querySelector("#sort")
let filterArr = [];
let copyArr = [];

async function getAll() {
    let res = await axios.get(url);
    let data = await res.data;
    copyArr = data;
    section.innerHTML = "";
    filterArr = filterArr.length || search.value ? filterArr : data;

    filterArr.forEach(element => {
        section.innerHTML += `
        <div class="card">
        <div class="img"><img src="${element.image}" alt=""></div>
        <div class="text">
            <h5>WRIST BAND</h5>
            <h2>${element.name}</h2>
            <p>$${element.cost}</p>
        </div>
    </div>
        `
    })
}
getAll();

search.addEventListener("input", (e) => {
    filterArr = copyArr;
    filterArr = filterArr.filter(element => {
        return element.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    getAll();
})



sort.addEventListener("change", (e) => {
    if (e.target.value === "asc") {
        filterArr.sort((a, b) => a.cost - b.cost)
    }
    else if (e.target.value === "desc") {
        filterArr.sort((a, b) => b.cost - a.cost)
    }
    else {
        filterArr = [];
    };
    getAll();
})


let menu = document.querySelector("#menu");
function openMenu() {
  let respMenu = document.querySelector(".menu-list");
  respMenu.classList.toggle("respMenu");
}


// <!--------------------From end to top btn----------------------->
topBtn = document.querySelector("#top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    topBtn.style.scale = "1";
  } else {
    topBtn.style.scale = "";
  }
});

topBtn.addEventListener("click", () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});