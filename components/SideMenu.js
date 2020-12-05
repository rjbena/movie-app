import { useState } from "react";
import Link from "next/link";

import Modal from "./Model";
import MovieCreateForm from "./MovieCreateForm";

import { createMovie } from "../actions/";

const SideMenu = ({ categories }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCreateMovie = async (movie) => {
    const movies = await createMovie(movie);
    console.log(movies);
    setIsSubmitted(true);
  };

  return (
    <div>
      <Modal hasSubmit={isSubmitted} setHasSubmit={setIsSubmitted}>
        <MovieCreateForm
          categories={categories}
          handleCreateMovie={handleCreateMovie}
        />
      </Modal>
      <h1 className="my-4">Shop Name</h1>
      <div className="list-group">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.name}`}>
            <a className="list-group-item">{category.name}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
