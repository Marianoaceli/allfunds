import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsServices from '../../services/news';

function News() {
	const [news, setNews] = useState([]);

	useEffect(() => {
		const fetchNews = async () => {
			const updatedNews = await NewsServices.getNews();
			const sortedArray = updatedNews.sort(
				(a, b) => new Date(b.date) - new Date(a.date)
			);
			setNews(sortedArray);
		};
		fetchNews();
	}, [news]);

	const archiveNew = async (index) => {
		const archivedNew = news[index];
		await NewsServices.archiveNew(archivedNew._id);
		const updatedNews = [...news];
		updatedNews.splice(index, 1);
		setNews(updatedNews);
	};

	return (
		<div>
			<header className="navbar p-2 bg-info">
				<h1 className="">NEWS</h1>
				<Link to="/postNews">
					<a href="/postNews" className="btn btn-primary navbar-btn">
						Create News
					</a>
				</Link>
				<Link to="/archive">
					<a href="/archive" className="btn btn-primary navbar-btn">
						Archived
					</a>
				</Link>
			</header>
			<main>
				<ul className="list-group">
					{news.map((item, i) => (
						<li
							className="list-group-item border-3 border-info m-2 p-3"
							key={item._id}
						>
							<h2>{item.title}</h2>
							<h6 className="h6 text-secondary">
								{new Date(item.date).toDateString()}
							</h6>
							<h4>{item.description}</h4>
							<p>{item.content}</p>
							<h6>Published by {item.author}</h6>
							<button className="btn btn-warning" onClick={() => archiveNew(i)}>
								Archive
							</button>
						</li>
					))}
				</ul>
			</main>
		</div>
	);
}

export default News;
