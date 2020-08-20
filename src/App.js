import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const resource = "/repositories";
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get(resource).then(({ data }) => setRepositories(data));
  }, []);

  function handleAddRepository() {
    const repository = {
      title: `It's me, ReactJS! - ${Date.now()}`,
      url: "https://reactjs.org",
      techs: ["JavaScript", "TypeScript"]
    };
    api.post(resource, repository)
      .then(({ data }) => setRepositories([...repositories, data]));
  }

  function handleRemoveRepository(id) {
    api.delete(`${resource}/${id}`)
      .then(() => {
        setRepositories(repositories.filter(repository => repository.id !== id));
      });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
