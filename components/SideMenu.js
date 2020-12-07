import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Modal from "./Model";
import MovieCreateForm from "./MovieCreateForm";

import { createMovie } from "../actions/";

const SideMenu = ({ categories, changeCategory, activeCategory }) => {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCreateMovie = async (movie) => {
    const movies = await createMovie(movie);
    setIsSubmitted(true);
    router.push("/");
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
          <a
            onClick={() => changeCategory(category)}
            key={category.id}
            href="#"
            className={`list-group-item ${
              activeCategory === category.name ? "active" : ""
            }`}
          >
            {category.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
