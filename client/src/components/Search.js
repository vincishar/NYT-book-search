import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Search extends Component {
  state = {
    query: "",
    books: []
  };

  handleSearch = e => {
    e.preventDefault();

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.query}`, {
      Method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ books: data.items });
      });
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSave = (title, authors, description, image, link) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/books`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        title,
        authors,
        description,
        image,
        link
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          toast.success("Saved to database");
        }
      });
  };

  render() {
    return (
      <div className="search">
        <div className="section1">
          <h1>(React) Google Books Search</h1>
          <h4>Search for and Save Books of Interest</h4>
        </div>
        <div className="section2">
          <h5>Book Search</h5>
          <p>Book</p>
          <nav className="navbar navbar-light bg-light">
            <form onSubmit={this.handleSearch} className="searchForm">
              <input
                onChange={this.handleChange}
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0 searchBtn"
                type="submit"
              >
                Search
              </button>
            </form>
          </nav>
        </div>
        <div className="section3">
          <p className="results">Results</p>
          <ul>
            {this.state.books.map((b, i) => {
              const { title, subtitle, authors, description } = b.volumeInfo;
              const { smallThumbnail } = b.volumeInfo.imageLinks;
              const { infoLink } = b.volumeInfo;

              return (
                <li key={i}>
                  <div className="item">
                    <div className="bookInfo">
                      <div className="navLeft">
                        <h4>{title}</h4>
                        <h5>{subtitle}</h5>
                        <h6>Written By {authors}</h6>
                      </div>
                      <nav className="navRight">
                        <ul>
                          <li>
                            <a target="_blank" href={infoLink}>
                              View
                            </a>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                this.handleSave(
                                  title,
                                  authors,
                                  description,
                                  smallThumbnail,
                                  infoLink
                                )
                              }
                              className="btn btn-primary"
                            >
                              Save
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>

                    <div className="bookImage">       
                      <img src={smallThumbnail} alt="Google books" />
                      <p>{description}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Search;
