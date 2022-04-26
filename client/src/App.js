import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import News from './screens/News';
import Archive from './screens/Archive';
import PostNews from './screens/postNews'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<News />} exact />
				<Route path="/archive" element={<Archive />} />
				<Route path="/postNews" element={<PostNews />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
