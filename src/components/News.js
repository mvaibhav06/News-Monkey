import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();

    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=01ecd265ae2a469ea467c1637a524821&page=1";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
    });
  }

  handlePrevClick = async () => {
    console.log("Prev");

    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=01ecd265ae2a469ea467c1637a524821&page=${
      this.state.page - 1
    }&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };

  handleNextClick = async () => {
    console.log("Next");
    if (this.state.page + 1 > Math.ceil(this.state.totalArticles / 20)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=01ecd265ae2a469ea467c1637a524821&page=${
        this.state.page + 1
      }&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey - Top Headlines</h2>

        <div className="row">
          {this.state.articles.map((article) => {
            return (
              <div key={article.url} className="col-md-4">
                <NewsItem
                  title={article.title ? article.title : ""}
                  description={article.description ? article.description : ""}
                  imageUrl={article.urlToImage}
                  newsUrl={article.url}
                />
              </div>
            );
          })}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            onClick={this.handleNextClick}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
