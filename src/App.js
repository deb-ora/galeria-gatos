import React, { Component } from "react";
import "./App.scss";
import axios from "axios";
import Grid  from './components/Grid';

axios.defaults.baseURL = "https://api.thecatapi.com/v1";
axios.defaults.headers.common["x-api-key"] =
  "47797718-bee7-4d03-80f0-47714f42f84b";

class App extends Component {
  //fetch categories
  async getCategories() {
    const res = await axios("/categories");
    return res.data;
  }

  //fetch images = cat.id
  async getImagesByCategory(category_id, amount) {
    const res = await axios(
      "/images/search?category_ids=" + category_id + "&limit=" + amount
    );
    return res.data;
  }

  async loadImages() {
    //return 10 cats
    let category_images = await this.getImagesByCategory(
      this.state.selected_category,
      10
    );
    this.setState({ images: category_images });
  }

  constructor(...args) {
    super(...args);
    this.state = {
      images: [],
      categories: [],
      selected_category: 0
    };

    this.onSelectChange = this.onSelectChange.bind(this);
  }

  async onSelectChange(e) {
    console.log("Category Selected. ID:", e.target.value);
    await this.setState({ selected_category: e.target.value });
    await this.loadImages();
  }
  componentDidMount() {
    if (this.state.categories.length === 0) {
      (async () => {
        try {
          this.setState({ categories: await this.getCategories() });
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }

  render() {
    const { images, categories, selected_category } = this.state;
    return (
      <div>
        <div
          className="sidebar"
          value={selected_category}
           >
          {categories.map(category => (
            <li
              key={category.id}
              value={category.id}
              onClick={this.onSelectChange}
            >
              {category.name}
            </li>
          ))}
          
        </div>
        <Grid images={images} />

      </div>
    );
  }
}
export default App;
