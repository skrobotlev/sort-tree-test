export default async function getGists(store: any) {
  const request = await fetch("https://api.github.com/gists");
  const res = await request.json();
  store.fetchData = res;
}
