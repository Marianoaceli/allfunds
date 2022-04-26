import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NewsServices from '../../services/news';

function PostNews() {
    const [postNews, setPostNews] = useState({ title: "", description: "", content: "", author: "" })

    const handleInputChange = (e) => setPostNews({
        ...postNews,
        [e.target.name]: e.target.value,
    });

    const handleInputSubmit = async (e) => {
        e.preventDefault();
        const { title, description, content, author } = postNews
        if (!title || !description || !content || !author) {
            alert('All fields are required')
        } else {
            const rsp = await NewsServices.postNews(postNews)
            rsp.status === 200 ? alert('News created') : alert('Error creating the news')
            window.location.href = "http://localhost:3000/";
        }

    }

    return (
        <div>
            <header className="navbar p-2 bg-info">
                <h1 className="">CREATE NEWS</h1>
                <Link to="/">
                    <a href="/" className="btn btn-primary navbar-btn">
                        Go back to News
                    </a>
                </Link>
            </header>
            <main>
                <form >
                    <div class="form-group">
                        <label>
                            Title:
                            <input class="form-control" type="title"
                                value={postNews.title}
                                name="title"
                                onChange={handleInputChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Description:
                            <input class="form-control" type="description"
                                value={postNews.description}
                                name="description"
                                onChange={handleInputChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Content:
                            <input class="form-control" type="content"
                                value={postNews.content}
                                name="content"
                                onChange={handleInputChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Author:
                            <input class="form-control" type="author"
                                value={postNews.author}
                                name="author"
                                onChange={handleInputChange} />
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={(e) => { handleInputSubmit(e) }}>Submit</button>
                </form>
            </main>
        </div>
    );
}

export default PostNews;
