import { NavLink, Outlet } from "react-router-dom";
import styles from "./PokedexLayout.module.css";
import useGet from "./useGet";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

/**
 * Renders the layout of the page, including a list of pokemon on the left, and a main window on the right.
 * The main window contains an <Outlet> which is intended to render a PokedexPage inside, based on the route.
 */
export default function PokedexLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.dexContainer}>
        <PokemonList />

        <div className={styles.dexView}>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders a list of pokemon.
 */
function PokemonList() {
  const { data: pokemonList } = useGet(`${API_BASE_URL}/api/pokemon`, []);

  return (
    <div className={styles.list}>
      <div>
        {pokemonList.map((pokemon) => (
          <ListItem key={pokemon.dexNumber} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

/**
 * Renders a single pokemon in the list.
 */
function ListItem({ pokemon }) {
  return (
    <NavLink
      to={pokemon.dexNumber.toString()}
      className={({ isActive }) =>
        isActive ? `${styles.listItem} ${styles.activeListItem}` : styles.listItem
      }
    >
      <img src="pokeball.png" />
      <span>{pokemon.name}</span>
    </NavLink>
  );
}
