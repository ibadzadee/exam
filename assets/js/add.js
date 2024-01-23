let url = `http://localhost:3000/data/`;

const form = document.querySelector("#form");
let fileInp = document.querySelector("#file")
let nameInp = document.querySelector("#name")
let costInp = document.querySelector("#cost")
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputs = [fileInp, nameInp, costInp];
    if (nameInp.value.trim() && costInp.value.trim()) {
        let src = fileInp.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(src);
        reader.onload = (e) => {
            let obj = {
                image: e.target.result,
                name: nameInp.value,
                cost: costInp.value
            }
            axios.post(url, obj)
                .then(res => {
                    window.location = `./index.html`
                })
        }
    }
    else {
        inputs.forEach(element => {
            let display = element.value.trim() == "" ? "block" : "none";
            element.nextElementSibling.style.display = display;
        })
    }
})


let table = document.querySelector("#table tbody")

axios.get(url)
.then(res=>{
    let data = res.data;
    data.forEach(element => {
        table.innerHTML+=`
         <tr>
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.cost}</td>
        <td><button onclick="deleteData(${element.id})">Delete</button></td>
    </tr>
        `
    });
})
function deleteData(id){
    axios.delete(url+id);
    window.location.reload();
    
}

