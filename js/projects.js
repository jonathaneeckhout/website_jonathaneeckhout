var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    console.log(this.responseText);
  }
};

document.addEventListener("DOMContentLoaded", function(event) {
    xhttp.open("GET", "projects.html?method=getNumberOfProjects", true);
    xhttp.send();
  });
