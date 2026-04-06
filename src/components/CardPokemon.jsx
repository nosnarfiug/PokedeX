import pokedex from "../assets/pokedex.png";
import { useEffect, useState, useRef } from "react";

const CardPokemon = () => {
  const [pokemon, setPokemon] = useState();
  const [id, setId] = useState(1);
  const [busca, setBusca] = useState("");
  const [listaPokemons, setListaPokemons] = useState([]);
  const [sugestoes, setSugestoes] = useState([]);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const [iSelecionado, setISelecionado] = useState(-1);
  const [animacao, setAnimacao] = useState("");
  const ListaRef = useRef(null);
  const buscaRef = useRef(null);

  /* Buscar pokemon especifico */
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
      });
  }, [id]);

  /* Carregar lista de todos pokemon */

  useEffect(() => {
    async function pegarPokemons() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
      const data = await res.json();

      setListaPokemons(data.results);
    }
    pegarPokemons();
  }, []);

  const buscarPokemon = async () => {
    const pesquisa = busca.toLowerCase().trim();
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pesquisa}`);
    const data = await res.json();

    setPokemon(data);
    setId(data.id);
  };

  // função para autoCompletar

  const autoComplete = (valor) => {
    setBusca(valor);

    setMostrarSugestoes(true);

    const filtrados = listaPokemons.filter((pokemon) =>
      pokemon.name.includes(valor.toLowerCase()),
    );

    setSugestoes(filtrados.slice(0, 8));
  };
  const proximoPokemon = () => {
    setAnimacao("saindo-esquerda");

    setTimeout(() => {
      setId((prev) => Number(prev) + 1);

      setAnimacao("entrando-direita");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimacao("");
        });
      });
    }, 300);
  };

  const anteriorPokemon = () => {
    setAnimacao("saindo-direita");

    setTimeout(() => {
      setId((prev) => Math.max(1, Number(prev) - 1));

      setAnimacao("entrando-esquerda");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimacao("");
        });
      });
    }, 300);
  };

  // navegar com as teclas
  const navegarSugestoes = (e) => {
    if (e.key === "ArrowDown") {
      setISelecionado((prev) =>
        prev < sugestoes.length - 1 ? prev + 1 : prev,
      );
    }

    if (e.key === "ArrowUp") {
      setISelecionado((prev) => (prev > 0 ? prev - 1 : prev));
    }

    if (e.key === "Escape") {
      setMostrarSugestoes(false);
    }

    if (e.key === "Enter") {
      if (iSelecionado >= 0) {
        const pokemon = sugestoes[iSelecionado];

        const id = pokemon.url.split("/").filter(Boolean).pop();

        setId(Number(id));
        setBusca("");
        setSugestoes([]);
        setMostrarSugestoes(false);
        setISelecionado(-1);
      } else {
        buscarPokemon();
      }
    }
  };

  useEffect(() => {
    if (ListaRef.current && iSelecionado >= 0) {
      const item = ListaRef.current.children[iSelecionado];

      if (item) {
        item.scrollIntoView({
          block: "nearest",
        });
      }
    }
  }, [iSelecionado]);

  useEffect(() => {
    function navegarPokemons(e) {
      if (document.activeElement.classList.contains("barraPesquisa")) {
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        proximoPokemon();
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        anteriorPokemon();
      }
    }

    document.addEventListener("keydown", navegarPokemons, { passive: false });

    return () => {
      document.removeEventListener("keydown", navegarPokemons);
    };
  }, []);

  useEffect(() => {
    function clickFora(e) {
      if (buscaRef.current && !buscaRef.current.contains(e.target)) {
        setMostrarSugestoes(false);
      }
    }

    document.addEventListener("mousedown", clickFora);

    return () => {
      document.removeEventListener("mousedown", clickFora);
    };
  }, []);

  const trocarPokemon = (novoId, direcao) => {
    setAnimacao(direcao);

    setTimeout(() => {
      setId(novoId);
    }, 150);

    setTimeout(() => {
      setAnimacao("");
    }, 300);
  };

  const nomesStats = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  };

  const coresTipos = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A33EA1",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };

  const tipo1 = pokemon?.types?.[0]?.type?.name;
  const tipo2 = pokemon?.types?.[1]?.type?.name;

  const backgroundTela = `linear-gradient( to top,
    ${coresTipos[tipo1] || "#777"},
    ${coresTipos[tipo2] || coresTipos[tipo1]}
    )`;

  if (!pokemon) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="pokedex" style={{ backgroundImage: `url(${pokedex})` }}>
      <input
        className="barraPesquisa"
        type="text"
        placeholder=" Buscar Pokémon..."
        value={busca}
        onFocus={() => setMostrarSugestoes(true)}
        onChange={(e) => autoComplete(e.target.value)}
        onKeyDown={navegarSugestoes}
      />

      {mostrarSugestoes && (
        <ul className="sugestoes" ref={ListaRef}>
          {sugestoes.map((pokemon, index) => {
            const id = pokemon.url.split("/").filter(Boolean).pop();

            const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

            return (
              <li
                ref={buscaRef}
                key={pokemon.name}
                className={index === iSelecionado ? "ativo" : ""}
                onClick={() => {
                  setId(Number(id));
                  setBusca("");
                  setSugestoes([]);
                  setMostrarSugestoes(false);
                  setISelecionado(-1);
                  document.activeElement.blur();
                }}
              >
                <div className="pokeIcon">
                  <img src={img} width="45" />
                </div>
                {pokemon.name}
              </li>
            );
          })}
        </ul>
      )}
      <div className="tela" style={{ background: backgroundTela }}>
        <div className="imgWrapper">
          <img
            className={`imgPoke ${animacao}`}
            src={pokemon.sprites.front_default}
          />
        </div>
        <div className="stats">
          {pokemon.stats.map((s) => (
            <div className="stat" key={s.stat.name}>
              <span className="statNome">{nomesStats[s.stat.name]}</span>
              <div className="barra">
                <div
                  className="barraPreencher"
                  style={{ width: `${s.base_stat / 2}%` }}
                ></div>
              </div>
              <span className="statNumero">{s.base_stat}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="identidade">
        <h2 className="nome">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h2>
        <span className="id">#{pokemon.id}</span>
        <div className="type">
          {pokemon.types.map((t) => (
            <button
              key={t.type.name}
              className="tipo"
              style={{ backgroundColor: coresTipos[t.type.name] }}
            >
              {t.type.name}
            </button>
          ))}
        </div>
      </div>

      <button className="btnPrev" onClick={anteriorPokemon}>
        ❮❮
      </button>

      <button className="btnNext" onClick={proximoPokemon}>
        ❯❯
      </button>
      <div className="dica">
        Clique nas setas abaixo ou ← → para uma melhor experiência
      </div>
    </div>
  );
};

export default CardPokemon;
