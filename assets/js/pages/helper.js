var closeUserSession = async function(user_id) {
  const endpoint = `${BACKEND_POOL_URL}/end_session`
  let response 
  try {
    response = await axios.post(endpoint, {
      user_id
    });
    console.log("session ended", user_id)
  } catch(err) {
    console.error(err)
    throw err
  }
  return response
}

//'http://localhost:4001'