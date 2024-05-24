require('dotenv').config();

export const processProfileAndFindMatches = async(user: any) => {
    const url  = `${process.env.PYTHON_URL}/model/process_user`;
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