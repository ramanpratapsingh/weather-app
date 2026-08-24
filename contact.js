function submitContact(event) {
  event.preventDefault();

  var name = document.getElementById("nameField").value;
  var note = document.getElementById("formNote");

  note.innerHTML = "Thanks " + name + ", your message has been noted!";

  document.getElementById("nameField").value = "";
  document.getElementById("emailField").value = "";
  document.getElementById("messageField").value = "";
}
