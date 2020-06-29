import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  // inicializa useState
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "teste",
      owner: "the",
      techs: ["asdasd"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    
    const deletedRepository = repositories.slice(id);
    setRepositories(deletedRepository);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}{" "}
            <button onClick={() => {const ID = repository.id; handleRemoveRepository(ID)}}>Remover</button>{" "}
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
