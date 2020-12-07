import { useState } from "react";
import { useRouter } from "next/router";

import { editMovie } from "../actions";

const MovieEditForm = ({ categories, movie }) => {
  const router = useRouter();
  const [form, setForm] = useState(movie);

  const handleGenreChange = (e) => {
    const selected = form.genres.find((g) => g === e.target.value);
    let selectedGenre;
    if (selected) {
      selectedGenre = form.genres.filter((g) => g !== e.target.value);
    } else {
      selectedGenre = [...form.genres, e.target.value];
    }
    setForm({
      ...form,
      genres: selectedGenre,
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    editMovie(form).then((updatedMovie) => {
      router.push("/movies/[id]", `/movies/${movie.id}`);
    });
  };

  return (
    <>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={form.name}
            name="name"
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Enter movie name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            name="description"
            value={form.description}
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter movie description"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Rating</label>
          <input
            value={form.rating}
            name="rating"
            type="number"
            max="5"
            min="0"
            className="form-control"
            id="rating"
            placeholder="Enter rating"
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Max: 5, Min: 0{" "}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            value={form.image}
            name="image"
            type="text"
            className="form-control"
            id="image"
            placeholder="Enter image url"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cover">Cover</label>
          <input
            value={form.cover}
            name="cover"
            type="text"
            className="form-control"
            id="cover"
            placeholder="Enter cover image url"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="longDesc">Long Description</label>
          <textarea
            value={form.longDesc}
            name="longDesc"
            className="form-control"
            id="longDesc"
            rows="3"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <select
            multiple
            className="form-control"
            id="genre"
            onClick={handleGenreChange}
          >
            {categories.map((category) => (
              <option
                style={
                  form.genres.find((c) => c === category.name)
                    ? { background: "lightblue" }
                    : { background: "white" }
                }
                value={category.name}
                key={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" onClick={submitForm}>
          Edit Movie
        </button>
      </form>
    </>
  );
};

export default MovieEditForm;
