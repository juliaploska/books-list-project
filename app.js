class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    //Create an element
    const row = document.createElement("tr");
    //insert cols
    row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class='delete'>X</td>`;
    list.appendChild(row);
  }
  showAlert(message, className) {
    //create div
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    //timeout after 3 s
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

//Event Listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
  //Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  //Instantiate book
  const book = new Book(title, author, isbn);
  //Instantiate ui
  const ui = new UI();

  //validate
  if (title === "" || author === "" || isbn == "") {
    //Error alert
    ui.showAlert("Please fill in all fileds", "error");
  } else {
    //add boook to list
    ui.addBookToList(book);
    //Show success
    ui.showAlert("Book added !", "success");
    //clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

//Event listener for removing a book
document.getElementById("book-list").addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert("Book removed", "success");
  e.preventDefault();
});
