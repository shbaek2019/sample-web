import { useSelector } from "react-redux";

class ArticleServiceInstance {
  //
  saveArticle = async ({ title, contents, category, publicYn, author, token }) => {
    console.log(token);
    console.log("save article function");
    const saveArticleResponse = await fetch("http://localhost:8080/api/article/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        contents,
        category,
        publicYn,
        author,
      }),
    });

    console.log("saveArticleResponse", saveArticleResponse);
    return saveArticleResponse;
  };

  getArticlesById = async (articleId, token) => {
    const getArticleByIdResponse = await fetch(
      `http://localhost:8080/api/article/findArticleById?articleId=${articleId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await getArticleByIdResponse.json();
    console.log("service instances", result);
    return result;
  };

  getArticlesByUser = async (email, token) => {
    const getArticlesByUserResponse = await fetch(
      `http://localhost:8080/api/article/list?author=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await getArticlesByUserResponse.json();
    console.log("service instances", result);
    return result;
  };
}

const instance = new ArticleServiceInstance();
export default instance;
