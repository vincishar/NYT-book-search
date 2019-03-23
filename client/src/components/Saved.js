import React, { Component } from "react";

class Saved extends Component {
  state = {
    savedBooks: []
  };

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/api/books`)
      .then(res => res.json())
      .then(data => {
        if (data.length) {
          this.setState({ savedBooks: data });
        }else{
            this.setState({ empty: "There is currently no data in the database "})
        }
      });
  }

  handleDelete = id => {
    fetch(`${process.env.REACT_APP_API_URL}/api/books/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          window.location = "/saved";
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

        <div className="section3">
          <p className="results">Results</p>
          <h2 className="text-center text-danger">{this.state.empty}</h2>
          <ul>
            {this.state.savedBooks.map((b, i) => {
              const { title, authors, description, image, link, _id } = b;

              return (
                <li key={i}>
                  <div className="item">
                    <div className="bookInfo">
                      <div className="navLeft">
                        <h4>{title}</h4>
                        <h6>Written By {authors}</h6>
                      </div>
                      <nav className="navRight">
                        <ul>
                          <li>
                            <a target="_blank" href={link}>
                              View
                            </a>
                          </li>
                          <li>
                            <button
                              onClick={() => this.handleDelete(_id)}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>

                    <div className="bookImage">
                      <img src={image} alt="Google books" />
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

export default Saved;
