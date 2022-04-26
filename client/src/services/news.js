const NewsServices = {
	getNews: async () => {
		try {
			const data = await fetch('http://localhost:8080/news');
			const news = await data.json();
			return news;
		} catch(error) {
			return [];
		}
	},
	getArchivedNews: async () => {
		try {
			const data = await fetch('http://localhost:8080/news?archiveNews=true');
			const news = await data.json();
			return news;
		} catch(error) {
			return [];
		}
	},
	archiveNew: async (id) => {
		try {
			await fetch(`http://localhost:8080/news/archive?id=${id}`, {
				method: 'put',
				mode: 'cors',
			});
		} catch(error) {
			console.log('Oops, there was an error');
		}
	},
	deleteNew: async (id) => {
		try {
			await fetch(`http://localhost:8080/news/delete?id=${id}`, {
				method: 'delete',
				mode: 'cors',
			});
		} catch(error) {
			console.log('Oops, there was an error');
		}
	},
	postNews: async (postNews) => {
		try {
			const rsp = await fetch(`http://localhost:8080/news/newsPost`, {
				method: 'post',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(postNews)
			})
			return rsp
		} catch(error) {
			console.log('Oops, there was an error');
		}
	}
};

export default NewsServices;
