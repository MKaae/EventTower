export async function fetchGet(url) {
  let data;

  try {
    const response = await fetch(url, {
      credentials: "include",
    });
    const result = await response.json();
    data = result.data;
  } catch (error) {
    console.log(error);
  }

  return data;
}
