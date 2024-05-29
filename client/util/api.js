export async function fetchGet(url) {
  let data;
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });
    const result = await response.json();
    data = result.data;
  } catch (error) {
    console.error(error);
  }
  return data;
}

export async function fetchPost(url, body) {
  let data;
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`);
      throw error;
    }

    const result = await response.json();
    data = result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
  return data;
}

export async function fetchPut(url, body) {
  let data;
  try {
    const response = await fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`);
      throw error;
    }

    const result = await response.json();
    data = result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
  return data;
}

export async function fetchDelete(url, body) {
  let data;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`);
      throw error;
    }

    const result = await response.json();
    data = result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
  return data;
}
