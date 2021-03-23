import { articles_url, _api_key, query } from '../config/rest_consfig';

//https://newsapi.org/v2/everything?q=Malls%20in%20Singapore&from=2021-02-21&sortBy=relevancy&apiKey=cf22593c82034d3a97e6e47af2d4196c


export async function getArticles() {

    try {
        let articles = await fetch(`https://newsapi.org/v2/everything?q=Malls%20in%20Singapore&from=2021-02-28&sortBy=relevancy&apiKey=cf22593c82034d3a97e6e47af2d4196c`, {
            headers: {
                'X-API-KEY': _api_key
            }
        });

        let result = await articles.json();
        
        articles = null;

        return result.articles;
    }
    catch (error) {
        throw error;
    }
}