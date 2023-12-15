document.addEventListener('DOMContentLoaded', () => {
    fetchDataFromServer();
});

async function fetchDataFromServer() {
    try {
        const response = await fetch('http://localhost:3000/database');
        const data = await response.json();

        console.debug(data);
    } catch (error) {
        console.error('Error fetching data from server:', error);
    }
}