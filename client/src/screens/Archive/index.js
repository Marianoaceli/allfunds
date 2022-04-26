import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import NewsServices from '../../services/news';

function Archive() {
	const [news, setNews] = useState([]);

	useEffect(() => {
		const fetchArchivedNews = async () => {
			const archivedNews = await NewsServices.getArchivedNews();
			const sortedArray = archivedNews.sort(
				(a, b) => new Date(b.archiveDate) - new Date(a.archiveDate)
			);
			setNews(sortedArray);
		};
		fetchArchivedNews();
	}, [news]);

	const deleteNew = async (index) => {
		const deletedNew = news[index];
		await NewsServices.deleteNew(deletedNew._id);
		const updatedNews = [...news];
		updatedNews.splice(index, 1);
		setNews(updatedNews);
	};

	return (
		<div>
			<header className="navbar p-2 bg-info">
				<h1 className="">ARCHIVED</h1>
				<Link to="/">
					<a href="/" className="btn btn-primary navbar-btn">
						Go back to News
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
								Archived on {new Date(item.archiveDate).toDateString()}
							</h6>
							<h4>{item.description}</h4>
							<p>{item.content}</p>
							<h6>Published by {item.author}</h6>
							<button className="btn btn-danger" onClick={() => deleteNew(i)}>
								Delete
							</button>
						</li>
					))}
				</ul>
			</main>
		</div>
	);
}

export default Archive;
