let i = document.getElementById("input")
let d = document.getElementById("color")

i.addEventListener("keypress", function () {
    d.value = "s"
})

d.addEventListener("change", function() {
    i.value = "";
})
