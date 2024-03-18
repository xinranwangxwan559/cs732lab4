import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PokedexPage.module.css";
import useGet from "./useGet";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

/**
 * Renders information about a pokemon with the given dexNumber.
 */
export default function PokedexPage() {
  const { dexNumber } = useParams();

  const { data: pokemon, error, isLoading } = useGet(`${API_BASE_URL}/api/pokemon/${dexNumber}`);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <PokemonLoading />
      ) : error ? (
        <PokemonNotFound dexNumber={dexNumber} />
      ) : (
        <PokedexEntry pokemon={pokemon} />
      )}
    </div>
  );
}

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL ?? "";

/**
 * To be displayed when we have successfully loaded data for a particular pokémon.
 */
function PokedexEntry({ pokemon }) {
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(undefined);

  // This effect will, whenever the id changes, set "loaded" back to false before loading the new image.
  // This is the only way I could figure out how to make this thing work.
  useEffect(() => {
    if (imgSrc !== pokemon.imageUrl) {
      setImageLoaded(false);
      setImgSrc(pokemon.imageUrl);
    }
  }, [pokemon]);

  return (
    <>
      <h1>{pokemon.name}</h1>

      {!isImageLoaded && <PlaceholderImage />}

      <img
        className={styles.dexImage}
        style={{ display: isImageLoaded ? undefined : "none" }}
        src={IMAGE_BASE_URL + imgSrc}
        onLoad={() => setImageLoaded(true)}
      />

      <p>{pokemon.dexEntry}</p>
    </>
  );
}

/**
 * To be displayed when we try to load a pokémon with a particular dexNumber, but that id isn't a valid pokémon dexNumber.
 */
function PokemonNotFound({ dexNumber }) {
  return (
    <>
      <h1>Pokémon not found!</h1>

      <img className={styles.dexImage} src="/white-pokeball.png" />

      <p>
        Unfortunately, a pokémon with dex number <code>{dexNumber}</code> is not registered in the
        dex!
      </p>
    </>
  );
}

/**
 * To be displayed while we are trying to load the data for a particular pokémon.
 */
function PokemonLoading() {
  return (
    <>
      <h1>Loading...</h1>

      <PlaceholderImage />

      <p>We are currently loading...</p>
    </>
  );
}

/**
 * When the main image hasn't yet been loaded from the internet, this is rendered instead - a spinning poke'ball placeholder image.
 */
function PlaceholderImage() {
  return <img className={styles.placeholderImage} src="/white-pokeball.png" />;
}
