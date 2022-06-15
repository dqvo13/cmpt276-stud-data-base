window.onload = function() {
    document.getElementById("nav-addStudent").addEventListener("click", function () {
        window.location.assign("./studentDataAdd.ejs");
    }, false);
}