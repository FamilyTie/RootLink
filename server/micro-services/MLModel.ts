require('dotenv').config();

export const processProfileAndFindMatches = async(user: any) => {
    console.log('findingMatches')
    const url  = `${process.env.PYTHON_URL}/model/process_user`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
    
        const json = await response.json();
        return json;

      
    } catch (error) {
        console.error(error);
    }
   
}
