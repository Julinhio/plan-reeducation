// Composant utilitaire pour rendre du HTML inline préservé du contenu phases.
// Le contenu est statique et écrit par moi, pas d'input utilisateur, donc
// dangerouslySetInnerHTML est sûr ici.
export default function Html({ as: As = "span", html, className }) {
  return (
    <As className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
