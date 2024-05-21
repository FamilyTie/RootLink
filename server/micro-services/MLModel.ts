

export const processProfileAndFindMatches = async(user: any) => {
    const url  = "http://127.0.0.1:8080/model/process_user";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    const json = await response.json();
    return json;
}