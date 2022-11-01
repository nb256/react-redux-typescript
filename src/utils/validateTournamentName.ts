export default function validateTournamentName(name: string): boolean {
  // Latin letters, numbers, and spaces, not an empty string or only spaces.
  return /^[a-zA-Z0-9 ]+$/.test(name) && /^.*[^ ].*$/.test(name);
}
