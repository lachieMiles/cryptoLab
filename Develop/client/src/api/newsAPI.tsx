const fetchNews = async () => {
    try {
        const response = await fetch('/api/news');
        if(!response.ok) {
            throw new Error('failed to fetch news');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Error fetching news:', err);
        return[];
    }
};