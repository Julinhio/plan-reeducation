const STORAGE_KEY = "reeducation-unlocked-v1";

export function isUnlocked() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function tryUnlock(password) {
  const expected = import.meta.env.VITE_APP_PASSWORD;
  if (!expected) {
    // En dev local sans password, on déverrouille pour éviter de bloquer le travail
    console.warn(
      "VITE_APP_PASSWORD non défini, accès libre en local. Définir la variable pour activer le gate."
    );
    persistUnlock();
    return true;
  }
  if (password === expected) {
    persistUnlock();
    return true;
  }
  return false;
}

export function lock() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}

function persistUnlock() {
  try {
    localStorage.setItem(STORAGE_KEY, "true");
  } catch {
    /* noop */
  }
}
